
'use server';
/**
 * @fileOverview Server-side optimized trivia service with aggressive payload reduction.
 *
 * Key optimization: Fetch full documents on server, immediately strip large fields,
 * send only lean objects to client. This dramatically reduces network transfer time.
 */

import { db } from '@/lib/firebase';
import type { TriviaQuestion } from '@/lib/trivia-data';
import { collection, getDocs, query, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';

const TRIVIA_COLLECTION = 'triviaQuestions';

// Simple in-memory cache for all questions and hints
let allQuestionsCache: TriviaQuestion[] | null = null;
let allQuestionsCacheTimestamp: number | null = null;
const allHintsCache = new Map<string, { fallbackHint: string; cachedPirateScript?: string }>();
let allHintsCacheTimestamp: number | null = null;

const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

/**
 * 🚀 OPTIMIZED: Server-side payload reduction and in-memory caching
 * Fetches full documents, immediately strips large fields, sends lean objects to client
 */
export async function getTriviaQuestions(): Promise<TriviaQuestion[]> {
  const now = Date.now();
  if (allQuestionsCache && allQuestionsCacheTimestamp && (now - allQuestionsCacheTimestamp < CACHE_DURATION_MS)) {
    console.log('✅ Serving trivia questions from in-memory cache.');
    // Return a shuffled copy of the cache to ensure game randomness
    return [...allQuestionsCache].sort(() => 0.5 - Math.random());
  }

  try {
    const startTime = performance.now();
    
    // Fetch all documents from Firestore
    const questionsQuery = query(collection(db, TRIVIA_COLLECTION));
    
    const querySnapshot = await getDocs(questionsQuery);
    const fetchTime = performance.now();
    
    console.log(`📊 Firestore fetch for all questions: ${Math.round(fetchTime - startTime)}ms`);

    if (querySnapshot.empty) {
      console.warn("The 'triviaQuestions' collection is empty. Please run the database seeder.");
      return [];
    }

    const leanQuestions: TriviaQuestion[] = [];
    let totalOriginalSize = 0;
    let totalLeanSize = 0;
    
    // Clear old hints cache and repopulate
    allHintsCache.clear();

    querySnapshot.forEach((docSnapshot) => {
      const fullData = docSnapshot.data();
      
      const originalSize = JSON.stringify(fullData).length;
      totalOriginalSize += originalSize;
      
      const leanQuestion: TriviaQuestion = {
        id: fullData.id,
        question: fullData.question,
        options: fullData.options,
        answer: fullData.answer,
        storylineHintKey: fullData.storylineHintKey,
        fallbackHint: '', 
        cachedPirateScript: undefined,
      };
      
      const leanSize = JSON.stringify(leanQuestion).length;
      totalLeanSize += leanSize;
      
      leanQuestions.push(leanQuestion);

      // Populate hints cache at the same time
      allHintsCache.set(fullData.id, {
        fallbackHint: fullData.fallbackHint || "Arrr, the river keeps its secrets close.",
        cachedPirateScript: fullData.cachedPirateScript,
      });
    });
    
    if (totalOriginalSize > 0) {
      const compressionRatio = ((totalOriginalSize - totalLeanSize) / totalOriginalSize * 100).toFixed(1);
      console.log(`📦 Payload optimization:
      - Original size: ${(totalOriginalSize / 1024).toFixed(1)}KB
      - Lean size: ${(totalLeanSize / 1024).toFixed(1)}KB  
      - Compression: ${compressionRatio}% smaller
      - Questions processed: ${leanQuestions.length}`);
    }
    
    allQuestionsCache = leanQuestions;
    allQuestionsCacheTimestamp = now;
    allHintsCacheTimestamp = now;
    console.log(`📚 Cached ${leanQuestions.length} trivia questions and their hints.`);

    const endTime = performance.now();
    console.log(`⚡ Total processing time: ${Math.round(endTime - startTime)}ms`);
    
    return [...allQuestionsCache].sort(() => 0.5 - Math.random());

  } catch (error: any) {
    console.error("Error fetching and optimizing trivia questions:", error);
    throw new Error(`Could not fetch trivia questions. Original error: ${error.message || String(error)}`);
  }
}

/**
 * 🚀 OPTIMIZED: On-demand hint loading, now reads from cache first.
 * Only fetches hint data from Firestore if it's not in the in-memory cache.
 */
export async function getQuestionHints(questionId: string): Promise<{ fallbackHint: string; cachedPirateScript?: string }> {
  const now = Date.now();
  if (allHintsCache.has(questionId) && allHintsCacheTimestamp && (now - allHintsCacheTimestamp < CACHE_DURATION_MS)) {
    return allHintsCache.get(questionId)!;
  }

  try {
    const docRef = doc(db, TRIVIA_COLLECTION, questionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const hintData = {
        fallbackHint: data.fallbackHint || "Arrr, the river keeps its secrets close.",
        cachedPirateScript: data.cachedPirateScript,
      };
      // Add the freshly fetched hint to the cache
      allHintsCache.set(questionId, hintData);
      return hintData;
    }

    return { fallbackHint: "Arrr, this secret seems to have washed away..." };
    
  } catch (error: any) {
    console.error(`Error fetching hints for question ${questionId}:`, error);
    return { fallbackHint: "A mysterious force prevents the hint from appearing..." };
  }
}

/**
 * Preloads hints for a given list of question IDs into the server's memory cache.
 * Does not return anything. This is a "fire and forget" optimization.
 */
export async function preloadHintsForQuestions(questionIds: string[]): Promise<void> {
    const idsToFetch = questionIds.filter(id => !allHintsCache.has(id));
    if (idsToFetch.length === 0) {
        return; // All requested hints are already cached.
    }
    console.log(`🔥 Preloading hints for ${idsToFetch.length} questions...`);
    try {
        const fetchPromises = idsToFetch.map(id => getQuestionHints(id));
        await Promise.all(fetchPromises);
        console.log(`✅ Finished preloading hints.`);
    } catch (error) {
        console.warn("Hint preloading failed for some questions:", error);
    }
}


/**
 * Adds a new trivia question to the Firestore database using a custom ID.
 * Clears relevant caches to ensure new questions appear.
 */
export async function addTriviaQuestion(questionData: Omit<TriviaQuestion, 'id'>): Promise<string> {
  try {
    const newId = `TQ${Date.now()}`;
    const questionWithId = { ...questionData, id: newId };
    
    const questionDocRef = doc(db, TRIVIA_COLLECTION, newId);
    await setDoc(questionDocRef, questionWithId);

    // Invalidate caches
    allQuestionsCache = null;
    allQuestionsCacheTimestamp = null;
    allHintsCache.clear();
    allHintsCacheTimestamp = null;

    console.log('Question added. Trivia and hints cache invalidated.');
    
    console.log(`✅ Added question ${newId}`);
    return newId;

  } catch (error: any) {
    console.error("Error adding trivia question to Firestore:", error);
    throw new Error(`Could not add question. Original error: ${error.message || String(error)}`);
  }
}

/**
 * Caches a generated pirate script in both Firestore and the in-memory cache.
 */
export async function cachePirateScriptForQuestion(questionId: string, script: string): Promise<void> {
  try {
    const questionDocRef = doc(db, TRIVIA_COLLECTION, questionId);
    await setDoc(questionDocRef, { cachedPirateScript: script }, { merge: true });
    
    // Update in-memory cache as well
    if (allHintsCache.has(questionId)) {
        const cachedHint = allHintsCache.get(questionId)!;
        cachedHint.cachedPirateScript = script;
        allHintsCache.set(questionId, cachedHint);
    }
    
  } catch (error: any) {
    console.error(`Error caching script for question ${questionId}:`, error);
  }
}

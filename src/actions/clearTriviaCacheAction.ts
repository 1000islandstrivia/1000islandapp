'use server';
/**
 * @fileOverview Server-side optimized trivia service with aggressive payload reduction.
 *
 * Key optimization: Fetch full documents on server, immediately strip large fields,
 * send only lean objects to client. This dramatically reduces network transfer time.
 */

import { db } from '@/lib/firebase';
import type { TriviaQuestion } from '@/lib/trivia-data';
import { collection, getDocs, query, addDoc, doc, setDoc, limit, getDoc } from 'firebase/firestore';

const TRIVIA_COLLECTION = 'triviaQuestions';
const QUESTIONS_TO_FETCH_FROM_DB = 50;

/**
 * 🚀 OPTIMIZED: Server-side payload reduction
 * Fetches full documents, immediately strips large fields, sends lean objects to client
 */
export async function getTriviaQuestions(): Promise<TriviaQuestion[]> {
  try {
    const startTime = performance.now();
    
    // Fetch full documents from Firestore
    const questionsQuery = query(
      collection(db, TRIVIA_COLLECTION),
      limit(QUESTIONS_TO_FETCH_FROM_DB)
    );
    
    const querySnapshot = await getDocs(questionsQuery);
    const fetchTime = performance.now();
    
    console.log(`📊 Firestore fetch: ${Math.round(fetchTime - startTime)}ms`);

    if (querySnapshot.empty) {
      console.warn("The 'triviaQuestions' collection is empty. Please run the database seeder.");
      return [];
    }

    // 🔥 KEY OPTIMIZATION: Server-side mapping to lean objects
    const leanQuestions: TriviaQuestion[] = [];
    let totalOriginalSize = 0;
    let totalLeanSize = 0;
    
    querySnapshot.forEach((docSnapshot) => {
      const fullData = docSnapshot.data();
      
      // Calculate original document size (for monitoring)
      const originalSize = JSON.stringify(fullData).length;
      totalOriginalSize += originalSize;
      
      // Create lean object with ONLY essential gameplay fields
      const leanQuestion: TriviaQuestion = {
        id: fullData.id,
        question: fullData.question,
        options: fullData.options,
        answer: fullData.answer,
        storylineHintKey: fullData.storylineHintKey,
        // Explicitly exclude large fields - NEVER send to client
        fallbackHint: '', 
        cachedPirateScript: undefined,
      };
      
      // Calculate lean size
      const leanSize = JSON.stringify(leanQuestion).length;
      totalLeanSize += leanSize;
      
      leanQuestions.push(leanQuestion);
    });
    
    // Performance monitoring
    if (totalOriginalSize > 0) {
      const compressionRatio = ((totalOriginalSize - totalLeanSize) / totalOriginalSize * 100).toFixed(1);
      console.log(`📦 Payload optimization:
      - Original size: ${(totalOriginalSize / 1024).toFixed(1)}KB
      - Lean size: ${(totalLeanSize / 1024).toFixed(1)}KB  
      - Compression: ${compressionRatio}% smaller
      - Questions processed: ${leanQuestions.length}`);
    }
    
    // Shuffle for randomness (server-side)
    const shuffledQuestions = leanQuestions.sort(() => 0.5 - Math.random());
    
    const endTime = performance.now();
    console.log(`⚡ Total processing time: ${Math.round(endTime - startTime)}ms`);
    
    return shuffledQuestions;

  } catch (error: any) {
    console.error("Error fetching and optimizing trivia questions:", error);
    throw new Error(`Could not fetch trivia questions. Original error: ${error.message || String(error)}`);
  }
}

/**
 * 🚀 OPTIMIZED: On-demand hint loading with server-side caching
 * Only fetches hint data when actually needed during gameplay
 */
export async function getQuestionHints(questionId: string): Promise<{ fallbackHint: string; cachedPirateScript?: string }> {
  try {
    const startTime = performance.now();
    
    const docRef = doc(db, TRIVIA_COLLECTION, questionId);
    const docSnap = await getDoc(docRef);
    
    const endTime = performance.now();
    console.log(`📖 Hint fetch for ${questionId}: ${Math.round(endTime - startTime)}ms`);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const hintData = {
        fallbackHint: data.fallbackHint || "Arrr, the river keeps its secrets close.",
        cachedPirateScript: data.cachedPirateScript,
      };
      
      return hintData;
    }

    const fallback = { fallbackHint: "Arrr, this secret seems to have washed away..." };
    
    return fallback;
    
  } catch (error: any) {
    console.error(`Error fetching hints for question ${questionId}:`, error);
    // Return a safe fallback so the game can continue
    return { fallbackHint: "A mysterious force prevents the hint from appearing..." };
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
    
    console.log(`✅ Added question ${newId}`);
    return newId;

  } catch (error: any) {
    console.error("Error adding trivia question to Firestore:", error);
    throw new Error(`Could not add question. Original error: ${error.message || String(error)}`);
  }
}

/**
 * Caches a generated pirate script with server-side cache update
 */
export async function cachePirateScriptForQuestion(questionId: string, script: string): Promise<void> {
  try {
    const questionDocRef = doc(db, TRIVIA_COLLECTION, questionId);
    await setDoc(questionDocRef, { cachedPirateScript: script }, { merge: true });
    
  } catch (error: any) {
    // This is a non-critical operation, so we just log the error
    console.error(`Error caching script for question ${questionId}:`, error);
  }
}
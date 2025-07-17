
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

// Server-side caching to avoid repeated Firestore calls
const serverCache = new Map<string, any>();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * 🚀 OPTIMIZED: Server-side payload reduction
 * Fetches full documents, immediately strips large fields, sends lean objects to client
 */
export async function getTriviaQuestions(): Promise<TriviaQuestion[]> {
  try {
    // Check server-side cache first
    const cacheKey = 'trivia_questions_lean_v2';
    const cached = serverCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log('🎯 Server cache hit - returning cached lean questions');
      return cached.data;
    }

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
    const compressionRatio = ((totalOriginalSize - totalLeanSize) / totalOriginalSize * 100).toFixed(1);
    console.log(`📦 Payload optimization:
    - Original size: ${(totalOriginalSize / 1024).toFixed(1)}KB
    - Lean size: ${(totalLeanSize / 1024).toFixed(1)}KB  
    - Compression: ${compressionRatio}% smaller
    - Questions processed: ${leanQuestions.length}`);
    
    // Shuffle for randomness (server-side)
    const shuffledQuestions = leanQuestions.sort(() => 0.5 - Math.random());
    
    const endTime = performance.now();
    console.log(`⚡ Total processing time: ${Math.round(endTime - startTime)}ms`);
    
    // Cache the lean results server-side
    serverCache.set(cacheKey, {
      data: shuffledQuestions,
      timestamp: Date.now()
    });
    
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
    // Check server-side hint cache
    const hintCacheKey = `hint_${questionId}`;
    const cached = serverCache.get(hintCacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log(`💾 Server hint cache hit for ${questionId}`);
      return cached.data;
    }

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
      
      // Cache the hint data server-side
      serverCache.set(hintCacheKey, {
        data: hintData,
        timestamp: Date.now()
      });
      
      return hintData;
    }

    const fallback = { fallbackHint: "Arrr, this secret seems to have washed away..." };
    
    // Cache fallback too to prevent repeated failed lookups
    serverCache.set(hintCacheKey, {
      data: fallback,
      timestamp: Date.now()
    });
    
    return fallback;
    
  } catch (error: any) {
    console.error(`Error fetching hints for question ${questionId}:`, error);
    return { fallbackHint: "A mysterious force prevents the hint from appearing..." };
  }
}

/**
 * 🚀 NEW: Batch hint preloading for upcoming questions
 * Preloads hint data for next few questions to reduce perceived latency
 */
export async function preloadHintsForQuestions(questionIds: string[]): Promise<void> {
  try {
    const startTime = performance.now();
    
    // Filter out already cached hints
    const uncachedIds = questionIds.filter(id => {
      const cacheKey = `hint_${id}`;
      const cached = serverCache.get(cacheKey);
      return !cached || Date.now() - cached.timestamp >= CACHE_DURATION;
    });
    
    if (uncachedIds.length === 0) {
      console.log('✅ All hints already cached on server');
      return;
    }
    
    console.log(`🔄 Preloading ${uncachedIds.length} hints on server`);
    
    // Fetch hints in parallel (but don't block on completion)
    const preloadPromises = uncachedIds.map(id => 
      getQuestionHints(id).catch(err => {
        console.warn(`Preload failed for ${id}:`, err);
        return null;
      })
    );
    
    // Fire and forget - don't await
    Promise.all(preloadPromises).then((results) => {
      const successful = results.filter(r => r !== null).length;
      const endTime = performance.now();
      console.log(`✅ Preloaded ${successful}/${uncachedIds.length} hints in ${Math.round(endTime - startTime)}ms`);
    });
    
  } catch (error) {
    console.warn('Hint preloading failed:', error);
  }
}

/**
 * 🚀 NEW: Performance monitoring and cache management
 */
export function getTriviaServiceStats() {
  const cacheEntries = Array.from(serverCache.keys());
  const questionCacheEntries = cacheEntries.filter(key => key.startsWith('trivia_'));
  const hintCacheEntries = cacheEntries.filter(key => key.startsWith('hint_'));
  
  return {
    serverCacheSize: serverCache.size,
    questionCacheEntries: questionCacheEntries.length,
    hintCacheEntries: hintCacheEntries.length,
    cacheKeys: cacheEntries,
  };
}

export function clearTriviaServerCache() {
  const beforeSize = serverCache.size;
  serverCache.clear();
  console.log(`🧹 Server cache cleared (was ${beforeSize} entries)`);
}

/**
 * 🚀 NEW: Smart cache warming for common questions
 * Pre-warms the server cache with frequently accessed questions
 */
export async function warmServerCache(): Promise<void> {
  try {
    console.log('🔥 Warming server cache...');
    const startTime = performance.now();
    
    // Load a fresh set of questions to warm the cache
    await getTriviaQuestions();
    
    const endTime = performance.now();
    console.log(`🔥 Server cache warmed in ${Math.round(endTime - startTime)}ms`);
    
  } catch (error) {
    console.warn('Cache warming failed:', error);
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
    
    // Clear question cache to ensure new question appears
    const cacheKeys = Array.from(serverCache.keys());
    cacheKeys.forEach(key => {
      if (key.startsWith('trivia_')) {
        serverCache.delete(key);
      }
    });
    
    console.log(`✅ Added question ${newId} and cleared question cache`);
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
    
    // Update server-side hint cache if it exists
    const hintCacheKey = `hint_${questionId}`;
    const existingCache = serverCache.get(hintCacheKey);
    
    if (existingCache) {
      serverCache.set(hintCacheKey, {
        data: { ...existingCache.data, cachedPirateScript: script },
        timestamp: existingCache.timestamp
      });
      console.log(`🎯 Updated server cache for ${questionId} with new script`);
    }
    
  } catch (error: any) {
    console.error(`Error caching script for question ${questionId}:`, error);
  }
}

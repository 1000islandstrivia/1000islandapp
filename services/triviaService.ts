
'use server';
/**
 * @fileOverview A smart, server-side trivia service that balances performance and question variety.
 *
 * This service implements a multi-pool caching system to deliver fresh, non-repetitive
 * questions to users with sub-second load times.
 *
 * Key Features:
 * - Smart Question Pooling: Manages multiple pools of questions to ensure variety.
 * - User History Tracking: Remembers the last 50 questions a user has seen (client-side).
 * - Multiple Randomization Strategies: Uses different Firestore query strategies to avoid predictability.
 * - Background Refresh: Prepares a fresh pool of questions in the background while the user plays.
 * - Automatic Pool Rotation: Switches to a fresh pool when the variety of the current pool drops.
 */

import { db } from '@/lib/firebase';
import type { TriviaQuestion } from '@/lib/trivia-data';
import { collection, getDocs, query, startAt, orderBy, limit, doc, setDoc, getDoc } from 'firebase/firestore';

const TRIVIA_COLLECTION = 'triviaQuestions';
const TOTAL_QUESTIONS_IN_DB = 300; // Approximate total, for randomization
const POOL_SIZE = 60; // How many questions to hold in a server-side pool
const VARIETY_REFRESH_THRESHOLD = 0.7; // Refresh pool when 70% of it has been seen by the user

interface QuestionPool {
  questions: TriviaQuestion[];
  timestamp: number;
  strategyUsed: number;
}

// Server-side in-memory cache for question pools
let primaryPool: QuestionPool | null = null;
let backgroundPool: QuestionPool | null = null;
let isBackgroundLoading = false;

/**
 * Fetches a lean, random batch of questions from Firestore.
 * @param strategy - A number from 0 to 2 to select a fetching strategy.
 * @returns A promise that resolves to an array of lean TriviaQuestion objects.
 */
async function fetchFreshQuestionPool(strategy: number): Promise<TriviaQuestion[]> {
  const randomId = `TQ${100 + Math.floor(Math.random() * (TOTAL_QUESTIONS_IN_DB - 100))}`;
  
  let q;
  switch(strategy) {
    case 0: // Random start, forward
      q = query(collection(db, TRIVIA_COLLECTION), orderBy('id'), startAt(randomId), limit(POOL_SIZE));
      break;
    case 1: // Random start, backward (Note: Firestore doesn't support orderBy desc with startAt, so this is a variation)
       q = query(collection(db, TRIVIA_COLLECTION), orderBy('question'), startAt(`Question ${Math.floor(Math.random() * 20)}`), limit(POOL_SIZE));
       break;
    default: // Get first questions
      q = query(collection(db, TRIVIA_COLLECTION), orderBy('id'), limit(POOL_SIZE));
  }
  
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return [];

  // Map to lean objects, excluding large fields
  return querySnapshot.docs.map(docSnap => {
    const data = docSnap.data();
    return {
      id: data.id,
      question: data.question,
      options: data.options,
      answer: data.answer,
      storylineHintKey: data.storylineHintKey,
      fallbackHint: '', // Excluded for performance
      cachedPirateScript: undefined, // Excluded for performance
    };
  });
}

/**
 * The main function to get trivia questions for a game.
 * It uses smart caching, user history, and background loading to provide a fast and varied experience.
 * @param userQuestionHistory - An array of question IDs the user has recently seen.
 * @returns A promise that resolves to an array of TriviaQuestion for a new game.
 */
export async function getTriviaQuestions(userQuestionHistory: string[] = []): Promise<TriviaQuestion[]> {
  const now = Date.now();

  // If primary pool is empty or stale, create it
  if (!primaryPool) {
    console.log('📦 No primary pool. Creating a fresh one...');
    const strategy = Math.floor(Math.random() * 3);
    primaryPool = {
      questions: await fetchFreshQuestionPool(strategy),
      timestamp: now,
      strategyUsed: strategy,
    };
    console.log(`✅ New primary pool created with ${primaryPool.questions.length} questions.`);
  }

  // Check if we should swap with a ready background pool
  const seenInPrimary = primaryPool.questions.filter(q => userQuestionHistory.includes(q.id));
  const varietyScore = 1 - (seenInPrimary.length / (primaryPool.questions.length || 1));
  
  if (varietyScore < (1 - VARIETY_REFRESH_THRESHOLD) && backgroundPool) {
    console.log(`🔄 Variety low (${(varietyScore*100).toFixed(0)}%). Swapping to background pool.`);
    primaryPool = backgroundPool;
    backgroundPool = null; // Background pool is now the primary
  }

  // Trigger background refresh if needed
  if (!backgroundPool && !isBackgroundLoading) {
    isBackgroundLoading = true;
    console.log('⏳ Triggering background refresh for a new question pool...');
    let nextStrategy = Math.floor(Math.random() * 3);
    if (primaryPool && nextStrategy === primaryPool.strategyUsed) {
      nextStrategy = (nextStrategy + 1) % 3; // Ensure a different strategy
    }
    
    fetchFreshQuestionPool(nextStrategy).then(newQuestions => {
      backgroundPool = { questions: newQuestions, timestamp: Date.now(), strategyUsed: nextStrategy };
      console.log(`✅ Background pool ready with ${newQuestions.length} questions.`);
      isBackgroundLoading = false;
    }).catch(err => {
      console.error("❌ Background pool refresh failed:", err);
      isBackgroundLoading = false;
    });
  }

  // Select questions for the user, avoiding their recent history
  const freshQuestions = primaryPool.questions.filter(q => !userQuestionHistory.includes(q.id));
  console.log(`🎯 Selecting 10 fresh questions (${freshQuestions.length} available from pool of ${primaryPool.questions.length}).`);
  
  return [...freshQuestions].sort(() => 0.5 - Math.random()).slice(0, 10);
}

// The hint fetching can remain largely the same, but we can add a simple cache
const hintCache = new Map<string, { hint: any; timestamp: number }>();
const HINT_CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export async function getQuestionHints(questionId: string): Promise<{ fallbackHint: string; cachedPirateScript?: string }> {
  const now = Date.now();
  if (hintCache.has(questionId) && (now - hintCache.get(questionId)!.timestamp < HINT_CACHE_DURATION_MS)) {
    return hintCache.get(questionId)!.hint;
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
      hintCache.set(questionId, { hint: hintData, timestamp: now });
      return hintData;
    }
    return { fallbackHint: "Arrr, this secret seems to have washed away..." };
  } catch (error) {
    console.error(`Error fetching hint for ${questionId}:`, error);
    return { fallbackHint: "A mysterious force prevents the hint from appearing..." };
  }
}

export async function preloadHintsForQuestions(questionIds: string[]): Promise<void> {
    const idsToFetch = questionIds.filter(id => !hintCache.has(id));
    if (idsToFetch.length === 0) return;
    try {
        await Promise.all(idsToFetch.map(id => getQuestionHints(id)));
    } catch (error) {
        console.warn("Hint preloading failed for some questions:", error);
    }
}

// --- Admin & Monitoring Functions ---

/**
 * Returns statistics about the current state of the question pools.
 * This is a server-callable function for the admin dashboard.
 */
export async function getVarietyStats(): Promise<{ poolSize: number; poolAge: number; poolQuestionIds: string[] }> {
  if (!primaryPool) {
    return { poolSize: 0, poolAge: 0, poolQuestionIds: [] };
  }
  
  const poolAge = Math.round((Date.now() - primaryPool.timestamp) / 60000); // in minutes
  
  return {
    poolSize: primaryPool.questions.length,
    poolAge: poolAge,
    poolQuestionIds: primaryPool.questions.map(q => q.id),
  };
}
    
/**
 * Adds a new trivia question and invalidates server cache.
 */
export async function addTriviaQuestion(questionData: Omit<TriviaQuestion, 'id'>): Promise<string> {
  try {
    const newId = `TQ${Date.now()}`;
    const questionWithId = { ...questionData, id: newId };
    const questionDocRef = doc(db, TRIVIA_COLLECTION, newId);
    await setDoc(questionDocRef, questionWithId);

    // Invalidate server pools
    primaryPool = null;
    backgroundPool = null;
    console.log('Question added. Server pools invalidated.');
    
    return newId;
  } catch (error: any) {
    console.error("Error adding trivia question:", error);
    throw new Error(`Could not add question. Original error: ${error.message || String(error)}`);
  }
}

/**
 * Caches a generated pirate script in both Firestore and the in-memory hint cache.
 */
export async function cachePirateScriptForQuestion(questionId: string, script: string): Promise<void> {
  try {
    const questionDocRef = doc(db, TRIVIA_COLLECTION, questionId);
    await setDoc(questionDocRef, { cachedPirateScript: script }, { merge: true });
    
    // Update in-memory cache if it exists
    if (hintCache.has(questionId)) {
        const cachedHint = hintCache.get(questionId)!.hint;
        cachedHint.cachedPirateScript = script;
        hintCache.set(questionId, { hint: cachedHint, timestamp: Date.now() });
    }
  } catch (error: any) {
    console.error(`Error caching script for ${questionId}:`, error);
  }
}


'use server';
/**
 * @fileOverview Service for managing trivia questions.
 *
 * - getTriviaQuestions - Fetches a random subset of trivia questions from Firestore.
 * - getQuestionHints - Fetches the hint and script for a single question.
 * - addTriviaQuestion - Adds a new trivia question to Firestore.
 * - cachePirateScriptForQuestion - Caches a generated pirate script for a question.
 */

import { db } from '@/lib/firebase';
import type { TriviaQuestion } from '@/lib/trivia-data';
import { collection, getDocs, query, addDoc, doc, setDoc, limit, getDoc } from 'firebase/firestore';

const TRIVIA_COLLECTION = 'triviaQuestions';
const QUESTIONS_TO_FETCH = 30; // Fetch a bit more than needed for a single game for variety

/**
 * Fetches a random subset of trivia questions from Firestore, but only essential, small fields.
 * This is optimized to be fast and not download large hint/script fields.
 * @returns A promise that resolves to an array of partial TriviaQuestion objects.
 */
export async function getTriviaQuestions(): Promise<TriviaQuestion[]> {
  try {
    const questionsQuery = query(
      collection(db, TRIVIA_COLLECTION),
      limit(QUESTIONS_TO_FETCH * 2) // Fetch more to ensure randomness after filtering
    );
    
    const querySnapshot = await getDocs(questionsQuery);

    if (querySnapshot.empty) {
      console.warn("The 'triviaQuestions' collection is empty. Please run the database seeder.");
      return [];
    }

    // Map the full documents to smaller objects, excluding large fields
    const allQuestions: TriviaQuestion[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      allQuestions.push({
          id: data.id,
          question: data.question,
          options: data.options,
          answer: data.answer,
          storylineHintKey: data.storylineHintKey,
          // Explicitly exclude large fields from the payload sent to the client
          fallbackHint: '', 
          cachedPirateScript: undefined,
      } as TriviaQuestion);
    });

    // Shuffle the array of all questions
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    
    // Return a slice of the shuffled array
    return shuffled.slice(0, QUESTIONS_TO_FETCH);

  } catch (error: any) {
    console.error("Error fetching optimized trivia questions from Firestore:", error);
    throw new Error(`Could not fetch trivia questions. Original error: ${error.message || String(error)}`);
  }
}

/**
 * Fetches the large hint fields for a single question on-demand.
 * @param questionId The ID of the question to fetch hints for.
 * @returns A promise that resolves to an object with hint and script data.
 */
export async function getQuestionHints(questionId: string): Promise<{ fallbackHint: string; cachedPirateScript?: string }> {
  try {
    const docRef = doc(db, TRIVIA_COLLECTION, questionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        fallbackHint: data.fallbackHint || "Arrr, the river keeps its secrets close.",
        cachedPirateScript: data.cachedPirateScript,
      };
    }

    console.warn(`Could not find hint data for question ID: ${questionId}`);
    return { fallbackHint: "Arrr, this secret seems to have washed away..." };
  } catch (error: any) {
    console.error(`Error fetching hints for question ${questionId}:`, error);
    // Return a fallback object so the game doesn't crash.
    return { fallbackHint: "A mysterious force prevents the hint from appearing..." };
  }
}


/**
 * Adds a new trivia question to the Firestore database using a custom ID.
 * @param questionData The data for the new question, without an ID.
 * @returns The ID of the newly created question document.
 */
export async function addTriviaQuestion(questionData: Omit<TriviaQuestion, 'id'>): Promise<string> {
  try {
    const newId = `TQ${Date.now()}`;
    const questionWithId = { ...questionData, id: newId };
    
    const questionDocRef = doc(db, TRIVIA_COLLECTION, newId);
    await setDoc(questionDocRef, questionWithId);
    
    return newId;

  } catch (error: any) {
    console.error("Error adding trivia question to Firestore:", error);
    throw new Error(`Could not add question. Original error: ${error.message || String(error)}`);
  }
}

/**
 * Caches a generated pirate script for a specific trivia question in Firestore.
 * @param questionId The ID of the question to update.
 * @param script The pirate script to cache.
 * @returns A promise that resolves when the cache is updated.
 */
export async function cachePirateScriptForQuestion(questionId: string, script: string): Promise<void> {
    try {
        const questionDocRef = doc(db, TRIVIA_COLLECTION, questionId);
        await setDoc(questionDocRef, { cachedPirateScript: script }, { merge: true });
    } catch (error: any) {
        // Log the error but don't throw, as this is a non-critical background task.
        console.error(`Error caching script for question ${questionId}:`, error);
    }
}

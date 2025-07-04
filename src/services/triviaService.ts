
'use server';
/**
 * @fileOverview Service for managing trivia questions.
 *
 * - getTriviaQuestions - Fetches trivia questions from Firestore.
 * - addTriviaQuestion - Adds a new trivia question to Firestore.
 * - cachePirateScriptForQuestion - Caches a generated pirate script for a question.
 */

import { db } from '@/lib/firebase';
import type { TriviaQuestion } from '@/lib/trivia-data';
import { collection, getDocs, query, addDoc, doc, setDoc } from 'firebase/firestore';

const TRIVIA_COLLECTION = 'triviaQuestions';

/**
 * Fetches all trivia questions from the Firestore database.
 * @returns A promise that resolves to an array of TriviaQuestion.
 */
export async function getTriviaQuestions(): Promise<TriviaQuestion[]> {
  try {
    const questionsQuery = query(collection(db, TRIVIA_COLLECTION));
    const querySnapshot = await getDocs(questionsQuery);

    if (querySnapshot.empty) {
      console.warn("The 'triviaQuestions' collection is empty. Please run the database seeder.");
      return [];
    }

    const questions: TriviaQuestion[] = [];
    querySnapshot.forEach((doc) => {
      questions.push(doc.data() as TriviaQuestion);
    });

    return questions;
  } catch (error: any) {
    console.error("Error fetching trivia questions from Firestore:", error);
    throw new Error(`Could not fetch trivia questions. Original error: ${error.message || String(error)}`);
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

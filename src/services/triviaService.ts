
'use server';
/**
 * @fileOverview Service for managing trivia questions.
 *
 * - getTriviaQuestions - Fetches trivia questions from Firestore.
 */

import { db } from '@/lib/firebase';
import type { TriviaQuestion } from '@/lib/trivia-data';
import { collection, getDocs, query } from 'firebase/firestore';

/**
 * Fetches trivia questions from the 'triviaQuestions' collection in Firestore.
 * @returns A promise that resolves to an array of TriviaQuestion.
 */
export async function getTriviaQuestions(): Promise<TriviaQuestion[]> {
  try {
    const q = query(collection(db, 'triviaQuestions'));
    const querySnapshot = await getDocs(q);
    const questions: TriviaQuestion[] = [];
    querySnapshot.forEach((doc) => {
      // The doc.id is the unique ID for the question document.
      // We spread the rest of the data from the document.
      questions.push({ id: doc.id, ...doc.data() } as TriviaQuestion);
    });

    if (questions.length === 0) {
        console.warn("Heads up: The 'triviaQuestions' collection in Firestore is empty. The game won't have any questions until you add some.");
    }

    return questions;
  } catch (error: any) {
    console.error("Error fetching trivia questions from Firestore:", error);
    throw new Error(`Could not fetch trivia questions. Original error: ${error.message || String(error)}`);
  }
}

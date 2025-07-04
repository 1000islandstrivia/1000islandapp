
'use server';
/**
 * @fileOverview Service for managing trivia questions.
 *
 * - getTriviaQuestions - Fetches trivia questions from Firestore.
 */

import { db } from '@/lib/firebase';
import type { TriviaQuestion } from '@/lib/trivia-data';
import { collection, getDocs, query } from 'firebase/firestore';

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

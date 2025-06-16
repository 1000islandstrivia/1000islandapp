
'use server';
/**
 * @fileOverview Service for managing trivia questions.
 *
 * - getTriviaQuestions - Fetches trivia questions.
 */

import { triviaQuestions as allTriviaQuestionsFromData } from '@/lib/trivia-data';
import type { TriviaQuestion } from '@/lib/trivia-data';

// TODO: Implement fetching questions from Firestore
// For now, this service returns questions from the local data file.
// You should replace this with a Firestore query.
// Example Firestore structure:
// Collection: 'triviaQuestions'
// Document: { id: string, question: string, options: string[], answer: string, storylineHintKey: string, category?: string, difficulty?: string }

/**
 * Fetches trivia questions.
 * @returns A promise that resolves to an array of TriviaQuestion.
 */
export async function getTriviaQuestions(): Promise<TriviaQuestion[]> {
  try {
    // Simulating an async fetch, replace with actual Firestore call
    // For example:
    // const q = query(collection(db, 'triviaQuestions'));
    // const querySnapshot = await getDocs(q);
    // const questions: TriviaQuestion[] = [];
    // querySnapshot.forEach((doc) => {
    //   questions.push({ id: doc.id, ...doc.data() } as TriviaQuestion);
    // });
    // return questions;

    // For now, returning local data
    return new Promise((resolve) => {
      setTimeout(() => { // Simulate network delay
        resolve(allTriviaQuestionsFromData);
      }, 500);
    });
  } catch (error: any) {
    console.error("Error fetching trivia questions:", error);
    // In a real scenario, you might want to throw the error or return a default set / empty array
    throw new Error(`Could not fetch trivia questions. Original error: ${error.message || String(error)}`);
  }
}

    
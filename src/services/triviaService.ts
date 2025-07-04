
'use server';
/**
 * @fileOverview Service for managing trivia questions.
 *
 * - getTriviaQuestions - Fetches trivia questions from a local JSON file.
 */

import type { TriviaQuestion } from '@/lib/trivia-data';
import triviaQuestionsData from '../../data/trivia_questions.json';

/**
 * Fetches trivia questions directly from a local JSON file.
 * This allows the app to function without requiring a database seeding step,
 * which is convenient for environments like Firebase Studio.
 * @returns A promise that resolves to an array of TriviaQuestion.
 */
export async function getTriviaQuestions(): Promise<TriviaQuestion[]> {
  // We wrap the direct import in a Promise.resolve to maintain the async function signature,
  // ensuring that components calling this function don't need to be changed.
  return Promise.resolve(triviaQuestionsData as TriviaQuestion[]);
}

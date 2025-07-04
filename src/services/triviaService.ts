
'use server';
/**
 * @fileOverview Service for managing trivia questions.
 *
 * - getTriviaQuestions - Fetches trivia questions from Firestore.
 * - addTriviaQuestion - Adds a new trivia question to Firestore.
 */

import { db } from '@/lib/firebase';
import type { TriviaQuestion } from '@/lib/trivia-data';
import { collection, getDocs, query, addDoc } from 'firebase/firestore';

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
 * Adds a new trivia question to the Firestore database.
 * @param questionData The data for the new question, without an ID.
 * @returns The ID of the newly created question document.
 */
export async function addTriviaQuestion(questionData: Omit<TriviaQuestion, 'id'>): Promise<string> {
  try {
    const newId = `TQ${Date.now()}`;
    const questionWithId = { ...questionData, id: newId };
    
    // addDoc creates a document with an auto-generated ID, but we want to control it.
    // Instead we will use setDoc with a new document reference.
    // For simplicity with server actions and returning the ID, we'll use addDoc and let Firestore handle it,
    // then update our own data structure. However, it's often better to control the ID.
    // Let's stick to the prompt of adding a question.
    // A better approach is to generate our own ID and use setDoc.
    
    // We will generate an ID and add it to the document before saving.
    const collectionRef = collection(db, TRIVIA_COLLECTION);
    const docRef = await addDoc(collectionRef, questionWithId);
    
    // Firestore will actually generate its own ID. We return our generated ID for consistency.
    // The document in firestore will have BOTH a Firestore ID and our custom `id` field.
    return questionWithId.id;

  } catch (error: any) {
    console.error("Error adding trivia question to Firestore:", error);
    throw new Error(`Could not add question. Original error: ${error.message || String(error)}`);
  }
}

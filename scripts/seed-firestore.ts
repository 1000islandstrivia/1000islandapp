
/**
 * @fileOverview A script to seed the Firestore database with trivia questions.
 * This can be run from the command line with `npm run db:seed` or triggered by a server action.
 * This script will check if the 'triviaQuestions' collection is empty before seeding
 * to prevent creating duplicate data.
 */

import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import triviaQuestions from '../data/trivia_questions.json';

const COLLECTION_NAME = 'triviaQuestions';

/**
 * Seeds the Firestore database with trivia questions from the local JSON file.
 * @returns A promise that resolves to an object with success status and a message.
 */
export async function seedDatabase(): Promise<{ success: boolean; message: string }> {
  console.log('Starting Firestore seeding process...');
  
  try {
    const questionsCollection = collection(db, COLLECTION_NAME);
    
    // 1. Check if the collection is already populated
    console.log(`Checking if '${COLLECTION_NAME}' collection is empty...`);
    const snapshot = await getDocs(questionsCollection);
    
    if (!snapshot.empty) {
      const message = `The '${COLLECTION_NAME}' collection is not empty (${snapshot.size} documents found). Seeding is not required.`;
      console.log(message);
      return { success: true, message: message };
    }
    
    console.log('Collection is empty. Proceeding with seeding...');
    
    // 2. If empty, loop through the JSON data and add each question
    let count = 0;
    for (const question of triviaQuestions) {
      count++;
      console.log(`Adding question ${count} of ${triviaQuestions.length}: "${question.question.substring(0, 40)}..."`);
      await addDoc(questionsCollection, question);
    }
    
    const successMessage = `✅ Firestore seeding completed successfully! ${triviaQuestions.length} questions have been added to the '${COLLECTION_NAME}' collection.`;
    console.log(successMessage);
    return { success: true, message: successMessage };
    
  } catch (error: any) {
    const errorMessage = `❌ An error occurred during the seeding process: ${error.message}`;
    console.error(errorMessage);
    console.error(error);
    console.log('\nPlease ensure your Firebase configuration in src/lib/firebaseConfig.ts is correct and you have read/write permissions.');
    return { success: false, message: errorMessage };
  }
}


/**
 * @fileOverview A script to seed the Firestore database with trivia questions.
 * This can be run from the command line with `npm run db:seed` or triggered by a server action.
 * This script will check for existing questions and only add new ones from the data file.
 */

import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query } from 'firebase/firestore';
import triviaQuestions from '../data/trivia_questions.json';

const COLLECTION_NAME = 'triviaQuestions';

/**
 * Seeds the Firestore database with new trivia questions from the local JSON file.
 * @returns A promise that resolves to an object with success status and a message.
 */
export async function seedDatabase(): Promise<{ success: boolean; message: string }> {
  console.log('Starting Firestore seeding process...');
  
  try {
    const questionsCollection = collection(db, COLLECTION_NAME);
    
    // 1. Check for existing questions to avoid duplicates
    console.log(`Checking for existing questions in '${COLLECTION_NAME}'...`);
    const q = query(questionsCollection);
    const snapshot = await getDocs(q);
    const existingQuestionIds = new Set(snapshot.docs.map(doc => doc.data().id));
    console.log(`Found ${existingQuestionIds.size} existing questions in the database.`);

    // 2. Filter out questions that already exist
    const newQuestions = triviaQuestions.filter(q => !existingQuestionIds.has(q.id));

    if (newQuestions.length === 0) {
      const message = `✅ All ${triviaQuestions.length} questions from the data file already exist in the database. No new questions were added. Total questions: ${existingQuestionIds.size}.`;
      console.log(message);
      return { success: true, message: message };
    }
    
    console.log(`Found ${newQuestions.length} new questions to add.`);
    
    // 3. Loop through the new questions and add each one
    let count = 0;
    for (const question of newQuestions) {
      count++;
      console.log(`Adding new question ${count} of ${newQuestions.length}: "${question.id} - ${question.question.substring(0, 30)}..."`);
      await addDoc(questionsCollection, question);
    }
    
    const finalCount = existingQuestionIds.size + newQuestions.length;
    const successMessage = `✅ Firestore seeding completed successfully! ${newQuestions.length} new questions have been added. The '${COLLECTION_NAME}' collection now contains a total of ${finalCount} questions.`;
    console.log(successMessage);
    return { success: true, message: successMessage };
    
  } catch (error: any) {
    const errorMessage = `❌ An error occurred during the seeding process: ${error.message}`;
    console.error(errorMessage);
    console.error(error);
    console.log('\nPlease ensure your Firebase configuration in src/lib/firebaseConfig.ts is correct and you have read/write permissions for the collection.');
    return { success: false, message: errorMessage };
  }
}

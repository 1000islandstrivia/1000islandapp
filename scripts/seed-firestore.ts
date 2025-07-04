
/**
 * @fileOverview A one-time script to seed the Firestore database with trivia questions.
 * To run this script, use the command: `npm run db:seed`
 * This script will check if the 'triviaQuestions' collection is empty before seeding
 * to prevent creating duplicate data.
 */

import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import triviaQuestions from '../data/trivia_questions.json';

const COLLECTION_NAME = 'triviaQuestions';

/**
 * Seeds the Firestore database with trivia questions from the local JSON file.
 */
async function seedDatabase() {
  console.log('Starting Firestore seeding process...');
  
  try {
    const questionsCollection = collection(db, COLLECTION_NAME);
    
    // 1. Check if the collection is already populated
    console.log(`Checking if '${COLLECTION_NAME}' collection is empty...`);
    const snapshot = await getDocs(questionsCollection);
    
    if (!snapshot.empty) {
      console.log(`The '${COLLECTION_NAME}' collection is not empty (${snapshot.size} documents found).`);
      console.log('Seeding is not required. Exiting script.');
      return;
    }
    
    console.log('Collection is empty. Proceeding with seeding...');
    
    // 2. If empty, loop through the JSON data and add each question
    let count = 0;
    for (const question of triviaQuestions) {
      count++;
      console.log(`Adding question ${count} of ${triviaQuestions.length}: "${question.question.substring(0, 40)}..."`);
      await addDoc(questionsCollection, question);
    }
    
    console.log('\n✅ Firestore seeding completed successfully!');
    console.log(`${triviaQuestions.length} questions have been added to the '${COLLECTION_NAME}' collection.`);
    
  } catch (error) {
    console.error('\n❌ An error occurred during the seeding process:');
    console.error(error);
    console.log('\nPlease ensure your Firebase configuration in src/lib/firebaseConfig.ts is correct and you have read/write permissions.');
  }
}

// Execute the seeding function
seedDatabase().then(() => {
    // The script will exit automatically.
    // In some environments, you might need process.exit(0) but it's often not necessary.
}).catch(() => {
    // Error is already logged in the function.
});

    
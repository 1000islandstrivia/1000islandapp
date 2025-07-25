
/**
 * @fileOverview A script to seed the Firestore database with trivia questions.
 * This can be run from the command line with `npm run db:seed` or triggered by a server action.
 * This script will check for existing questions and only add new ones from the data file.
 */

import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, query, deleteDoc } from 'firebase/firestore';
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
    const allFileQuestions = triviaQuestions;
    const newQuestions = allFileQuestions.filter(q => !existingQuestionIds.has(q.id));
    const duplicateQuestionsInFile = allFileQuestions.length - newQuestions.length;

    if (newQuestions.length === 0) {
      const message = `✅ Database is up to date. All ${allFileQuestions.length} questions from the data file already exist in the database. Total questions: ${existingQuestionIds.size}.`;
      console.log(message);
      return { success: true, message: message };
    }
    
    console.log(`Found ${newQuestions.length} new questions to add.`);
    if (duplicateQuestionsInFile > 0) {
        console.log(`(${duplicateQuestionsInFile} questions from the file were already present in the database and will be skipped.)`);
    }
    
    // 3. Loop through the new questions and add each one using its 'id' as the document ID
    let count = 0;
    for (const question of newQuestions) {
      count++;
      console.log(`Adding new question ${count} of ${newQuestions.length}: "${question.id} - ${question.question.substring(0, 30)}..."`);
      const questionDocRef = doc(db, COLLECTION_NAME, question.id);
      await setDoc(questionDocRef, question);
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

/**
 * Scans the triviaQuestions collection and removes documents with duplicate 'question' fields.
 * @returns A promise that resolves to an object with success status and a message.
 */
export async function removeDuplicateQuestions(): Promise<{ success: boolean; message: string }> {
  console.log('Starting duplicate question removal process...');
  try {
    const questionsCollection = collection(db, 'triviaQuestions');
    const snapshot = await getDocs(query(questionsCollection));

    if (snapshot.empty) {
      return { success: true, message: 'Collection is empty. No duplicates to remove.' };
    }

    const seenQuestions = new Map<string, string>(); // Map question text to first doc ID seen
    const docsToDelete: string[] = []; // Array of doc IDs to delete

    for (const docSnap of snapshot.docs) {
      const questionText = docSnap.data().question;
      const docId = docSnap.id;

      if (seenQuestions.has(questionText)) {
        // This is a duplicate.
        docsToDelete.push(docId);
        console.log(`Marking duplicate for deletion: "${questionText.substring(0, 50)}..." (ID: ${docId})`);
      } else {
        // First time seeing this question.
        seenQuestions.set(questionText, docId);
      }
    }

    if (docsToDelete.length === 0) {
      const message = `✅ No duplicate questions found. Your database is clean! Total questions: ${snapshot.size}.`;
      console.log(message);
      return { success: true, message };
    }

    console.log(`Found ${docsToDelete.length} duplicates. Deleting now...`);
    for (const docId of docsToDelete) {
      await deleteDoc(doc(db, 'triviaQuestions', docId));
    }
    
    const finalCount = snapshot.size - docsToDelete.length;
    const successMessage = `✅ Successfully removed ${docsToDelete.length} duplicate questions. Your database now contains ${finalCount} unique questions.`;
    console.log(successMessage);
    return { success: true, message: successMessage };

  } catch (error: any) {
    const errorMessage = `❌ An error occurred during the deduplication process: ${error.message}`;
    console.error(errorMessage, error);
    return { success: false, message: errorMessage };
  }
}

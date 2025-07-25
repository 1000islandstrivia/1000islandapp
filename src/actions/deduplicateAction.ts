
'use server';

import { removeDuplicateQuestions } from '../../scripts/seed-firestore';

/**
 * A server action that triggers the Firestore database deduplication process.
 * Only allows the user 'Dan' to execute this administrative action.
 * @param username The name of the user attempting to run the action.
 * @returns A promise that resolves to an object with success status and a message.
 */
export async function runDeduplication(username: string): Promise<{ success: boolean; message: string }> {
  // Security check: Only allow the user 'Dan' to run this.
  if (username.toLowerCase() !== 'dan') {
    const message = "Permission denied. You are not authorized to perform this action.";
    console.warn(message, { user: username });
    return { success: false, message: message };
  }

  console.log(`Server action 'runDeduplication' triggered by authorized user: ${username}.`);
  const result = await removeDuplicateQuestions();
  console.log("Server action 'runDeduplication' completed with status:", result.success);
  return result;
}

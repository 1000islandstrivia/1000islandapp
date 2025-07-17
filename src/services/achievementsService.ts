
'use server';
/**
 * @fileOverview Service for managing achievement data.
 * NOTE: Currently, this is a placeholder service. It returns the master list of
 * achievements and does not yet track user-specific progress on the server.
 * This will be expanded upon in future development.
 */

import { achievements as allAchievementsData, type Achievement } from '@/lib/trivia-data';

/**
 * Fetches the list of achievements for a given user.
 *
 * @param username - The username of the user.
 * @returns A promise that resolves to an array of Achievement objects.
 *
 * @todo Implement server-side storage and retrieval of user achievement progress.
 * For now, it returns the master list with default 'unlocked' status, which
 * means only achievements marked as unlocked by default in trivia-data.ts will appear unlocked.
 * The client-side localStorage implementation was removed in the refactor to a server component.
 */
export async function getAchievementsForUser(username: string): Promise<Achievement[]> {
  // This is a placeholder. In a real application, you would fetch the user's
  // specific progress from Firestore or another database.
  // For now, we return the master list. The client would have to handle UI state
  // if it were a client component, but as a server component, this is the data we have.
  console.log(`Fetching achievements for ${username}. Note: Server-side progress tracking is not yet implemented.`);
  
  return allAchievementsData;
}

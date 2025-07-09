
'use server';
/**
 * @fileOverview Service for managing leaderboard data in Firestore.
 *
 * - getLeaderboard - Fetches top leaderboard entries.
 * - updateUserScore - Updates or creates a user's score on the leaderboard.
 * - getUserLeaderboardEntry - Fetches a single user's leaderboard entry.
 */

import { db } from '@/lib/firebase';
import type { LeaderboardEntry } from '@/lib/trivia-data';
import { playerRanks, getRankByScore } from '@/lib/trivia-data'; // Import ranks and helper
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  setDoc,
  getDoc,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';

const LEADERBOARD_COLLECTION = 'leaderboard';
const LEADERBOARD_LIMIT = 25;

/**
 * Fetches the top leaderboard entries from Firestore.
 * @returns A promise that resolves to an array of LeaderboardEntry.
 */
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const q = query(
      collection(db, LEADERBOARD_COLLECTION),
      orderBy('score', 'desc'),
      orderBy('lastUpdated', 'desc'),
      limit(LEADERBOARD_LIMIT)
    );
    const querySnapshot = await getDocs(q);
    const leaderboard: LeaderboardEntry[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      leaderboard.push({
        id: docSnap.id,
        name: data.name,
        email: data.email,
        score: data.score,
        rankTitle: data.rankTitle || getRankByScore(data.score).title,
        avatar: data.avatar,
        lastUpdated: (data.lastUpdated as Timestamp)?.toDate()
      } as LeaderboardEntry);
    });
    return leaderboard.map((entry, index) => ({ ...entry, rank: index + 1 }));
  } catch (error: any) {
    console.error("Error fetching leaderboard:", error);
    throw new Error(`Could not fetch leaderboard data. Original error: ${error.message || String(error)}`);
  }
}

/**
 * Updates a user's score on the leaderboard in Firestore by adding the score from the current game.
 * Ensures the total score does not go below zero.
 * Also updates the user's rank title based on the new total score.
 * If an email is provided, it will be saved or updated.
 * @param userId - The user's unique ID (username).
 * @param username - The user's display name.
 * @param scoreEarnedThisGame - The score achieved by the user in the current game session (can be negative).
 * @param email - Optional email address of the user.
 * @returns A promise that resolves when the update is complete.
 */
export async function updateUserScore(userId: string, username: string, scoreEarnedThisGame: number, email?: string): Promise<void> {
  try {
    const userDocRef = doc(db, LEADERBOARD_COLLECTION, userId);
    const userDocSnap = await getDoc(userDocRef);

    const userAvatar = `https://placehold.co/40x40.png?text=${username.substring(0, 2).toUpperCase()}`;
    let newTotalScore: number;
    let existingEmail: string | undefined = undefined;

    if (userDocSnap.exists()) {
      const currentData = userDocSnap.data();
      const currentTotalScore = currentData.score || 0;
      newTotalScore = currentTotalScore + scoreEarnedThisGame;
      existingEmail = currentData.email;
    } else {
      newTotalScore = scoreEarnedThisGame;
    }

    newTotalScore = Math.max(0, newTotalScore);
    const finalRank = getRankByScore(newTotalScore);

    const dataToSet: Partial<LeaderboardEntry & { lastUpdated: any }> = {
      name: username,
      score: newTotalScore,
      rankTitle: finalRank.title,
      avatar: userAvatar,
      lastUpdated: serverTimestamp(),
    };

    // Preserve existing email if new one isn't provided, otherwise use new one
    dataToSet.email = email || existingEmail;
    
    // If it's a new user (no existing email) and no new email is provided during an update (e.g. guest play), don't set email.
    // This case might not be hit often with current registration flow, but good for robustness.
    if (!existingEmail && !email) {
      delete dataToSet.email;
    }


    await setDoc(userDocRef, dataToSet, { merge: true });

  } catch (error: any) {
    console.error("Error updating user score:", error);
    throw new Error(`Could not update user score. Original error: ${error.message || String(error)}`);
  }
}

/**
 * Fetches a single user's leaderboard entry from Firestore for login validation.
 * Throws an error if the user is not found or not fully registered (lacks an email).
 * An exception is made for the admin user 'dan'.
 * @param userId - The user's unique ID (username, expected to be lowercase).
 * @returns A promise that resolves to the LeaderboardEntry.
 * @throws Error if user not found or not fully registered.
 */
export async function getUserLeaderboardEntry(userId: string): Promise<LeaderboardEntry> {
  try {
    const userDocRef = doc(db, LEADERBOARD_COLLECTION, userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      // For a user to be considered "registered" for login, they must have an email.
      // We make an exception for the admin user 'dan'.
      if (!data.email && userId !== 'dan') {
        throw new Error("User not found or not fully registered. Please register an account.");
      }
      const score = data.score || 0;
      const displayScore = Math.max(0, score); // Ensure score is not negative
      const rankTitle = data.rankTitle || getRankByScore(displayScore).title;
      return {
        id: userDocSnap.id,
        name: data.name,
        email: data.email, // Email can be undefined for the admin
        score: displayScore,
        rankTitle: rankTitle,
        avatar: data.avatar,
        lastUpdated: (data.lastUpdated as Timestamp)?.toDate(),
      } as LeaderboardEntry;
    } else {
      throw new Error("User not found. Please check your username or register for an account.");
    }
  } catch (error: any) {
    // Re-throw the error to be handled by the calling function (useAuth)
    throw error;
  }
}

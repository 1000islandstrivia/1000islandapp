'use server';
/**
 * @fileOverview Service for managing leaderboard data in Firestore.
 *
 * - getLeaderboard - Fetches top leaderboard entries.
 * - updateUserScore - Updates or creates a user's score on the leaderboard.
 */

import { db } from '@/lib/firebase';
import type { LeaderboardEntry } from '@/lib/trivia-data';
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
const LEADERBOARD_LIMIT = 25; // How many top scores to fetch

/**
 * Fetches the top leaderboard entries from Firestore.
 * @returns A promise that resolves to an array of LeaderboardEntry.
 */
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const q = query(
      collection(db, LEADERBOARD_COLLECTION),
      orderBy('score', 'desc'),
      orderBy('lastUpdated', 'desc'), // Secondary sort by time for tie-breaking
      limit(LEADERBOARD_LIMIT)
    );
    const querySnapshot = await getDocs(q);
    const leaderboard: LeaderboardEntry[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      leaderboard.push({
        id: doc.id, // User's username serves as document ID
        name: data.name,
        score: data.score,
        avatar: data.avatar,
        // lastUpdated: (data.lastUpdated as Timestamp)?.toDate() // Optional: if you need to display it
      } as LeaderboardEntry);
    });
    // Add rank to each entry
    return leaderboard.map((entry, index) => ({ ...entry, rank: index + 1 }));
  } catch (error: any) {
    console.error("Error fetching leaderboard:", error);
    // Throw a more specific error message
    throw new Error(`Could not fetch leaderboard data. Original error: ${error.message || String(error)}`);
  }
}

/**
 * Updates a user's score on the leaderboard in Firestore.
 * Only updates if the new score is higher or if the user is new.
 * @param userId - The user's unique ID (username).
 * @param username - The user's display name.
 * @param newScore - The new score achieved by the user.
 * @returns A promise that resolves when the update is complete.
 */
export async function updateUserScore(userId: string, username: string, newScore: number): Promise<void> {
  try {
    const userDocRef = doc(db, LEADERBOARD_COLLECTION, userId);
    const userDocSnap = await getDoc(userDocRef);

    const userAvatar = `https://placehold.co/40x40.png?text=${username.substring(0, 2).toUpperCase()}`;

    if (userDocSnap.exists()) {
      const currentData = userDocSnap.data();
      if (newScore > currentData.score) {
        await setDoc(userDocRef, {
          name: username,
          score: newScore,
          avatar: userAvatar,
          lastUpdated: serverTimestamp(),
        }, { merge: true });
      }
    } else {
      await setDoc(userDocRef, {
        name: username,
        score: newScore,
        avatar: userAvatar,
        lastUpdated: serverTimestamp(),
      });
    }
  } catch (error: any) {
    console.error("Error updating user score:", error);
    throw new Error(`Could not update user score. Original error: ${error.message || String(error)}`);
  }
}

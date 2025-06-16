
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
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      leaderboard.push({
        id: doc.id,
        name: data.name,
        score: data.score,
        rankTitle: data.rankTitle || getRankByScore(data.score).title, // Fallback if rankTitle not stored
        avatar: data.avatar,
        lastUpdated: (data.lastUpdated as Timestamp)?.toDate()
      } as LeaderboardEntry);
    });
    return leaderboard.map((entry, index) => ({ ...entry, rank: index + 1 }));
  } catch (error: any) {
    console.error("Error fetching leaderboard:", error);
    // Throw a more specific error message
    throw new Error(`Could not fetch leaderboard data. Original error: ${error.message || String(error)}`);
  }
}

/**
 * Updates a user's score on the leaderboard in Firestore by adding the score from the current game.
 * Also updates the user's rank title based on the new total score.
 * @param userId - The user's unique ID (username).
 * @param username - The user's display name.
 * @param scoreEarnedThisGame - The score achieved by the user in the current game session.
 * @returns A promise that resolves when the update is complete.
 */
export async function updateUserScore(userId: string, username: string, scoreEarnedThisGame: number): Promise<void> {
  try {
    const userDocRef = doc(db, LEADERBOARD_COLLECTION, userId);
    const userDocSnap = await getDoc(userDocRef);

    const userAvatar = `https://placehold.co/40x40.png?text=${username.substring(0, 2).toUpperCase()}`;
    let newTotalScore: number;

    if (userDocSnap.exists()) {
      const currentData = userDocSnap.data();
      const currentTotalScore = currentData.score || 0;
      newTotalScore = currentTotalScore + scoreEarnedThisGame;
    } else {
      // New user, their total score is just what they earned this game
      newTotalScore = scoreEarnedThisGame;
    }

    const finalRank = getRankByScore(newTotalScore); // Calculate rank based on the new total score

    await setDoc(userDocRef, {
      name: username,
      score: newTotalScore,
      rankTitle: finalRank.title,
      avatar: userAvatar,
      lastUpdated: serverTimestamp(),
    }, { merge: true });

  } catch (error: any) {
    console.error("Error updating user score:", error);
    throw new Error(`Could not update user score. Original error: ${error.message || String(error)}`);
  }
}

/**
 * Fetches a single user's leaderboard entry from Firestore.
 * @param userId - The user's unique ID (username).
 * @returns A promise that resolves to the LeaderboardEntry or null if not found.
 */
export async function getUserLeaderboardEntry(userId: string): Promise<LeaderboardEntry | null> {
  try {
    const userDocRef = doc(db, LEADERBOARD_COLLECTION, userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      const score = data.score || 0;
      const rankTitle = data.rankTitle || getRankByScore(score).title;
      return {
        id: userDocSnap.id,
        name: data.name,
        score: score,
        rankTitle: rankTitle,
        avatar: data.avatar,
        lastUpdated: (data.lastUpdated as Timestamp)?.toDate(),
      } as LeaderboardEntry;
    } else {
      // User doesn't have a leaderboard entry yet, create a default one (score 0)
      const defaultRank = getRankByScore(0);
      return {
        id: userId,
        name: userId, 
        score: 0,
        rankTitle: defaultRank.title,
        avatar: `https://placehold.co/40x40.png?text=${userId.substring(0, 2).toUpperCase()}`,
        lastUpdated: new Date() 
      };
    }
  } catch (error: any) {
    console.error("Error fetching user leaderboard entry:", error);
    // Return a default structure or null, allowing auth/UI to handle gracefully
    const defaultRank = getRankByScore(0);
      return {
        id: userId,
        name: userId,
        score: 0,
        rankTitle: defaultRank.title,
        avatar: `https://placehold.co/40x40.png?text=${userId.substring(0, 2).toUpperCase()}`,
        lastUpdated: new Date()
      };
  }
}

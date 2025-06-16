
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getUserLeaderboardEntry, updateUserScore } from '@/services/leaderboardService';
import { getRankByScore, playerRanks, type PlayerRank } from '@/lib/trivia-data';

const AUTH_KEY = 'riverrat_lore_auth_v2';

interface User {
  username: string;
  email?: string;
  score?: number;
  rankTitle?: string;
  rankIcon?: PlayerRank['icon'];
}

interface StoredUser {
  username: string;
  email?: string;
  score?: number;
  rankTitle?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const updateUserStateWithRankDetails = useCallback((userData: StoredUser): User => {
    const rank = userData.rankTitle
      ? playerRanks.find(r => r.title === userData.rankTitle) || getRankByScore(userData.score || 0)
      : getRankByScore(userData.score || 0);
    return {
      username: userData.username,
      email: userData.email,
      score: userData.score || 0,
      rankTitle: rank.title,
      rankIcon: rank.icon,
    };
  }, []);

  const fetchAndUpdateUserSession = useCallback(async (username: string, baseUserProperties?: Partial<StoredUser>) => {
    // This function now assumes a successful fetch from getUserLeaderboardEntry,
    // as errors (user not found/registered) are thrown by getUserLeaderboardEntry itself.
    try {
      const leaderboardEntry = await getUserLeaderboardEntry(username); // This will throw if user not found/not fully registered

      const updatedUser: User = {
        username: leaderboardEntry.name, // Use name from DB as source of truth
        email: leaderboardEntry.email,   // Use email from DB
        score: leaderboardEntry.score,
        rankTitle: leaderboardEntry.rankTitle,
        rankIcon: playerRanks.find(r => r.title === leaderboardEntry.rankTitle)?.icon || getRankByScore(leaderboardEntry.score).icon,
      };
      
      setUser(updatedUser);

      const userToStore: StoredUser = { // Store the DB-verified details
        username: updatedUser.username,
        email: updatedUser.email,
        score: updatedUser.score,
        rankTitle: updatedUser.rankTitle,
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(userToStore));
      return updatedUser;

    } catch (error) {
      // If getUserLeaderboardEntry throws, or any other error occurs
      console.error("Error in fetchAndUpdateUserSession:", error);
      // For login, this error will be caught by the login function and re-thrown to UI.
      // For refreshUser, it might mean the user was deleted or local state is stale.
      throw error; // Re-throw to be handled by caller
    }
  }, []);


  useEffect(() => {
    setLoading(true);
    const storedUserString = localStorage.getItem(AUTH_KEY);
    if (storedUserString) {
      try {
        const storedUserData = JSON.parse(storedUserString) as StoredUser;
        // Attempt to refresh user session from DB using stored username
        fetchAndUpdateUserSession(storedUserData.username, storedUserData)
          .catch(() => {
            // If refresh fails (e.g., user deleted from DB), log out
            localStorage.removeItem(AUTH_KEY);
            setUser(null);
          })
          .finally(() => setLoading(false));
      } catch (error) {
        console.error("Failed to parse user from localStorage or refresh session:", error);
        localStorage.removeItem(AUTH_KEY);
        setUser(null);
        setLoading(false);
      }
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [fetchAndUpdateUserSession]);

  const login = useCallback(async (username: string) => {
    setLoading(true);
    try {
      // fetchAndUpdateUserSession will call getUserLeaderboardEntry.
      // If user is not found/registered, an error will be thrown and caught here.
      await fetchAndUpdateUserSession(username);
      setLoading(false); // Only set loading false here if successful
      router.push('/dashboard'); // Proceed to dashboard only on successful login
    } catch (err) {
      setLoading(false);
      console.error("Login failed in useAuth:", err); // Optional: log for debugging
      throw err; // Re-throw the error to be caught by LoginForm.tsx
    }
  }, [router, fetchAndUpdateUserSession]);

  const register = useCallback(async (username: string, email: string) => {
    setLoading(true);
    const defaultRank = getRankByScore(0);
    const initialUserDataForStorage: StoredUser = {
      username,
      email,
      score: 0,
      rankTitle: defaultRank.title,
    };

    // Optimistically set local state and localStorage
    setUser(updateUserStateWithRankDetails(initialUserDataForStorage));
    localStorage.setItem(AUTH_KEY, JSON.stringify(initialUserDataForStorage));

    try {
      // Create/update Firestore entry with email and initial score of 0
      // This will also set lastUpdated timestamp
      await updateUserScore(username, username, 0, email);
      // No need to call fetchAndUpdateUserSession here again as register implies new/verified data.
      setLoading(false);
      router.push('/dashboard');
    } catch (error) {
      console.error("Failed to create/update leaderboard entry during registration:", error);
      // Potentially revert local changes or notify user
      // For simplicity, we'll let the optimistic update stand for now,
      // but a more robust solution might clear localStorage and user state here.
      setLoading(false);
      throw error; // Re-throw to be handled by RegisterForm.tsx if needed
    }
  }, [router, updateUserStateWithRankDetails]);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
    router.push('/login');
  }, [router]);

  const refreshUser = useCallback(async () => {
    if (user) {
      setLoading(true);
      try {
        await fetchAndUpdateUserSession(user.username, { // Pass current local user as base
            username: user.username,
            email: user.email,
            score: user.score,
            rankTitle: user.rankTitle
        });
      } catch (error) {
         // If refresh fails (e.g. user deleted from DB after initial load)
        console.error("Failed to refresh user, logging out:", error);
        logout(); // Log out the user as their session is no longer valid
      } finally {
        setLoading(false);
      }
    }
  }, [user, fetchAndUpdateUserSession, logout]);

  return { user, loading, login, register, logout, refreshUser };
}

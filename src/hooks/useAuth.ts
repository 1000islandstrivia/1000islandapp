
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

  const updateUserStateWithRank = useCallback((userData: StoredUser): User => {
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

  const fetchAndUpdateUserSession = useCallback(async (username: string, baseUser?: Partial<StoredUser>) => {
    try {
      const leaderboardEntry = await getUserLeaderboardEntry(username);
      const currentScore = leaderboardEntry?.score ?? baseUser?.score ?? 0;
      
      const rank = leaderboardEntry?.rankTitle
        ? playerRanks.find(r => r.title === leaderboardEntry.rankTitle) || getRankByScore(currentScore)
        : getRankByScore(currentScore);

      const updatedUser: User = {
        username: username,
        // Prioritize email from baseUser (localStorage during initial load/register), then from leaderboard
        email: baseUser?.email || leaderboardEntry?.email,
        score: currentScore,
        rankTitle: rank.title,
        rankIcon: rank.icon,
      };
      setUser(updatedUser);

      const userToStore: StoredUser = {
        username: updatedUser.username,
        email: updatedUser.email,
        score: updatedUser.score,
        rankTitle: updatedUser.rankTitle,
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(userToStore));
      return updatedUser;
    } catch (error) {
      console.error("Failed to update user rank and score:", error);
      // Fallback if DB fetch fails, rely on baseUser or defaults
      const defaultRank = getRankByScore(baseUser?.score || 0);
      const fallbackUser: User = {
        username: username,
        email: baseUser?.email,
        score: baseUser?.score || 0,
        rankTitle: baseUser?.rankTitle || defaultRank.title,
        rankIcon: playerRanks.find(r => r.title === (baseUser?.rankTitle || defaultRank.title))?.icon || defaultRank.icon,
      };
      setUser(fallbackUser);
      const userToStore: StoredUser = {
        username: fallbackUser.username,
        email: fallbackUser.email,
        score: fallbackUser.score,
        rankTitle: fallbackUser.rankTitle,
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(userToStore));
      return fallbackUser;
    }
  }, []);


  useEffect(() => {
    setLoading(true);
    try {
      const storedUserString = localStorage.getItem(AUTH_KEY);
      if (storedUserString) {
        const storedUserData = JSON.parse(storedUserString) as StoredUser;
        // Fetch fresh data from DB and update session
        fetchAndUpdateUserSession(storedUserData.username, storedUserData).finally(() => setLoading(false));
      } else {
        setUser(null);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage or update rank:", error);
      localStorage.removeItem(AUTH_KEY);
      setUser(null);
      setLoading(false);
    }
  }, [fetchAndUpdateUserSession]);

  const login = useCallback(async (username: string) => {
    setLoading(true);
    await fetchAndUpdateUserSession(username, { username }); // Pass minimal baseUser for initial state
    setLoading(false);
    router.push('/dashboard');
  }, [router, fetchAndUpdateUserSession]);

  const register = useCallback(async (username: string, email: string) => {
    setLoading(true);
    const defaultRank = getRankByScore(0);
    const initialUserData: StoredUser = { // StoredUser for consistency
      username,
      email,
      score: 0,
      rankTitle: defaultRank.title,
    };

    // Set local state and localStorage first
    setUser(updateUserStateWithRank(initialUserData));
    localStorage.setItem(AUTH_KEY, JSON.stringify(initialUserData));

    try {
      // Create/update Firestore entry with email and initial score of 0
      await updateUserScore(username, username, 0, email);
      // Refresh user session from DB to ensure consistency, though it might be redundant here
      // as updateUserScore already sets the initial state in DB.
      // However, fetchAndUpdateUserSession also updates localStorage and local state correctly.
      await fetchAndUpdateUserSession(username, initialUserData);
    } catch (error) {
      console.error("Failed to create/update leaderboard entry during registration:", error);
      // Potentially revert local changes or notify user
    } finally {
      setLoading(false);
      router.push('/dashboard');
    }
  }, [router, updateUserStateWithRank, fetchAndUpdateUserSession]);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
    router.push('/login');
  }, [router]);

  const refreshUser = useCallback(async () => {
    if (user) {
      setLoading(true);
      const storableUserParts: StoredUser = {
        username: user.username,
        email: user.email,
        score: user.score,
        rankTitle: user.rankTitle
      };
      await fetchAndUpdateUserSession(user.username, storableUserParts);
      setLoading(false);
    }
  }, [user, fetchAndUpdateUserSession]);

  return { user, loading, login, register, logout, refreshUser };
}

    
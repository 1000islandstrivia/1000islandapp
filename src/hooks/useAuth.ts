
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getUserLeaderboardEntry } from '@/services/leaderboardService';
import { getRankByScore, playerRanks, type PlayerRank } from '@/lib/trivia-data';

const AUTH_KEY = 'riverrat_lore_auth_v2'; // Changed key to avoid conflicts with old structure

interface User {
  username: string;
  email?: string;
  score?: number;
  rankTitle?: string;
  rankIcon?: PlayerRank['icon'];
}

// Data structure for localStorage to avoid storing functions
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

  const updateUserRankAndScore = useCallback(async (username: string, baseUser?: Partial<StoredUser>) => {
    try {
      const leaderboardEntry = await getUserLeaderboardEntry(username);
      const currentScore = leaderboardEntry?.score ?? baseUser?.score ?? 0;
      const currentRankTitle = leaderboardEntry?.rankTitle ?? baseUser?.rankTitle;

      const rank = currentRankTitle
        ? playerRanks.find(r => r.title === currentRankTitle) || getRankByScore(currentScore)
        : getRankByScore(currentScore);

      const updatedUser: User = {
        username: username,
        email: baseUser?.email || (leaderboardEntry?.name === username ? undefined : leaderboardEntry?.name),
        score: currentScore,
        rankTitle: rank.title,
        rankIcon: rank.icon,
      };
      setUser(updatedUser);

      // Store only serializable data
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
        // Set user state with properly derived icon first
        setUser(updateUserStateWithRank(storedUserData));
        // Then, refresh from DB
        updateUserRankAndScore(storedUserData.username, storedUserData).finally(() => setLoading(false));
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
  }, [updateUserRankAndScore, updateUserStateWithRank]);

  const login = useCallback(async (username: string) => {
    setLoading(true);
    // Passing a minimal StoredUser object for baseUser
    await updateUserRankAndScore(username, { username });
    setLoading(false);
    router.push('/dashboard');
  }, [router, updateUserRankAndScore]);

  const register = useCallback(async (username: string, email: string) => {
    setLoading(true);
    const defaultRank = getRankByScore(0);
    const newUser: User = {
      username,
      email,
      score: 0,
      rankTitle: defaultRank.title,
      rankIcon: defaultRank.icon,
    };
    setUser(newUser);
    const userToStore: StoredUser = {
      username: newUser.username,
      email: newUser.email,
      score: newUser.score,
      rankTitle: newUser.rankTitle,
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(userToStore));
    setLoading(false);
    router.push('/dashboard');
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
    router.push('/login');
  }, [router]);

  const refreshUser = useCallback(async () => {
    if (user) {
      setLoading(true);
      // Pass the current user's serializable parts
      const storableUserParts: StoredUser = {
        username: user.username,
        email: user.email,
        score: user.score,
        rankTitle: user.rankTitle
      };
      await updateUserRankAndScore(user.username, storableUserParts);
      setLoading(false);
    }
  }, [user, updateUserRankAndScore]);

  return { user, loading, login, register, logout, refreshUser };
}

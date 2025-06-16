
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getUserLeaderboardEntry } from '@/services/leaderboardService';
import { getRankByScore, type PlayerRank } from '@/lib/trivia-data';

const AUTH_KEY = 'riverrat_lore_auth';

interface User {
  username: string;
  email?: string;
  score?: number;
  rankTitle?: string;
  rankIcon?: PlayerRank['icon']; // Store the icon component itself
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const updateUserRankAndScore = useCallback(async (username: string, baseUser?: Partial<User>) => {
    try {
      const leaderboardEntry = await getUserLeaderboardEntry(username);
      if (leaderboardEntry) {
        const rank = getRankByScore(leaderboardEntry.score);
        const updatedUser: User = {
          username: username,
          email: baseUser?.email || leaderboardEntry.name === username ? undefined : leaderboardEntry.name, // A bit of guesswork for email if not provided
          score: leaderboardEntry.score,
          rankTitle: rank.title,
          rankIcon: rank.icon,
        };
        setUser(updatedUser);
        localStorage.setItem(AUTH_KEY, JSON.stringify(updatedUser));
        return updatedUser;
      } else {
         // Fallback for a new user or if leaderboard entry not found
        const defaultRank = getRankByScore(0);
        const newUser: User = {
            username: username,
            email: baseUser?.email,
            score: 0,
            rankTitle: defaultRank.title,
            rankIcon: defaultRank.icon,
        };
        setUser(newUser);
        localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
        return newUser;
      }
    } catch (error) {
      console.error("Failed to update user rank and score:", error);
      // Fallback if fetching leaderboard entry fails
      const defaultRank = getRankByScore(0);
      const fallbackUser: User = {
        username: username,
        email: baseUser?.email,
        score: 0,
        rankTitle: defaultRank.title,
        rankIcon: defaultRank.icon,
      };
      setUser(fallbackUser); // Set a default user state
      localStorage.setItem(AUTH_KEY, JSON.stringify(fallbackUser)); // Save default state
      return fallbackUser;
    }
  }, []);


  useEffect(() => {
    setLoading(true);
    try {
      const storedUserString = localStorage.getItem(AUTH_KEY);
      if (storedUserString) {
        const storedUser: User = JSON.parse(storedUserString);
        // Attempt to refresh rank and score on initial load
        updateUserRankAndScore(storedUser.username, storedUser).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage or update rank:", error);
      localStorage.removeItem(AUTH_KEY);
      setLoading(false);
    }
  }, [updateUserRankAndScore]);

  const login = useCallback(async (username: string) => {
    setLoading(true);
    // Simulate API call for login if needed
    // For now, primary action is to fetch/update rank & score
    await updateUserRankAndScore(username);
    setLoading(false);
    router.push('/dashboard');
  }, [router, updateUserRankAndScore]);

  const register = useCallback(async (username: string, email: string) => {
    setLoading(true);
    // Simulate API call for registration
    // Store basic info, then update rank/score
    const defaultRank = getRankByScore(0);
    const newUser: User = {
      username,
      email,
      score: 0,
      rankTitle: defaultRank.title,
      rankIcon: defaultRank.icon,
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
    setUser(newUser); 
    // Optionally, immediately create a leaderboard entry, or let TriviaGame handle it.
    // For simplicity, TriviaGame will create/update it on first game completion.
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
      await updateUserRankAndScore(user.username, user);
      setLoading(false);
    }
  }, [user, updateUserRankAndScore]);

  return { user, loading, login, register, logout, refreshUser };
}

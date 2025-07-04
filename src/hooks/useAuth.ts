
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

  const fetchAndUpdateUserSession = useCallback(async (userId: string, baseUserProperties?: Partial<StoredUser>) => {
    try {
      const leaderboardEntry = await getUserLeaderboardEntry(userId);

      const updatedUser: User = {
        username: leaderboardEntry.name,
        email: leaderboardEntry.email,
        score: leaderboardEntry.score,
        rankTitle: leaderboardEntry.rankTitle,
        rankIcon: playerRanks.find(r => r.title === leaderboardEntry.rankTitle)?.icon || getRankByScore(leaderboardEntry.score).icon,
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
      // console.error("Error in fetchAndUpdateUserSession:", error); // Removed for cleaner error propagation
      throw error;
    }
  }, []);


  useEffect(() => {
    setLoading(true);
    const storedUserString = localStorage.getItem(AUTH_KEY);
    if (storedUserString) {
      try {
        const storedUserData = JSON.parse(storedUserString) as StoredUser;
        fetchAndUpdateUserSession(storedUserData.username.toLowerCase(), storedUserData)
          .catch(() => {
            localStorage.removeItem(AUTH_KEY);
            setUser(null);
          })
          .finally(() => setLoading(false));
      } catch (error) {
        // console.error("Failed to parse user from localStorage or refresh session:", error); // Can be restored if needed for debug
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
      await fetchAndUpdateUserSession(username.toLowerCase());
      setLoading(false); 
      router.push('/dashboard');
    } catch (err) {
      setLoading(false);
      // console.error("Login failed in useAuth:", err); // Removed for cleaner error propagation
      throw err; 
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

    setUser(updateUserStateWithRankDetails(initialUserDataForStorage));
    localStorage.setItem(AUTH_KEY, JSON.stringify(initialUserDataForStorage));

    try {
      // Use lowercase for the ID, but the original casing for the display name
      await updateUserScore(username.toLowerCase(), username, 0, email);
      setLoading(false);
      router.push('/dashboard');
    } catch (error) {
      // console.error("Failed to create/update leaderboard entry during registration:", error); // Can be restored
      setLoading(false);
      throw error; 
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
        await fetchAndUpdateUserSession(user.username.toLowerCase(), {
            username: user.username,
            email: user.email,
            score: user.score,
            rankTitle: user.rankTitle
        });
      } catch (error) {
        // console.error("Failed to refresh user, logging out:", error); // Can be restored
        logout(); 
      } finally {
        setLoading(false);
      }
    }
  }, [user, fetchAndUpdateUserSession, logout]);

  return { user, loading, login, register, logout, refreshUser };
}

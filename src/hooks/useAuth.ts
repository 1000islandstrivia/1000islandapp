"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const AUTH_KEY = 'riverrat_lore_auth';

interface User {
  username: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem(AUTH_KEY);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (username: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const userData = { username };
    localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
    setUser(userData);
    router.push('/dashboard');
  }, [router]);

  const register = useCallback(async (username: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const userData = { username };
    localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
    setUser(userData);
    router.push('/dashboard');
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
    router.push('/login');
  }, [router]);

  return { user, loading, login, register, logout };
}
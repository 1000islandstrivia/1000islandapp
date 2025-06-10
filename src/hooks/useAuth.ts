
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const AUTH_KEY = 'riverrat_lore_auth';

interface User {
  username: string;
  email?: string; // Add email to user interface
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
    // In a real app, you'd fetch user data including email from your backend
    await new Promise(resolve => setTimeout(resolve, 500));
    // For now, we'll assume the email might be missing on login if only username is provided
    // Or, if your "login" process also has an email, you'd handle it here.
    // For this example, we'll retrieve stored user data which might have email from registration.
    let userData: User | null = null;
    try {
        const storedData = localStorage.getItem(AUTH_KEY);
        if (storedData) {
            const parsedData: User = JSON.parse(storedData);
            // This is a simplified login. A real login would verify password and fetch user details.
            // We're just matching username for this example.
            if (parsedData.username === username) {
                userData = parsedData;
            }
        }
    } catch (e) { console.error("Error during login data retrieval", e); }

    if (!userData) {
        // Fallback if user data not found or username doesn't match existing storage for this example
        // A real backend would validate credentials and return full user object.
        userData = { username };
    }
    
    setUser(userData);
    localStorage.setItem(AUTH_KEY, JSON.stringify(userData)); // Ensure updated data is stored
    router.push('/dashboard');
  }, [router]);

  const register = useCallback(async (username: string, email: string) => { // Add email parameter
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const userData: User = { username, email }; // Include email in user data
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

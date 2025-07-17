
/**
 * @fileOverview Server-side authentication helper.
 * This file provides a way to get the current user session in Server Components,
 * Route Handlers, and Server Actions. It uses cookies to securely manage the session.
 */

import { cookies } from 'next/headers';
import type { User } from '@/hooks/useAuth'; // We can reuse the User type

const AUTH_KEY = 'riverrat_lore_auth_v2';

interface Session {
  user: User | null;
}

/**
 * Retrieves the current user session from the cookies.
 * This function is designed to be used in server-side code (Server Components, Route Handlers).
 * @returns A promise that resolves to the user's session object.
 */
export async function auth(): Promise<Session> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(AUTH_KEY);

  if (!sessionCookie?.value) {
    return { user: null };
  }

  try {
    const sessionData = JSON.parse(sessionCookie.value) as User;
    return { user: sessionData };
  } catch (error) {
    console.error("Failed to parse auth cookie:", error);
    // If cookie is malformed, treat it as logged out.
    return { user: null };
  }
}

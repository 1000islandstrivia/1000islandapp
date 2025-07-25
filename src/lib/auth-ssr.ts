import { cookies } from 'next/headers';
import type { User } from '@/hooks/useAuth';

const AUTH_KEY = 'riverrat_lore_auth_v2';

interface Session {
  user: User | null;
}

export async function auth(): Promise<Session> {
  const cookieStore = await cookies(); // ✅ await added
  const sessionCookie = cookieStore.get(AUTH_KEY);

  if (!sessionCookie?.value) {
    return { user: null };
  }

  try {
    const sessionData = JSON.parse(sessionCookie.value) as User;
    return { user: sessionData };
  } catch (error) {
    console.error("Failed to parse auth cookie:", error);
    return { user: null };
  }
}


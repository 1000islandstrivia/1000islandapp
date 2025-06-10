"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ScrollText, LogOut, UserCircle2 } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/trivia', label: 'Trivia' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/storyline', label: 'Storyline' },
    { href: '/achievements', label: 'Achievements' },
  ];

  return (
    <header className="bg-primary/90 text-primary-foreground shadow-md backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
          <ScrollText className="h-8 w-8 text-accent" />
          <h1 className="text-2xl font-headline font-bold">1000 Islands RiverRat Lore</h1>
        </Link>
        <nav className="flex items-center gap-2">
          {user ? (
            <>
              {navItems.map(item => (
                <Button key={item.href} variant="ghost" asChild className={pathname === item.href ? 'bg-primary-foreground/20' : ''}>
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
              <Button variant="ghost" onClick={logout} className="text-accent-foreground bg-accent hover:bg-accent/90">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              {pathname !== '/login' && (
                <Button variant="outline" onClick={() => router.push('/login')} className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  Login
                </Button>
              )}
              {pathname !== '/register' && (
                <Button onClick={() => router.push('/register')} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Register
                </Button>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ScrollText, LogOut, Menu } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import React from 'react';

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

  const RankIcon = user?.rankIcon;

  return (
    <header className="bg-primary/90 text-primary-foreground shadow-md backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
          <ScrollText className="h-8 w-8 text-accent" />
          <h1 className="text-xl md:text-2xl font-headline font-bold">1000 Islands RiverRat Lore</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {user ? (
            <>
              {RankIcon && user.rankTitle && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/20 text-sm mr-2">
                  <RankIcon className="w-6 h-6 text-accent" />
                  <span className="font-semibold">{user.rankTitle}</span>
                  <span className="opacity-80">{user.username}</span>
                </div>
              )}
              {navItems.map(item => (
                <Button key={item.href} variant="ghost" asChild className={`text-sm ${pathname === item.href ? 'bg-primary-foreground/20 hover:bg-primary-foreground/30' : 'hover:bg-primary-foreground/10'}`}>
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
              <Button variant="ghost" onClick={logout} className="text-accent-foreground bg-accent hover:bg-accent/90 text-sm">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              {pathname !== '/login' && (
                <Button variant="outline" onClick={() => router.push('/login')} className="border-accent text-accent hover:bg-accent hover:text-accent-foreground text-sm">
                  Login
                </Button>
              )}
              {pathname !== '/register' && (
                <Button onClick={() => router.push('/register')} className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm">
                  Register
                </Button>
              )}
            </>
          )}
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 active:bg-primary-foreground/20">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0 pt-6 bg-primary text-primary-foreground flex flex-col">
              <div className="px-4 mb-6">
                 <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2 mb-4">
                  <ScrollText className="h-7 w-7 text-accent" />
                  <h2 className="text-xl font-headline font-bold">RiverRat Lore</h2>
                </Link>
                {user && RankIcon && user.rankTitle && (
                  <div className="flex items-center gap-2 p-2 rounded-md bg-black/20 text-sm mb-3">
                    <RankIcon className="w-6 h-6 text-accent" />
                    <div>
                      <span className="font-semibold block">{user.rankTitle}</span>
                      <span className="opacity-80 text-xs">{user.username}</span>
                    </div>
                  </div>
                )}
              </div>
              <nav className="flex-grow flex flex-col gap-1 px-3">
                {user ? (
                  <>
                    {navItems.map(item => (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className={`block p-3 rounded-md hover:bg-primary-foreground/10 active:bg-primary-foreground/20 ${pathname === item.href ? 'bg-primary-foreground/20 font-semibold' : ''}`}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </>
                ) : (
                  <>
                    {pathname !== '/login' && (
                      <SheetClose asChild>
                        <Link href="/login" className={`block p-3 rounded-md hover:bg-primary-foreground/10 active:bg-primary-foreground/20 ${pathname === "/login" ? 'bg-primary-foreground/20 font-semibold' : ''}`}>
                          Login
                        </Link>
                      </SheetClose>
                    )}
                    {pathname !== '/register' && (
                      <SheetClose asChild>
                        <Link href="/register" className={`block p-3 rounded-md hover:bg-primary-foreground/10 active:bg-primary-foreground/20 ${pathname === "/register" ? 'bg-primary-foreground/20 font-semibold' : ''}`}>
                          Register
                        </Link>
                      </SheetClose>
                    )}
                  </>
                )}
              </nav>
              {user && (
                <div className="mt-auto p-4 border-t border-primary-foreground/20">
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      onClick={logout}
                      className="w-full justify-start p-3 bg-accent text-accent-foreground hover:bg-accent/90 active:bg-accent/80 text-base"
                    >
                      <LogOut className="mr-3 h-5 w-5" /> Logout
                    </Button>
                  </SheetClose>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}


"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollText, LogOut } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const user = null; // Placeholder for auth

  return (
    <header className="bg-primary/90 text-primary-foreground shadow-md backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ScrollText className="h-8 w-8 text-accent" />
          <h1 className="text-xl md:text-2xl font-headline font-bold">1000 Islands RiverRat Lore</h1>
        </Link>
        <nav className="flex items-center gap-2">
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
        </nav>
      </div>
    </header>
  );
}

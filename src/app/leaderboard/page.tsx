"use client";

import MainLayout from '@/components/layout/MainLayout';
import LeaderboardTable from '@/components/leaderboard/LeaderboardTable';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ListOrdered, HelpCircle } from 'lucide-react';

export default function LeaderboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <HelpCircle className="w-12 h-12 animate-spin text-primary" />
        <p className="ml-4 text-xl">Loading Leaderboard...</p>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="text-center mb-12">
        <ListOrdered className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-5xl font-headline font-bold text-primary">RiverRat Rankings</h1>
        <p className="text-xl text-foreground/80 mt-2">See who's mastering the lore of the Thousand Islands!</p>
      </div>
      <LeaderboardTable />
       <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Scores are updated in real-time. Keep playing to climb the ranks!</p>
        <p className="mt-1"> (Leaderboard animation is a work in progress for smoother updates)</p>
      </div>
    </MainLayout>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AchievementsDisplay from '@/components/achievements/AchievementsDisplay';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { achievements as allAchievementsData, type Achievement } from '@/lib/trivia-data';
import { Trophy, HelpCircle } from 'lucide-react';

interface StoredAchievementProgress {
  id: string;
  unlocked: boolean;
}

export default function AchievementsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [userAchievements, setUserAchievements] = useState<Achievement[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && !authLoading) {
      setPageLoading(true);
      const achievementsKey = `achievements_progress_${user.username}`;
      const storedAchievementsProgressString = localStorage.getItem(achievementsKey);
      let storedProgressData: StoredAchievementProgress[] = [];

      if (storedAchievementsProgressString) {
        try {
          storedProgressData = JSON.parse(storedAchievementsProgressString);
        } catch (e) {
          console.error("Failed to parse achievements progress from localStorage", e);
        }
      }

      const resolvedAchievements = allAchievementsData.map(masterAch => {
        const progress = storedProgressData.find(p => p.id === masterAch.id);
        const AchIconComponent = masterAch.icon; // Ensure icon is the component itself
        return {
          ...masterAch,
          icon: AchIconComponent,
          unlocked: progress ? progress.unlocked : (masterAch.unlocked || false), // Use masterAch.unlocked as fallback if no progress
        };
      });
      setUserAchievements(resolvedAchievements);
      setPageLoading(false);
    } else if (!authLoading && !user) {
      // If user is definitely not logged in and auth is done loading, stop page loading.
      setPageLoading(false);
    }
  }, [user, authLoading]);

  if (authLoading || pageLoading || (!user && router.pathname !== '/login')) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <HelpCircle className="w-12 h-12 animate-spin text-primary" />
        <p className="ml-4 text-xl">Loading Achievements...</p>
      </div>
    );
  }

  // If not loading and no user, means redirect should have happened or is happening.
  if (!user) return null;

  return (
    <MainLayout>
      <div className="text-center mb-12">
        <Trophy className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-5xl font-headline font-bold text-primary">Your Accolades</h1>
        <p className="text-xl text-foreground/80 mt-2">Track your triumphs and milestones in RiverRat Lore!</p>
      </div>
      <AchievementsDisplay achievements={userAchievements} />
    </MainLayout>
  );
}

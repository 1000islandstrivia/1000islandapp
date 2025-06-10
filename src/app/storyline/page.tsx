
"use client";

import MainLayout from '@/components/layout/MainLayout';
import StoryProgress from '@/components/storyline/StoryProgress';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BookOpen, HelpCircle } from 'lucide-react';
import { storyline as initialStoryline, StorylineHint } from '@/lib/trivia-data';

export default function StorylinePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [unlockedHintKeys, setUnlockedHintKeys] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
        const storedProgress = localStorage.getItem(`storyProgress_${user?.username || 'guest'}`);
        if (storedProgress) {
            try {
                return JSON.parse(storedProgress);
            } catch (e) {
                console.error("Failed to parse stored storyline progress", e);
            }
        }
    }
    return initialStoryline.filter(h => h.unlocked).map(h => h.key);
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && typeof window !== 'undefined') {
        const storedProgress = localStorage.getItem(`storyProgress_${user.username}`);
        if (storedProgress) {
            try {
                setUnlockedHintKeys(JSON.parse(storedProgress));
            } catch (e) {
                console.error("Error parsing storyline progress from local storage", e);
                setUnlockedHintKeys(initialStoryline.filter(h => h.unlocked).map(h => h.key));
            }
        } else {
             setUnlockedHintKeys(initialStoryline.filter(h => h.unlocked).map(h => h.key));
        }
    }
  }, [user]);


  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <HelpCircle className="w-12 h-12 animate-spin text-primary" />
        <p className="ml-4 text-xl">Loading Storyline...</p>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="text-center mb-12">
        <BookOpen className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-5xl font-headline font-bold text-primary">Your Story Unfolds</h1>
        <p className="text-xl text-foreground/80 mt-2">Track your progress and review the lore you've uncovered.</p>
      </div>
      <StoryProgress unlockedHintKeys={unlockedHintKeys} />
       <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Hints are unlocked as you correctly answer trivia questions.</p>
      </div>
    </MainLayout>
  );
}

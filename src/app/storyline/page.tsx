
"use client";

import MainLayout from '@/components/layout/MainLayout';
import StoryProgress from '@/components/storyline/StoryProgress';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BookOpen, HelpCircle } from 'lucide-react';
import { storyline as initialStoryline, type StorylineHint } from '@/lib/trivia-data';

export default function StorylinePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Initialize with hints that are marked as initially unlocked in the data
  const [unlockedHintKeys, setUnlockedHintKeys] = useState<string[]>(() =>
    initialStoryline.filter(h => h.unlocked).map(h => h.key)
  );

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // This effect runs when the component mounts and when `user` changes.
    // It's responsible for loading the user-specific progress from localStorage.
    if (user && typeof window !== 'undefined') {
        const storedProgressKey = `storyProgress_${user.username}`;
        const storedProgress = localStorage.getItem(storedProgressKey);
        if (storedProgress) {
            try {
                const parsedProgress: string[] = JSON.parse(storedProgress);
                setUnlockedHintKeys(parsedProgress);
            } catch (e) {
                console.error(`Failed to parse storyline progress for ${user.username} from localStorage:`, e);
                // If parsing fails, fall back to default unlocked hints for this user
                setUnlockedHintKeys(initialStoryline.filter(h => h.unlocked).map(h => h.key));
            }
        } else {
            // If no stored progress for this specific user, set to default 
            setUnlockedHintKeys(initialStoryline.filter(h => h.unlocked).map(h => h.key));
        }
    } else if (!user && typeof window !== 'undefined' && !loading) {
        // If user logs out or is not available (and not still loading auth state), revert to default unlocked hints
        setUnlockedHintKeys(initialStoryline.filter(h => h.unlocked).map(h => h.key));
    }
  }, [user, loading]);


  if (loading || (!user && router.pathname !== '/login')) { // Ensure we don't show loading if redirecting
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <HelpCircle className="w-12 h-12 animate-spin text-primary" />
        <p className="ml-4 text-xl">Loading Storyline...</p>
      </div>
    );
  }
  
  // If not loading and no user, means redirect should have happened or is happening.
  // This check prevents rendering the page content briefly before redirect.
  if (!user) return null;


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

"use client";

import { storyline as initialStoryline, StorylineHint } from '@/lib/trivia-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollText, Lock, Unlock } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect, useState } from 'react';

// This component will now manage its own state for unlocked hints based on local storage or props.
// For this scaffold, we'll assume `unlockedHints` are passed if TriviaGame page passes its state.
// Or, it can fetch from a global state/context in a real app.
// For simplicity, let's use the initialStoryline and filter by 'unlocked' status.
// In a real app, this would be dynamically updated.

interface StoryProgressProps {
   // This would typically come from a game state provider or be fetched
  unlockedHintKeys?: string[];
}

export default function StoryProgress({ unlockedHintKeys = [] }: StoryProgressProps) {
  const [currentStoryline, setCurrentStoryline] = useState<StorylineHint[]>(initialStoryline);

  useEffect(() => {
    // This effect is a placeholder. In a real app, you'd fetch the user's actual progress.
    // For this scaffold, we'll simulate unlocking based on passed keys, or default to initial state.
    setCurrentStoryline(prevStoryline => 
      prevStoryline.map(hint => ({
        ...hint,
        unlocked: unlockedHintKeys.includes(hint.key) || hint.unlocked // Keep initially unlocked ones too
      }))
    );
  }, [unlockedHintKeys]);


  const unlockedCount = currentStoryline.filter(h => h.unlocked).length;
  const totalHints = currentStoryline.length;
  const progressPercentage = totalHints > 0 ? (unlockedCount / totalHints) * 100 : 0;

  return (
    <div className="space-y-6">
      <Card className="bg-card/90 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary flex items-center gap-2">
            <ScrollText className="w-8 h-8 text-accent" />
            The River's Secrets
          </CardTitle>
          <CardDescription>
            You've uncovered {unlockedCount} of {totalHints} pieces of the Thousand Islands lore.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-muted rounded-full h-4 mb-4">
            <div 
              className="bg-accent h-4 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-center text-muted-foreground">{Math.round(progressPercentage)}% Complete</p>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full space-y-3">
        {currentStoryline.map((hint, index) => (
          <AccordionItem value={`item-${index}`} key={hint.key} className="bg-card/80 backdrop-blur-sm border border-border rounded-lg shadow-md overflow-hidden">
            <AccordionTrigger className="px-6 py-4 hover:bg-primary/5 transition-colors">
              <div className="flex items-center gap-3 w-full">
                {hint.unlocked ? <Unlock className="w-5 h-5 text-green-500" /> : <Lock className="w-5 h-5 text-red-500" />}
                {hint.icon && <hint.icon className="w-6 h-6 text-accent" />}
                <span className={`font-semibold font-headline text-lg ${hint.unlocked ? 'text-primary' : 'text-muted-foreground'}`}>
                  {hint.title}
                </span>
                {!hint.unlocked && <span className="ml-auto text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">Locked</span>}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4 border-t border-border bg-background/50">
              {hint.unlocked ? (
                <p className="text-foreground/80 italic animate-fadeIn">{hint.text}</p>
              ) : (
                <p className="text-muted-foreground italic">Answer more trivia questions to unlock this piece of the story.</p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
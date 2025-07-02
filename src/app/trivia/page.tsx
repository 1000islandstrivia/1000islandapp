"use client";

import MainLayout from '@/components/layout/MainLayout';
import TriviaGame from '@/components/trivia/TriviaGame';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";


export default function TriviaPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAiHintEnabled, setIsAiHintEnabled] = useState(true);

  useEffect(() => {
    const savedPreference = localStorage.getItem('aiHintEnabled');
    if (savedPreference !== null) {
      setIsAiHintEnabled(JSON.parse(savedPreference));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('aiHintEnabled', JSON.stringify(isAiHintEnabled));
  }, [isAiHintEnabled]);


  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
     return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <HelpCircle className="w-12 h-12 animate-spin text-primary" />
         <p className="ml-4 text-xl">Loading Trivia Challenge...</p>
      </div>
    );
  }
  
  return (
    <MainLayout>
      <div className="text-center mb-6">
        <h1 className="text-5xl font-headline font-bold text-primary">RiverRat Trivia Challenge</h1>
        <p className="text-xl text-foreground/80 mt-2">Test your knowledge and uncover secrets of the Thousand Islands!</p>
      </div>
      
      <div className="flex items-center justify-center space-x-3 mb-8">
        <Sparkles className="w-5 h-5 text-accent" />
        <Label htmlFor="ai-hint-switch" className="font-medium">Enable AI Pirate Hints</Label>
        <Switch
          id="ai-hint-switch"
          checked={isAiHintEnabled}
          onCheckedChange={setIsAiHintEnabled}
          aria-label="Toggle AI Pirate Hints"
        />
      </div>

      <TriviaGame isAiHintEnabled={isAiHintEnabled} />
    </MainLayout>
  );
}

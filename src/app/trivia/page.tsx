
"use client";

import MainLayout from '@/components/layout/MainLayout';
import TriviaGame from '@/components/trivia/TriviaGame';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HelpCircle, BookOpen, Skull } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";


export default function TriviaPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAiLoreEnabled, setIsAiLoreEnabled] = useState(false);
  const [isInstantResponseEnabled, setIsInstantResponseEnabled] = useState(false);


  useEffect(() => {
    const savedLorePreference = localStorage.getItem('aiLoreEnabled');
    if (savedLorePreference !== null) {
      setIsAiLoreEnabled(JSON.parse(savedLorePreference));
    }
    const savedResponsePreference = localStorage.getItem('instantResponseEnabled');
    if (savedResponsePreference !== null) {
      setIsInstantResponseEnabled(JSON.parse(savedResponsePreference));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('aiLoreEnabled', JSON.stringify(isAiLoreEnabled));
  }, [isAiLoreEnabled]);
  
  useEffect(() => {
    localStorage.setItem('instantResponseEnabled', JSON.stringify(isInstantResponseEnabled));
  }, [isInstantResponseEnabled]);


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
      
      <div className="flex items-center justify-center space-x-6 mb-8">
        <div className="flex items-center space-x-2">
            <Skull className="w-5 h-5 text-accent" />
            <Label htmlFor="instant-response-switch" className="font-medium text-sm">☠️ Pirate Mode, Buccaneer Banter</Label>
            <Switch
            id="instant-response-switch"
            checked={isInstantResponseEnabled}
            onCheckedChange={setIsInstantResponseEnabled}
            aria-label="Toggle Instant Pirate Feedback"
            />
        </div>

        <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-accent" />
            <Label htmlFor="ai-lore-switch" className="font-medium text-sm">Dig Up Captain's Log, Hold Fast</Label>
            <Switch
            id="ai-lore-switch"
            checked={isAiLoreEnabled}
            onCheckedChange={setIsAiLoreEnabled}
            aria-label="Toggle AI Pirate Lore"
            />
        </div>
      </div>

      <TriviaGame 
        isAiLoreEnabled={isAiLoreEnabled}
        isInstantResponseEnabled={isInstantResponseEnabled}
       />
    </MainLayout>
  );
}

"use client";

import MainLayout from '@/components/layout/MainLayout';
import TriviaGame from '@/components/trivia/TriviaGame';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

export default function TriviaPage() {
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
         <p className="ml-4 text-xl">Loading Trivia Challenge...</p>
      </div>
    );
  }
  
  return (
    <MainLayout>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-headline font-bold text-primary">RiverRat Trivia Challenge</h1>
        <p className="text-xl text-foreground/80 mt-2">Test your knowledge and uncover secrets of the Thousand Islands!</p>
      </div>
      <TriviaGame />
    </MainLayout>
  );
}
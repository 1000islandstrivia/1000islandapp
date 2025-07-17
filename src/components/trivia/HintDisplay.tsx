
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Volume2, Loader2, ChevronRight } from 'lucide-react';
import { useTypewriter } from '@/hooks/useTypewriter';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface HintDisplayProps {
  script: string;
  isAudioLoading: boolean;
  pirateAudioUri: string | null;
  onProceed: () => void;
  isLastQuestion: boolean;
}

export default function HintDisplay({ script, isAudioLoading, pirateAudioUri, onProceed, isLastQuestion }: HintDisplayProps) {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const typedScript = useTypewriter(script, 40, 0, () => setIsTypingComplete(true));
  const isTyping = typedScript.length < script.length;

  useEffect(() => {
    // Autoplay audio once typing is complete and audio is available
    if (pirateAudioUri && isTypingComplete) {
      const audio = new Audio(pirateAudioUri);
      audio.play().catch(e => console.warn("Audio autoplay failed:", e));
    }
  }, [pirateAudioUri, isTypingComplete]);

  return (
    <div className="w-full flex flex-col items-center">
        <div className="animate-fadeIn space-y-4 w-full">
            <div className="flex justify-center items-center gap-4">
                <Volume2 className="w-10 h-10 sm:w-12 sm:h-12 text-accent" />
                {isAudioLoading && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Conjuring voice...
                  </div>
                )}
            </div>
            <Card className="bg-secondary/30 p-4 w-full min-h-[120px] flex items-center justify-center">
                <CardContent className="p-2">
                    <p className="text-secondary-foreground/90 italic text-center font-serif text-lg sm:text-xl">
                    "{typedScript}"
                    {isTyping && (
                        <span className="inline-block w-2 h-5 bg-secondary-foreground/70 ml-1 animate-ping" aria-hidden="true" />
                    )}
                    </p>
                </CardContent>
            </Card>
        </div>
        {!isTyping && script && (
             <Button onClick={onProceed} className="w-full max-w-sm mx-auto mt-6 bg-primary hover:bg-primary/90 text-primary-foreground animate-fadeIn">
                {isLastQuestion ? 'Finish Voyage!' : 'Next Question, Arr!'}
                <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
        )}
    </div>
  );
}

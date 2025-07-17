
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Volume2, Loader2, ChevronRight, Play } from 'lucide-react';
import { useTypewriter } from '@/hooks/useTypewriter';
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface HintDisplayProps {
  script: string;
  audioUri?: string; // Audio is now optional
  onProceed: () => void;
  isLastQuestion: boolean;
}

export default function HintDisplay({ script, audioUri, onProceed, isLastQuestion }: HintDisplayProps) {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const onTypingComplete = React.useCallback(() => {
    setIsTypingComplete(true);
  }, []);
  
  const typedScript = useTypewriter(script, 40, 0, onTypingComplete);
  const isTyping = !isTypingComplete && script.length > 0;

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
        <div className="animate-fadeIn space-y-4 w-full">
            <div className="flex justify-center items-center gap-4">
                <Volume2 className="w-10 h-10 sm:w-12 sm:h-12 text-accent" />
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
            {audioUri && <audio ref={audioRef} src={audioUri} preload="auto" />}
        </div>
        {isTypingComplete && script && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 w-full max-w-sm mx-auto animate-fadeIn">
                {audioUri && (
                    <Button onClick={handlePlayAudio} variant="outline" className="w-full sm:w-auto">
                        <Play className="mr-2 h-5 w-5" />
                        Hear the Pirate
                    </Button>
                )}
                <Button onClick={onProceed} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    {isLastQuestion ? 'Finish Voyage!' : 'Next Question, Arr!'}
                    <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
        )}
    </div>
  );
}

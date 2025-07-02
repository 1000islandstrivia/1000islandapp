
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Volume2, Loader2 } from 'lucide-react';
import { useTypewriter } from '@/hooks/useTypewriter';
import React from 'react';

interface HintDisplayProps {
  script: string;
  isAudioLoading: boolean;
  pirateAudioUri: string | null;
}

export default function HintDisplay({ script, isAudioLoading, pirateAudioUri }: HintDisplayProps) {
  // Use the typewriter hook for the spooky effect
  const typedScript = useTypewriter(script, 40);
  const isTyping = typedScript.length < script.length;

  return (
    <div className="animate-fadeIn space-y-4 w-full">
      <div className="flex justify-center items-center gap-4">
        <Volume2 className="w-10 h-10 sm:w-12 sm:h-12 text-accent" />
        {isAudioLoading && <Loader2 className="w-6 h-6 text-accent animate-spin" />}
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
      {pirateAudioUri && !isAudioLoading && (
        <audio controls autoPlay key={pirateAudioUri} className="w-full max-w-sm mx-auto mt-4">
          <source src={pirateAudioUri} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Loader2, Volume2 } from 'lucide-react';
import type { GenerateHintOutput } from '@/ai/flows/generate-hint';

interface HintDisplayProps {
  hint: GenerateHintOutput | null;
  isLoading: boolean;
  audioHint: string | null;
  isAudioLoading: boolean;
}

export default function HintDisplay({ hint, isLoading, audioHint, isAudioLoading }: HintDisplayProps) {
  if (isLoading) {
    return (
      <Card className="mt-6 bg-secondary/70 backdrop-blur-sm animate-pulse">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center gap-2 text-secondary-foreground">
            <Lightbulb className="w-6 h-6 animate-pulse" />
            Generating Hint...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
        </CardContent>
      </Card>
    );
  }

  if (!hint?.hint) {
    return null; // Don't display if no hint or not loading
  }

  return (
    <Card className="mt-6 shadow-lg bg-secondary/80 backdrop-blur-sm border-accent animate-fadeIn">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center gap-2 text-accent-foreground">
          <Lightbulb className="w-6 h-6 text-accent" />
          A Clue Emerges...
          {isAudioLoading && <Loader2 className="w-5 h-5 ml-auto animate-spin" />}
          {audioHint && !isAudioLoading && <Volume2 className="w-5 h-5 ml-auto text-accent" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-secondary-foreground/90 italic">{hint.hint}</p>
        {audioHint && !isAudioLoading && (
          <audio controls autoPlay key={audioHint} className="w-full mt-4">
            <source src={audioHint} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        )}
      </CardContent>
    </Card>
  );
}

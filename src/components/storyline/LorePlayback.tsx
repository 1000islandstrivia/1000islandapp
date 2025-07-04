
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { generateStoryAudio } from '@/ai/flows/generate-story-audio';
import { useToast } from '@/hooks/use-toast';
import { Volume2, Anchor, Bird, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LorePlaybackProps {
  text: string;
}

type VoiceOption = 'male' | 'female';

const VOICE_PREFERENCE_KEY = 'riverrat_lore_voice_preference';

export default function LorePlayback({ text }: LorePlaybackProps) {
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption>('male');
  const [isLoading, setIsLoading] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedPreference = localStorage.getItem(VOICE_PREFERENCE_KEY) as VoiceOption | null;
    if (savedPreference) {
      setSelectedVoice(savedPreference);
    }
  }, []);

  const handleVoiceChange = (value: VoiceOption) => {
    setSelectedVoice(value);
    localStorage.setItem(VOICE_PREFERENCE_KEY, value);
    setAudioSrc(null); // Clear previous audio when voice changes
  };

  const handlePlayback = async () => {
    setIsLoading(true);
    setAudioSrc(null);
    try {
      const result = await generateStoryAudio({ text, voice: selectedVoice });
      setAudioSrc(result.audioDataUri);
    } catch (error) {
      console.error("Failed to generate story audio:", error);
      toast({
        title: "The River Spirits are Silent...",
        description: "Could not generate the pirate's voice at this time. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div className="mt-6 p-4 bg-primary/10 border-t-2 border-accent/50 rounded-lg">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={handlePlayback} 
                disabled={isLoading}
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-transform w-full sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Summoning the Spirit...
                  </>
                ) : (
                  <>
                    <Volume2 className="mr-2 h-5 w-5" />
                    Hear Me Tale!
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to hear the legend, told by a true river rogue.</p>
            </TooltipContent>
          </Tooltip>

          <Select onValueChange={handleVoiceChange} defaultValue={selectedVoice} disabled={isLoading}>
            <SelectTrigger className="w-full sm:w-[200px] bg-card text-card-foreground border-primary/50">
              <SelectValue placeholder="Choose a narrator..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">
                <div className="flex items-center gap-2">
                  <Anchor className="h-4 w-4 text-primary" />
                  <span>Gruff Pirate (Male)</span>
                </div>
              </SelectItem>
              <SelectItem value="female">
                <div className="flex items-center gap-2">
                  <Bird className="h-4 w-4 text-accent" />
                  <span>Sly Pirate (Female)</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {audioSrc && !isLoading && (
          <div className="mt-4 animate-fadeIn">
            <audio controls autoPlay key={audioSrc} className="w-full">
              <source src={audioSrc} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}


"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { generateStoryAudio } from '@/ai/flows/generate-story-audio';
import { useToast } from '@/hooks/use-toast';
import { Volume2, Anchor, Bird, Loader2, Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LorePlaybackProps {
  text: string;
}

type VoiceOption = 'male' | 'female';

const VOICE_PREFERENCE_KEY = 'riverrat_lore_voice_preference';

export default function LorePlayback({ text }: LorePlaybackProps) {
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption>('male');
  const [isLoading, setIsLoading] = useState(false);
  const [audioSrcs, setAudioSrcs] = useState<string[] | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
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
    // Reset everything when voice changes
    setAudioSrcs(null);
    setCurrentTrackIndex(0);
    setIsPlaying(false);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setAudioSrcs(null);
    try {
      const result = await generateStoryAudio({ text, voice: selectedVoice });
      if (result.audioDataUris && result.audioDataUris.length > 0) {
        setAudioSrcs(result.audioDataUris);
        setCurrentTrackIndex(0);
        setIsPlaying(true); 
      } else {
        throw new Error("Received no audio clips.");
      }
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

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // If we are at the end, restart from the beginning
        if (currentTrackIndex >= (audioSrcs?.length ?? 0) - 1 && audioRef.current.ended) {
           setCurrentTrackIndex(0);
        }
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleRestart = () => {
    if (audioRef.current) {
        setCurrentTrackIndex(0);
        setIsPlaying(true);
    }
  };

  const handleTrackEnd = () => {
    if (currentTrackIndex < (audioSrcs?.length ?? 0) - 1) {
      // Move to the next track, playback will be handled by useEffect
      setCurrentTrackIndex(prevIndex => prevIndex + 1);
    } else {
      // End of playlist
      setIsPlaying(false); 
      setCurrentTrackIndex(0); // Reset to beginning for next play
    }
  };
  
  // This effect handles the actual playback logic
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement && audioSrcs && audioSrcs[currentTrackIndex]) {
        if (isPlaying) {
            // If the source is not what's currently loaded, load it
            if (audioElement.src !== audioSrcs[currentTrackIndex]) {
                audioElement.src = audioSrcs[currentTrackIndex];
            }
            audioElement.play().catch(e => {
                console.error("Audio play failed:", e);
                setIsPlaying(false);
            });
        } else {
            audioElement.pause();
        }
    }
  }, [currentTrackIndex, isPlaying, audioSrcs]);


  return (
    <TooltipProvider delayDuration={200}>
      <div className="mt-6 p-4 bg-primary/10 border-t-2 border-accent/50 rounded-lg">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {!audioSrcs && !isLoading && (
            <Tooltip>
                <TooltipTrigger asChild>
                <Button 
                    onClick={handleGenerate} 
                    disabled={isLoading}
                    className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-transform w-full sm:w-auto"
                >
                    <Volume2 className="mr-2 h-5 w-5" />
                    Hear Me Tale!
                </Button>
                </TooltipTrigger>
                <TooltipContent>
                <p>Click to hear the legend, told by a true river rogue.</p>
                </TooltipContent>
            </Tooltip>
          )}

           {isLoading && (
              <Button disabled className="bg-accent text-accent-foreground w-full sm:w-auto">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Summoning the Spirit...
              </Button>
            )}

          <Select onValueChange={handleVoiceChange} defaultValue={selectedVoice} disabled={isLoading || isPlaying}>
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
        
        {audioSrcs && !isLoading && (
          <div className="mt-4 animate-fadeIn space-y-3">
            <div className="flex items-center justify-center gap-3">
                 <Button onClick={handlePlayPause} variant="outline" size="icon">
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
                </Button>
                <Button onClick={handleRestart} variant="outline" size="icon">
                    <RotateCcw className="h-5 w-5" />
                    <span className="sr-only">Restart</span>
                </Button>
                <div className="text-sm text-muted-foreground">
                    Clip {currentTrackIndex + 1} of {audioSrcs.length}
                </div>
            </div>
             <audio
              ref={audioRef}
              src={audioSrcs[currentTrackIndex]}
              onEnded={handleTrackEnd}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="hidden"
            />
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

    

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { generateStoryAudio } from '@/ai/flows/generate-story-audio';
import { useToast } from '@/hooks/use-toast';
import { Volume2, Loader2, Play, Pause, RotateCcw } from 'lucide-react';

interface LorePlaybackProps {
  text: string;
}

type VoiceOption = 'male' | 'female';

export default function LorePlayback({ text }: LorePlaybackProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [audioSrcs, setAudioSrcs] = useState<string[] | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // When the text changes (i.e., user opens a new accordion), reset the player.
    setAudioSrcs(null);
    setCurrentTrackIndex(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.src = '';
    }
  }, [text]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setAudioSrcs(null);
    try {
      const randomVoice: VoiceOption = Math.random() < 0.5 ? 'male' : 'female';
      const result = await generateStoryAudio({ text, voice: randomVoice });

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
        if (currentTrackIndex >= (audioSrcs?.length ?? 0) && audioRef.current.ended) {
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
      setCurrentTrackIndex(prevIndex => prevIndex + 1);
      setIsPlaying(true);
    } else {
      setIsPlaying(false); 
      setCurrentTrackIndex(0);
    }
  };
  
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement && audioSrcs && audioSrcs[currentTrackIndex]) {
        if (audioElement.src !== audioSrcs[currentTrackIndex]) {
            audioElement.src = audioSrcs[currentTrackIndex];
        }

        if (isPlaying) {
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
                <p>Click to hear the legend, told by a random river rogue.</p>
                </TooltipContent>
            </Tooltip>
          )}

           {isLoading && (
              <Button disabled className="bg-accent text-accent-foreground w-full sm:w-auto">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Summoning the Spirit...
              </Button>
            )}
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
                   {audioSrcs.length > 0 && `Clip ${currentTrackIndex + 1} of ${audioSrcs.length}`}
                </div>
            </div>
             <audio
              ref={audioRef}
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

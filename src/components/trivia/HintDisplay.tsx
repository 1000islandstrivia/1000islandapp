
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Volume2, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import { useTypewriter } from '@/hooks/useTypewriter';
import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface HintDisplayProps {
  script: string;
  audioDataUris?: string[];
  onProceed: () => void;
  isLastQuestion: boolean;
  onTypingComplete: () => void;
  startPlayback: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

export default function HintDisplay({ script, audioDataUris, onProceed, isLastQuestion, onTypingComplete, startPlayback, setIsPlaying }: HintDisplayProps) {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isPlaying = startPlayback;

  // This effect resets the component's state when a new script comes in.
  useEffect(() => {
    setIsTypingComplete(false);
    setCurrentTrackIndex(0);
    if (audioRef.current) {
      audioRef.current.src = '';
    }
  }, [script]);


  const handleTypingComplete = React.useCallback(() => {
    setIsTypingComplete(true);
    onTypingComplete();
  }, [onTypingComplete]);

  const typedScript = useTypewriter(script, 40, 0, handleTypingComplete);
  const isTyping = !isTypingComplete && script.length > 0;

  const handlePlayPause = () => {
    if (audioRef.current) {
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
    const hasMoreTracks = audioDataUris && currentTrackIndex < audioDataUris.length - 1;
    if (hasMoreTracks) {
      setCurrentTrackIndex(prevIndex => prevIndex + 1);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      setCurrentTrackIndex(0);
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement && audioDataUris && audioDataUris[currentTrackIndex]) {
        const newSrc = audioDataUris[currentTrackIndex];

        const playAudio = () => {
            if (isPlaying) {
                audioElement.play().catch(e => {
                    // This specific error is what we are trying to prevent.
                    // If it still happens, we can log it but it shouldn't crash the app.
                    if (e.name === 'AbortError') {
                        console.warn('Audio play() request was interrupted.');
                    } else {
                        console.error("Audio play failed:", e);
                    }
                    setIsPlaying(false);
                });
            } else {
                audioElement.pause();
            }
        };

        // Only change the src if it's different to prevent interruption.
        if (audioElement.src !== newSrc) {
            audioElement.src = newSrc;
            // When we set a new source, we must wait for it to be ready to play.
            audioElement.oncanplaythrough = playAudio;
            audioElement.load(); // Some browsers need an explicit load call.
        } else {
            // If src is already correct, just play/pause.
            playAudio();
        }

        // Cleanup the event listener
        return () => {
            if (audioElement) {
                audioElement.oncanplaythrough = null;
            }
        };
    }
}, [currentTrackIndex, isPlaying, audioDataUris, setIsPlaying]);


  const hasAudio = audioDataUris && audioDataUris.length > 0;

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
            {hasAudio && <audio ref={audioRef} onEnded={handleTrackEnd} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} className="hidden" />}
        </div>
        {isTypingComplete && script && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 w-full max-w-sm mx-auto animate-fadeIn">
                {hasAudio && (
                  <div className="flex items-center gap-2">
                    <Button onClick={handlePlayPause} variant="outline" size="icon">
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
                    </Button>
                    <Button onClick={handleRestart} variant="outline" size="icon">
                        <RotateCcw className="h-5 w-5" />
                        <span className="sr-only">Restart</span>
                    </Button>
                  </div>
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

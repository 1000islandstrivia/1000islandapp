
"use client";

import { useState, useEffect, useCallback } from 'react';

// A custom hook to simulate a typewriter effect for a given string.
export function useTypewriter(
  text: string, 
  speed: number = 40, 
  delay: number = 0, 
  onComplete?: () => void
) {
  const [displayedText, setDisplayedText] = useState('');

  // Stable callback reference
  const stableOnComplete = useCallback(() => {
    if (onComplete) {
      onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    setDisplayedText('');
    
    if (text) {
      let i = 0;
      let intervalId: NodeJS.Timeout | undefined = undefined;
      
      const startTyping = () => {
        intervalId = setInterval(() => {
          if (i < text.length) {
            setDisplayedText(prev => prev + text.charAt(i));
            i++;
          } else {
            if(intervalId) clearInterval(intervalId);
            stableOnComplete();
          }
        }, speed);
      };

      let timeoutId: NodeJS.Timeout;
      if (delay > 0) {
        timeoutId = setTimeout(startTyping, delay);
      } else {
        startTyping();
      }

      // Cleanup function to clear the interval and timeout if the component unmounts
      return () => {
        if(timeoutId) clearTimeout(timeoutId);
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    } else {
      // If text is empty, immediately call onComplete
      stableOnComplete();
    }
  }, [text, speed, delay, stableOnComplete]);

  return displayedText;
}

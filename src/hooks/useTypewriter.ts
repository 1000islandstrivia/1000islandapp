
"use client";

import { useState, useEffect } from 'react';

// A custom hook to simulate a typewriter effect for a given string.
export function useTypewriter(text: string, speed: number = 40, delay: number = 0) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    
    if (text) {
      let i = 0;
      let intervalId: NodeJS.Timeout;
      
      const timeoutId = setTimeout(() => {
        intervalId = setInterval(() => {
          setDisplayedText(text.substring(0, i + 1));
          i++;
          if (i >= text.length) {
            clearInterval(intervalId);
          }
        }, speed);
      }, delay);

      // Cleanup function to clear the interval and timeout if the component unmounts
      return () => {
        clearTimeout(timeoutId);
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }
  }, [text, speed, delay]);

  return displayedText;
}

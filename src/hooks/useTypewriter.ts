
"use client";

import { useState, useEffect } from 'react';

// A custom hook to simulate a typewriter effect for a given string.
export function useTypewriter(text: string, speed: number = 40) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    // Reset the text when the input text changes
    setDisplayedText('');
    
    if (text) {
      let i = 0;
      const intervalId = setInterval(() => {
        // Append one character at a time
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(intervalId);
        }
      }, speed);

      // Cleanup function to clear the interval if the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [text, speed]);

  return displayedText;
}

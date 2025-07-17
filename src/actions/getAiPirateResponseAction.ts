
'use server';
/**
 * @fileOverview A server action to handle AI pirate response generation.
 * This encapsulates the AI logic, keeping it on the server and using dynamic imports.
 * Now includes detailed logging for debugging.
 */

import { cacheHintAction } from '@/actions/cacheHintAction';
import { getQuestionHints } from '@/services/triviaService';
import { addLog } from '@/services/logService';
import type { TriviaQuestion } from '@/lib/trivia-data';

interface ActionInput {
  question: TriviaQuestion;
  playerAnswer: string;
}

interface ActionOutput {
  success: boolean;
  script?: string;
  audioDataUris?: string[]; // Now returns an array of audio URIs
  error?: string;
}

export async function getAiPirateResponseAction(input: ActionInput): Promise<ActionOutput> {
  const { question, playerAnswer } = input;
  const logPrefix = `[QID: ${question.id}]`;
  addLog(`${logPrefix} 'getAiPirateResponseAction' started.`);
  addLog(`${logPrefix} Player answered '${playerAnswer}' for question "${question.question.substring(0, 30)}..."`);

  try {
    const { generatePirateScript } = await import('@/ai/flows/generate-pirate-script');
    addLog(`${logPrefix} Dynamically imported 'generatePirateScript'.`);

    // 1. Fetch the hint and any cached script.
    addLog(`${logPrefix} Fetching hints from database...`);
    const hintData = await getQuestionHints(question.id);
    addLog(`${logPrefix} Hint data received. Cached script exists: ${!!hintData.cachedPirateScript}`);
    let script = hintData.cachedPirateScript;

    // 2. Generate the script if not cached.
    if (!script) {
      addLog(`${logPrefix} CACHE MISS. Generating new script.`);
      const scriptResult = await generatePirateScript({
        question: question.question,
        playerAnswer: playerAnswer,
        correctAnswer: question.answer,
        fallbackHint: hintData.fallbackHint || "Arrr, this secret be lost to the depths!",
      });
      script = scriptResult.script;
      addLog(`${logPrefix} Script generation finished. Script length: ${script?.length || 0}`);
      
      if (script) {
        addLog(`${logPrefix} Caching new script asynchronously.`);
        cacheHintAction(question.id, script).catch(err => 
          addLog(`${logPrefix} NON-CRITICAL: Failed to cache hint: ${err.message}`)
        );
      }
    } else {
      addLog(`${logPrefix} CACHE HIT. Using cached script.`);
    }

    if (!script) {
      throw new Error("Script generation returned empty.");
    }
    
    // 3. Generate audio chunks from the script using the correct flow
    const { generateStoryAudio } = await import('@/ai/flows/generate-story-audio');
    addLog(`${logPrefix} Dynamically imported 'generateStoryAudio'.`);
    addLog(`${logPrefix} Generating audio for script: "${script.substring(0, 30)}..."`);
    
    // For hints, we'll randomly pick a voice for variety
    const randomVoice = Math.random() < 0.5 ? 'male' : 'female';
    addLog(`${logPrefix} Randomly selected voice: ${randomVoice}`);
    
    const audioResult = await generateStoryAudio({ text: script, voice: randomVoice });
    const audioDataUris = audioResult.audioDataUris;
    addLog(`${logPrefix} Audio generation finished. Received ${audioDataUris?.length || 0} audio chunks.`);
    
    if (!audioDataUris || audioDataUris.length === 0) {
        throw new Error("Audio generation returned no clips.");
    }

    addLog(`${logPrefix} Action finished successfully. Returning script and audio to client.`);
    return {
      success: true,
      script: script,
      audioDataUris: audioDataUris,
    };

  } catch (error: any) {
    const errorMessage = error.message || "An unknown error occurred.";
    addLog(`${logPrefix} CRITICAL ERROR: ${errorMessage}`);
    console.error(`Error in getAiPirateResponseAction for question ${question.id}:`, error);
    
    // Fallback to just the script without audio
    try {
        const hintData = await getQuestionHints(question.id);
        const fallbackScript = hintData.cachedPirateScript || hintData.fallbackHint || "A mysterious force prevents the hint from appearing...";
        addLog(`${logPrefix} Falling back to text-only hint.`);
         return {
            success: true, // It's a "success" in that we have something to show the user
            script: fallbackScript,
            audioDataUris: [], // Explicitly no audio
            error: `Original error: ${errorMessage}`
        };
    } catch (fallbackError: any) {
         addLog(`${logPrefix} CRITICAL FALLBACK ERROR: ${fallbackError.message}`);
         return {
            success: false,
            script: "A mysterious force prevents the hint from appearing...",
            error: fallbackError.message
        };
    }
  }
}

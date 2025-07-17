
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
  audioUri?: string; // Add audio URI to the output
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
    
    // 3. Generate audio from the script
    const { generateSpokenPirateAudio } = await import('@/ai/flows/generate-spoken-pirate-audio');
    addLog(`${logPrefix} Dynamically imported 'generateSpokenPirateAudio'.`);
    addLog(`${logPrefix} Generating audio for script: "${script.substring(0, 30)}..."`);
    const audioResult = await generateSpokenPirateAudio({ script });
    const audioUri = audioResult.audioDataUri;
    addLog(`${logPrefix} Audio generation finished. Audio data URI length: ${audioUri?.length || 0}`);
    
    if (!audioUri) {
        throw new Error("Audio generation returned empty.");
    }

    addLog(`${logPrefix} Action finished successfully. Returning script and audio to client.`);
    return {
      success: true,
      script: script,
      audioUri: audioUri,
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
            audioUri: undefined, // Explicitly no audio
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

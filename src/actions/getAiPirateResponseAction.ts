
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
        // No need to await this, it can happen in the background
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
    
    addLog(`${logPrefix} Action finished successfully. Returning script to client.`);
    return {
      success: true,
      script: script,
    };

  } catch (error: any) {
    const errorMessage = error.message || "An unknown error occurred.";
    addLog(`${logPrefix} CRITICAL ERROR: ${errorMessage}`);
    console.error(`Error in getAiPirateResponseAction for question ${question.id}:`, error);
    return {
      success: false,
      script: "A mysterious force prevents the hint from appearing...",
      error: errorMessage,
    };
  }
}

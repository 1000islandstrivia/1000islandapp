
'use server';
/**
 * @fileOverview A server action to handle AI pirate response generation.
 * This encapsulates the AI logic, keeping it on the server and fixing build issues.
 */

import { generatePirateScript } from '@/ai/flows/generate-pirate-script';
import { generateSpokenPirateAudio } from '@/ai/flows/generate-spoken-pirate-audio';
import { cacheHintAction } from '@/actions/cacheHintAction';
import { getQuestionHints } from '@/services/triviaService';
import type { TriviaQuestion } from '@/lib/trivia-data';

interface ActionInput {
  question: Omit<TriviaQuestion, 'cachedPirateScript' | 'fallbackHint'>;
  playerAnswer: string;
}

interface ActionOutput {
  success: boolean;
  script?: string;
  audioDataUri?: string | null;
  error?: string;
}

export async function getAiPirateResponseAction(input: ActionInput): Promise<ActionOutput> {
  const { question, playerAnswer } = input;

  try {
    // 1. Fetch the hint and any cached script from the database.
    const hintData = await getQuestionHints(question.id);
    let script = hintData.cachedPirateScript;

    // 2. Generate the script if it's not cached.
    if (!script) {
      console.log(`CACHE MISS: Generating new script for question ${question.id}`);
      const scriptResult = await generatePirateScript({
        question: question.question,
        playerAnswer: playerAnswer,
        correctAnswer: question.answer,
        fallbackHint: hintData.fallbackHint || "Arrr, this secret be lost to the depths!",
      });
      script = scriptResult.script;
      
      // Asynchronously cache the newly generated script without blocking the response.
      // This is a "fire-and-forget" action for performance.
      if (script) {
        cacheHintAction(question.id, script).catch(err => 
          console.error(`Non-critical error: Failed to cache hint for question ${question.id}:`, err)
        );
      }
    } else {
      console.log(`CACHE HIT: Using cached script for question ${question.id}`);
    }

    if (!script) {
      throw new Error("Script generation failed and no fallback was available.");
    }
    
    // 3. Generate the audio for the final script (whether new or cached).
    let audioDataUri: string | null = null;
    try {
      const audioResult = await generateSpokenPirateAudio({ script });
      audioDataUri = audioResult.audioDataUri;
    } catch (audioError) {
      console.warn(`Spoken audio generation failed for question ${question.id}, proceeding without audio:`, audioError);
      // This is not a fatal error; we can still return the script.
    }

    return {
      success: true,
      script: script,
      audioDataUri: audioDataUri,
    };

  } catch (error: any) {
    console.error(`Error in getAiPirateResponseAction for question ${question.id}:`, error);
    return {
      success: false,
      script: "A mysterious force prevents the hint from appearing...",
      error: error.message || "An unknown error occurred while generating the AI response.",
    };
  }
}

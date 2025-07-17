'use server';
/**
 * @fileOverview A server action to handle AI pirate response generation.
 * This encapsulates the AI logic, keeping it on the server and fixing build issues.
 */

import { generatePirateScript } from '@/ai/flows/generate-pirate-script';
import { generateSpokenPirateAudio } from '@/ai/flows/generate-spoken-pirate-audio';
import { cacheHintAction } from '@/actions/cacheHintAction';
import type { TriviaQuestion } from '@/lib/trivia-data';

interface ActionInput {
  question: TriviaQuestion;
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
    let script = question.cachedPirateScript;

    // 1. Generate the script if it's not cached
    if (!script) {
      const scriptResult = await generatePirateScript({
        question: question.question,
        playerAnswer: playerAnswer,
        correctAnswer: question.answer,
        fallbackHint: question.fallbackHint || "Arrr, this secret be lost to the depths!",
      });
      script = scriptResult.script;
      
      // Asynchronously cache the newly generated script without blocking the response
      if (script) {
        cacheHintAction(question.id, script).catch(err => console.error("Non-critical error: Failed to cache hint:", err));
      }
    }

    if (!script) {
      throw new Error("Script generation failed and no fallback was available.");
    }
    
    // 2. Generate the audio for the script
    let audioDataUri: string | null = null;
    try {
      const audioResult = await generateSpokenPirateAudio({ script });
      audioDataUri = audioResult.audioDataUri;
    } catch (audioError) {
      console.warn("Spoken audio generation failed, proceeding without audio:", audioError);
      // This is not a fatal error; we can still return the script.
    }

    return {
      success: true,
      script: script,
      audioDataUri: audioDataUri,
    };

  } catch (error: any) {
    console.error("Error in getAiPirateResponseAction:", error);
    return {
      success: false,
      script: question.fallbackHint || "A mysterious force prevents the hint from appearing...",
      error: error.message || "An unknown error occurred while generating the AI response.",
    };
  }
}

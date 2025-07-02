'use server';
/**
 * @fileOverview An AI agent that generates a fully immersive, scripted pirate response for a trivia answer.
 *
 * - generatePirateScript - A function that handles script generation.
 * - GeneratePirateScriptInput - The input type for the function.
 * - GeneratePirateScriptOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const GeneratePirateScriptInputSchema = z.object({
  question: z.string().describe('The trivia question text.'),
  playerAnswer: z.string().describe("The answer the player chose."),
  correctAnswer: z.string().describe('The correct answer to the trivia question.'),
  fallbackHint: z.string().describe('A pre-written, spooky, pirate-style hint about the correct answer.'),
});
export type GeneratePirateScriptInput = z.infer<typeof GeneratePirateScriptInputSchema>;

// Output Schema (script only)
const GeneratePirateScriptOutputSchema = z.object({
  script: z.string().describe('The full pirate script to be spoken.'),
});
export type GeneratePirateScriptOutput = z.infer<typeof GeneratePirateScriptOutputSchema>;

// Exported wrapper function
export async function generatePirateScript(input: GeneratePirateScriptInput): Promise<GeneratePirateScriptOutput> {
  return generatePirateScriptFlow(input);
}

// Prompt to generate the pirate's script
const generatePirateScriptPrompt = ai.definePrompt({
  name: 'generatePirateScriptPrompt',
  input: { schema: GeneratePirateScriptInputSchema },
  output: { schema: GeneratePirateScriptOutputSchema },
  prompt: `You are a charismatic pirate character (either male or female). A player in a Thousand Islands trivia game has just answered a question. Your task is to generate a script for a short, voiced response that is fun, playful, and full of personality.

Here is the information you'll need:
- The Question: {{{question}}}
- The Player's Answer: {{{playerAnswer}}}
- The Correct Answer: {{{correctAnswer}}}
- The Spooky Hint to Read Aloud: "{{{fallbackHint}}}"

Follow these steps precisely:
1.  Check if the 'playerAnswer' is the same as the 'correctAnswer'.
2.  If the answer is CORRECT:
    - Start with a celebratory pirate cheer (e.g., "Blimey, ye got it!", "Well blow me down, that be right!").
    - Briefly confirm the correct answer.
    - Then, read the provided "fallbackHint" in-character, as if sharing a river secret.
3.  If the answer is INCORRECT:
    - Start with a brief, playful, teasing remark about the wrong answer (e.g., "Arrr, that be wronger than a compass in a thunderstorm!", "Barnacles! That ain't it, matey.").
    - Clearly state what the correct answer was.
    - Then, read the provided "fallbackHint" in-character, as if sharing a spooky river secret.

The entire script must be under 5 sentences. Use rich pirate vocabulary (e.g., "ye," "blimey," "me hearty," "cursed," "haunted").

Example for a CORRECT answer: "Blimey! Ye nailed it like a cannon to the hull! The answer be Heart Island. Now listen to this whisper on the wind: Boldt Castle’s walls hold more than just stone—they hold a love story cut short!"
Example for an INCORRECT answer: "Arrr, that answer be as lost as a ship in the fog! The true answer be Heart Island. Here's a hint for ye, if ye dare listen: Boldt Castle’s walls hold more than just stone—they hold a love story cut short!"

Now, generate the script for the provided answers.`,
});

// The main flow (simplified to only generate script)
const generatePirateScriptFlow = ai.defineFlow(
  {
    name: 'generatePirateScriptFlow',
    inputSchema: GeneratePirateScriptInputSchema,
    outputSchema: GeneratePirateScriptOutputSchema,
  },
  async (input) => {
    const scriptResult = await generatePirateScriptPrompt(input);
    const pirateScript = scriptResult.output?.script;

    if (!pirateScript) {
      throw new Error('Failed to generate the pirate script.');
    }

    return {
      script: pirateScript,
    };
  }
);


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
  prompt: `You are a charismatic and mysterious pirate character (either male or female). A player in a Thousand Islands trivia game has just answered a question. Your task is to generate a script for a voiced response that reveals a piece of river lore.

Your ONLY job is to read the provided "Spooky Hint to Read Aloud" in an engaging, atmospheric, and detailed pirate voice.

DO NOT mention if the player's answer was right or wrong.
DO NOT mention the player's answer or the correct answer.
DO NOT add any conversational filler like "Arrr!" or "Blimey!" unless it is part of the hint itself.

Simply take the hint provided and deliver it as a captivating, narrative performance. The script should be fun, playful, and full of personality, as if you are sharing a deep, dark secret of the river.

Here is the information you'll need:
- The Question: {{{question}}}
- The Spooky Hint to Read Aloud: "{{{fallbackHint}}}"

The entire script must be under 5 sentences. Use rich pirate vocabulary (e.g., "ye," "blimey," "me hearty," "cursed," "haunted").

Example Hint Provided: "Boldt Castle’s walls hold more than just stone—they hold a love story cut short!"
Example Script You Should Generate: "Huddle close and listen... they say Boldt Castle’s walls hold more than just stone—they hold a love story cut short, a tale whispered on the haunted river winds!"

Now, generate the script based on the hint provided.`,
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

    

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
  fallbackHint: z.string().describe('A pre-written, pirate-style hint about the correct answer.'),
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
  prompt: `You are a charismatic and mysterious pirate character, a true RiverRat, sharing a piece of secret lore. A player in a Thousand Islands trivia game has just answered a question.

Your task is to take the essential "Core Hint" provided below and deliver it as a short, captivating, and atmospheric performance.

**Your Goal:**
1.  Start with a pirate-like exclamation or phrase to draw the listener in (e.g., "Huddle close, matey...", "Arrr, let me tell ye a tale...", "A secret, ye say?").
2.  Weave the **Core Hint** into your speech naturally. Embellish it slightly with your pirate personality.
3.  End with a concluding pirate flourish or a mysterious sign-off.
4.  The entire script MUST be under 5 sentences.
5.  DO NOT mention if the player's answer was right or wrong. DO NOT mention the player's answer or the correct answer at all. Your only job is to share the lore.

Here is the information for your performance:
- The Question Asked: {{{question}}}
- The **Core Hint** to build your script around: "{{{fallbackHint}}}"

**Example:**
- If the **Core Hint** is: "Boldt Castle’s walls hold a love story cut short."
- A good script you could generate would be: "Listen close to the whispers on the wind... they say Boldt Castle’s very walls hold more than just stone—they hold a love story cut tragically short. A tale for another time, perhaps!"

Now, generate the pirate script based on the **Core Hint** provided.`,
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

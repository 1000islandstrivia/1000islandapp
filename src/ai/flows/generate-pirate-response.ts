'use server';
/**
 * @fileOverview An AI agent that generates a fully immersive, voiced pirate response for a trivia answer.
 *
 * - generatePirateResponse - A function that handles script generation and text-to-speech.
 * - GeneratePirateResponseInput - The input type for the function.
 * - GeneratePirateResponseOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';
import { googleAI } from '@genkit-ai/googleai';

// Input Schema
const GeneratePirateResponseInputSchema = z.object({
  question: z.string().describe('The trivia question text.'),
  playerAnswer: z.string().describe("The answer the player chose."),
  correctAnswer: z.string().describe('The correct answer to the trivia question.'),
  fallbackHint: z.string().describe('A pre-written, spooky, pirate-style hint about the correct answer.'),
});
export type GeneratePirateResponseInput = z.infer<typeof GeneratePirateResponseInputSchema>;

// Output Schema
const GeneratePirateResponseOutputSchema = z.object({
  audioDataUri: z.string().describe("The generated pirate audio response as a data URI. Format: 'data:audio/wav;base64,<encoded_data>'."),
});
export type GeneratePirateResponseOutput = z.infer<typeof GeneratePirateResponseOutputSchema>;

// Exported wrapper function
export async function generatePirateResponse(input: GeneratePirateResponseInput): Promise<GeneratePirateResponseOutput> {
  return generatePirateResponseFlow(input);
}

/**
 * Converts raw PCM audio data to a base64 encoded WAV string.
 */
async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

// Prompt to generate the pirate's script
const generatePirateScriptPrompt = ai.definePrompt({
  name: 'generatePirateScriptPrompt',
  input: { schema: GeneratePirateResponseInputSchema },
  output: { schema: z.object({ script: z.string().describe('The full pirate script to be spoken.') }) },
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

// The main flow
const generatePirateResponseFlow = ai.defineFlow(
  {
    name: 'generatePirateResponseFlow',
    inputSchema: GeneratePirateResponseInputSchema,
    outputSchema: GeneratePirateResponseOutputSchema,
  },
  async (input) => {
    // Step 1: Generate the pirate script.
    const scriptResult = await generatePirateScriptPrompt(input);
    const pirateScript = scriptResult.output?.script;

    if (!pirateScript) {
      throw new Error('Failed to generate the pirate script.');
    }

    // Step 2: Generate the audio from the script.
    const speakers = ['MalePirate', 'FemalePirate'];
    const selectedSpeaker = speakers[Math.floor(Math.random() * speakers.length)];
    const ttsPrompt = `${selectedSpeaker}: ${pirateScript}`;

    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          multiSpeakerVoiceConfig: {
            speakerVoiceConfigs: [
              {
                speaker: 'MalePirate',
                voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Achernar' } }, // A male-sounding voice
              },
              {
                speaker: 'FemalePirate',
                voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Algenib' } }, // A female-sounding voice
              },
            ],
          },
        },
      },
      prompt: ttsPrompt,
    });

    if (!media) {
      throw new Error('No audio media was returned from the TTS model.');
    }
    
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    const wavBase64 = await toWav(audioBuffer);

    // Step 3: Return the audio data
    return {
      audioDataUri: 'data:audio/wav;base64,' + wavBase64,
    };
  }
);

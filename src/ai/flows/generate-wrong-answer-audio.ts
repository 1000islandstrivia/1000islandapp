'use server';
/**
 * @fileOverview An AI agent that generates a teasing, voiced pirate response for an incorrect trivia answer.
 *
 * - generateWrongAnswerAudio - A function that handles the script and text-to-speech process.
 * - GenerateWrongAnswerAudioInput - The input type for the function.
 * - GenerateWrongAnswerAudioOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';
import { googleAI } from '@genkit-ai/googleai';

// Input Schema
const GenerateWrongAnswerAudioInputSchema = z.object({
  question: z.string().describe('The trivia question text.'),
  playerAnswer: z.string().describe('The incorrect answer the player chose.'),
  correctAnswer: z.string().describe('The correct answer to the trivia question.'),
  fallbackHint: z.string().describe('A pre-written, spooky, pirate-style hint about the correct answer.'),
});
export type GenerateWrongAnswerAudioInput = z.infer<typeof GenerateWrongAnswerAudioInputSchema>;

// Output Schema
const GenerateWrongAnswerAudioOutputSchema = z.object({
  audioDataUri: z.string().describe("The generated pirate audio response as a data URI. Format: 'data:audio/wav;base64,<encoded_data>'."),
});
export type GenerateWrongAnswerAudioOutput = z.infer<typeof GenerateWrongAnswerAudioOutputSchema>;

// Exported wrapper function
export async function generateWrongAnswerAudio(input: GenerateWrongAnswerAudioInput): Promise<GenerateWrongAnswerAudioOutput> {
  return generateWrongAnswerAudioFlow(input);
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
  input: { schema: GenerateWrongAnswerAudioInputSchema },
  output: { schema: z.object({ script: z.string().describe('The full pirate script to be spoken.') }) },
  prompt: `You are a charismatic pirate character (either male or female). A player in a Thousand Islands trivia game has answered incorrectly. Your task is to generate a script for a short, voiced response.

  Your response must follow these steps in order:
  1.  Start with a brief, playful, teasing remark about the player's incorrect guess. Use rich pirate vocabulary (e.g., "Arrr, that be wronger than...", "Blimey, ye call that an answer?").
  2.  Clearly state the correct answer.
  3.  Deliver the provided "fallbackHint" in-character, as if sharing a spooky river secret.
  4.  The entire script should be under 4 sentences.

  Here is the information you'll need:
  - The Question: {{{question}}}
  - The Player's (Wrong) Answer: {{{playerAnswer}}}
  - The Correct Answer: {{{correctAnswer}}}
  - The Spooky Hint to Read Aloud: "{{{fallbackHint}}}"

  Example Output Script: "Arrr, that answer be wronger than a compass in a thunderstorm! The true answer be Heart Island, where Boldt Castle still broods like a ghost in the fog. Here's a hint for ye, if ye dare listen: Arrr, Boldt Castle’s walls hold more than just stone—they hold a love story cut short!"

  Now, generate the script for the current incorrect answer.`,
});

// The main flow
const generateWrongAnswerAudioFlow = ai.defineFlow(
  {
    name: 'generateWrongAnswerAudioFlow',
    inputSchema: GenerateWrongAnswerAudioInputSchema,
    outputSchema: GenerateWrongAnswerAudioOutputSchema,
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

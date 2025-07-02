'use server';
/**
 * @fileOverview An AI agent that generates a text hint and converts it to pirate-themed speech.
 *
 * - generateSpokenHint - A function that handles the hint and text-to-speech process.
 * - GenerateSpokenHintInput - The input type for the generateSpokenHint function.
 * - GenerateSpokenHintOutput - The return type for the generateSpokenHint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';
import {googleAI} from '@genkit-ai/googleai';

// New Input Schema
const GenerateSpokenHintInputSchema = z.object({
  question: z.string().describe('The trivia question to generate a hint for.'),
  answer: z.string().describe('The correct answer to the trivia question.'),
});
export type GenerateSpokenHintInput = z.infer<typeof GenerateSpokenHintInputSchema>;

// New Output Schema
const GenerateSpokenHintOutputSchema = z.object({
  hint: z.string().describe('A subtle hint related to the trivia question.'),
  audioDataUri: z.string().describe("The generated audio as a data URI. Format: 'data:audio/wav;base64,<encoded_data>'."),
});
export type GenerateSpokenHintOutput = z.infer<typeof GenerateSpokenHintOutputSchema>;

// Exported wrapper function
export async function generateSpokenHint(input: GenerateSpokenHintInput): Promise<GenerateSpokenHintOutput> {
  return generateSpokenHintFlow(input);
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

// Prompt for generating the text hint (from generate-hint.ts)
const generateHintTextPrompt = ai.definePrompt({
  name: 'generateHintTextPrompt',
  input: {schema: GenerateSpokenHintInputSchema},
  output: {schema: z.object({ hint: z.string().describe('A subtle hint related to the trivia question.') })},
  prompt: `You are a helpful game master providing subtle hints to players answering trivia questions.

  Generate a hint for the following trivia question, without giving away the answer directly. The hint should be related to the correct answer and advance the central storyline.

  Question: {{{question}}}
  Answer: {{{answer}}}

  Hint:`,
});

const generateSpokenHintFlow = ai.defineFlow(
  {
    name: 'generateSpokenHintFlow',
    inputSchema: GenerateSpokenHintInputSchema,
    outputSchema: GenerateSpokenHintOutputSchema,
  },
  async (input) => {
    // Step 1: Generate the text hint.
    const hintResult = await generateHintTextPrompt(input);
    const hintText = hintResult.output?.hint;

    if (!hintText) {
        throw new Error('Failed to generate hint text.');
    }

    // Step 2: Generate the audio from the text hint.
    const speakers = ['MalePirate', 'FemalePirate'];
    const selectedSpeaker = speakers[Math.floor(Math.random() * speakers.length)];
    const ttsPrompt = `${selectedSpeaker}: ${hintText}`;

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

    // Step 3: Return both text and audio data
    return {
      hint: hintText,
      audioDataUri: 'data:audio/wav;base64,' + wavBase64,
    };
  }
);

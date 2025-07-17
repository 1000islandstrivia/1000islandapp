
'use server';
/**
 * @fileOverview An AI agent that converts a given script to pirate-themed speech.
 * This flow now breaks the script into smaller chunks for faster initial response.
 *
 * - generateSpokenPirateAudio - A function that handles the text-to-speech process.
 * - GenerateSpokenPirateAudioInput - The input type for the function.
 * - GenerateSpokenPirateAudioOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

// Input Schema
const GenerateSpokenPirateAudioInputSchema = z.object({
  script: z.string().describe('The script to be converted to audio.'),
});
export type GenerateSpokenPirateAudioInput = z.infer<typeof GenerateSpokenPirateAudioInputSchema>;

// Output Schema - now an array of URIs
const GenerateSpokenPirateAudioOutputSchema = z.object({
  audioDataUris: z.array(z.string()).describe("An array of generated audio clips as data URIs. Format: 'data:audio/wav;base64,<encoded_data>'."),
});
export type GenerateSpokenPirateAudioOutput = z.infer<typeof GenerateSpokenPirateAudioOutputSchema>;

// Exported wrapper function
export async function generateSpokenPirateAudio(input: GenerateSpokenPirateAudioInput): Promise<GenerateSpokenPirateAudioOutput> {
  return generateSpokenPirateAudioFlow(input);
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

/**
 * Splits a long string of text into smaller chunks, breaking at sentence endings.
 */
function splitTextIntoChunks(text: string, maxWords: number = 25): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks: string[] = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    const potentialChunk = currentChunk + (currentChunk ? ' ' : '') + sentence;
    const wordCount = potentialChunk.split(/\s+/).length;

    if (wordCount > maxWords) {
      if (currentChunk) {
        chunks.push(currentChunk);
      }
      currentChunk = sentence;
    } else {
      currentChunk = potentialChunk;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }
  
  return chunks.filter(chunk => chunk.trim().length > 0);
}

/**
 * Generates a single audio clip for a chunk of text.
 */
async function generateAudioChunk(textChunk: string): Promise<string> {
    const voices = ['Achernar', 'Algenib'];
    const selectedVoice = voices[Math.floor(Math.random() * voices.length)];

    const promptWithInstructions = `(Speaking with a charismatic, slightly mysterious pirate accent) ${textChunk}`;

    const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-preview-tts',
        config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: selectedVoice },
                },
            },
        },
        prompt: promptWithInstructions,
    });

  if (!media) {
    console.error(`TTS generation failed for chunk: "${textChunk.substring(0, 30)}..."`);
    return '';
  }

  const audioBuffer = Buffer.from(
    media.url.substring(media.url.indexOf(',') + 1),
    'base64'
  );

  const wavBase64 = await toWav(audioBuffer);
  return 'data:audio/wav;base64,' + wavBase64;
}

const generateSpokenPirateAudioFlow = ai.defineFlow(
  {
    name: 'generateSpokenPirateAudioFlow',
    inputSchema: GenerateSpokenPirateAudioInputSchema,
    outputSchema: GenerateSpokenPirateAudioOutputSchema,
  },
  async (input) => {
    const textChunks = splitTextIntoChunks(input.script);
    
    const audioPromises = textChunks.map(chunk => generateAudioChunk(chunk));
    
    const audioResults = await Promise.all(audioPromises);
    
    const successfulAudioUris = audioResults.filter(uri => uri.length > 0);
    
    if (successfulAudioUris.length === 0) {
      throw new Error('All audio chunk generations failed for the hint script.');
    }
    
    return {
      audioDataUris: successfulAudioUris,
    };
  }
);

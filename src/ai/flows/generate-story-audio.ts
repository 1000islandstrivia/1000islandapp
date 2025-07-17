
'use server';
/**
 * @fileOverview An AI agent that converts longer story text to pirate-themed speech with a selectable voice.
 * This flow now breaks text into smaller chunks to avoid timeouts on long stories.
 *
 * - generateStoryAudio - A function that handles the text-to-speech process for lore.
 * - GenerateStoryAudioInput - The input type for the function.
 * - GenerateStoryAudioOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';

// Input Schema (remains the same)
const GenerateStoryAudioInputSchema = z.object({
  text: z.string().describe('The story text to be converted to audio.'),
  voice: z.enum(['male', 'female']).describe("The desired pirate voice, either 'male' or 'female'."),
});
export type GenerateStoryAudioInput = z.infer<typeof GenerateStoryAudioInputSchema>;

// Output Schema (changed to return an array of audio URIs)
const GenerateStoryAudioOutputSchema = z.object({
  audioDataUris: z.array(z.string()).describe("An array of generated audio clips as data URIs. Format: 'data:audio/wav;base64,<encoded_data>'."),
});
export type GenerateStoryAudioOutput = z.infer<typeof GenerateStoryAudioOutputSchema>;

// Exported wrapper function (remains the same)
export async function generateStoryAudio(input: GenerateStoryAudioInput): Promise<GenerateStoryAudioOutput> {
  return generateStoryAudioFlow(input);
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
 * Splits a long string of text into smaller chunks of a maximum word count,
 * trying to break at sentence endings for more natural-sounding audio clips.
 * @param text The full text to split.
 * @param maxWords The target maximum number of words per chunk.
 * @returns An array of text chunks.
 */
function splitTextIntoChunks(text: string, maxWords: number = 50): string[] {
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
  
  // In case a single sentence is longer than maxWords, we just let it be its own chunk.
  // A more complex implementation could split mid-sentence, but this is more robust.
  return chunks.filter(chunk => chunk.trim().length > 0);
}


/**
 * Generates a single audio clip for a chunk of text.
 */
async function generateAudioChunk(textChunk: string, voice: 'male' | 'female'): Promise<string> {
    const voiceName = voice === 'male' ? 'Achernar' : 'Algenib';

    // Add instructions to the text chunk for the AI voice model
    const promptWithInstructions = `(Speaking with a charismatic, slightly mysterious pirate accent) ${textChunk}`;


    const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-preview-tts',
        config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName },
                },
            },
        },
        prompt: promptWithInstructions,
    });

  if (!media) {
    // Return an empty string or throw a specific error for this chunk
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


// The main flow for generating story audio
const generateStoryAudioFlow = ai.defineFlow(
  {
    name: 'generateStoryAudioFlow',
    inputSchema: GenerateStoryAudioInputSchema,
    outputSchema: GenerateStoryAudioOutputSchema,
  },
  async ({ text, voice }) => {
    // Split text into smart chunks of about 50 words
    const textChunks = splitTextIntoChunks(text, 50);

    // Generate audio for each chunk concurrently to save time.
    const audioPromises = textChunks.map(chunk => generateAudioChunk(chunk, voice));

    const audioResults = await Promise.all(audioPromises);
    
    // Filter out any failed generations (which return as empty strings)
    const successfulAudioUris = audioResults.filter(uri => uri.length > 0);

    if (successfulAudioUris.length === 0) {
      throw new Error('All audio chunk generations failed.');
    }

    return {
      audioDataUris: successfulAudioUris,
    };
  }
);

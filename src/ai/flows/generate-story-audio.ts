
'use server';
/**
 * @fileOverview An AI agent that converts longer story text to pirate-themed speech with a selectable voice.
 *
 * - generateStoryAudio - A function that handles the text-to-speech process for lore.
 * - GenerateStoryAudioInput - The input type for the function.
 * - GenerateStoryAudioOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';

// Input Schema
const GenerateStoryAudioInputSchema = z.object({
  text: z.string().describe('The story text to be converted to audio.'),
  voice: z.enum(['male', 'female']).describe("The desired pirate voice, either 'male' or 'female'."),
});
export type GenerateStoryAudioInput = z.infer<typeof GenerateStoryAudioInputSchema>;

// Output Schema
const GenerateStoryAudioOutputSchema = z.object({
  audioDataUri: z.string().describe("The generated audio as a data URI. Format: 'data:audio/wav;base64,<encoded_data>'."),
});
export type GenerateStoryAudioOutput = z.infer<typeof GenerateStoryAudioOutputSchema>;

// Exported wrapper function
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

// The main flow for generating story audio
const generateStoryAudioFlow = ai.defineFlow(
  {
    name: 'generateStoryAudioFlow',
    inputSchema: GenerateStoryAudioInputSchema,
    outputSchema: GenerateStoryAudioOutputSchema,
  },
  async ({ text, voice }) => {
    // Determine which speaker and prompt to use based on voice selection
    const speakerId = voice === 'male' ? 'MalePirate' : 'FemalePirate';
    const ttsPrompt = `${speakerId}: ${text}`;

    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          multiSpeakerVoiceConfig: {
            speakerVoiceConfigs: [
              {
                speaker: 'MalePirate',
                voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Achernar' } }, // Gruff and Bold
              },
              {
                speaker: 'FemalePirate',
                voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Algenib' } }, // Sly and Clever
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

    return {
      audioDataUri: 'data:audio/wav;base64,' + wavBase64,
    };
  }
);

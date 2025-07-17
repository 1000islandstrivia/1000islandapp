
'use server';
/**
 * @fileOverview An AI agent that converts a given script to pirate-themed speech.
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

// Output Schema
const GenerateSpokenPirateAudioOutputSchema = z.object({
  audioDataUri: z.string().describe("The generated audio as a data URI. Format: 'data:audio/wav;base64,<encoded_data>'."),
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

const generateSpokenPirateAudioFlow = ai.defineFlow(
  {
    name: 'generateSpokenPirateAudioFlow',
    inputSchema: GenerateSpokenPirateAudioInputSchema,
    outputSchema: GenerateSpokenPirateAudioOutputSchema,
  },
  async (input) => {
    // Randomly select a pirate voice
    const speakers = ['MalePirate', 'FemalePirate'];
    const selectedSpeaker = speakers[Math.floor(Math.random() * speakers.length)];
    const ttsPrompt = `${selectedSpeaker}: ${input.script}`;

    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
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

    return {
      audioDataUri: 'data:audio/wav;base64,' + wavBase64,
    };
  }
);

    
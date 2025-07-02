'use server';
/**
 * @fileOverview An AI agent that converts hint text to pirate-themed speech.
 *
 * - generateAudioHint - A function that handles the text-to-speech process.
 * - GenerateAudioHintInput - The input type for the generateAudioHint function.
 * - GenerateAudioHintOutput - The return type for the generateAudioHint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';
import {googleAI} from '@genkit-ai/googleai';

// Input schema is a simple string
const GenerateAudioHintInputSchema = z.string().describe('The hint text to be converted to speech.');
export type GenerateAudioHintInput = z.infer<typeof GenerateAudioHintInputSchema>;

// Output schema will contain the base64 encoded WAV data URI
const GenerateAudioHintOutputSchema = z.object({
  audioDataUri: z.string().describe("The generated audio as a data URI. Format: 'data:audio/wav;base64,<encoded_data>'."),
});
export type GenerateAudioHintOutput = z.infer<typeof GenerateAudioHintOutputSchema>;

// Exported wrapper function
export async function generateAudioHint(input: GenerateAudioHintInput): Promise<GenerateAudioHintOutput> {
  return generateAudioHintFlow(input);
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


const generateAudioHintFlow = ai.defineFlow(
  {
    name: 'generateAudioHintFlow',
    inputSchema: GenerateAudioHintInputSchema,
    outputSchema: GenerateAudioHintOutputSchema,
  },
  async (hintText) => {
    // Randomly select a pirate voice
    const speakers = ['MalePirate', 'FemalePirate'];
    const selectedSpeaker = speakers[Math.floor(Math.random() * speakers.length)];
    const prompt = `${selectedSpeaker}: ${hintText}`;

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
      prompt: prompt,
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

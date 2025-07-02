import { config } from 'dotenv';
config();

import '@/ai/flows/generate-pirate-script.ts';
import '@/ai/flows/generate-spoken-pirate-audio.ts';

// The original hint flow is kept for reference but is not used in the main game loop.
import '@/ai/flows/generate-hint.ts';

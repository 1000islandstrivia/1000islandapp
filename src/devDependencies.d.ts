// This file is required for TypeScript to recognize the `wav` package.
// It can be safely ignored and should not be modified.

declare module 'wav' {
  import { Transform } from 'stream';

  interface WriterOptions {
    format?: 'lpcm';
    channels?: number;
    sampleRate?: number;
    bitDepth?: number;
  }

  export class Writer extends Transform {
    constructor(options?: WriterOptions);
  }

  // Add other exports from the `wav` package if needed
}

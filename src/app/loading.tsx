import { Compass } from 'lucide-react';
import Image from 'next/image';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <Image
        src="https://i.imgur.com/U8X6gGq.png"
        alt="Scenic river and mountains background"
        fill
        style={{objectFit: "cover"}}
        quality={85}
        className="fixed inset-0 z-[-1] opacity-40"
        data-ai-hint="river mountains"
        priority
      />
      <div className="fixed inset-0 bg-background/50 z-[-1]" />
      <div className="flex flex-col items-center justify-center">
        <Compass className="w-16 h-16 animate-spin text-primary mb-4" />
        <h1 className="text-2xl font-headline text-primary">Loading Your Voyage...</h1>
        <p className="text-foreground/70 mt-2">Please wait a moment.</p>
      </div>
    </div>
  );
}

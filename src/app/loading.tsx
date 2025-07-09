import { Compass } from 'lucide-react';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Compass className="w-16 h-16 animate-spin text-primary mb-4" />
      <h1 className="text-2xl font-headline text-primary">Loading Your Voyage...</h1>
      <p className="text-foreground/70 mt-2">Please wait a moment.</p>
    </div>
  );
}

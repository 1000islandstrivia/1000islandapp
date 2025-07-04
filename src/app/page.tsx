import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { ScrollText, Compass, Ship } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
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
      <div className="fixed inset-0 bg-background/70 z-[-1]" /> {/* Overlay for readability */}
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center container mx-auto px-4 py-12 text-center">
        <ScrollText className="w-24 h-24 text-primary mb-6" />
        <h1 className="text-5xl md:text-6xl font-headline font-bold text-primary mb-4">
          1000 Islands RiverRat Lore
        </h1>
        <p className="text-xl text-foreground/80 mb-8 max-w-2xl">
          Embark on a thrilling trivia adventure through the historic Thousand Islands and the majestic St. Lawrence River. Uncover secrets, test your knowledge, and become a true RiverRat!
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-transform">
            <Link href="/login">Begin Your Journey (Login)</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 shadow-lg transform hover:scale-105 transition-transform">
            <Link href="/register">Chart a New Course (Register)</Link>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
          <Card className="bg-card/80 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-primary">
                <Compass className="w-6 h-6 text-accent" />
                Explore & Discover
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">Navigate through rich history and captivating tales of the Thousand Islands.</p>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-primary">
                <ScrollText className="w-6 h-6 text-accent" />
                Unravel Mysteries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">Answer trivia, collect hints, and piece together a grand storyline.</p>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-primary">
                <Ship className="w-6 h-6 text-accent" />
                Compete & Conquer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">Challenge fellow RiverRats in multiplayer trivia and climb the leaderboard.</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

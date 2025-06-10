
"use client";

import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PlayCircle, ListOrdered, BookOpen, Trophy, Users, HelpCircle, type LucideIcon } from 'lucide-react';
import Image from 'next/image';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <HelpCircle className="w-12 h-12 animate-spin text-primary" />
        <p className="ml-4 text-xl">Loading your voyage...</p>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-4xl text-primary">
              Welcome, {user.username}!
            </CardTitle>
            <CardDescription className="text-lg">
              Your Thousand Islands adventure awaits. What would you like to explore today?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-[2/1] w-full rounded-lg overflow-hidden mb-6 shadow-md">
              <Image 
                src="https://i.imgur.com/VwypPaT.png" 
                alt="Thousand Islands scenic view with a bridge" 
                fill
                style={{objectFit: "cover"}}
                data-ai-hint="islands river"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                <h3 className="text-white text-2xl font-semibold font-headline">The River Calls...</h3>
              </div>
            </div>
             <p className="text-foreground/80 mb-6">
              Navigate through challenges, uncover secrets, and etch your name in the annals of RiverRat Lore.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Start Trivia"
            description="Test your knowledge of the Thousand Islands."
            href="/trivia"
            icon={PlayCircle}
            buttonText="Play Now"
          />
          <DashboardCard
            title="View Leaderboard"
            description="See how you rank among fellow RiverRats."
            href="/leaderboard"
            icon={ListOrdered}
            buttonText="Check Rankings"
          />
          <DashboardCard
            title="Storyline Progress"
            description="Track your journey and unlocked hints."
            href="/storyline"
            icon={BookOpen}
            buttonText="View Story"
          />
          <DashboardCard
            title="Achievements"
            description="View your earned accolades and trophies."
            href="/achievements"
            icon={Trophy}
            buttonText="See Badges"
          />
          <DashboardCard
            title="Multiplayer (Coming Soon)"
            description="Challenge friends in real-time trivia battles."
            href="#"
            icon={Users}
            buttonText="Learn More"
            disabled
          />
        </div>
      </div>
    </MainLayout>
  );
}

interface DashboardCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  buttonText: string;
  disabled?: boolean;
}

function DashboardCard({ title, description, href, icon: Icon, buttonText, disabled }: DashboardCardProps) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="flex-row items-center gap-4 pb-4">
        <Icon className="w-10 h-10 text-accent" />
        <div>
          <CardTitle className="font-headline text-2xl text-primary">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-foreground/70">{description}</p>
      </CardContent>
      <CardContent>
         <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={disabled}>
          <Link href={href}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

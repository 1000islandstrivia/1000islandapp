
"use client";

import MainLayout from '@/components/layout/MainLayout';
import LeaderboardTable from '@/components/leaderboard/LeaderboardTable';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ListOrdered, HelpCircle } from 'lucide-react';
import { playerRanks, type PlayerRank } from '@/lib/trivia-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import React from 'react';


export default function LeaderboardPage() {
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
        <p className="ml-4 text-xl">Loading Leaderboard...</p>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="text-center mb-12">
        <ListOrdered className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-5xl font-headline font-bold text-primary">RiverRat Rankings</h1>
        <p className="text-xl text-foreground/80 mt-2">See who's mastering the lore of the Thousand Islands!</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow lg:w-3/5 xl:w-2/3">
          <LeaderboardTable />
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Gold is updated in real-time. Keep playing to climb the ranks!</p>
          </div>
        </div>

        <div className="lg:w-2/5 xl:w-1/3">
          <Card className="bg-card/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Player Ranks</CardTitle>
              <CardDescription>Climb the ladder from Seaman Recruit to Admiral!</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] sm:h-[500px] pr-3">
                <div className="space-y-3">
                  {playerRanks.map((rank: PlayerRank) => {
                    const IconComponent = rank.icon;
                    return (
                      <div
                        key={rank.title}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg border transition-all",
                          user && user.rankTitle === rank.title
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "bg-card/50 border-border hover:bg-muted/60 hover:border-primary/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {IconComponent && (
                            <IconComponent className={cn("w-6 h-6 shrink-0", user && user.rankTitle === rank.title ? "text-accent" : "text-accent")} />
                          )}
                          <span className={cn("font-medium", user && user.rankTitle === rank.title ? "text-primary-foreground" : "text-card-foreground")}>{rank.title}</span>
                        </div>
                        <span className={cn("text-xs sm:text-sm", user && user.rankTitle === rank.title ? "text-primary-foreground/80" : "text-muted-foreground")}>
                          {rank.minScore.toLocaleString()}+ Gold
                        </span>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}


"use client";

import type { Achievement } from '@/lib/trivia-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Unlock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AchievementsDisplayProps {
  achievements: Achievement[];
}

export default function AchievementsDisplay({ achievements }: AchievementsDisplayProps) {
  if (!achievements || achievements.length === 0) {
    return (
      <Card className="bg-card/90 backdrop-blur-sm shadow-lg text-center">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary">No Achievements Yet</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/70">Play some trivia to start earning achievements!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {achievements.map((ach) => {
        const IconComponent = ach.icon;
        return (
          <Card 
            key={ach.id} 
            className={cn(
              "bg-card/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow flex flex-col",
              ach.unlocked ? "border-accent ring-1 ring-accent" : "border-border opacity-70"
            )}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                {IconComponent && <IconComponent className={cn("w-10 h-10", ach.unlocked ? "text-accent" : "text-muted-foreground")} />}
                {ach.unlocked ? 
                  <Unlock className="w-6 h-6 text-green-500" /> : 
                  <Lock className="w-6 h-6 text-red-500" />
                }
              </div>
              <CardTitle className={cn("font-headline text-xl", ach.unlocked ? "text-primary" : "text-muted-foreground")}>
                {ach.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className={cn(ach.unlocked ? "text-foreground/80" : "text-muted-foreground/80")}>
                {ach.description}
              </CardDescription>
            </CardContent>
            <CardContent className="pt-3 text-xs">
              <p className={cn("italic", ach.unlocked ? "text-accent/90" : "text-muted-foreground/70")}>
                Criteria: {ach.criteria}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

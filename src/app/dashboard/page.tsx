"use client";

import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { PlayCircle, ListOrdered, BookOpen, Trophy, Users, HelpCircle, type LucideIcon, Database, PlusCircle, Trash2, BookText, RefreshCw, BarChart } from 'lucide-react';
import Image from 'next/image';
import { runDatabaseSeed } from '@/actions/seedDatabaseAction';
import { runDeduplication } from '@/actions/deduplicateAction';
import { getLogsAction } from '@/actions/getLogsAction';
import { clearLogsAction } from '@/actions/clearLogsAction';
import type { LogEntry } from '@/services/logService';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import VarietyMonitor from '@/components/admin/VarietyMonitor';
import { getTriviaQuestions } from '@/services/triviaService';


export default function DashboardPage() {
  const { user, loading, refreshUser } = useAuth();
  const router = useRouter();
  const initialRefreshCalledRef = useRef(false);

  const [seedStatus, setSeedStatus] = useState('');
  const [isSeeding, setIsSeeding] = useState(false);
  const [dedupStatus, setDedupStatus] = useState('');
  const [isDeduplicating, setIsDeduplicating] = useState(false);

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isFetchingLogs, setIsFetchingLogs] = useState(false);
  const [showVarietyMonitor, setShowVarietyMonitor] = useState(false);


  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user && !loading && !initialRefreshCalledRef.current) {
      refreshUser();
       // Pre-warm the question cache on dashboard load
      console.log('Pre-warming question cache...');
      getTriviaQuestions().catch(console.error);
      initialRefreshCalledRef.current = true;
    }
  }, [user, loading, router, refreshUser]);

  useEffect(() => {
      if (!user) {
          initialRefreshCalledRef.current = false;
      }
  }, [user]);

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    setSeedStatus('Seeding in progress... This may take a moment.');
    if (!user) {
        setSeedStatus('Error: You must be logged in to seed the database.');
        setIsSeeding(false);
        return;
    }
    const result = await runDatabaseSeed(user.username);
    setSeedStatus(result.message);
    setIsSeeding(false);
  };

  const handleDeduplicate = async () => {
    setIsDeduplicating(true);
    setDedupStatus('Scanning for duplicates... This may take a moment.');
    if (!user) {
      setDedupStatus('Error: You must be logged in.');
      setIsDeduplicating(false);
      return;
    }
    const result = await runDeduplication(user.username);
    setDedupStatus(result.message);
    setIsDeduplicating(false);
  };
  
  const handleFetchLogs = async () => {
    if (!user) return;
    setIsFetchingLogs(true);
    const fetchedLogs = await getLogsAction(user.username);
    setLogs(fetchedLogs);
    setIsFetchingLogs(false);
  };

  const handleClearLogs = async () => {
    if (!user) return;
    await clearLogsAction(user.username);
    setLogs([]);
  };

  useEffect(() => {
    if (user?.username === 'Dan') {
      handleFetchLogs();
    }
  }, [user]);


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
            <CardTitle className="font-headline text-3xl sm:text-4xl text-primary">
              Welcome, {user.rankTitle && user.rankIcon && (() => {
                const RankIcon = user.rankIcon;
                return <RankIcon className="w-7 h-7 inline-block mr-2 text-accent" />;
              })()}
              {user.rankTitle || 'Captain'} {user.username}!
            </CardTitle>
            <CardDescription className="text-md sm:text-lg">
              Your Thousand Islands adventure awaits. Total Gold: <span className="text-accent font-semibold">{user.score?.toLocaleString() || 0}</span>.
              What would you like to explore today?
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
            description="Track your journey and unlocked lore."
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
           {user.username === 'Dan' && (
              <DashboardCard
                title="Admin: Add Question"
                description="Add a new trivia question to the database."
                href="/admin/add-question"
                icon={PlusCircle}
                buttonText="Add Question"
              />
            )}
        </div>

        {user.username === 'Dan' && (
          <div className="mt-6">
            <Button onClick={() => setShowVarietyMonitor(!showVarietyMonitor)} className="mb-4">
              <BarChart className="mr-2 h-4 w-4" />
              {showVarietyMonitor ? 'Hide' : 'Show'} Variety Monitor
            </Button>
            {showVarietyMonitor && <VarietyMonitor />}
          </div>
        )}

        {user.username === 'Dan' && (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
             <Card className="bg-secondary/30 backdrop-blur-sm shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle className="font-headline text-xl text-primary flex items-center gap-2"><BookText /> Captain's Log (Debug)</CardTitle>
                <CardDescription>
                  Real-time server logs for debugging AI and other actions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                    <Button onClick={handleFetchLogs} disabled={isFetchingLogs}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh Logs
                    </Button>
                     <Button onClick={handleClearLogs} variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear Logs
                    </Button>
                </div>
                <ScrollArea className="h-48 w-full rounded-md border bg-background p-2">
                    {isFetchingLogs ? (<p>Fetching logs...</p>) : logs.length > 0 ? (
                        logs.map((log, index) => (
                            <div key={index} className="text-xs font-mono text-muted-foreground border-b border-border/50 py-1">
                                <span className="text-primary/70">{log.timestamp}:</span> {log.message}
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-center text-muted-foreground p-4">No log entries yet. Perform an action to see logs here.</p>
                    )}
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-xl text-primary">Database Setup</CardTitle>
                <CardDescription>
                  Populate Firestore with any missing trivia questions from the source file.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleSeedDatabase} disabled={isSeeding} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Database className="mr-2 h-4 w-4" />
                  {isSeeding ? 'Seeding...' : 'Seed Trivia Questions'}
                </Button>
                {seedStatus && <p className="mt-4 text-sm text-muted-foreground">{seedStatus}</p>}
                <Button onClick={handleDeduplicate} disabled={isDeduplicating} variant="destructive" className="mt-4">
                  <Trash2 className="mr-2 h-4 w-4" />
                  {isDeduplicating ? 'Cleaning...' : 'Remove Duplicates'}
                </Button>
                 {dedupStatus && <p className="mt-4 text-sm text-muted-foreground">{dedupStatus}</p>}
              </CardContent>
            </Card>
           
          </div>
        )}
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
          <CardTitle className="font-headline text-xl sm:text-2xl text-primary">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-foreground/70 text-sm sm:text-base">{description}</p>
      </CardContent>
      <CardContent>
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base" disabled={disabled}>
           <Link href={!disabled ? href : '#'}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
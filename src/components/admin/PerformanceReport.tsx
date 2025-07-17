
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw, Server, Zap, Database, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { getTriviaQuestions } from '@/services/triviaService';
import { getLeaderboard } from '@/services/leaderboardService';
import { isPersistenceEnabled, db } from '@/lib/firebase'; // Assuming db is exported for a direct check

interface Report {
  questionLoadTime: number | null;
  questionCount: number | null;
  leaderboardLoadTime: number | null;
  leaderboardCount: number | null;
  persistenceStatus: 'Enabled' | 'Disabled' | 'Failed' | 'Checking...';
}

export default function PerformanceReport() {
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runReport = async () => {
    setIsLoading(true);
    setReport({
        questionLoadTime: null,
        questionCount: null,
        leaderboardLoadTime: null,
        leaderboardCount: null,
        persistenceStatus: 'Checking...',
    });

    // Check persistence status
    const persistence = await isPersistenceEnabled();
    
    // Test Question Loading
    const qStartTime = performance.now();
    const questions = await getTriviaQuestions();
    const qEndTime = performance.now();
    
    // Test Leaderboard Loading
    const lStartTime = performance.now();
    const leaderboard = await getLeaderboard();
    const lEndTime = performance.now();

    setReport({
      questionLoadTime: Math.round(qEndTime - qStartTime),
      questionCount: questions.length,
      leaderboardLoadTime: Math.round(lEndTime - lStartTime),
      leaderboardCount: leaderboard.length,
      persistenceStatus: persistence ? 'Enabled' : 'Disabled',
    });
    setIsLoading(false);
  };

  useEffect(() => {
    runReport();
  }, []);

  const PersistenceIcon = ({ status }: { status: Report['persistenceStatus'] }) => {
    switch (status) {
      case 'Enabled':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Disabled':
        return <XCircle className="h-5 w-5 text-destructive" />;
      case 'Failed':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Loader2 className="h-5 w-5 animate-spin" />;
    }
  };

  return (
    <Card className="bg-card/90 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Zap className="h-7 w-7 text-primary" />
                <CardTitle className="font-headline text-2xl text-primary">Performance Report</CardTitle>
            </div>
            <Button onClick={runReport} disabled={isLoading} variant="ghost" size="icon">
                <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="sr-only">Refresh Report</span>
            </Button>
        </div>
        <CardDescription>Live metrics for app performance and data loading.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading && !report ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-3 text-muted-foreground">Running diagnostics...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2"><Database className="h-4 w-4"/> Questions</h3>
              <p className="text-2xl font-bold text-primary">{report?.questionLoadTime ?? '...'}ms</p>
              <p className="text-xs text-muted-foreground">{report?.questionCount ?? '...'} questions fetched</p>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2"><Server className="h-4 w-4"/> Leaderboard</h3>
              <p className="text-2xl font-bold text-primary">{report?.leaderboardLoadTime ?? '...'}ms</p>
              <p className="text-xs text-muted-foreground">{report?.leaderboardCount ?? '...'} users fetched</p>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
                <PersistenceIcon status={report?.persistenceStatus || 'Checking...'} />
                Offline Cache
              </h3>
              <p className="text-2xl font-bold text-primary">{report?.persistenceStatus ?? '...'}</p>
              <p className="text-xs text-muted-foreground">Firestore Persistence</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

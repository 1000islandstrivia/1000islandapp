
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw, Zap, Copy, Trash2 } from 'lucide-react';
import { getTriviaQuestions } from '@/services/triviaService';
import { getLeaderboard } from '@/services/leaderboardService';
import { isPersistenceEnabled } from '@/lib/firebase';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getTriviaStatsAction } from '@/actions/getTriviaStatsAction';
import { clearTriviaCacheAction } from '@/actions/clearTriviaCacheAction';

interface Report {
  questionLoadTime: number | null;
  questionCount: number | null;
  leaderboardLoadTime: number | null;
  leaderboardCount: number | null;
  persistenceStatus: 'Enabled' | 'Disabled' | 'Failed' | 'Checking...';
  serverCacheStats: {
    serverCacheSize: number;
    questionCacheEntries: number;
    hintCacheEntries: number;
  } | null;
}

export default function PerformanceReport() {
  const [report, setReport] = useState<Report | null>(null);
  const [reportText, setReportText] = useState("Click 'Run Report' to generate performance data.");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateReportText = (currentReport: Report | null): string => {
    if (!currentReport) {
      return "Report has not been run or failed to generate.";
    }
    const { 
      questionLoadTime, 
      questionCount, 
      leaderboardLoadTime, 
      leaderboardCount, 
      persistenceStatus,
      serverCacheStats 
    } = currentReport;
    
    const cacheInfo = serverCacheStats ? `
[Server-Side Cache]
- Total Items:               ${serverCacheStats.serverCacheSize}
- Question Sets Cached:      ${serverCacheStats.questionCacheEntries}
- Individual Hints Cached:   ${serverCacheStats.hintCacheEntries}` 
: `
[Server-Side Cache]
- Stats unavailable.
`;

    return `
RiverRat Lore Performance Report
------------------------------------
Generated: ${new Date().toISOString()}

[Client-Side Firestore Metrics]
- Offline Cache (Persistence): ${persistenceStatus}
- Question Fetch Time:         ${questionLoadTime}ms
- Questions Fetched:           ${questionCount}
- Leaderboard Fetch Time:      ${leaderboardLoadTime}ms
- Leaderboard Users Fetched:   ${leaderboardCount}
${cacheInfo}

[Analysis]
- Question loading appears to be the most intensive initial query. Times over 500ms could indicate a need for query optimization or caching review.
- Leaderboard loading should be consistently fast. Spikes could indicate high traffic or a need for more aggressive caching.
- Offline Cache being 'Disabled' or 'Failed' will result in slower load times for repeat visitors on the client-side.
    `;
  };

  const runReport = async () => {
    setIsLoading(true);
    setReportText("Running diagnostics...");
    const initialReportState: Report = {
      questionLoadTime: null,
      questionCount: null,
      leaderboardLoadTime: null,
      leaderboardCount: null,
      persistenceStatus: 'Checking...',
      serverCacheStats: null,
    };
    
    setReport(initialReportState);
    
    const [persistence, serverCacheStats] = await Promise.all([
      isPersistenceEnabled(),
      getTriviaStatsAction()
    ]);
    
    const qStartTime = performance.now();
    const questions = await getTriviaQuestions();
    const qEndTime = performance.now();

    const lStartTime = performance.now();
    const leaderboard = await getLeaderboard();
    const lEndTime = performance.now();

    const finalReport: Report = {
      questionLoadTime: Math.round(qEndTime - qStartTime),
      questionCount: questions.length,
      leaderboardLoadTime: Math.round(lEndTime - lStartTime),
      leaderboardCount: leaderboard.length,
      persistenceStatus: persistence ? 'Enabled' : 'Disabled',
      serverCacheStats: serverCacheStats,
    };
    
    setReport(finalReport);
    setReportText(generateReportText(finalReport).trim());
    setIsLoading(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(reportText);
    toast({
      title: "Report Copied!",
      description: "The performance log is now on your clipboard.",
    });
  };

  const handleClearCache = async () => {
    await clearTriviaCacheAction();
    toast({
      title: "Server Cache Cleared",
      description: "The server-side cache has been emptied.",
    });
    await runReport();
  };

  useEffect(() => {
    runReport();
  }, []);

  return (
    <Card className="bg-card/90 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Zap className="h-7 w-7 text-primary" />
                <CardTitle className="font-headline text-2xl text-primary">Performance Report</CardTitle>
            </div>
            <div className="flex items-center gap-2">
                <Button onClick={handleClearCache} disabled={isLoading} variant="destructive" size="icon">
                    <Trash2 className="h-5 w-5" />
                    <span className="sr-only">Clear Server Cache</span>
                </Button>
                <Button onClick={runReport} disabled={isLoading} variant="ghost" size="icon">
                    <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                    <span className="sr-only">Refresh Report</span>
                </Button>
                 <Button onClick={handleCopyToClipboard} disabled={isLoading || !report} variant="ghost" size="icon">
                    <Copy className="h-5 w-5" />
                    <span className="sr-only">Copy Report</span>
                </Button>
            </div>
        </div>
        <CardDescription>A detailed record of app performance metrics. Use the trash icon to clear the server-side cache.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading && !report ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-3 text-muted-foreground">Running diagnostics...</p>
          </div>
        ) : (
          <Textarea
            readOnly
            value={reportText}
            className="h-72 font-mono text-xs bg-muted/30"
            placeholder="Generating report..."
          />
        )}
      </CardContent>
    </Card>
  );
}

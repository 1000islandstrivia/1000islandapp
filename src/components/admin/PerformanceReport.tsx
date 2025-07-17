
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw, Zap, Copy } from 'lucide-react';
import { getTriviaQuestions } from '@/services/triviaService';
import { getLeaderboard } from '@/services/leaderboardService';
import { isPersistenceEnabled } from '@/lib/firebase';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Report {
  questionLoadTime: number | null;
  questionCount: number | null;
  leaderboardLoadTime: number | null;
  leaderboardCount: number | null;
  persistenceStatus: 'Enabled' | 'Disabled' | 'Failed' | 'Checking...';
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
    return `
RiverRat Lore Performance Report
------------------------------------
Generated: ${new Date().toISOString()}

[Firestore Metrics]
- Offline Cache (Persistence): ${currentReport.persistenceStatus}
- Question Fetch Time:         ${currentReport.questionLoadTime}ms
- Questions Fetched:           ${currentReport.questionCount}
- Leaderboard Fetch Time:      ${currentReport.leaderboardLoadTime}ms
- Leaderboard Users Fetched:   ${currentReport.leaderboardCount}

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
    };
    
    setReport(initialReportState);
    const persistence = await isPersistenceEnabled();
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
        <CardDescription>A detailed record of app performance metrics you can copy and paste.</CardDescription>
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
            className="h-64 font-mono text-xs bg-muted/30"
            placeholder="Generating report..."
          />
        )}
      </CardContent>
    </Card>
  );
}

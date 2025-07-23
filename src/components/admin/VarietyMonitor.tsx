"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getVarietyStats as getServerVarietyStats } from '@/services/triviaService';
import { RefreshCw, TrendingUp, Users, Database } from 'lucide-react';

// --- Client-side utility functions moved from triviaService.ts ---

/**
 * Clears the user's question history from localStorage.
 */
function clearQuestionHistory() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userQuestionHistory');
  }
}

/**
 * Retrieves the user's question history from localStorage.
 */
function getUserQuestionHistory(): string[] {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('userQuestionHistory') || '[]');
  }
  return [];
}


export default function VarietyMonitor() {
  const [stats, setStats] = useState({ poolSize: 0, questionsUsed: 0, varietyScore: 0, poolAge: 0 });
  const [userHistory, setUserHistory] = useState<string[]>([]);
  
  const refreshStats = async () => {
    // Fetch server stats
    const serverStats = await getServerVarietyStats();
    
    // Get client history
    const history = getUserQuestionHistory();
    setUserHistory(history);
    
    // Combine server stats with client-specific history
    const seenInPrimary = serverStats.poolQuestionIds.filter(id => history.includes(id));
    const varietyScore = 1 - (seenInPrimary.length / (serverStats.poolSize || 1));

    setStats({
      poolSize: serverStats.poolSize,
      questionsUsed: seenInPrimary.length,
      varietyScore: varietyScore,
      poolAge: serverStats.poolAge,
    });
  };
  
  useEffect(() => {
    refreshStats();
  }, []);
  
  const clearUserHistoryAndRefresh = () => {
    clearQuestionHistory();
    refreshStats();
  };
  
  const getVarietyColor = (score: number) => {
    if (score >= 0.8) return 'bg-green-500';
    if (score >= 0.5) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const getVarietyLabel = (score: number) => {
    if (score >= 0.8) return 'Excellent';
    if (score >= 0.5) return 'Good';
    return 'Needs Refresh';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Question Variety Monitor
          </CardTitle>
          <Button onClick={refreshStats} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Pool Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.poolSize}</div>
              <div className="text-sm text-muted-foreground">Pool Size</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{stats.questionsUsed}</div>
              <div className="text-sm text-muted-foreground">Questions Used</div>
            </div>
            <div className="text-center">
              <Badge className={getVarietyColor(stats.varietyScore)}>
                {isNaN(stats.varietyScore) ? 'N/A' : (stats.varietyScore * 100).toFixed(0) + '%'}
              </Badge>
              <div className="text-sm text-muted-foreground mt-1">
                {getVarietyLabel(stats.varietyScore)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.poolAge}m</div>
              <div className="text-sm text-muted-foreground">Pool Age</div>
            </div>
          </div>
          
          {/* User History */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Your Question History
              </h3>
              <Button onClick={clearUserHistoryAndRefresh} variant="destructive" size="sm">
                Clear History
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              You've seen {userHistory.length} questions recently
            </div>
            <div className="mt-2 max-h-32 overflow-y-auto">
              <div className="flex flex-wrap gap-1">
                {userHistory.slice(0, 20).map((questionId) => (
                  <Badge key={questionId} variant="outline" className="text-xs">
                    {questionId}
                  </Badge>
                ))}
                {userHistory.length > 20 && (
                  <Badge variant="secondary" className="text-xs">
                    +{userHistory.length - 20} more
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {/* Status Indicators */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">System Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Variety System</span>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Question Pool</span>
                <Badge variant={stats.poolSize > 0 ? "secondary" : "destructive"}>
                  {stats.poolSize > 0 ? "Loaded" : "Empty"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cache Status</span>
                <Badge variant={stats.poolAge < 20 ? "secondary" : "outline"}>
                  {stats.poolAge < 20 ? "Fresh" : "Aging"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tips Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Variety Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>🎯 <strong>Excellent (80%+)</strong>: Fresh questions guaranteed</div>
          <div>🟡 <strong>Good (50-80%)</strong>: Some variety, will refresh soon</div>
          <div>🔴 <strong>Needs Refresh (&lt;50%)</strong>: System will load new questions</div>
          <div className="pt-2 border-t">
            <strong>System automatically:</strong>
            <ul className="ml-4 mt-1 space-y-1">
              <li>• Tracks your last 50 questions</li>
              <li>• Avoids recent questions when possible</li>
              <li>• Refreshes pool when variety drops</li>
              <li>• Loads fresh questions in background</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
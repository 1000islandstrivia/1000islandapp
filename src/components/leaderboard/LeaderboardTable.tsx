
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { LeaderboardEntry, PlayerRank } from '@/lib/trivia-data';
import { getRankByScore } from '@/lib/trivia-data';
import { Award, ChevronDown, ChevronUp, ChevronsUpDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { getLeaderboard } from '@/services/leaderboardService';
import { useToast } from "@/hooks/use-toast";
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

type SortKey = keyof LeaderboardEntry | 'rankDisplay';
type SortOrder = 'asc' | 'dsc';

export default function LeaderboardTable() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; order: SortOrder }>({ key: 'score', order: 'dsc' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAndSetLeaderboard = useCallback(async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getLeaderboard();
        const rankedData = data.map((entry, index) => {
          const playerRankDetails = getRankByScore(entry.score);
          return {
            ...entry,
            rank: index + 1,
            rankTitle: entry.rankTitle || playerRankDetails.title,
            rankIcon: playerRankDetails.icon,
          };
        });
        setLeaderboard(rankedData as LeaderboardEntry[] & {rankIcon: PlayerRank['icon']}[] );
      } catch (err: any) {
        console.error("Failed to fetch leaderboard:", err);
        setError(err.message || "Could not load leaderboard. Please try again later.");
        toast({
          title: "Leaderboard Error",
          description: `Failed to fetch leaderboard data. Original error: ${err.message || String(err)}`,
          variant: "destructive",
        });
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
  }, [toast]);

  useEffect(() => {
    fetchAndSetLeaderboard();
  }, [fetchAndSetLeaderboard]);

  const sortedLeaderboard = () => {
    let sortableItems = [...leaderboard];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key === 'rankDisplay') {
          return sortConfig.order === 'asc' ? (a.rank ?? 0) - (b.rank ?? 0) : (b.rank ?? 0) - (a.rank ?? 0);
        }

        const valA = a[sortConfig.key as keyof LeaderboardEntry];
        const valB = b[sortConfig.key as keyof LeaderboardEntry];

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortConfig.order === 'asc' ? valA - valB : valB - valA;
        }
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortConfig.order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return 0;
      });
    }
    return sortableItems;
  };

  const requestSort = (key: SortKey) => {
    let order: SortOrder = 'dsc';
    if (sortConfig.key === key && sortConfig.order === 'dsc') {
      order = 'asc';
    } else if (sortConfig.key === key && sortConfig.order === 'asc') {
      order = 'dsc';
    } else if (key === 'name') {
      order = 'asc';
    } else if (key === 'rankDisplay') {
      order = 'asc';
    }
    setSortConfig({ key, order });
  };

  const getSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) {
      return <ChevronsUpDown className="ml-1 h-3 w-3 opacity-50" />;
    }
    return sortConfig.order === 'asc' ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 bg-card/90 backdrop-blur-sm rounded-lg shadow-md min-h-[200px]">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="ml-3 text-lg text-muted-foreground">Loading RiverRat Rankings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-destructive/10 backdrop-blur-sm rounded-lg shadow-md border border-destructive">
        <p className="text-xl text-destructive-foreground">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">Try Again</Button>
      </div>
    );
  }

  if (!leaderboard.length) {
    return (
      <div className="text-center p-8 bg-card/90 backdrop-blur-sm rounded-lg shadow-md">
        <p className="text-xl text-muted-foreground">The leaderboard is currently empty.</p>
        <p className="text-sm text-muted-foreground mt-2">Play some trivia to get your name on the board!</p>
      </div>
    );
  }

  const displayData = sortedLeaderboard();

  return (
    <ScrollArea className="h-[500px] rounded-lg border shadow-lg bg-card/90 backdrop-blur-sm">
      <Table>
        <TableHeader className="sticky top-0 bg-card/95 z-10">
          <TableRow className="hover:bg-muted/0">
            <TableHead className="w-[60px] text-center px-2 sm:px-4">
                 <Button variant="ghost" onClick={() => requestSort('rankDisplay')} className="px-1 hover:bg-transparent text-primary font-semibold text-xs sm:text-sm">
                    RANK {getSortIcon('rankDisplay')}
                </Button>
            </TableHead>
            <TableHead className="px-2 sm:px-4">
                <Button variant="ghost" onClick={() => requestSort('name')} className="px-1 hover:bg-transparent text-primary font-semibold text-xs sm:text-sm">
                    PLAYER {getSortIcon('name')}
                </Button>
            </TableHead>
            <TableHead className="text-right px-2 sm:px-4">
                 <Button variant="ghost" onClick={() => requestSort('score')} className="px-1 hover:bg-transparent text-primary font-semibold text-xs sm:text-sm">
                    GOLD {getSortIcon('score')}
                </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayData.map((entry: LeaderboardEntry & { rankIcon?: PlayerRank['icon'] } , index) => (
            <TableRow
              key={entry.id}
              className={cn(
                "transition-all duration-300 ease-in-out hover:bg-primary/10",
                (entry.rank ?? Infinity) <= 3 && "bg-accent/10 hover:bg-accent/20",
                user && entry.id === user.username && "bg-primary/20"
              )}
            >
              <TableCell className="text-center font-medium text-base px-2 sm:px-4">
                <div className="flex items-center justify-center">
                  {(entry.rank ?? Infinity) <= 3 ? (
                    <Award
                      className={cn(
                        "w-6 h-6",
                        entry.rank === 1 && "text-yellow-400",
                        entry.rank === 2 && "text-slate-400",
                        entry.rank === 3 && "text-yellow-600"
                      )}
                    />
                  ) : (
                    <span>{entry.rank}</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="px-2 sm:px-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Avatar className="h-6 w-6 sm:h-8 sm:w-8 border-2 border-primary/50">
                    <AvatarImage src={entry.avatar || `https://placehold.co/40x40.png?text=${entry.name.substring(0,2).toUpperCase()}`} alt={entry.name} data-ai-hint="player avatar"/>
                    <AvatarFallback>{entry.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className={cn("font-medium text-xs sm:text-sm truncate", user && entry.id === user.username && "text-primary font-bold")}>{entry.name}</span>
                </div>
              </TableCell>
              <TableCell className={cn("text-right font-semibold text-xs sm:text-base pr-2 sm:pr-4", user && entry.id === user.username && "text-primary")}>{entry.score.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}

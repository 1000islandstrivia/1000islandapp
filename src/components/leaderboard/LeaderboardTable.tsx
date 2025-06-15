
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { LeaderboardEntry } from '@/lib/trivia-data';
import { Award, ChevronDown, ChevronUp, ChevronsUpDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { getLeaderboard } from '@/services/leaderboardService'; // Import Firestore service
import { useToast } from "@/hooks/use-toast";

type SortKey = keyof LeaderboardEntry | 'rank'; // Add 'rank' as a possible sort key
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
      // Add rank to each entry before sorting locally if needed
      const rankedData = data.map((entry, index) => ({ ...entry, rank: index + 1 }));
      setLeaderboard(rankedData);
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
      setError("Could not load leaderboard. Please try again later.");
      toast({
        title: "Leaderboard Error",
        description: "Failed to fetch leaderboard data.",
        variant: "destructive",
      });
      setLeaderboard([]); // Ensure leaderboard is empty on error
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAndSetLeaderboard();
  }, [fetchAndSetLeaderboard]);

  const sortedLeaderboard = useCallback(() => {
    let sortableItems = [...leaderboard];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        // Handle rank separately as it's pre-calculated based on score
        if (sortConfig.key === 'rank') {
           // Ranks are usually pre-sorted by score desc by the service.
           // If sorting by rank asc, we invert the comparison for b.rank vs a.rank
           // For desc rank, it's more complex, usually tied to score.
           // For simplicity, if sortKey is 'rank', we assume it's based on the order from DB.
           // If 'rank' asc, means lower number is better. If 'rank' dsc, higher number is better (unusual for ranks)
           // The service already orders by score desc, so rank is implicitly asc.
          if (sortConfig.order === 'asc') {
            return (a.rank ?? 0) - (b.rank ?? 0);
          } else {
            return (b.rank ?? 0) - (a.rank ?? 0);
          }
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
  }, [leaderboard, sortConfig]);

  const requestSort = (key: SortKey) => {
    let order: SortOrder = 'dsc'; 
    if (sortConfig.key === key && sortConfig.order === 'dsc') {
      order = 'asc';
    } else if (sortConfig.key === key && sortConfig.order === 'asc') {
      order = 'dsc';
    } else if (key === 'name') {
      order = 'asc'; 
    } else if (key === 'rank') {
      order = 'asc'; // Default rank sort is ascending
    }
    setSortConfig({ key, order });
  };
  
  const getSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) {
      return <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />;
    }
    return sortConfig.order === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />;
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
        <Button onClick={fetchAndSetLeaderboard} className="mt-4">Try Again</Button>
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
    <div className="overflow-hidden rounded-lg border shadow-lg bg-card/90 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-muted/0">
            <TableHead className="w-[80px] text-center">
                 <Button variant="ghost" onClick={() => requestSort('rank')} className="px-0 hover:bg-transparent text-primary font-semibold">
                    Rank {getSortIcon('rank')}
                </Button>
            </TableHead>
            <TableHead>
                <Button variant="ghost" onClick={() => requestSort('name')} className="px-0 hover:bg-transparent text-primary font-semibold">
                    Player {getSortIcon('name')}
                </Button>
            </TableHead>
            <TableHead className="text-right">
                 <Button variant="ghost" onClick={() => requestSort('score')} className="px-0 hover:bg-transparent text-primary font-semibold">
                    Score {getSortIcon('score')}
                </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayData.map((entry, index) => (
            <TableRow 
              key={entry.id} 
              className={cn(
                "transition-all duration-300 ease-in-out hover:bg-primary/10",
                (entry.rank ?? Infinity) <= 3 && "bg-accent/10 hover:bg-accent/20", // Use entry.rank
                user && entry.id === user.username && "bg-primary/20 ring-2 ring-primary font-bold"
              )}
            >
              <TableCell className="text-center font-medium text-lg">
                <div className="flex items-center justify-center">
                  {(entry.rank ?? Infinity) <= 3 ? (
                    <Award
                      className={cn(
                        "w-7 h-7",
                        entry.rank === 1 && "text-yellow-500", 
                        entry.rank === 2 && "text-slate-500", 
                        entry.rank === 3 && "text-yellow-700"  
                      )}
                    />
                  ) : (
                    <span>{entry.rank}</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-primary/50">
                    <AvatarImage src={entry.avatar || `https://placehold.co/40x40.png?text=${entry.name.substring(0,2).toUpperCase()}`} alt={entry.name} data-ai-hint="player avatar"/>
                    <AvatarFallback>{entry.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className={cn("font-medium", user && entry.id === user.username && "text-primary")}>{entry.name}</span>
                </div>
              </TableCell>
              <TableCell className={cn("text-right font-semibold text-lg", user && entry.id === user.username && "text-primary")}>{entry.score.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

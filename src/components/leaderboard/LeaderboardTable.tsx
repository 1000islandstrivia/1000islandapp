
"use client";

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { LeaderboardEntry } from '@/lib/trivia-data';
import { Award, ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

type SortKey = keyof LeaderboardEntry;
type SortOrder = 'asc' | 'dsc';

const LEADERBOARD_KEY = 'riverrat_lore_leaderboard';

export default function LeaderboardTable() {
  const { user } = useAuth(); // Get current user
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; order: SortOrder }>({ key: 'score', order: 'dsc' });

  useEffect(() => {
    let storedLeaderboard: LeaderboardEntry[] = [];
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(LEADERBOARD_KEY);
      if (data) {
        try {
          storedLeaderboard = JSON.parse(data);
        } catch (e) {
          console.error("Failed to parse leaderboard from localStorage", e);
          storedLeaderboard = [];
        }
      }
    }
    
    const sortedData = [...storedLeaderboard].sort((a, b) => {
      if (a[sortConfig.key]! < b[sortConfig.key]!) {
        return sortConfig.order === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key]! > b[sortConfig.key]!) {
        return sortConfig.order === 'asc' ? 1 : -1;
      }
      // Secondary sort by name if scores are equal
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    setLeaderboard(sortedData);
  }, [sortConfig]); // Re-run if sortConfig changes, data is fetched once initially

  const requestSort = (key: SortKey) => {
    let order: SortOrder = 'dsc'; 
    if (sortConfig.key === key && sortConfig.order === 'dsc') {
      order = 'asc';
    } else if (sortConfig.key === key && sortConfig.order === 'asc') {
      order = 'dsc';
    } else if (key === 'name') {
      order = 'asc'; 
    }
    setSortConfig({ key, order });
  };
  
  const getSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) {
      return <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />;
    }
    return sortConfig.order === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />;
  };

  if (!leaderboard.length) {
    return (
      <div className="text-center p-8 bg-card/90 backdrop-blur-sm rounded-lg shadow-md">
        <p className="text-xl text-muted-foreground">The leaderboard is currently empty.</p>
        <p className="text-sm text-muted-foreground mt-2">Play some trivia to get your name on the board!</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border shadow-lg bg-card/90 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-muted/0">
            <TableHead className="w-[80px] text-center font-semibold text-primary">Rank</TableHead>
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
          {leaderboard.map((entry, index) => (
            <TableRow 
              key={entry.id} 
              className={cn(
                "transition-all duration-300 ease-in-out hover:bg-primary/10",
                index < 3 && "bg-accent/10 hover:bg-accent/20",
                user && entry.id === user.username && "bg-primary/20 ring-2 ring-primary font-bold" // Highlight current user by username
              )}
            >
              <TableCell className="text-center font-medium text-lg">
                <div className="flex items-center justify-center">
                  {index < 3 ? (
                    <Award
                      className={cn(
                        "w-7 h-7",
                        index === 0 && "text-yellow-500", 
                        index === 1 && "text-slate-500", 
                        index === 2 && "text-yellow-700"  
                      )}
                    />
                  ) : (
                    <span>{index + 1}</span>
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

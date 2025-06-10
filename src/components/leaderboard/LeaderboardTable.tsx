"use client";

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { leaderboardData as initialLeaderboardData } from '@/lib/trivia-data';
import type { LeaderboardEntry } from '@/lib/trivia-data';
import { Award, ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SortKey = keyof LeaderboardEntry;
type SortOrder = 'asc' | 'dsc';

export default function LeaderboardTable() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; order: SortOrder }>({ key: 'score', order: 'dsc' });

  useEffect(() => {
    // Simulate fetching data and sorting
    const sortedData = [...initialLeaderboardData].sort((a, b) => {
      if (a[sortConfig.key]! < b[sortConfig.key]!) {
        return sortConfig.order === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key]! > b[sortConfig.key]!) {
        return sortConfig.order === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setLeaderboard(sortedData);
  }, [sortConfig]);

  const requestSort = (key: SortKey) => {
    let order: SortOrder = 'dsc'; // Default to descending for score, ascending for name
    if (sortConfig.key === key && sortConfig.order === 'dsc') {
      order = 'asc';
    } else if (sortConfig.key === key && sortConfig.order === 'asc') {
      order = 'dsc';
    } else if (key === 'name') {
      order = 'asc'; // Default name sort to ascending
    }
    setSortConfig({ key, order });
  };
  
  const getSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) {
      return <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />;
    }
    return sortConfig.order === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />;
  };


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
                entry.name === "You" && "bg-primary/20 ring-2 ring-primary font-bold" // Highlight current user
              )}
            >
              <TableCell className="text-center font-medium text-lg">
                <div className="flex items-center justify-center">
                  {index < 3 ? (
                    <Award
                      className={cn(
                        "w-7 h-7",
                        index === 0 && "text-yellow-500", // Gold
                        index === 1 && "text-slate-500", // Silver
                        index === 2 && "text-yellow-700"  // Bronze
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
                    <AvatarImage src={entry.avatar || `https://placehold.co/40x40.png?text=${entry.name.substring(0,2).toUpperCase()}`} alt={entry.name} data-ai-hint="player avatar" />
                    <AvatarFallback>{entry.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className={cn("font-medium", entry.name === "You" && "text-primary")}>{entry.name}</span>
                </div>
              </TableCell>
              <TableCell className={cn("text-right font-semibold text-lg", entry.name === "You" && "text-primary")}>{entry.score.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
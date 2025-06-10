import type { LucideIcon } from 'lucide-react';
import { Castle, Diamond, Fish, Scroll, Ship, Star, Trophy, Leaf } from 'lucide-react';

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  storylineHintKey: string;
}

export const triviaQuestions: TriviaQuestion[] = [
  {
    id: '1',
    question: "What is the name of the famous castle on Heart Island?",
    options: ["Singer Castle", "Boldt Castle", "Castle Rest", "Jorstadt Castle"],
    answer: "Boldt Castle",
    storylineHintKey: "boldt_secret_1",
  },
  {
    id: '2',
    question: "Which two countries share the Thousand Islands?",
    options: ["USA & Mexico", "Canada & France", "USA & Canada", "UK & USA"],
    answer: "USA & Canada",
    storylineHintKey: "border_mystery_1",
  },
  {
    id: '3',
    question: "What is the smallest inhabited island in the Thousand Islands called?",
    options: ["Just Room Enough Island", "Little Island", "Tiny Isle", "One Tree Island"],
    answer: "Just Room Enough Island",
    storylineHintKey: "small_island_clue_1",
  },
  {
    id: '4',
    question: "The St. Lawrence Seaway connects the Great Lakes to which ocean?",
    options: ["Pacific Ocean", "Arctic Ocean", "Atlantic Ocean", "Indian Ocean"],
    answer: "Atlantic Ocean",
    storylineHintKey: "seaway_journey_1",
  },
   {
    id: '5',
    question: "Which famous pirate is rumored to have hidden treasure in the Thousand Islands?",
    options: ["Blackbeard", "Captain Kidd", "Calico Jack", "Bill Johnston"],
    answer: "Bill Johnston",
    storylineHintKey: "pirate_treasure_1",
  },
];

export interface StorylineHint {
  key: string;
  title: string;
  text: string;
  unlocked: boolean;
  icon?: LucideIcon;
}

export const storyline: StorylineHint[] = [
  { key: "boldt_secret_1", title: "The Heart's Whisper", text: "A love story tragically cut short, yet echoes remain within the stone walls...", unlocked: false, icon: Castle },
  { key: "border_mystery_1", title: "Two Shores, One River", text: "The waters flow freely, but lines on a map tell tales of smugglers and divided loyalties.", unlocked: false, icon: Scroll },
  { key: "small_island_clue_1", title: "A Tiny Kingdom", text: "Where a single misstep could mean an international incident, or just wet feet.", unlocked: false, icon: Leaf },
  { key: "seaway_journey_1", title: "Path of Giants", text: "Steel behemoths traverse these waters, carrying goods and secrets between continents.", unlocked: false, icon: Ship },
  { key: "pirate_treasure_1", title: "The River Rat's Gold", text: "They say ol' Bill Johnston stashed his ill-gotten gains where only the cleverest could find it.", unlocked: false, icon: Diamond },
  { key: "final_revelation", title: "The River's Heart", text: "The true treasure of the Thousand Islands isn't gold or jewels, but the enduring spirit of its history and people.", unlocked: false, icon: Star }
];

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  avatar?: string; // URL to avatar image
}

export const leaderboardData: LeaderboardEntry[] = [
  { id: 'player1', name: "CaptainRiverRat", score: 1250, avatar: "https://placehold.co/40x40.png?text=CR" },
  { id: 'player2', name: "IsleExplorer", score: 1100, avatar: "https://placehold.co/40x40.png?text=IE" },
  { id: 'player3', name: "SeawaySage", score: 950, avatar: "https://placehold.co/40x40.png?text=SS" },
  { id: 'player4', name: "BoldtFanatic", score: 800, avatar: "https://placehold.co/40x40.png?text=BF" },
  { id: 'player5', name: "NewbieNavigator", score: 500, avatar: "https://placehold.co/40x40.png?text=NN" },
];

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  unlocked: boolean;
  criteria: string; // e.g. "Answer 5 questions correctly"
}

export const achievements: Achievement[] = [
  { id: 'first_hint', name: "Budding Detective", description: "Unlocked your first storyline hint.", icon: Scroll, unlocked: false, criteria: "Unlock 1 hint" },
  { id: 'five_correct', name: "Trivia Novice", description: "Answered 5 questions correctly.", icon: Star, unlocked: false, criteria: "5 correct answers" },
  { id: 'all_hints_category1', name: "Boldt's Confidant", description: "Unlocked all hints related to Boldt Castle.", icon: Castle, unlocked: false, criteria: "Unlock specific hints" },
  { id: 'top_leaderboard', name: "Top RiverRat", description: "Reached the top 3 on the leaderboard.", icon: Trophy, unlocked: false, criteria: "Reach top 3" },
  { id: 'story_complete', name: "Lore Master", description: "Completed the entire storyline.", icon: Diamond, unlocked: false, criteria: "Unlock all hints" },
  { id: 'fish_expert', name: "Master Angler", description: "Answered a tricky fish-related question.", icon: Fish, unlocked: false, criteria: "Answer fish question" },
];
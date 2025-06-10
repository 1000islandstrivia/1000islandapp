
import type { LucideIcon } from 'lucide-react';
import { Castle, Diamond, Fish, Scroll, Ship, Star, Trophy, Leaf, Anchor, MapPin, Lightbulb, BookOpen } from 'lucide-react';

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
  {
    id: '6',
    question: "What is the main purpose of the Thousand Islands Bridge?",
    options: ["Scenic views only", "Connecting Ontario and New York State", "Pedestrian traffic only", "Railroad transport"],
    answer: "Connecting Ontario and New York State",
    storylineHintKey: "border_mystery_1",
  },
  {
    id: '7',
    question: "Which of these is a popular water activity in the Thousand Islands?",
    options: ["Surfing", "Scuba diving to shipwrecks", "Whale watching", "White-water rafting"],
    answer: "Scuba diving to shipwrecks",
    storylineHintKey: "seaway_journey_1",
  },
  {
    id: '8',
    question: "Boldt Castle was built by George C. Boldt as a tribute to whom?",
    options: ["His mother", "His daughter", "His wife, Louise", "Queen Victoria"],
    answer: "His wife, Louise",
    storylineHintKey: "boldt_secret_1",
  },
  {
    id: '9',
    question: "Approximately how many islands are there in the 'Thousand Islands' archipelago?",
    options: ["Exactly 1000", "Around 500", "Over 1800", "Less than 700"],
    answer: "Over 1800",
    storylineHintKey: "small_island_clue_1",
  },
  {
    id: '10',
    question: "What popular salad dressing is said to have originated in the Thousand Islands region?",
    options: ["Ranch Dressing", "Caesar Dressing", "Thousand Island Dressing", "Blue Cheese Dressing"],
    answer: "Thousand Island Dressing",
    storylineHintKey: "pirate_treasure_1",
  },
  {
    id: '11',
    question: "Dark Island is home to what historic structure?",
    options: ["A lighthouse", "Singer Castle", "A modern art museum", "A nature preserve"],
    answer: "Singer Castle",
    storylineHintKey: "boldt_secret_1",
  },
  {
    id: '12',
    question: "What is the primary type of rock that forms the islands?",
    options: ["Granite", "Sandstone", "Limestone", "Marble"],
    answer: "Granite",
    storylineHintKey: "small_island_clue_1",
  },
  {
    id: '13',
    question: "The Clayton Antique Boat Museum showcases what type of vessels?",
    options: ["Modern speedboats", "Freshwater antique and classic wooden boats", "Submarines", "Viking longships"],
    answer: "Freshwater antique and classic wooden boats",
    storylineHintKey: "seaway_journey_1",
  },
  {
    id: '14',
    question: "What does the term 'River Rat' affectionately refer to in this region?",
    options: ["A type of invasive rodent", "Locals who are knowledgeable about the St. Lawrence River", "A famous steamboat", "A mythical river creature"],
    answer: "Locals who are knowledgeable about the St.Lawrence River",
    storylineHintKey: "pirate_treasure_1",
  },
  {
    id: '15',
    question: "Which of these fish species is a prized catch for anglers in the St. Lawrence River?",
    options: ["Piranha", "Muskellunge (Muskie)", "Clownfish", "Swordfish"],
    answer: "Muskellunge (Muskie)",
    storylineHintKey: "fish_expert_clue", // Assuming a new key or maps to a generic one
  },
  {
    id: '16',
    question: "The construction of Boldt Castle was halted in what year?",
    options: ["1904", "1898", "1920", "1912"],
    answer: "1904",
    storylineHintKey: "boldt_secret_1",
  },
  {
    id: '17',
    question: "What is the name of the scenic byway that runs along the St. Lawrence River on the US side?",
    options: ["River Road", "The Great Lakes Seaway Trail", "Island View Drive", "The King's Highway"],
    answer: "The Great Lakes Seaway Trail",
    storylineHintKey: "border_mystery_1",
  },
  {
    id: '18',
    question: "Which island is known for having a U.S. Post Office that is the smallest in the country?",
    options: ["Wellesley Island", "Grindstone Island", "Sugar Island (unofficial)", "Picton Island"],
    answer: "Sugar Island (unofficial)", // Often cited, though its official status can be debated. Good for trivia!
    storylineHintKey: "small_island_clue_1",
  },
  {
    id: '19',
    question: "The 'Lost Ships of the 1000 Islands' refers to what?",
    options: ["A fictional novel series", "A collection of well-preserved shipwrecks", "A fleet that vanished mysteriously", "A type of mirage seen on the river"],
    answer: "A collection of well-preserved shipwrecks",
    storylineHintKey: "seaway_journey_1",
  },
  {
    id: '20',
    question: "What material was primarily used for the exterior of Singer Castle?",
    options: ["Local granite", "Imported Italian marble", "Red brick", "Timber"],
    answer: "Local granite",
    storylineHintKey: "boldt_secret_1",
  },
  {
    id: '21',
    question: "Which Canadian city is a major gateway to the Thousand Islands?",
    options: ["Toronto", "Montreal", "Kingston", "Ottawa"],
    answer: "Kingston",
    storylineHintKey: "border_mystery_1",
  },
  {
    id: '22',
    question: "The story of 'Just Room Enough Island' involves a family named?",
    options: ["The Boldts", "The Singers", "The Sizelands", "The Johnstons"],
    answer: "The Sizelands",
    storylineHintKey: "small_island_clue_1",
  },
  {
    id: '23',
    question: "What important international agreement led to the creation of the St. Lawrence Seaway?",
    options: ["The Treaty of Paris", "The Webster-Ashburton Treaty", "The St. Lawrence Seaway Agreement of 1954", "The Jay Treaty"],
    answer: "The St. Lawrence Seaway Agreement of 1954",
    storylineHintKey: "seaway_journey_1",
  },
  {
    id: '24',
    question: "Bill Johnston, the 'Pirate of the Thousand Islands', aided which side during the Patriot War?",
    options: ["The British Crown", "The American Patriots/Rebels", "He remained neutral", "The French forces"],
    answer: "The American Patriots/Rebels",
    storylineHintKey: "pirate_treasure_1",
  },
  {
    id: '25',
    question: "What is the Power Authority's visitor center near Massena, NY, that offers views of the St. Lawrence-FDR Power Project?",
    options: ["Boldt Castle Visitor Center", "Hawkins Point Visitors Center (Frank S. McCullough, Jr. Powerhouse)", "Minna Anthony Common Nature Center", "Aquatarium"],
    answer: "Hawkins Point Visitors Center (Frank S. McCullough, Jr. Powerhouse)",
    storylineHintKey: "seaway_journey_1",
  }
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
  { key: "fish_expert_clue", title: "The River's Bounty", text: "Beneath the waves, a different kind of treasure swims, sought by patient anglers.", unlocked: false, icon: Fish },
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

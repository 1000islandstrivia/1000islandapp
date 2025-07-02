
import type { LucideIcon } from 'lucide-react';
import { Castle, Diamond, Fish, Scroll, Ship, Star, Trophy, Leaf, Anchor, MapPin, Lightbulb, BookOpen, Palette, Mountain, Trees, Waves, Bird, Shield, ShieldHalf, ShieldCheck, Gem, Award, Medal, Crown, Zap } from 'lucide-react';

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  storylineHintKey: string;
}

export interface StorylineHint {
  key: string;
  title: string;
  text: string;
  unlocked: boolean;
  icon?: LucideIcon;
}

export const storyline: StorylineHint[] = [
  { key: "boldt_secret_1", title: "The Heart's Whisper", text: "A love story tragically cut short, yet echoes remain within the stone walls of Boldt Castle...", unlocked: false, icon: Castle },
  { key: "border_mystery_1", title: "Two Shores, One River", text: "The waters flow freely, but lines on a map tell tales of smugglers and divided loyalties.", unlocked: false, icon: Scroll },
  { key: "small_island_clue_1", title: "A Tiny Kingdom", text: "Where a single misstep could mean an international incident, or just wet feet.", unlocked: false, icon: Leaf },
  { key: "seaway_journey_1", title: "Path of Giants", text: "Steel behemoths traverse these waters, carrying goods and secrets between continents.", unlocked: false, icon: Ship },
  { key: "pirate_treasure_1", title: "The River Rat's Gold", text: "They say ol' Bill Johnston stashed his ill-gotten gains where only the cleverest could find it.", unlocked: false, icon: Diamond },
  { key: "fish_expert_clue", title: "The River's Bounty", text: "Beneath the waves, a different kind of treasure swims, sought by patient anglers.", unlocked: false, icon: Fish },
  { key: "river_origin_clue", title: "Source of Power", text: "From vast inland seas, the mighty river begins its long journey to the ocean.", unlocked: false, icon: Waves },
  { key: "historical_figure_clue", title: "Echoes of Leaders", text: "Influential figures have long been drawn to the beauty and strategic importance of these waters.", unlocked: false, icon: BookOpen },
  { key: "region_geography_clue", title: "Mapping the Maze", text: "Understanding the lay of the land and water is key to navigating this intricate archipelago.", unlocked: false, icon: MapPin },
  { key: "geology_mystery_clue", title: "Ancient Stones", text: "The islands themselves tell a story of immense geological forces and millennia of change.", unlocked: false, icon: Mountain },
  { key: "flora_fauna_clue", title: "Nature's Tapestry", text: "A rich diversity of plant and animal life calls this unique ecosystem home.", unlocked: false, icon: Trees },
  { key: "lighthouse_legend_clue", title: "Guiding Lights", text: "Beacons of hope and warning, these structures have stories of their own to tell.", unlocked: false, icon: Lightbulb },
  { key: "local_culture_clue", title: "Island Traditions", text: "The people of the Thousand Islands have developed unique customs and a deep connection to the river.", unlocked: false, icon: Palette },
  { key: "war_history_clue", title: "Echoes of Conflict", text: "These strategic waters have witnessed battles and played crucial roles in shaping nations.", unlocked: false, icon: Anchor },
  { key: "native_history_clue", title: "First Footprints", text: "Long before castles and seaways, Indigenous peoples thrived here, leaving an indelible mark.", unlocked: false, icon: Bird },
  { key: "boldt_secret_2", title: "Boldt's Unfinished Dream", text: "Construction halted abruptly, leaving parts of the grand vision forever incomplete.", unlocked: false, icon: Castle },
  { key: "bridge_info_1", title: "Linking Nations", text: "More than just steel and concrete, the bridge is a symbol of connection.", unlocked: false, icon: Anchor },
  { key: "water_activity_1", title: "Depths of History", text: "The clear waters guard sunken relics, drawing explorers to their silent embrace.", unlocked: false, icon: Waves },
  { key: "island_count_1", title: "A Watery Labyrinth", text: "More than a mere thousand, these islands form a complex and beautiful maze.", unlocked: false, icon: MapPin },
  { key: "dressing_origin_1", title: "A Tangy Tale", text: "Legend says a famous condiment was first concocted in a grand hotel by the river.", unlocked: false, icon: Palette },
  { key: "singer_castle_1", title: "The Castle of Secrets", text: "Hidden passages and intricate designs mark this island fortress.", unlocked: false, icon: Castle },
  { key: "geology_rock_1", title: "Foundation of Ages", text: "Ancient bedrock forms the very bones of these islands.", unlocked: false, icon: Mountain },
  { key: "boat_museum_1", title: "Echoes of Wooden Hulls", text: "The craftsmanship of bygone eras glides on, preserved for all to see.", unlocked: false, icon: Ship },
  { key: "river_rat_meaning_1", title: "Lore Keepers", text: "Those who know the river's moods and secrets earn this fond title.", unlocked: false, icon: Scroll },
  { key: "boldt_construction_1", title: "A Frozen Moment", text: "The year the hammers fell silent, preserving a story of love and loss.", unlocked: false, icon: Castle },
  { key: "scenic_byway_1", title: "The Winding Path", text: "A road that follows the river's curves, revealing beauty at every turn.", unlocked: false, icon: MapPin },
  { key: "smallest_post_office_1", title: "Tiny Dispatches", text: "Even the smallest isle can play a part in connecting the world.", unlocked: false, icon: Leaf },
  { key: "lost_ships_1", title: "Underwater Ghosts", text: "The riverbed holds tales of voyages ended too soon.", unlocked: false, icon: Ship },
  { key: "singer_castle_material_1", title: "Island Stone", text: "Built from the very rock it stands upon, the castle is a testament to resilience.", unlocked: false, icon: Mountain },
  { key: "canadian_gateway_1", title: "The Limestone City", text: "A historic Canadian port serves as a primary entry to the islands' wonders.", unlocked: false, icon: Anchor },
  { key: "just_room_enough_family_1", title: "A Cozy Claim", text: "One family's determination to have their own island, no matter how small.", unlocked: false, icon: Leaf },
  { key: "seaway_agreement_1", title: "Forging a Waterway", text: "Nations came together to carve a path for commerce through the heart of the continent.", unlocked: false, icon: Scroll },
  { key: "bill_johnston_allegiance_1", title: "The Rebel Pirate", text: "Aiding a cause for independence, this river pirate made his mark on history.", unlocked: false, icon: Diamond },
  { key: "power_authority_center_1", title: "Harnessing the Current", text: "Witness the immense power of the river, transformed into energy for millions.", unlocked: false, icon: Zap },
  { key: "bridge_type_1", title: "Graceful Span", text: "A marvel of engineering, its cables soar above the main shipping channel.", unlocked: false, icon: Anchor },
  { key: "alster_tower_inspiration_1", title: "A German Fairytale", text: "The design of this playful tower echoes castles from across the Atlantic.", unlocked: false, icon: Castle },
  { key: "national_park_management_1", title: "Canada's Jewel", text: "Preserving the natural beauty and heritage for generations to come.", unlocked: false, icon: Trees },
  { key: "us_tourism_hub_1", title: "American Harbors", text: "Several U.S. towns serve as bustling hubs for island exploration.", unlocked: false, icon: Ship },
  { key: "bird_of_prey_1", title: "Sky Hunter", text: "Watch for this magnificent raptor fishing in the river's currents.", unlocked: false, icon: Bird },
  { key: "boldt_yacht_house_1", title: "Floating Palaces", text: "A grand boathouse designed to shelter luxurious vessels from a bygone era.", unlocked: false, icon: Ship },
  { key: "muskellunge_name_1", title: "The River King", text: "Known by many names, this elusive predator is the ultimate prize for anglers.", unlocked: false, icon: Fish },
  { key: "cottage_country_1", title: "Summer Sanctuaries", text: "Grand seasonal homes dot the islands, offering escape and river views.", unlocked: false, icon: Palette },
  { key: "half_moon_bay_1", title: "Sculpted by Water", text: "Unique coves and rock formations tell a story of erosion and time.", unlocked: false, icon: Waves },
  { key: "international_rift_1", title: "Borderline Depths", text: "A narrow, deep channel marking the boundary between two nations.", unlocked: false, icon: Anchor },
  { key: "skiff_life_1", title: "River Ramblers", text: "A way of life defined by small, agile boats perfect for exploring island nooks.", unlocked: false, icon: Ship },
  { key: "cornwall_bridge_1", title: "Vital Link", text: "Beyond cars, this bridge carries power and facilitates international trade.", unlocked: false, icon: Zap },
  { key: "devils_oven_1", title: "Ancient Shelter", text: "A natural rock formation that has offered refuge for centuries.", unlocked: false, icon: Mountain },
  { key: "biosphere_reserve_1", title: "Living Harmony", text: "Recognized for its unique ecosystem and efforts to balance nature and human activity.", unlocked: false, icon: Leaf },
  { key: "haudenosaunee_territory_1", title: "The People of the Longhouse", text: "The ancestral lands of a powerful Indigenous confederacy.", unlocked: false, icon: Bird },
  { key: "winery_known_for_1", title: "Island Vines", text: "Local terroir contributes to unique wines enjoyed with river views.", unlocked: false, icon: Palette },
  { key: "gananoque_boat_line_1", title: "Canadian Cruises", text: "Tour boats depart from this Canadian town, offering stunning island vistas.", unlocked: false, icon: Ship },
  { key: "seaway_lock_1", title: "River Elevators", text: "Engineering marvels that lift and lower massive ships along their journey.", unlocked: false, icon: Zap },
  { key: "tibbetts_point_1", title: "Gateway Guardian", text: "This lighthouse stands sentinel at the river's meeting with a Great Lake.", unlocked: false, icon: Lightbulb },
  { key: "smugglers_run_1", title: "Whiskey and Shadows", text: "During Prohibition, these islands were a haven for illicit trade.", unlocked: false, icon: Diamond },
  { key: "pirate_days_1", title: "Swashbuckler's Bash", text: "A festive week celebrating the region's most notorious river pirate.", unlocked: false, icon: Diamond },
  { key: "islands_tower_1", title: "Sky-High Views", text: "An observation deck offering panoramic vistas of the archipelago.", unlocked: false, icon: MapPin },
  { key: "seaway_president_1", title: "Visionary Leader", text: "The U.S. President who championed the creation of the modern seaway.", unlocked: false, icon: BookOpen },
  { key: "eel_fishing_1", title: "Ancient Tradition", text: "A unique method of fishing for eels, passed down through generations.", unlocked: false, icon: Fish },
  { key: "lost_channel_1", title: "Navigational Challenge", text: "A treacherous passage known for its currents and hidden dangers.", unlocked: false, icon: Waves },
  { key: "poker_run_1", title: "High-Speed Cards", text: "A thrilling charity event where speedboats collect poker hands across the river.", unlocked: false, icon: Ship },
  { key: "alster_tower_purpose_1", title: "Playful Retreat", text: "This unique tower at Boldt Castle was designed as a fantasy escape for children.", unlocked: false, icon: Castle },
  { key: "parkway_location_1", title: "The Northern Shore", text: "A scenic drive along the Canadian side of the river.", unlocked: false, icon: MapPin },
  { key: "laker_definition_1", title: "Great Lakes Giants", text: "Massive cargo ships specifically designed to navigate the Seaway and Great Lakes.", unlocked: false, icon: Ship },
  { key: "calumet_island_owner_1", title: "Tobacco Baron's Isle", text: "A wealthy tycoon once built his private retreat on this island.", unlocked: false, icon: Castle },
  { key: "zenda_farms_1", title: "Pastoral Preserve", text: "A historic farm offering nature trails and a glimpse into rural island life.", unlocked: false, icon: Leaf },
  { key: "windmill_battle_location_1", title: "Rebellion's Stand", text: "A historic battle site from the era of Canadian rebellions.", unlocked: false, icon: Anchor },
  { key: "dressing_hotel_material_1", title: "Grand Wooden Hotel", text: "The original setting for the Thousand Island Dressing story was a classic wooden structure.", unlocked: false, icon: Palette },
  { key: "duck_migration_1", title: "Feathered Travelers", text: "A common sight during migratory seasons, these ducks rest on island waters.", unlocked: false, icon: Bird },
  { key: "rideau_canal_connects_1", title: "Historic Waterway", text: "This canal links Kingston to Canada's capital, a feat of 19th-century engineering.", unlocked: false, icon: Ship },
  { key: "minna_anthony_location_1", title: "Island Nature Hub", text: "Located within a state park, this center offers educational nature experiences.", unlocked: false, icon: Trees },
  { key: "tilt_mission_1", title: "Guardians of the Green", text: "An organization dedicated to protecting the natural beauty of the Thousand Islands.", unlocked: false, icon: Leaf },
  { key: "tower_island_1", title: "The Tower's Perch", text: "This Canadian island hosts the prominent observation tower.", unlocked: false, icon: MapPin },
  { key: "frontenac_fate_1", title: "Steamboat's Demise", text: "A tragic fire ended the career of this luxurious 19th-century riverboat.", unlocked: false, icon: Waves },
  { key: "tibs_focus_1", title: "River Scientists", text: "A research station dedicated to understanding the St. Lawrence River's aquatic life.", unlocked: false, icon: Fish },
  { key: "playhouse_known_for_1", title: "Stage by the River", text: "A renowned Canadian theatre offering professional productions in a scenic setting.", unlocked: false, icon: Palette },
  { key: "shoal_definition_1", title: "Hidden Hazard", text: "Shallow areas in the river that pose a danger to boats.", unlocked: false, icon: Waves },
  { key: "sister_island_lighthouse_1", title: "Twin Beacons", text: "Historically, these lighthouses worked in tandem to guide ships.", unlocked: false, icon: Lightbulb },
  { key: "covenanter_shipwreck_1", title: "Diver's Destination", text: "A well-known shipwreck that attracts scuba divers to explore its watery grave.", unlocked: false, icon: Ship },
  { key: "fort_henry_1", title: "Garrison Hill", text: "A formidable 19th-century British fortress overlooking Kingston and the river.", unlocked: false, icon: Castle },
  { key: "zavikon_island_bridge_1", title: "A Bridge of Contention", text: "Famous for its tiny international bridge, though its claim to 'shortest' is debated.", unlocked: false, icon: Anchor },
  { key: "island_traditions_clue", title: "Echoes of Old Ways", text: "The rhythm of river life, passed down through generations.", unlocked: false, icon: Scroll },
  { key: "final_revelation", title: "The River's Heart", text: "The true treasure of the Thousand Islands isn't gold or jewels, but the enduring spirit of its history and people.", unlocked: false, icon: Star }
];

export interface PlayerRank {
  title: string;
  minScore: number;
  icon: LucideIcon;
}

export const playerRanks: PlayerRank[] = [
  { title: "Seaman Recruit", minScore: 0, icon: Shield },
  { title: "Seaman Apprentice", minScore: 200, icon: ShieldHalf },
  { title: "Seaman", minScore: 500, icon: ShieldCheck },
  { title: "Petty Officer Third Class", minScore: 900, icon: Star },
  { title: "Petty Officer Second Class", minScore: 1400, icon: Star },
  { title: "Petty Officer First Class", minScore: 2000, icon: Star },
  { title: "Chief Petty Officer", minScore: 2700, icon: Gem },
  { title: "Senior Chief Petty Officer", minScore: 3500, icon: Gem },
  { title: "Master Chief Petty Officer", minScore: 4400, icon: Gem },
  { title: "Chief Warrant Officer 2", minScore: 5400, icon: Award },
  { title: "Chief Warrant Officer 3", minScore: 6500, icon: Award },
  { title: "Ensign", minScore: 7700, icon: Medal },
  { title: "Lieutenant Junior Grade", minScore: 9000, icon: Medal },
  { title: "Lieutenant", minScore: 10500, icon: Medal },
  { title: "Lieutenant Commander", minScore: 12000, icon: Crown },
  { title: "Commander", minScore: 14000, icon: Crown },
  { title: "Captain", minScore: 16000, icon: Crown },
  { title: "Rear Admiral", minScore: 18000, icon: Zap },
  { title: "Vice Admiral", minScore: 20000, icon: Zap },
  { title: "Admiral", minScore: 22000, icon: Zap },
];

export function getRankByScore(score: number): PlayerRank {
  let currentRank = playerRanks[0]; // Default to the first rank
  for (let i = playerRanks.length - 1; i >= 0; i--) {
    if (score >= playerRanks[i].minScore) {
      currentRank = playerRanks[i];
      break;
    }
  }
  return currentRank;
}


export interface LeaderboardEntry {
  id: string;
  name: string;
  email?: string;
  score: number;
  rankTitle?: string; // Title of the rank e.g., "Admiral"
  avatar?: string;
  rank?: number; // Numerical rank on leaderboard (1st, 2nd, etc.)
  lastUpdated?: any; // Firestore Timestamp or Date
}


export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon; // This should be the component itself, not an object
  unlocked: boolean;
  criteria: string;
}

export const achievements: Achievement[] = [
  { id: 'first_hint', name: "Budding Detective", description: "Unlocked your first storyline hint.", icon: Scroll, unlocked: false, criteria: "Unlock 1 hint" },
  { id: 'five_correct', name: "Trivia Novice", description: "Answered 5 questions correctly.", icon: Star, unlocked: false, criteria: "5 correct answers" },
  { id: 'all_hints_category1', name: "Boldt's Confidant", description: "Unlocked all hints related to Boldt Castle.", icon: Castle, unlocked: false, criteria: "Unlock specific hints" },
  { id: 'top_leaderboard', name: "Top RiverRat", description: "Reached the top 3 on the leaderboard.", icon: Trophy, unlocked: false, criteria: "Reach top 3" },
  { id: 'story_complete', name: "Lore Master", description: "Completed the entire storyline.", icon: Diamond, unlocked: false, criteria: "Unlock all hints" },
  { id: 'fish_expert', name: "Master Angler", description: "Answered a tricky fish-related question.", icon: Fish, unlocked: false, criteria: "Answer fish question" },
  { id: 'geology_buff', name: "Rock Solid Knowledge", description: "Answered a question about island geology.", icon: Mountain, unlocked: false, criteria: "Answer geology question" },
  { id: 'history_hound', name: "History Hound", description: "Answered a question about local history.", icon: BookOpen, unlocked: false, criteria: "Answer history question" },
  { id: 'rank_petty_officer', name: "Petty Officer", description: "Achieved the rank of Petty Officer.", icon: ShieldCheck, unlocked: false, criteria: "Reach Petty Officer rank" },
  { id: 'rank_chief', name: "The Chief", description: "Achieved the rank of Chief Petty Officer.", icon: Gem, unlocked: false, criteria: "Reach CPO rank" },
  { id: 'rank_officer', name: "Commissioned", description: "Achieved an Officer rank.", icon: Medal, unlocked: false, criteria: "Reach Ensign or higher" },
  { id: 'rank_admiral', name: "Fleet Admiral", description: "Achieved the highest rank of Admiral.", icon: Zap, unlocked: false, criteria: "Reach Admiral rank" },
];

// Placeholder for a potential storyline clue if all island history questions are answered
export const islandHistoryMasterClue: StorylineHint = {
    key: "island_history_master",
    title: "Echoes of the Past",
    text: "You've delved deep into the chronicles of the islands. A pattern emerges from the tales of settlers, conflicts, and transformations...",
    unlocked: false,
    icon: Scroll
};

// Placeholder for a potential storyline clue if all nature/geography questions are answered
export const natureGeographyMasterClue: StorylineHint = {
    key: "nature_geography_master",
    title: "Whispers of the Wild",
    text: "The river's flow, the ancient rocks, the calls of the wild – you understand the islands' natural pulse. A hidden sanctuary reveals itself...",
    unlocked: false,
    icon: Leaf
};

// Placeholder for a potential storyline clue related to maritime/boating questions
export const maritimeMasterClue: StorylineHint = {
    key: "maritime_master",
    title: "Captain's Log",
    text: "From grand yachts to humble skiffs, from shipwrecks to seaway titans, you've charted the maritime heart of the Thousand Islands. A lost manifest surfaces...",
    unlocked: false,
    icon: Anchor
};

// Function to check if all hints of a specific category are unlocked (example)
export const areCategoryHintsUnlocked = (categoryPrefix: string, unlockedStoryHints: StorylineHint[]): boolean => {
    const categoryHints = storyline.filter(hint => hint.key.startsWith(categoryPrefix));
    if (categoryHints.length === 0) return false; // No hints in this category
    return categoryHints.every(hint => unlockedStoryHints.find(unlockedHint => unlockedHint.key === hint.key && unlockedHint.unlocked));
};

    

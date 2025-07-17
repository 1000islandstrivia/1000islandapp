
import type { LucideIcon } from 'lucide-react';
import { Castle, Diamond, Fish, Scroll, Ship, Star, Trophy, Leaf, Anchor, MapPin, Lightbulb, BookOpen, Palette, Mountain, Trees, Waves, Bird, Shield, ShieldHalf, ShieldCheck, Gem, Award, Medal, Crown, Zap, Skull } from 'lucide-react';

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  storylineHintKey: string;
  fallbackHint?: string;
  cachedPirateScript?: string;
}

export interface StorylineHint {
  key: string;
  title: string;
  text: string;
  unlocked: boolean;
  icon?: LucideIcon;
}

export interface PlayerRank {
  title: string;
  minScore: number;
  icon: LucideIcon;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  criteria: string;
  icon: LucideIcon;
}

export interface LeaderboardEntry {
    id: string;
    rank: number;
    name: string;
    email?: string;
    score: number;
    rankTitle: string;
    avatar?: string;
    lastUpdated: Date;
}


export const playerRanks: PlayerRank[] = [
  { title: "Seaman Recruit", minScore: 0, icon: Shield },
  { title: "Seaman Apprentice", minScore: 250, icon: ShieldHalf },
  { title: "Seaman", minScore: 500, icon: ShieldCheck },
  { title: "Petty Officer 3rd Class", minScore: 1000, icon: Anchor },
  { title: "Petty Officer 2nd Class", minScore: 2000, icon: Anchor },
  { title: "Petty Officer 1st Class", minScore: 3500, icon: Anchor },
  { title: "Chief Petty Officer", minScore: 5000, icon: Gem },
  { title: "Senior Chief Petty Officer", minScore: 7500, icon: Gem },
  { title: "Master Chief Petty Officer", minScore: 10000, icon: Gem },
  { title: "Warrant Officer", minScore: 15000, icon: Award },
  { title: "Chief Warrant Officer", minScore: 20000, icon: Award },
  { title: "Ensign", minScore: 30000, icon: Medal },
  { title: "Lieutenant", minScore: 40000, icon: Medal },
  { title: "Commander", minScore: 60000, icon: Crown },
  { title: "Captain", minScore: 80000, icon: Crown },
  { title: "Admiral of the Fleet", minScore: 100000, icon: Crown },
];

export const achievements: Achievement[] = [
  { id: 'first_game', name: 'Set Sail', description: 'Complete your first game of trivia.', unlocked: false, criteria: 'Finish one full game.', icon: Ship },
  { id: 'first_hint', name: 'Lore Seeker', description: 'Unlock your first piece of the storyline.', unlocked: false, criteria: 'Answer a question correctly to unlock lore.', icon: Scroll },
  { id: 'first_blood', name: 'First Gold', description: 'Earn your first gold coins.', unlocked: false, criteria: 'Score more than 0 points in a game.', icon: Diamond },
  { id: 'rank_up_petty', name: 'On Deck', description: 'Achieve the rank of Petty Officer.', unlocked: false, criteria: 'Reach a score of 1,000.', icon: Anchor },
  { id: 'rank_up_chief', name: 'The Chief', description: 'Achieve the rank of Chief Petty Officer.', unlocked: false, criteria: 'Reach a score of 5,000.', icon: Gem },
  { id: 'rank_up_captain', name: 'Take the Helm', description: 'Achieve the rank of Captain.', unlocked: false, criteria: 'Reach a score of 80,000.', icon: Crown },
  { id: 'lore_master', name: 'Lore Master', description: 'Unlock all storyline hints.', unlocked: false, criteria: 'Unlock every piece of the main story.', icon: BookOpen },
  { id: 'perfect_game', name: 'Flawless Navigator', description: 'Complete a game with a perfect score.', unlocked: false, criteria: 'Answer all questions correctly in one game.', icon: Star },
  { id: 'trivia_addict', name: 'River Addict', description: 'Play 10 games of trivia.', unlocked: false, criteria: 'Complete 10 full games.', icon: Trophy },
  { id: 'ghost_hunter', name: 'Ghost Hunter', description: 'Unlock a ghost story-related hint.', unlocked: false, criteria: 'Unlock lore with the "ghost_story" key.', icon: Skull },
  { id: 'castle_expert', name: 'Castle Expert', description: 'Unlock 5 hints related to castles.', unlocked: false, criteria: 'Unlock 5 lore entries about castles.', icon: Castle },
  { id: 'eco_warrior', name: 'Eco-Warrior', description: 'Unlock 3 hints about river conservation.', unlocked: false, criteria: 'Unlock lore related to environmental facts.', icon: Leaf },
];

export function getRankByScore(score: number): PlayerRank {
  let currentRank = playerRanks[0];
  for (const rank of playerRanks) {
    if (score >= rank.minScore) {
      currentRank = rank;
    } else {
      break; 
    }
  }
  return currentRank;
}

export const storyline: StorylineHint[] = [
  { 
    key: "boldt_secret_1", 
    title: "The Heart’s Whisper", 
    text: "Come closer, and listen to a tale the river tells not in rushing water, but in silent, heartbroken stone. High on Heart Island stands a monument to a love as grand as any kingdom: Boldt Castle. George C. Boldt, a man who built empires of hospitality, wanted to craft a castle for his queen, Louise. This was to be no mere house, but a six-story testament to his affection, a Rhineland fortress brimming with ballrooms, galleries, and a love that was meant to last forever. Hundreds of craftsmen toiled, shaping stone and timber into a dream. But the river, like love, can be cruel. In 1904, a telegram arrived, carrying four fateful words: *'Stop all construction.'* Louise was gone. A silence fell over the island, the hammers ceased their song, and the dream was frozen in time. For over seventy years, the castle stood as a hollow promise, a magnificent, empty echo of a love story cut short. They say on quiet nights, you can still hear the whisper of her name on the wind, a gentle sigh that rustles the leaves and ripples the water. The castle isn't just a building; it’s a love letter that was never finished, a reminder that the grandest plans are as fragile as a human heart. *Keep answering correctly, and you’ll uncover more of the river’s secrets.*", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "border_mystery_1", 
    title: "Two Shores, One River", 
    text: "The old river rats say the St. Lawrence doesn't care much for human maps. Its currents flow where they please, weaving between islands without a thought for the invisible line that slices through its heart. But that line, the border between the U.S. and Canada, tells a thousand tales of its own. It’s a story of two nations, sometimes friends, sometimes rivals, sharing this magnificent waterway. You can stand on Wellesley Island in New York and see Hill Island in Ontario, so close you’d think you could skip a stone across. This proximity has bred a unique culture of cooperation and, in darker times, of clandestine adventure. During the War of 1812, this invisible line was a frontline, with cannons staring each other down across the water. A century later, during Prohibition, it became a smuggler’s superhighway, where fast boats loaded with illicit whiskey darted through the island maze under the cover of darkness, playing a high-stakes game of cat and mouse with the law. The river has seen peace treaties and trade agreements, family picnics on one shore and military drills on the other. It’s a place of shared heritage and friendly rivalry, where two great nations meet, not with a wall, but with the gentle lapping of shared water. *There’s more to this story of two shores; keep playing to piece it all together.*", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "small_island_clue_1", 
    title: "A Tiny Kingdom", 
    text: "In a river of giants—islands that hold castles, forests, and entire towns—there lies a testament to the old saying, 'It’s not the size of the dog in the fight.' I’m talkin’ about Just Room Enough Island. It’s a tiny speck of land, barely bigger than a tennis court, that holds a house, a tree, and a story as big as any of ‘em. The Sizeland family bought this wee patch of granite, then called Hub Island, back in the 1950s. They dreamed of a private getaway, a place to escape the hustle and bustle. So they built a cottage that covered nearly every square inch of their new domain. One misstep off the front porch and you’re taking an international swim! They say the family had a grand sense of humor about their miniature estate, a place that perfectly fit the criteria of an island—land above water year-round, with at least two living trees—by the narrowest of margins. It became a symbol of the fierce independence and quirky spirit of the islanders. It’s a reminder that you don’t need a sprawling castle to be the king of your own domain. All you need is a patch of rock to call your own, a roof over your head, and just enough room to sit and watch the river roll by. *Unlock more lore to hear tales of other peculiar islanders!*", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "seaway_journey_1", 
    title: "Path of Giants", 
    text: "Listen now to the rumble that shakes the river to its core. It’s not thunder, and it’s not a monster from the deep. It’s the sound of the *Path of Giants*—the mighty St. Lawrence Seaway. Before the 1950s, this river was a wild thing, full of rapids and shoals that could tear the bottom out of a ship. But two nations, America and Canada, had a dream: to tame the river and create a deep-water highway to the heart of the continent. It was a Herculean task. They moved mountains of earth, built colossal dams that harnessed the river’s power, and engineered a series of massive locks that act as watery elevators. These locks can lift a 700-foot *laker*, a freighter loaded with thousands of tons of grain or iron ore, as gently as a mother lifts a sleeping child. But this path came at a cost. Whole villages were drowned to create the reservoirs, their church steeples and homes swallowed by the rising water, creating the 'Lost Villages' that now sleep in the river’s depths. Today, these steel behemoths glide silently past ancient granite islands, carrying goods and secrets between continents. They are a testament to human ingenuity and a constant, humbling reminder of the sheer scale of our ambition. *The Seaway holds many more secrets. Keep playing to uncover them!*", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "pirate_treasure_1", 
    title: "The River Rat's Gold", 
    text: "Arrr, ye think pirates only sailed the sunny Caribbean? Think again, matey! The Thousand Islands had a pirate all its own, a cunning rogue named Bill Johnston. He wasn’t your black-hearted, plank-walking sort, mind you. Bill was an American patriot, a spy, and a first-class smuggler who knew the river’s every secret eddy and hidden cove. During the Patriot War of the 1830s, he aided Canadian rebels, using his fleet of small boats to raid British ships. His most famous act was the burning of the British steamer *Sir Robert Peel*. After the raid, they say he made off with a military payroll, a chest heavy with gold coins. The authorities hunted him for months, but the river was his domain. He vanished into the labyrinth of islands like a fox into its den. Legend says he stashed the gold in a waterfront cave, perhaps Devil’s Oven Island, or some other secret spot known only to him. He was eventually caught, but the treasure was never found. To this day, treasure hunters and hopeful river rats search for Johnston’s lost gold. Some say that on a clear, quiet day, you can see a faint glimmer deep in the water, a wink from ol’ Bill himself, daring you to find his ill-gotten gains. *Perhaps the next piece of lore will lead you closer to the gold…*", 
    unlocked: false, 
    icon: Diamond 
  },
  { 
    key: "fish_expert_clue", 
    title: "The River’s Bounty", 
    text: "They say there are two types of treasure in the Thousand Islands: the kind that glitters, and the kind that swims. Below the waves, a different kind of bounty thrives, a finned wealth sought by patient anglers and cunning predators alike. This is the domain of the mighty Muskellunge, the 'fish of ten thousand casts,' a freshwater tiger so elusive and powerful that landing one is the stuff of legend. Tales are told of 'Muskie' so large they could swallow a duck whole, lurking in the deep, cool channels. Then there are the Smallmouth Bass, the bronze-backed brawlers of the river's currents, and their cousins, the Largemouth, who prefer the quiet, weedy bays. The river also offers up schools of golden-sided Yellow Perch, a favorite for the traditional *shore dinner*. But the river’s bounty isn’t just for sport. For centuries, it was the lifeblood of the *First Footprints* and early settlers. The annual running of the walleye and the spearfishing of eels were sacred traditions, a harvest that dictated the rhythm of life. The river provides, but it also demands respect. It is a delicate ecosystem, a watery pantry that must be protected. So next time you're on the water, remember the riches that swim beneath your keel. *Unlock more lore to learn the secrets of the master anglers!*", 
    unlocked: false, 
    icon: Fish 
  },
  { 
    key: "river_origin_clue", 
    title: "Source of Power", 
    text: "Every river has a beginning, a source from which its power flows. The mighty St. Lawrence begins its epic journey not as a trickle, but as a vast exhalation from an inland sea. It is the sole natural drain for the entire Great Lakes system, a continental-scale funnel carrying the waters of Superior, Michigan, Huron, and Erie out to the Atlantic Ocean. This isn't just a river; it's the final chapter of a story that begins thousands of miles away. But the river's power isn't just in its volume. As it carves its path through the *Frontenac Arch*, the drop in elevation creates immense potential energy. For centuries, this power was raw and untamed, churning in the Long Sault rapids, a section so violent it was impassable. Then came the engineers of the Seaway project. They saw not a barrier, but a battery. With the construction of the Moses-Saunders Power Dam, they harnessed the river's might, transforming its kinetic force into electricity for millions. They say the dam’s turbines spin with the strength of a thousand river spirits. It's a place where the ancient, natural power of the water meets the modern, insatiable hunger for energy. A true source of power, in every sense of the word. *Continue your journey to learn how this power shaped the nations.*", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "historical_figure_clue", 
    title: "Echoes of Leaders", 
    text: "A place of such beauty and strategic importance as the Thousand Islands has always been a magnet for the great and powerful. Their ambitions, dreams, and conflicts have left indelible echoes along these shores. You can almost hear the determined voice of President Franklin D. Roosevelt, who cherished his time on nearby Campobello Island and understood the strategic value of the waterway. His leadership, and that of President Eisenhower after him, was instrumental in forging the St. Lawrence Seaway. Go back further, and you find the ghosts of generals from the War of 1812. Figures like the American Jacob Brown and the British Sir George Prévost, whose strategic decisions on and around this river helped define the border we know today. Their forts, like Fort Henry in Kingston, still stand guard, stone reminders of a time of conflict. But the leaders weren't all military men. They were captains of industry from the Gilded Age—George Boldt of the Waldorf-Astoria, Frederick Bourne of the Singer Sewing Machine Company—who built castles not for war, but for leisure, turning the islands into a playground for the world's elite. Their legacy is in the grand 'cottages' that dot the islands, monuments to an era of unparalleled wealth and ambition. The river remembers them all, from the pirate to the president. *Keep playing, and more of their stories will be revealed.*", 
    unlocked: false, 
    icon: BookOpen 
  },
  { 
    key: "region_geography_clue", 
    title: "Mapping the Maze", 
    text: "Take a look at a map of the Thousand Islands. What do you see? It’s not a simple channel; it’s a beautiful, bewildering maze. A liquid labyrinth of 1,864 islands scattered across a 50-mile stretch of river. For the uninitiated, it’s a place to get hopelessly lost. But for the river rat, it’s a map etched into memory. They know every shoal, every current, every secret passage. They navigate not just by charts, but by the shape of a particular pine tree, the color of a granite cliff, or the way the water ripples over a hidden ledge. This is the *Frontenac Arch*, a rugged spine of ancient granite that resisted the grinding of the glaciers, leaving its peaks to become the islands we see today. This geology creates a navigator's puzzle: deep, safe channels run right alongside treacherous, boat-eating shoals. There’s the famous 'Lost Channel,' where a British army got turned around in 1760. There are passages so narrow they’re called the *Needle’s Eye*. And then there’s the challenge of the border itself, an invisible line that winds through the maze, turning a wrong turn into a potential international incident. To know this maze is to know the river’s heart. *Every correct answer you give helps you map this maze for yourself!*", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "geology_mystery_clue", 
    title: "Ancient Stones", 
    text: "Gather 'round, matey, and listen close. Before any of us dropped anchor in these waters, the islands themselves were telling tales. They speak not in words, but in stone. The *Frontenac Arch*, the granite backbone of this river, is a storybook written by glaciers. Imagine ice a mile thick, grinding and groaning, scraping the world clean and leaving behind these stony hilltops to peek above the water. They say some of the oldest rocks on Earth are here, ancient things that remember a time when the moon was closer and the days were shorter. But the glaciers left more than just islands. Look for the *glacial erratics*—boulders big as a ship's cabin, dropped in the middle of a forest as if by a careless giant. The old river rats whisper that these aren't just rocks. Some have strange, swirling patterns that look like maps to nowhere, while others have carvings so faint you’d miss them if you weren’t looking. Are they messages from the *First Footprints*, or something older still? Some say that on a moonless night, if you place your hand on one of these ancient stones, you can feel the faint, slow pulse of the world itself. A reminder that we're just brief visitors in a very, very old place. *Keep your eyes peeled; you never know what secrets the stones will share with you next.*", 
    unlocked: false, 
    icon: Mountain 
  },
  { 
    key: "flora_fauna_clue", 
    title: "Nature’s Tapestry", 
    text: "Arrr, ye think the river’s story is all about castles and pirates? Look closer, me hearty. The real magic is woven into the *Nature’s Tapestry* all around ye. Every rustle of the leaves, every splash in the reeds, is a verse in an ancient song. The towering white pines stand like silent sentinels, their needles whispering tales of centuries past to the wind. They’ve seen more than any human ever will. In the spring, the forest floor comes alive with trillium, a carpet of white stars that guides the spirits of the river back from their winter sleep. But beware the poison ivy, the river’s mischievous trickster, hiding in plain sight! The river itself is home to the mighty osprey, the 'fish hawk,' who dives with the precision of a master cannonballer, and the great blue heron, a patient, long-legged philosopher standing motionless in the shallows. The locals say there are spirits here—the *Manitous* of the deep, who churn the water when they’re angry, and gentle spirits in the deer that step so delicately through the woods, they seem to walk on air. This tapestry is always changing, from the fiery reds of a maple in autumn to the stark, icy silence of a frozen bay in January. It's a living, breathing story, far richer than any pirate’s gold. *Keep your wits about you, and maybe you'll learn to read its threads.*", 
    unlocked: false, 
    icon: Trees 
  },
  { 
    key: "lighthouse_legend_clue", 
    title: "Guiding Lights", 
    text: "Let me tell ye, sailor, this river ain't always the placid beauty you see on a sunny afternoon. When the fog rolls in, thick as pea soup, or a squall kicks up a black-water fury, even the saltiest river rat can lose his way. That’s when you pray for the *Guiding Lights*. Each lighthouse here has a soul, and each one has a story. Take the Rock Island light—they say on stormy nights, the ghost of its first keeper can be seen, still tending the lamp, making sure his boys make it home safe. Or the Sister Island lights, a pair of twins that once worked together, their beams crossing like a lover’s gaze to mark the most treacherous passage. They say that after one was decommissioned, the other’s light seemed a little dimmer, a little sadder. And then there are the tales of the ghost ships, phantom schooners from the War of 1812, their lanterns glowing with an eerie green light, forever trying to make port in Sackets Harbor. These lights are more than just warnings; they are promises. They are the steadfast heart of the river, a beacon of hope against the dark. They’ve seen wrecks and rescues, smugglers and saviors. Every flash is a word, every beam a sentence in the long, dramatic history of this waterway. *Pay them respect, and they’ll see you through the darkest of nights.*", 
    unlocked: false, 
    icon: Lightbulb 
  },
  { 
    key: "local_culture_clue", 
    title: "Island Traditions", 
    text: "Think ye know the river just by sailin' it? Ha! To truly know it, ye must live its rhythms, its *Island Traditions*. It's more than just a place; it's a way of life, passed down like a well-worn map. Come summer, there’s the tradition of the *shore dinner*. A true river rat doesn’t just catch a fish; he finds a secluded cove, builds a fire from driftwood, and cooks that fish right there with salt pork and potatoes, the smell mixing with the scent of pine and water. That’s a taste of the real Thousand Islands. Then there are the mailboats, little skiffs that act as the lifeline for islanders, delivering more than just letters—they bring gossip, news, and the occasional much-needed cup of sugar. And what about the Sunday services at Half Moon Bay, where folks gather in their boats, a floating congregation with the granite cliffs as their cathedral walls? Or the simple, sacred ritual of the first swim of the season, a plunge into the bracing cold water that washes away the winter and welcomes the summer sun. These aren't just habits; they are the anchors that hold the island communities together. It’s the wave to every passing boat, the shared story of the one that got away, the silent understanding that you’re all part of something special, a secret club bound by the river’s current. *Keep exploring, and you'll find these traditions are the truest treasure here.*", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "war_history_clue", 
    title: "Echoes of Conflict", 
    text: "This beautiful river has a turbulent past, me hearty. Its waters have reflected the flash of cannons and muffled the desperate cries of battle. The *Echoes of Conflict* are everywhere here, if you know how to listen. During the War of 1812, this was no-man's-land, a porous border where American and British forces clashed. Sackets Harbor became a bustling shipyard, racing to build warships to control Lake Ontario, while Kingston stood as a formidable British bastion. The river itself became a battleground, with raids and skirmishes erupting among the islands. Then came the Patriot War, a rebellion that turned neighbor against neighbor. The pirate Bill Johnston, a hero to some and a villain to others, used these islands as his personal fortress, launching daring raids from hidden coves. A century later, a different kind of war was waged: the war on booze. During Prohibition, the river became a smuggler's paradise. Fast boats with muffled engines would slip across the border on moonless nights, their hulls heavy with Canadian whiskey, their captains risking everything for a fortune. The quiet coves that once hid warships now hid cases of contraband. These conflicts have shaped the character of the river, leaving behind forts, shipwrecks, and a legacy of defiance and intrigue. *There are more tales of rebellion and riches to uncover!*", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "native_history_clue", 
    title: "First Footprints", 
    text: "Long before the first European ship scarred the river's surface, long before the first stone of Boldt Castle was laid, this land belonged to others. We are walking in their *First Footprints*. For thousands of years, this river valley was home to Indigenous peoples, particularly the Iroquoian-speaking nations, the Haudenosaunee. To them, this was not a border or a tourist destination; it was a sacred highway, a source of life, and the heart of their territory. They called the river 'Kaniatarowanenneh,' which means 'big waterway.' Their birchbark canoes, swift and silent, were the first to navigate this intricate maze of islands. They knew the best fishing spots, the richest hunting grounds, and the locations of sacred sites where the spirits of the land dwelled. The islands were places of council, of ceremony, of life and death. Their stories are not written in books, but are woven into the land itself—in the names of places, in the ancient portage trails, and in the spirits that are said to still watch over the water. To truly understand the Thousand Islands, you must listen for the echo of their drums and the whisper of their ancient language on the wind. It is a story of resilience and deep connection to a land that was theirs long before it was ours. *Respect the history, and the river will share more of its oldest tales.*", 
    unlocked: false, 
    icon: Bird 
  },
  { 
    key: "boldt_secret_2", 
    title: "Boldt's Unfinished Dream", 
    text: "Every visitor to Boldt Castle sees the grandeur, but a true river rat knows the real story lies in what is missing. It is a tale of an *Unfinished Dream*. When George Boldt halted construction in 1904, he didn't just abandon a building; he froze a fantasy in time. The main castle was to be just the beginning. The Alster Tower, a whimsical structure with a bowling alley and billiards room, was meant as a playhouse for his children, a fairytale escape. The Power House, with its clock tower that would never tell time, was designed to look like a medieval defensive tower, hiding the modern machinery that would bring the island to life. The grandest of these structures, the Yacht House on Wellesley Island, was an enormous cathedral of wood, built to shelter the family's fleet of luxurious vessels, including a 128-foot steam yacht. But when Louise Boldt died, the dream died with her. Tools were dropped where they lay. Crates of furniture and art, already shipped from Europe, were never unpacked. For 73 years, the magnificent structures were left to the mercy of the elements and vandals, a hauntingly beautiful ruin. The Thousand Islands Bridge Authority, which acquired the property, has spent decades painstakingly bringing the dream back to life, but the poignant sense of incompletion remains. It is a powerful reminder that even the greatest of ambitions can be undone by a single, fragile heartbeat. *Unlock more lore to discover what other secrets the castle holds.*", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "bridge_info_1", 
    title: "Linking Nations", 
    text: "Some bridges are just steel and concrete, a way to get from here to there. But the Thousand Islands Bridge is something more. It’s a handshake across the water, a symbol of two nations *Linking Nations*. Before the 1930s, crossing the river was a major undertaking, relying on slow and cumbersome ferries. The dream of a bridge was a bold one, requiring the cooperation of both the United States and Canada, and the engineering genius to span the wide, deep channels of the St. Lawrence. It wasn't built as one single span, but as a clever series of five bridges that hop from island to island, stitching the two countries together. When it opened in 1938, two leaders stood side-by-side to dedicate it: U.S. President Franklin D. Roosevelt and Canadian Prime Minister William Lyon Mackenzie King. They spoke not just of concrete and steel, but of a 'bridge of peace and friendship.' It carries more than just cars; it carries commerce, families, tourists, and the shared heritage of the river communities. It stands as a testament to the idea that it is better to build bridges than walls, a lesson written in steel high above the flowing water. Every time you cross it, you are participating in that 80-year-old promise of enduring friendship. *The river holds many symbols of unity. Keep playing to find them.*", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "water_activity_1", 
    title: "Depths of History", 
    text: "While the river's surface tells a modern story of sunlight and speedboats, its cold, clear depths hold a much older, quieter tale. The absence of saltwater and wood-eating organisms means that wooden shipwrecks from centuries past are remarkably preserved. For freshwater scuba divers, this makes the river a world-class destination. It’s not about coral reefs; it’s about descending into history, exploring the silent, ghostly decks of schooners and steamers that met their end in the river's unforgiving currents. To dive here is to swim through a submerged museum, where every wreck is a time capsule with a story to tell.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "island_count_1", 
    title: "A Watery Labyrinth", 
    text: "So, how many islands does it take to make a Thousand? The official count is 1,864, but that number hinges on a very specific rule. To earn the title of 'island' in this archipelago, a piece of land must be larger than one square foot, remain above water 365 days a year, and support at least two living trees. This precise definition creates a watery labyrinth of landmasses, from Wolfe Island, which is larger than all the others combined, to tiny 'Just Room Enough Island,' which meets the criteria by the skin of its teeth. It's a testament to the region's unique geography and the human need to count and categorize the magnificent chaos of nature.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "dressing_origin_1", 
    title: "A Tangy Tale", 
    text: "The world-famous Thousand Island dressing wasn't invented by a celebrity chef in a glittering city. Legend says it was born right here, in the rustic kitchen of a fishing guide's wife. Sophie LaLonde, wife of guide George LaLonde, would whip up a unique, tangy concoction for the shore dinners she prepared for wealthy visiting fishermen. One of those visitors was a famous actress, who loved it so much she asked for the recipe. Another story credits its fame to George Boldt, who instructed his maitre d' at the Waldorf-Astoria Hotel to create a new dressing after being served a version by Sophie. Either way, its roots are firmly planted in the fishing camps and grand hotels of the river's Gilded Age.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "singer_castle_1", 
    title: "The Castle of Secrets", 
    text: "On Dark Island, a different kind of Gilded Age dream stands guard. Singer Castle wasn't built for a lost love, but for quiet retreat and playful intrigue. Commissioned by Frederick Bourne, president of the Singer Sewing Machine Company, it's a Scottish-inspired medieval fantasy, complete with a dungeon, secret passages behind swiveling bookcases, and a two-story ice house. Its granite walls, quarried from a neighboring island, give it an imposing presence, but its heart is one of games and mystery. It was a place for the family to escape the city, a fortress of fun filled with hidden nooks and surprising discoveries, a true testament to a wealthy man's imagination.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "geology_rock_1", 
    title: "Foundation of Ages", 
    text: "The islands themselves are the very bones of the Earth, laid bare for us to see. They are the exposed peaks of the Frontenac Arch, a massive spine of ancient granite that stretches from the Canadian Shield down to the Adirondack Mountains. This rock is over a billion years old, some of the most ancient on the planet. When the last great glaciers scoured this land, they scraped away the softer rock but could not defeat this hard, resistant granite. The islands we see today are the worn, resilient tops of a truly ancient mountain range, a testament to endurance on a geological time scale.", 
    unlocked: false, 
    icon: Mountain 
  },
  { 
    key: "boat_museum_1", 
    title: "Echoes of Wooden Hulls", 
    text: "The Antique Boat Museum in Clayton is more than just a building with boats in it; it's a library of river stories told in polished mahogany and gleaming brass. It houses the largest collection of freshwater antique boats in North America, from elegant St. Lawrence Skiffs to powerful, rumbling Hacker-Crafts from the Gilded Age. Each vessel has a story—of the families who owned them, the races they won, and the craftsmen who built them by hand. To walk through its halls is to hear the echo of wooden hulls cutting through the water, a tribute to an era of unparalleled elegance and craftsmanship on the river.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "river_rat_meaning_1", 
    title: "Lore Keepers", 
    text: "In the Thousand Islands, being called a 'River Rat' is the highest of compliments. It's a title earned, not given. It means you know the river's moods—when it’s angry and when it’s calm. It means you can navigate by the shape of a rock and the bend of a tree, not just a GPS. It means you carry the river's stories, its history, and its secrets in your heart. It signifies a deep, abiding connection to the water, a sense that you are part of the river, and the river is a part of you. It's a badge of honor, worn with pride by those who truly understand this magical place.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "boldt_construction_1", 
    title: "A Frozen Moment", 
    text: "The year 1904 marks a tragic pause in the river's history. It was the year that George Boldt, upon hearing of his wife's sudden death, sent a simple, heartbreaking telegram to his army of craftsmen on Heart Island: 'Stop all construction.' In that moment, the hammers fell silent, the saws ceased their whine, and a Gilded Age dream was frozen in time. The half-finished castle, intended as the ultimate testament of love, became instead a monument to loss, a beautiful, poignant ruin that stood silent for over 70 years.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "scenic_byway_1", 
    title: "The Winding Path", 
    text: "On both sides of the river, scenic roads follow the water's curves, offering breathtaking views at every turn. In the U.S., the Great Lakes Seaway Trail is a designated National Scenic Byway, while in Canada, the Thousand Islands Parkway provides a more leisurely alternative to the main highway. These aren't just roads for getting from one point to another; they are journeys in themselves, paths that trace the history, beauty, and natural wonder of the region.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "smallest_post_office_1", 
    title: "Tiny Dispatches", 
    text: "The quirky, independent spirit of river life is perfectly captured by the tiny, unofficial U.S. Post Office on Sugar Island. While not a formal government building, this small shack serves as a vital mail drop-off and pick-up point for a small community of islanders. It stands as a charming, humorous symbol of the unique ways island residents have adapted to create their own services and maintain their connection to the wider world.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "lost_ships_1", 
    title: "Underwater Ghosts", 
    text: "The St. Lawrence River is a vast, cold-water museum. Because of the fresh, cold water, which lacks salt and wood-eating organisms, the riverbed is home to one of the best-preserved collections of shipwrecks in the world. From 18th-century schooners to 20th-century freighters, these 'Lost Ships' lie in the dark, silent depths, their ghostly forms creating a diver's paradise and a tangible link to the region's dramatic maritime past.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "singer_castle_material_1", 
    title: "Island Stone", 
    text: "Singer Castle feels like it grew right out of the river, and in a way, it did. The beautiful, strong granite used to construct its towers and walls wasn't imported from some faraway land. It was quarried from a neighboring island, Oak Island. This use of local materials makes the castle a true child of the Thousand Islands, its very essence tied to the ancient rock of the Frontenac Arch.", 
    unlocked: false, 
    icon: Mountain 
  },
  { 
    key: "canadian_gateway_1", 
    title: "The Limestone City", 
    text: "Standing guard at the river's gateway to Lake Ontario is Kingston, Ontario, a city whose history is written in stone. Known as 'The Limestone City' for the beautiful, pale local stone used in many of its most historic buildings, Kingston has been a strategic military and economic hub for centuries. Home to Fort Henry and the southern entrance to the Rideau Canal, it serves as the historic Canadian entrance to the Thousand Islands.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "just_room_enough_family_1", 
    title: "A Cozy Claim", 
    text: "The story of Just Room Enough Island is a testament to making a dream fit the space you have. The Sizeland family bought the tiny speck of land, then called Hub Island, in the 1950s. They built a small house that covers nearly every square inch, planted a tree, and proudly declared they had an island estate. It's a charming example of the quirky humor and fierce independence that characterizes life on the river.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "seaway_agreement_1", 
    title: "Forging a Waterway", 
    text: "It took a monumental act of international cooperation to create the modern St. Lawrence Seaway. In 1954, Canada and the United States signed an agreement to jointly undertake the massive engineering project. Together, they tamed the river's wild rapids and built a series of locks and channels, forging a deep waterway that would change the course of North American commerce and the very face of the river forever.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "bill_johnston_allegiance_1", 
    title: "The Rebel Pirate", 
    text: "Depending on which side of the river you were on, Bill Johnston was either a villainous pirate or a righteous folk hero. During the Patriot War of 1837-38, he used his intimate knowledge of the island maze to aid Canadian rebels seeking independence from Britain. To the British Empire, he was a renegade and a pirate; to the American patriots and Canadian rebels he supported, he was a cunning and invaluable ally in their fight.", 
    unlocked: false, 
    icon: Diamond 
  },
  { 
    key: "power_authority_center_1", 
    title: "Harnessing the Current", 
    text: "The raw, untamed power of the St. Lawrence River, which once raged in impassable rapids, is now harnessed by the massive Moses-Saunders Power Dam. This international hydroelectric project is so large it spans the border between Massena, New York, and Cornwall, Ontario. The visitor center on the American side offers panoramic views of this engineering marvel, where the river's immense energy is transformed into electricity for millions.", 
    unlocked: false, 
    icon: Zap 
  },
  { 
    key: "bridge_type_1", 
    title: "Graceful Span", 
    text: "The main span of the Thousand Islands Bridge had to accomplish a difficult task: connect two countries while allowing massive ocean-going vessels to pass beneath. The solution was a suspension bridge, whose tall towers and graceful, sweeping cables provide the necessary high clearance over the international shipping channel. It is a design of both strength and beauty.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "alster_tower_inspiration_1", 
    title: "A German Fairytale", 
    text: "The whimsical design of the Alster Tower at Boldt Castle, with its winding staircases and playful turrets, was not inspired by the river, but by a book. George Boldt was captivated by the description of a castle in Sir Walter Scott's novel 'Woodstock,' and had his architects bring that fairytale vision of a German Rhineland tower to life on his island.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "national_park_management_1", 
    title: "Canada's Jewel", 
    text: "Thousand Islands National Park, one of Canada's oldest, is a collection of over 20 islands and numerous smaller islets managed by Parks Canada. It's a park accessible primarily by water, dedicated to preserving the unique natural and cultural heritage of this region, from its rare species to its Gilded Age history, for all time.", 
    unlocked: false, 
    icon: Trees 
  },
  { 
    key: "us_tourism_hub_1", 
    title: "American Harbors", 
    text: "On the American side of the river, towns like Alexandria Bay and Clayton serve as the bustling heart of the tourism industry. Their harbors are filled with a constant parade of tour boats, fishing charters, and private pleasure craft, all ready to depart and explore the wonders of the island maze.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "bird_of_prey_1", 
    title: "Sky Hunter", 
    text: "Keep a sharp eye on the sky and you'll likely spot a magnificent bird of prey known as the Osprey. Often called a 'fish hawk,' this raptor can be seen soaring high above the water before making a spectacular dive, plunging feet-first into the river to snatch a fish. Their large, messy nests are a common sight atop channel markers and dead trees throughout the islands.", 
    unlocked: false, 
    icon: Bird 
  },
  { 
    key: "boldt_yacht_house_1", 
    title: "Floating Palaces", 
    text: "The Boldt Yacht House on Wellesley Island is no mere boathouse; it's a wooden cathedral built on a scale as grand as the castle itself. This enormous structure was designed to shelter the family's impressive fleet of vessels, including several luxurious steam yachts and a massive, opulent houseboat that was a floating palace in its own right. It is a stunning example of Gilded Age maritime architecture.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "muskellunge_name_1", 
    title: "The River King", 
    text: "The undisputed king of the St. Lawrence River's predators is the mighty Muskellunge, or 'Muskie.' Its name is believed to derive from an Ojibwe word meaning 'ugly pike,' but to anglers, it is a thing of beauty. Elusive, powerful, and capable of growing to immense sizes, it is known as 'the fish of ten thousand casts' and is the ultimate prize for any fisherman who dares to seek it.", 
    unlocked: false, 
    icon: Fish 
  },
  { 
    key: "cottage_country_1", 
    title: "Summer Sanctuaries", 
    text: "In the late 19th and early 20th centuries, America's wealthiest families transformed the Thousand Islands into their personal 'cottage country.' These weren't rustic cabins; the term 'cottage' was a humble euphemism for the sprawling, opulent mansions they built on private islands as seasonal sanctuaries to escape the summer heat of the cities and enjoy the river's splendor.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "half_moon_bay_1", 
    title: "Sculpted by Water", 
    text: "Half Moon Bay is a stunning natural amphitheater, a perfect crescent carved from the granite cliffs of Wellesley Island by the river itself. For well over a century, it has served as a unique floating church. On Sunday mornings in the summer, a minister preaches from a rocky pulpit on the shore to a congregation of boaters who drop anchor in the calm, protected waters of the bay.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "international_rift_1", 
    title: "Borderline Depths", 
    text: "Beneath the main span of the Thousand Islands Bridge lies the International Rift, a deep and narrow channel that marks the precise US-Canada border. Here, the river is squeezed between Wellesley Island in the US and Hill Island in Canada, creating a dramatic passage where you can feel like you can almost touch two countries at once.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "skiff_life_1", 
    title: "River Ramblers", 
    text: "The St. Lawrence Skiff is more than just a boat; it's a lifestyle. These elegant, double-ended wooden boats, perfectly suited for rowing or a small sail, are the quintessential vessel for 'river rambling.' Their agile and efficient design is ideal for exploring the quiet coves and narrow, winding channels between the islands, embodying a slower, more intimate way of experiencing the river.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "cornwall_bridge_1", 
    title: "Vital Link", 
    text: "The Cornwall-Massena International Bridge is another vital link between the US and Canada in the region. This system of bridges does more than just carry cars; it crosses directly over the massive St. Lawrence-FDR hydroelectric dam, making it a crucial component for both international trade and the management of the power project.", 
    unlocked: false, 
    icon: Zap 
  },
  { 
    key: "devils_oven_1", 
    title: "Ancient Shelter", 
    text: "Devil's Oven Island, a rugged and wild isle, is famous for its namesake cave. Local legend has long held that this natural stone shelter was one of the primary hideouts for the river pirate Bill Johnston and his gang. Whether true or not, the island's name and story evoke the region's long history of pirates, smugglers, and those seeking refuge from the law in the river's maze.", 
    unlocked: false, 
    icon: Mountain 
  },
  { 
    key: "biosphere_reserve_1", 
    title: "Living Harmony", 
    text: "The entire Thousand Islands region is recognized by UNESCO as the Frontenac Arch Biosphere Reserve. This prestigious designation isn't just about protecting nature; it's about recognizing a place where the community lives in relative harmony with its unique ecosystem. It celebrates the balance between a vibrant human culture and the conservation of the natural world, a commitment to sustainable living on a grand scale.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "haudenosaunee_territory_1", 
    title: "The People of the Longhouse", 
    text: "Before any modern border was drawn, this entire region was the ancestral territory of the Haudenosaunee Confederacy, also known as the Iroquois or Six Nations. Their stories, traditions, and connection to the land and water are the deepest and oldest layer of the river's human history. The unique international territory of Akwesasne is a modern testament to this enduring presence.", 
    unlocked: false, 
    icon: Bird 
  },
  { 
    key: "winery_known_for_1", 
    title: "Island Vines", 
    text: "The unique microclimate of the Thousand Islands, moderated by the massive thermal mass of the river, combined with the rocky, mineral-rich soil, creates a special 'terroir' for growing cold-hardy grapes. This has led to the recent rise of an award-winning wine region, with wineries along the shore offering a unique taste of the river's bounty.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "gananoque_boat_line_1", 
    title: "Canadian Cruises", 
    text: "The charming town of Gananoque is known as the 'Gateway to the Thousand Islands' on the Canadian side. From its bustling waterfront, fleets of tour boats depart, offering visitors stunning cruises through the heart of the 'Admiralty' and 'Lake Fleet' groups of islands, providing a distinctly Canadian perspective on the archipelago's beauty.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "seaway_lock_1", 
    title: "River Elevators", 
    text: "The massive locks of the St. Lawrence Seaway are true engineering marvels. These concrete chambers act as 'water elevators,' using nothing but gravity and immense amounts of water to lift or lower colossal, 700-foot ships as much as 80 feet at a time, allowing them to bypass rapids and navigate the significant changes in water level along the river's course.", 
    unlocked: false, 
    icon: Zap 
  },
  { 
    key: "tibbetts_point_1", 
    title: "Gateway Guardian", 
    text: "The historic lighthouse at Tibbetts Point stands as a lonely, vital guardian at the very beginning of the St. Lawrence River. It marks the crucial transition point where the vast, open waters of Lake Ontario narrow and become the river, guiding ships safely into the waterway's mouth. Its light is the first welcome for ships entering the river and the last goodbye for those heading into the lake.", 
    unlocked: false, 
    icon: Lightbulb 
  },
  { 
    key: "smugglers_run_1", 
    title: "Whiskey and Shadows", 
    text: "During Prohibition in the 1920s, the dark, confusing maze of channels and coves in the Thousand Islands became the perfect 'smuggler's run.' Fast boats with muffled engines would slip across the international border on moonless nights, their hulls heavy with illicit Canadian whiskey destined for the thirsty cities of the United States. It was a dangerous but profitable game of cat and mouse with the law.", 
    unlocked: false, 
    icon: Diamond 
  },
  { 
    key: "pirate_days_1", 
    title: "Swashbuckler's Bash", 
    text: "Every summer, the town of Alexandria Bay dives headfirst into its rogue history with 'Bill Johnston's Pirate Days.' This week-long festival celebrates the region's famous river pirate with parades of ships, mock battles on the water, and costumed swashbucklers overrunning the town. It's a lively homage to the area's rebellious and adventurous spirit.", 
    unlocked: false, 
    icon: Diamond 
  },
  { 
    key: "islands_tower_1", 
    title: "Sky-High Views", 
    text: "For the ultimate bird's-eye perspective of the islands, you have to ascend the 1000 Islands Tower. This 400-foot observation tower on Hill Island, Canada, offers breathtaking, 360-degree panoramic views, turning the complex, watery labyrinth of islands, channels, and bridges into a living map laid out at your feet.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "seaway_president_1", 
    title: "Visionary Leader", 
    text: "While the idea of a deep-water seaway had been debated for decades, it took the vision and political will of a former five-star general, U.S. President Dwight D. Eisenhower, to finally make it a reality. He saw the strategic and economic importance of the project and was instrumental in pushing through the legislation that allowed the United States to partner with Canada in its construction.", 
    unlocked: false, 
    icon: BookOpen 
  },
  { 
    key: "eel_fishing_1", 
    title: "Ancient Tradition", 
    text: "The challenging art of nighttime spearfishing for eels is an ancient tradition, passed down for generations by the Mohawk people of Akwesasne. This practice, often done from the bow of a boat with a light to see into the water, is a testament to a deep and enduring connection to the river and its resources, a skill honed over centuries.", 
    unlocked: false, 
    icon: Fish 
  },
  { 
    key: "lost_channel_1", 
    title: "Navigational Challenge", 
    text: "The 'Lost Channel' is a notoriously confusing passage of water that earned its name honestly. In 1760, a British army detachment got hopelessly lost in its bewildering twists and turns. To this day, it remains a challenge for even experienced boaters to navigate correctly, a natural puzzle box in the middle of the river.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "poker_run_1", 
    title: "High-Speed Cards", 
    text: "One of the river's most modern and thrilling traditions is the annual Poker Run. This high-energy event sees dozens of high-performance speedboats roaring between designated checkpoints on the river. The goal isn't to finish first, but to collect a playing card at each stop, with the crew holding the best poker hand at the end winning the grand prize, usually for charity.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "alster_tower_purpose_1", 
    title: "Playful Retreat", 
    text: "The Alster Tower at Boldt Castle, also known by the playful nickname 'The Hennery,' was not a defensive structure. It was designed as a whimsical, fairytale retreat for the Boldt children and their guests. Its upper floors contained a billiards room and a two-lane bowling alley, making it the ultimate Gilded Age playhouse.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "parkway_location_1", 
    title: "The Northern Shore", 
    text: "The Thousand Islands Parkway is a dedicated scenic road that winds along the Canadian shoreline between Gananoque and Brockville. It offers some of the most stunning, continuous, and easily accessible views of the river and islands from the northern shore, providing a more intimate and picturesque alternative to the main highway.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "calumet_island_owner_1", 
    title: "Tobacco Baron's Isle", 
    text: "Calumet Island was once the site of another of the region's magnificent Gilded Age castles. It was the estate of Charles G. Emery, a tycoon who made his fortune in the tobacco industry. His grand castle proved that the dream of building a private island kingdom on the river was a powerful fantasy for many of America's wealthiest industrialists.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "zenda_farms_1", 
    title: "Pastoral Preserve", 
    text: "The Zenda Farms preserve, protected by the Thousand Islands Land Trust, offers a glimpse into a different side of river life. It isn't a wild forest, but a preserve dedicated to protecting the region's historic rural and agricultural landscape, with its iconic red barns and open fields providing a peaceful contrast to the grand castles on the water.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "windmill_battle_location_1", 
    title: "Rebellion's Stand", 
    text: "The old stone windmill near Prescott, Ontario, is now a national historic site, but in 1838 it was the scene of the bloody Battle of the Windmill. This was a key conflict during the Patriot War, where invading American sympathizers and Canadian rebels made a final, desperate stand against British forces. It is a stark reminder of the region's turbulent political past.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "duck_migration_1", 
    title: "Feathered Travelers", 
    text: "Twice a year, the St. Lawrence River becomes a bustling highway for millions of birds. It is a vital part of the Atlantic Flyway, a major migratory route for waterfowl. The river's wetlands and bays provide crucial resting and feeding stops for countless ducks, geese, and other birds on their long journeys between their southern wintering grounds and northern breeding habitats.", 
    unlocked: false, 
    icon: Bird 
  },
  { 
    key: "rideau_canal_connects_1", 
    title: "Historic Waterway", 
    text: "The Rideau Canal is a 19th-century engineering marvel and a UNESCO World Heritage site. It was built for military purposes after the War of 1812 to provide a secure supply route between the British naval base at Kingston on the St. Lawrence and the city of Ottawa, creating a historic inland waterway that is now a recreational boater's paradise.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "minna_anthony_location_1", 
    title: "Island Nature Hub", 
    text: "Nestled within the vast Wellesley Island State Park is the Minna Anthony Common Nature Center. As the largest nature center in the entire New York State Park system, it serves as a major hub for environmental education and outdoor recreation, offering miles of trails and hands-on exhibits that celebrate the unique flora and fauna of the Thousand Islands.", 
    unlocked: false, 
    icon: Trees 
  },
  { 
    key: "tilt_mission_1", 
    title: "Guardians of the Green", 
    text: "The Thousand Islands Land Trust, or TILT, acts as a dedicated guardian for the region's wild and scenic spaces. This non-profit organization works to conserve land through ownership and agreements, protecting sensitive habitats, scenic vistas, and the overall natural beauty of the Thousand Islands for all future generations to enjoy.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "frontenac_fate_1", 
    title: "Steamboat's Demise", 
    text: "The 'Frontenac' was one of the grandest side-wheel steamboats of the Gilded Age, a true floating palace. Her reign on the river came to a sudden and fiery end in 1907. A fire broke out while she was docked, and the magnificent wooden vessel was consumed by flames, leaving a charred wreck on the riverbed as a ghostly reminder of a bygone era.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "tibs_focus_1", 
    title: "River Scientists", 
    text: "The Thousand Islands Biological Station (TIBS) acts as a doctor for the river. It is a dedicated research facility where scientists study the pulse of the St. Lawrence ecosystem. Their work, focusing on everything from invasive species to fish populations to water quality, is crucial for understanding and protecting the long-term health of this vital waterway.", 
    unlocked: false, 
    icon: Fish 
  },
  { 
    key: "playhouse_known_for_1", 
    title: "Stage by the River", 
    text: "The town of Gananoque, Ontario, is home to the acclaimed Thousand Islands Playhouse, which offers professional theatre in one of the most scenic settings in Canada. With two venues right on the water, the St. Lawrence River itself serves as a dramatic, living backdrop for the stories told on its stages.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "shoal_definition_1", 
    title: "Hidden Hazard", 
    text: "In river terms, a 'shoal' is a captain's worst nightmare. It is a hidden, shallow area of rock or sand lurking just beneath the surface, often in an otherwise deep channel. The Thousand Islands is notorious for these boat-eating hazards, making careful navigation with a nautical chart absolutely essential for anyone venturing off the main path.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "covenanter_shipwreck_1", 
    title: "Diver's Destination", 
    text: "The wreck of the 'Covenanter,' a two-masted schooner that sank in the 19th century, is a premier destination for scuba divers. It lies remarkably intact and upright on the riverbed, its masts still pointing towards the surface it will never reach again. It serves as a ghostly and beautiful time capsule from the age of sail.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "fort_henry_1", 
    title: "Garrison Hill", 
    text: "Perched atop a strategic hill overlooking the city of Kingston and the mouth of the St. Lawrence River, the massive Fort Henry was constructed by the British after the War of 1812. This UNESCO World Heritage site was built to defend their crucial naval dockyards and to control the entrance to the newly built Rideau Canal, solidifying their military presence on the waterway.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "zavikon_island_bridge_1", 
    title: "A Bridge of Contention", 
    text: "The tiny, 32-foot bridge connecting the two Zavikon Islands is famously and humorously claimed by tour boat captains to be the 'shortest international bridge in the world.' It's a classic piece of river lore and a great story, though in reality, both islands are located entirely within Canadian territory.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "dressing_origin_2", 
    title: "From River to Ritz", 
    text: "Though its origins lie in the rustic fishing camps of the St. Lawrence, Thousand Island dressing became world-famous thanks to hotel magnate George Boldt. After enjoying it on a fishing trip, he introduced the unique, tangy dressing to the elite clientele at his world-famous, luxurious Waldorf-Astoria Hotel in New York City, turning a local secret into a global sensation.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "shipwreck_lore_1", 
    title: "The Silent Fleet", 
    text: "The cold, fresh, and dark water of the St. Lawrence acts as a remarkable time capsule for sunken ships. Down in the depths lies a silent fleet of dozens of shipwrecks—19th-century schooners, Gilded Age steamers, and 20th-century barges. They rest in a stunning state of preservation, their stories waiting for skilled scuba divers to visit and read their ghostly tales.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "architecture_clue_1", 
    title: "Blueprints for a Dream", 
    text: "The grand castles of the Gilded Age weren't just whimsical fancies; they were monumental construction projects. George Boldt, for instance, hired the prominent Philadelphia architectural firm of G.W. & W.D. Hewitt to design his massive, 120-room Rhineland-style fortress on Heart Island, challenging them to build a European fantasy on a rugged, remote river island.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "environmental_fact_1", 
    title: "The Unseen Invaders", 
    text: "The river's ecosystem is in a constant, silent battle with invasive species that hitchhiked from across the world in the ballast water of ocean-going ships. Tiny organisms like Zebra and Quagga Mussels have had a massive impact, dramatically increasing water clarity by filtering out plankton, but also disrupting the food web from the bottom up.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "boating_safety_1", 
    title: "The River's Rules", 
    text: "Navigating the river's maze safely is about more than just steering; it's about knowing the 'rules of the road.' The simple mnemonic 'Red, Right, Returning' is a fundamental principle, reminding captains to keep the red-colored navigation buoys on their right-hand side when heading upstream, or 'returning' from the sea. It's the key to staying in the safe, marked channel.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "fishing_lore_1", 
    title: "A Fisherman's Paradise", 
    text: "The St. Lawrence River is a world-renowned fishery, so famous for its healthy population of hard-fighting Smallmouth Bass that it regularly attracts major professional fishing tournaments. For these anglers, the river is a paradise, offering the chance to catch trophy-sized 'bronze-backs' against a stunning backdrop.", 
    unlocked: false, 
    icon: Fish 
  },
  { 
    key: "ghost_story_1", 
    title: "Whispers on the Water", 
    text: "Every old River Rat has a favorite ghost story, and many of them are true... at least in the telling. They whisper tales of haunted lighthouses where phantom keepers still tend the light, and of the ghost of a young girl named Minnie, said to wander the shores of Longue Vue Island after a tragic accident. At night on the river, every shadow on the water seems to hold a story.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "famous_people_1", 
    title: "Presidential Retreat", 
    text: "The Thousand Islands was launched into the national spotlight as a premier summer destination after a famous visit from President Ulysses S. Grant in 1872. His stay at the Crossmon House Hotel in Alexandria Bay, where he was famously photographed fishing from the docks, signaled to America's Gilded Age elite that this was the new fashionable place to be.", 
    unlocked: false, 
    icon: BookOpen 
  },
  { 
    key: "cross_border_culture_1", 
    title: "A Shared Heritage", 
    text: "The St. Lawrence River doesn't truly divide two nations; it connects them. The culture of the Thousand Islands is a unique blend of American and Canadian traditions, humor, and history. It's a place where you're just as likely to hear about hockey as you are about baseball, and where the 'World's Shortest International Bridge' is a beloved inside joke shared by both sides.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "shipping_history_1", 
    title: "Lakers and Salties", 
    text: "A true River Rat can spot the two different kinds of giants on the Seaway from a mile off. The 'Lakers' are long, narrow freighters specifically designed to fit through the Seaway's locks and navigate the Great Lakes. The 'Salties' are the stout, sturdy ocean-going vessels that have traveled the world's oceans to bring their cargo to the heart of the continent.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "wildlife_nature_1", 
    title: "Nature's Pharmacy", 
    text: "The islands are a living pharmacy for those who know the old ways. A prime example is Jewelweed, a native plant whose sap is a well-known folk remedy for soothing the itchy rash of poison ivy. As nature's poetry would have it, the cure, Jewelweed, often grows right next to the affliction, poison ivy.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "local_events_1", 
    title: "A Community's Heartbeat", 
    text: "The rhythm of the summer season on the river is marked by beloved local events that form the heartbeat of the community. From the high-octane roar of the engines during the annual Poker Run to the quiet reverence and gleaming varnish of the Antique Boat Show in Clayton, these gatherings bring together locals and visitors to celebrate the unique culture of the islands.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "river_cruises_1", 
    title: "Stories on the Water", 
    text: "For over a century, the primary storytellers of the river have been the captains of the tour boats. Companies like Uncle Sam Boat Tours in the U.S. and the Gananoque Boat Line in Canada have guided millions of visitors through the island maze, their captains narrating tales of pirates, Prohibition-era smugglers, and Gilded Age castles as they glide past the historic sights.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "local_history_1", 
    title: "Loyalist Legacy", 
    text: "The Canadian side of the river, particularly the scenic road known as the Loyalist Parkway, is steeped in the legacy of the United Empire Loyalists. After the American Revolution, those who remained loyal to the British Crown fled the new United States and were granted land along the St. Lawrence in Canada to begin new lives. Their spirit of endurance and principle shaped the character of many Ontario river communities.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "scenic_spots_1", 
    title: "The Golden Hour", 
    text: "Ask any photographer or romantic, and they'll tell you the most magical time on the river is the 'golden hour'—the short period just after sunrise and just before sunset. During this time, the low, warm light sets the granite islands ablaze with color and turns the surface of the water into a shimmering sheet of liquid gold, creating unforgettable, magical views.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "island_names_1", 
    title: "What's in a Name?", 
    text: "The names of the islands and channels are a map of history themselves. 'Grindstone Island' recalls a past of active quarrying, the 'Admiralty Group' speaks of the British naval surveys that first charted these waters, and evocative names like 'Fiddler's Elbow' and 'Bloodletter Island' hint at the darker, more dangerous tales of the river's past.", 
    unlocked: false, 
    icon: BookOpen 
  },
  { 
    key: "food_dining_1", 
    title: "Taste of the River", 
    text: "The ultimate local flavor, the true taste of the Thousand Islands, is a plate of pan-fried walleye or yellow perch, freshly caught from the river's clean, cool waters. It's a simple, delicious meal that represents a direct connection to the natural bounty that has sustained the people of this region for centuries.", 
    unlocked: false, 
    icon: Fish 
  },
  { 
    key: "survival_scenario_1", 
    title: "Marooned!", 
    text: "Every boater has had the fleeting thought: what if I were stranded? The river's currents are powerful and its waters are cold, even in summer. Knowing the basics of survival—how to create a signal, how to find or purify water, and how to build a basic shelter—is part of the unwritten code of the self-reliant River Rat.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "nepco_spill_1", 
    title: "The Black Day", 
    text: "The winter of 1976 is remembered for a black tide. On a frigid day, the tanker 'NEPCO 140' ran aground in icy conditions near Wellesley Island, spilling over 300,000 gallons of crude oil. It was a devastating environmental disaster, coating miles of shoreline and wildlife in a thick, toxic sludge. The event became a powerful catalyst for new environmental regulations and the formation of the 'Save The River' organization, a group dedicated to protecting this natural treasure.", 
    unlocked: false, 
    icon: Zap 
  },
  { 
    key: "local_business_1", 
    title: "Guardians of Wood & Varnish", 
    text: "Some businesses are more than just shops; they are living institutions. For generations, Chalk's Marine in Clayton has been a sanctuary for classic wooden boats. The craftsmen there are not just mechanics; they are artisans who understand the soul of a St. Lawrence Skiff or a Chris-Craft runabout. Their work is a living link to the Gilded Age, preserving the elegance and heritage of a bygone era, one plank and one coat of varnish at a time.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "celestial_event_1", 
    title: "Sky Fire", 
    text: "On rare, clear nights, when the sun has unleashed a powerful solar storm, the Thousand Islands gets a visitor from the heavens. The Aurora Borealis, the Northern Lights, will set the northern sky ablaze. Far from the glow of major cities, the sky dances with ethereal curtains of green, purple, and white light, reflecting silently on the black water of the river. To the ancient peoples, this was the dance of spirits; to the modern islander, it's a breathtaking reminder of our place in a vast, beautiful universe.", 
    unlocked: false, 
    icon: Star 
  },
  { 
    key: "historic_flood_1", 
    title: "The Raging River", 
    text: "The river is a mighty beast, and sometimes it strains against its man-made leash. Because the river is the single drain for all of the Great Lakes, high water levels across the entire basin can lead to historic '100-year floods' in the islands. This has sparked fierce debate over 'Plan 2014,' the international agreement that governs water releases from the main dam, pitting the needs of shoreline property owners against those of the shipping industry and the health of wetlands.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "local_business_2", 
    title: "A Table by the Water", 
    text: "For over half a century, Cavallario's Steak and Seafood House has been a cornerstone of Alexandria Bay's dining scene. It's a place of memories, where generations of local families and visiting tourists have gathered for celebratory steak dinners and fresh river fish. Its longevity is a testament to the enduring appeal of good food and classic hospitality, a constant in a town that changes with the seasons.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "seasonal_event_1", 
    title: "The Great Thaw", 
    text: "For a true River Rat, the most important date on the calendar isn't a holiday; it's the day of 'ice-out.' It's the day, usually in late spring, when the winter's icy armor on the river finally groans, cracks, and breaks apart, releasing the water from its frozen prison. The sound of the shifting ice is the sound of the river breathing again, signaling the true arrival of spring and the start of another boating season.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "river_cruises_2", 
    title: "The Castle's Ferryman", 
    text: "While many boat tours ply the waters of the Thousand Islands, only one company holds the key to the castle. The Uncle Sam Boat Tours' popular 'Two-Nation Tour' is the exclusive ferryman for Boldt Castle, offering its visitors the unique privilege of disembarking on Heart Island to wander the grounds and explore the halls of the famous unfinished monument to love.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "local_business_3", 
    title: "The Fish Fry Beacon", 
    text: "In the small, quiet hamlet of Fishers Landing, a weekly tradition signals the start of the weekend: the Friday Fish Fry at Foxy's. It's more than just a meal; it's a community gathering, a place where fishermen, locals, and tourists come together for a taste of classic river life. For decades, it's been a reliable and beloved beacon of good food and good company.", 
    unlocked: false, 
    icon: Fish 
  },
  { 
    key: "cross_border_culture_5", 
    title: "The Winteriver", 
    text: "When the tourists leave and the ice sets in, a special breed of islander remains. They sometimes call themselves a 'winteriver.' They are the hardy souls who embrace the profound quiet, the stark beauty, and the unique challenges of a Thousand Islands winter. They know the sound of the ice shifting underfoot and the best way to keep a water pipe from freezing. It's a title earned through resilience and a deep love for the river in all its moods.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "local_business_4", 
    title: "A Century of Sightseeing", 
    text: "Since 1926, the Thomson family's Uncle Sam Boat Tours has been introducing visitors to the magic of the Thousand Islands. Starting with a single small wooden boat and growing into a fleet of modern tour vessels, their company has become as much a part of the Alexandria Bay waterfront as the river itself, having carried millions of passengers and countless stories over nearly a century of operation.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "local_landmarks_4", 
    title: "The Granite Shield", 
    text: "The massive breakwall at Cape Vincent is more than just a place to fish. It is a shield, built from enormous, locally quarried granite blocks, designed to protect the town's harbor from the full fury of Lake Ontario's storms. It creates a vital safe haven for vessels at the very mouth of the St. Lawrence River.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "historical_event_1", 
    title: "The Night the Lights Went Out", 
    text: "The Great Northeast Blackout of 1965 plunged 30 million people into darkness, and the cascade of failures began with a single, incorrectly set safety relay at a power station near Niagara. This event highlighted the interconnectedness and fragility of our modern power grid, a system that has deep roots in the hydroelectric power generated right here on the St. Lawrence River.", 
    unlocked: false, 
    icon: Zap 
  },
  { 
    key: "fishing_lore_4", 
    title: "Reading the Water", 
    text: "Serious anglers know that fishing is a science of reading the unseen. They use tools like a 'thermocline bar'—essentially a thermometer on a long, marked line—to find the invisible layer where the warm surface water meets the cold deep water. This 'thermocline' attracts baitfish, and where there are baitfish, the big predators are never far behind.", 
    unlocked: false, 
    icon: Fish 
  },
  { 
    key: "cross_border_culture_6", 
    title: "The Invisible Line's Rules", 
    text: "While cruising between the US and Canada is easy, the rules of the water change the moment you cross the invisible border. A key difference is Canada's legal requirement for all boat operators to have a Pleasure Craft Operator Card (PCOC), or a recognized equivalent. Forgetting this can turn a pleasant international cruise into an unwanted conversation with the authorities.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "historical_event_2", 
    title: "The Ice Storm's Grip", 
    text: "The great Ice Storm of 1998 was a catastrophe of silence and weight. It wasn't a blizzard, but days of unrelenting freezing rain that encased the entire region in a thick, heavy shell of clear ice. The immense weight toppled massive steel transmission towers and shattered ancient forests, leaving millions of people in the dark and cold for weeks, a powerful and devastating display of nature's subtle force.", 
    unlocked: false, 
    icon: Trees 
  },
  { 
    key: "local_culture_2", 
    title: "The Island Lifeline", 
    text: "For the communities of islanders who live off the beaten path, without bridges or regular ferry service, the 'Mailboat' is their essential lifeline. These small, private boats are contracted to deliver not just letters, but groceries, supplies, news, and gossip, weaving through the islands to connect the scattered homes of the river community to the mainland.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "island_geography_8", 
    title: "Threading the Needle", 
    text: "The section of the river known to locals as 'The Narrows' is a rite of passage for boaters. This winding, scenic channel near Wellesley Island demands careful navigation, as beautiful cottages are perched on the rocky shores on either side. Their owners watch every boat pass, silently judging who can 'thread the needle' without creating a disruptive wake.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "conservation_2", 
    title: "The River's Eyes", 
    text: "How do scientists check the river's vision? With a surprisingly simple tool called a Secchi disk. This black and white disk is lowered into the water until it can no longer be seen, providing a consistent measurement of water clarity. It's a fundamental health check for the river, revealing the long-term impacts of pollution, algae blooms, and invasive filter-feeders like zebra mussels.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "famous_people_3", 
    title: "The President's Pastime", 
    text: "An iconic photograph from 1872 helped launch the Thousand Islands as a major tourist destination. The picture shows the celebrated Civil War hero and then-President, Ulysses S. Grant, peacefully fishing from the docks of the Crossmon House Hotel in Alexandria Bay. The image of the powerful leader relaxing on the river signaled to the world that this was a place for rest, recreation, and escape.", 
    unlocked: false, 
    icon: BookOpen 
  },
  { 
    key: "final_revelation", 
    title: "You have sought knowledge and uncovered many secrets of the water. You have listened to the whispers of history, the tales of pirates, and the legends of the river. But here is the last secret, the one every true River Rat learns in their heart: the real treasure was never Bill Johnston's gold. It is the enduring spirit of this place, the stunning beauty of its nature, and the privilege of becoming part of the endless story that the river itself tells. Congratulations, Captain. You are a true keeper of the lore.", 
    unlocked: false, 
    icon: Star 
  },
  { 
    key: "war_history_clue_2", 
    title: "A Watery Highway of War", 
    text: "In the age of sail, he who controlled the St. Lawrence River controlled access to the entire Great Lakes basin. During the War of 1812, the river was the primary supply line for troops, cannons, and provisions for all the forts further inland. The desperate race between the shipyards at Sackets Harbor and Kingston to build bigger, more powerful sailing warships was a struggle for the control of this vital strategic highway.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "architecture_clue_2", 
    title: "Gilded Age Playgrounds", 
    text: "The Thousand Islands was one of several exclusive summer playgrounds for the Gilded Age elite, who also built their opulent 'cottages' in places like Newport, Rhode Island, and Bar Harbor, Maine. The grand architecture of the islands reflects a national trend among the fabulously wealthy to showcase their immense fortunes by building magnificent seasonal homes in beautiful, natural settings.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "fishing_lore_2", 
    title: "The Invisible Ledge", 
    text: "The river's bottom is not flat; it's a dramatic landscape of its own, with cliffs, ledges, and deep-water drop-offs. Experienced anglers know that predatory fish like walleye and bass often hunt along the 'thermocline'—an invisible temperature layer—which frequently forms along these underwater structures. Finding these spots is the key to finding the fish.", 
    unlocked: false, 
    icon: Fish 
  },
  { 
    key: "shipwreck_lore_2", 
    title: "The Perils of Commerce", 
    text: "Not all shipwrecks are the result of storms or war. The wreck of the 'America,' a package freighter located near Kingston, is a reminder of the everyday perils of river commerce. The 'America' was a workhorse of the river, transporting goods daily, until a simple navigational error sent her to the bottom, where she now rests as a popular site for scuba divers.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "boating_safety_2", 
    title: "A Boater's Lexicon", 
    text: "To speak the river's language, you must know the parts of your vessel. The 'gunwale' (pronounced 'gunnel') is the proper nautical term for the upper edge of a boat's side. Knowing the correct terminology isn't just for show; it's crucial for clear and unambiguous communication, especially in an emergency situation.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "wildlife_nature_2", 
    title: "A Graceful Return", 
    text: "The healthy population of white-tailed deer on the islands today is a modern conservation success story. Once hunted out of the region entirely, these graceful animals have made a remarkable comeback thanks to management efforts. It's now not uncommon to see them swimming between islands at dawn or dusk, a beautiful sign of a resilient ecosystem.", 
    unlocked: false, 
    icon: Trees 
  },
  { 
    key: "local_landmarks_1", 
    title: "A Private Fantasy", 
    text: "While Boldt and Singer Castles have become public attractions, some of the river's other Gilded Age castles remain private summer homes. Jorstadt Castle on Westminster Park is one such place, a magnificent stone mansion that is still a family's private retreat, offering a glimpse of a modern-day fairytale.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "local_events_2", 
    title: "A Nation's Birthday", 
    text: "The river often serves as a grand stage for national celebrations. On Canada Day (July 1st), the skies above Kingston's harbour explode in a massive fireworks display. The show is launched from a floating barge, creating a spectacular celebration of Canadian pride that is reflected beautifully in the dark waters of the harbour.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "boating_safety_3", 
    title: "Green for Go-Left", 
    text: "The river's navigation rules are simple but absolutely vital for safety. A green, can-shaped buoy always marks the left side of the safe channel when you're heading upstream (away from the sea). This is the other half of the famous 'Red, Right, Returning' rule, which keeps boat traffic organized and prevents collisions.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "scenic_spots_2", 
    title: "The Eagle's Eye View", 
    text: "From the observation deck of the 1000 Islands Tower on Hill Island, the complex international border becomes a visible, geographical reality. The panoramic view allows you to see both American and Canadian islands, the bridges that link them, and the massive freighters that navigate the shipping channel between them, all at once.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "war_history_clue_3", 
    title: "A Fort's Purpose", 
    text: "Fort Wellington in Prescott, Ontario, wasn't built for show. It was a key British defensive position constructed to protect the vital St. Lawrence River supply line from a potential American invasion during the War of 1812. Its cannons covered a critical section of the river, ensuring the passage of British troops and supplies.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "wildlife_nature_3", 
    title: "The Hardy Pioneer", 
    text: "The Pitch Pine is a true symbol of the islands' rugged endurance. This hardy tree is a pioneer species, known for its incredible ability to grow in the most inhospitable places, its roots clinging tenaciously to bare granite rock and thin soil where other trees would quickly perish.", 
    unlocked: false, 
    icon: Trees 
  },
  { 
    key: "boating_safety_4", 
    title: "The Silent Giants", 
    text: "For recreational boaters, the biggest danger in the shipping channel isn't what you can see, but what you can't anticipate. The massive lake freighters and ocean-going 'salties' move much faster than they appear, are surprisingly quiet, create immense wakes, and are physically incapable of stopping or turning quickly. A wise captain gives these silent giants a very, very wide berth.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "environmental_fact_3", 
    title: "The Blue Line Connection", 
    text: "The Frontenac Arch is a massive, ancient ridge of granite that forms a geological bridge, connecting the Canadian Shield to the great Adirondack Park to the south. The park's famous 'Blue Line' boundary, originally drawn on a map in blue ink in 1892, marks one of the largest and most important protected wilderness areas in the United States.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "lighthouse_legend_3", 
    title: "A Guiding Pair", 
    text: "Some lighthouses don't work alone. The Sister Island Lighthouse was part of a pair of lights that worked in concert as 'range lights.' By lining up the two beams, one behind the other, a ship's captain could be certain they were in the dead center of the safe channel, a clever system for navigating a particularly hazardous stretch of water.", 
    unlocked: false, 
    icon: Lightbulb 
  },
  { 
    key: "recreation_1", 
    title: "From River to Capital", 
    text: "For ambitious hikers, the Rideau Trail offers a unique journey. This long-distance hiking path stretches over 200 miles, connecting the city of Kingston at the mouth of the St. Lawrence River all the way to Canada's capital city, Ottawa. The trail roughly follows the scenic route of the historic Rideau Canal system.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "boating_history_1", 
    title: "The Captain's Taxi", 
    text: "In the Gilded Age, the immensely wealthy owner of a grand steam yacht wouldn't use the main vessel for a quick trip ashore to a neighboring island. For that, they used a 'gig'—a light, fast, and elegant tender boat, often powered by steam or naptha, which functioned as a luxurious water taxi to ferry guests and supplies from the yacht to the dock.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "island_geography_3", 
    title: "A Sea of Islands", 
    text: "The perfect geographical term for the Thousand Islands is an 'archipelago.' This word specifically describes a large group or a chain of islands, perfectly capturing the scattered, maze-like nature of the more than 1,800 islands that dot the St. Lawrence River.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "architecture_clue_3", 
    title: "A German Dream", 
    text: "George Boldt's grand vision for his castle was directly inspired by the romantic, towered fortresses he had admired along the Rhine River in Germany. The architectural style, known as Châteauesque or Rhineland Castle, was his attempt to bring a piece of old-world European fantasy and grandeur to the rugged landscape of the new world.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "boating_safety_5", 
    title: "Riding the Waves", 
    text: "A freighter's wake can be a formidable wave that can easily swamp a small boat. The safest maneuver for a kayaker or canoeist is not to flee from it or take it on the side, but to turn and face the wave head-on, pointing the bow of the kayak directly into the approaching swell to maintain maximum stability.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "conservation_1", 
    title: "A Voice for the River", 
    text: "The grassroots environmental organization 'Save The River' was founded in the wake of the 1976 NEPCO 140 oil spill. It acts as a non-profit watchdog and advocate for the St. Lawrence River, working to protect its fragile ecosystem through policy action, education, and by publishing resources like their popular 'Diver's and Boater's Guide.'", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "local_history_2", 
    title: "The River's Name for a Nation", 
    text: "The name of an entire country has its roots right here, on the shores of the St. Lawrence River. 'Canada' is derived from the St. Lawrence Iroquoian word 'Kanata,' which simply meant 'village' or 'settlement.' When early French explorer Jacques Cartier asked the local inhabitants about the area, they were referring to their village, but Cartier mistakenly applied the name to the entire territory.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "famous_people_2", 
    title: "Astor's Abode", 
    text: "The Vanderbilts weren't the only Gilded Age dynasty to build a summer sanctuary on the river. The Astor family, another of America's wealthiest and most prominent clans, built 'Hopewell Hall' as their grand seasonal 'cottage' on an island near Alexandria Bay, cementing the region's status as a playground for the rich and famous.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "boating_safety_6", 
    title: "A Sound of Warning", 
    text: "On the water, horns are a language with strict rules. Five or more short, rapid blasts from a ship's horn is the universal signal for 'Danger!' It can also mean 'I do not understand your intentions.' It's a clear and urgent warning to all nearby vessels to be on high alert and navigate with extreme caution.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "wildlife_nature_4", 
    title: "A Tale of Two Necks", 
    text: "It can be tricky to tell the river's two most magnificent large wading birds apart. The easiest way is to see them in flight: a Great Blue Heron always flies with its neck tucked back into a graceful 'S' curve, while the slightly larger Sandhill Crane flies with its neck fully extended and straight, like a spear.", 
    unlocked: false, 
    icon: Bird 
  },
  { 
    key: "shipping_history_2", 
    title: "A Fiery End", 
    text: "Many of the grand wooden steamboats of the Gilded Age, which were essentially floating wooden palaces, met a similar and tragic fate. The 'Frontenac,' a luxurious side-wheel steamer, wasn't sunk by a storm but was completely destroyed by a massive fire while moored at its dock in Clayton in 1907, a common end for the vessels of its era.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "local_landmarks_2", 
    title: "A Harbor's Shield", 
    text: "A 'breakwater' is a man-made wall, often built of massive stone blocks or concrete, designed to shield a harbor from the fury of the open water. The one at Cape Vincent, for instance, creates a calm, safe area for boats to moor, protecting them from the often-rough waves rolling in from the vast expanse of Lake Ontario.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "recreation_2", 
    title: "A Paddler's Pace", 
    text: "To truly experience the river's hidden beauty and quiet moments, you have to slow down. Kayaking and canoeing allow you to glide almost silently into the narrow channels and shallow coves that are inaccessible to larger, motorized boats. This offers a more intimate and peaceful connection with the river's abundant nature.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "survival_scenario_2", 
    title: "Engine Failure!", 
    text: "If your engine suddenly cuts out on the river, the wind and current instantly become your enemies, relentlessly pushing you towards the dangers of shoals or the busy shipping lane. In this situation, the single most important first action is to deploy your anchor to secure your position while you troubleshoot the problem or call for assistance.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "architecture_clue_4", 
    title: "The Silent Chime", 
    text: "The grand clock tower on Boldt Castle's Power House was designed for more than just telling time. It was built to house a massive carillon of bells that would have chimed out beautiful melodies across the water. But like so many other parts of the castle, the bells were never installed after construction halted, leaving the tower beautiful but forever silent.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "boating_safety_7", 
    title: "Right is Right", 
    text: "Here is an easy trick to remember some basic but crucial nautical terms: the 'starboard' side of a boat is always the right side when you're facing forward. An easy way to remember this is that 'starboard' and 'right' both contain the letter 'R'. The left side is 'port'.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "environmental_fact_4", 
    title: "The Goby's Game", 
    text: "The Round Goby is a small but highly aggressive, bottom-dwelling invasive fish that arrived in the Great Lakes and the St. Lawrence in the ballast water of ocean-going ships. It reproduces rapidly and out-competes many native species for food and spawning grounds, significantly altering the river's delicate food web.", 
    unlocked: false, 
    icon: Fish 
  },
  { 
    key: "island_names_2", 
    title: "A Veteran's Reward", 
    text: "The 'Navy' group of islands, located in the Canadian sector of the river, earned their collective name for a historical reason. They were granted by the British Crown to loyal naval veterans as a reward for their service in the French and Indian War (1754-1763), long before the American Revolution reshaped the continent.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "food_dining_2", 
    title: "The Hotel Connection", 
    text: "It took a hotelier with a global stage to take Thousand Island dressing from a local fisherman's secret to a household name. George Boldt, the proprietor of New York's world-famous Waldorf-Astoria Hotel, was so impressed with the dressing that he introduced it to his elite clientele, and the rest is culinary history.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "boating_safety_8", 
    title: "Fore and Aft", 
    text: "Knowing the proper directions on a boat is day-one stuff for a true River Rat. 'Aft' is the proper nautical term for the rear of the vessel. Therefore, 'abaft' simply means 'toward the rear' or 'behind.' The front of the boat is the 'bow' and toward the front is 'fore.'", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "lighthouse_legend_4", 
    title: "A Beacon on the Hazard", 
    text: "Some lighthouses warn of a danger from a safe distance, but the Sunken Rock Lighthouse does the opposite. It is built directly on top of the treacherous, mid-channel shoal that it marks. This placement makes it a stark and constant reminder to passing ships of the hazard lurking just beneath the waves.", 
    unlocked: false, 
    icon: Lightbulb 
  },
  { 
    key: "boating_history_2", 
    title: "A Hole for a Purpose", 
    text: "If you look at the ribs or frames of a classic wooden boat, you might see small notches or holes called 'limber holes.' These aren't a mistake; they are a crucial design feature that allows any water that gets inside the hull to drain down to the lowest point (the bilge) so it can be pumped out by the bilge pump.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "war_history_clue_4", 
    title: "A Fleet Immortalized", 
    text: "The names of the 'Lake Fleet' islands, located in the Canadian waters of the St. Lawrence, serve as a floating memorial to a naval conflict. Many of the islands in this group are named after the British warships that fought in the naval battles on the Great Lakes during the War of 1812.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "boating_safety_9", 
    title: "The Ripples of Responsibility", 
    text: "A boat's wake—the trail of waves it leaves behind—can cause significant erosion and damage to shorelines, docks, and smaller boats. 'No Wake' zones, marked by white buoys with orange symbols, are legally enforceable areas where boats must slow down to idle speed to prevent creating a damaging wake.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "architecture_clue_5", 
    title: "The Skyscraper Architect", 
    text: "The architect hired to design Singer Castle on Dark Island was Ernest Flagg, a prominent American designer who was also famous for a much taller project: the Singer Building in New York City, which was the world's tallest building when completed. The castle on Dark Island was his whimsical, Scottish-inspired country retreat.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "boating_safety_10", 
    title: "A Captain's Map", 
    text: "A 'nautical chart' is a boater's most important and essential tool. It is a special type of map that details not the land, but the world beneath the water. It shows water depths, navigation channels, the locations of buoys, and, most importantly, the hidden hazards like shoals and submerged rocks that are invisible from the surface.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "shipwreck_lore_3", 
    title: "A Captain's Choice", 
    text: "When a fire broke out on the passenger steamship 'Iroquoi,' the captain made a heroic and quick-thinking choice. Instead of letting the ship sink in the deep channel, which would have doomed the passengers, he intentionally ran it aground on the shore. This brave act saved everyone on board and left behind a fascinating wreck that scuba divers still explore today.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "boating_safety_11", 
    title: "The 'Hello, I'm Here!' Signal", 
    text: "On the water, you often can't see what's around a blind bend or what's about to pull out from a hidden marina. That's why one prolonged blast from a boat's horn is the standard signal a captain uses when leaving a dock or approaching a blind corner. It's a simple auditory way of announcing your presence to any unseen vessels.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "environmental_fact_5", 
    title: "An Eastern Pioneer", 
    text: "While Canada's most famous and sprawling national parks are located in the majestic Rocky Mountains, the much smaller Thousand Islands National Park holds a special distinction. Established in 1904, it was the very first Canadian national park located east of the Rockies, making it a pioneering conservation effort in Eastern Canada.", 
    unlocked: false, 
    icon: Trees 
  },
  { 
    key: "boating_safety_12", 
    title: "How Low Can You Go?", 
    text: "A boat's 'draft' is the measurement of the minimum depth of water it needs to float freely without its hull or propeller hitting the bottom. Knowing your boat's specific draft and constantly comparing it to the depths shown on a nautical chart is the most fundamental way to avoid the embarrassment and danger of running aground.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "local_history_3", 
    title: "The Loyalist Road", 
    text: "The scenic King's Highway 2 on the Canadian side of the river is also officially known by a commemorative name: the 'Loyalist Parkway.' This name honors the United Empire Loyalists who, remaining loyal to the British Crown, fled the American Revolution and were granted land along the St. Lawrence River to settle and build new lives.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "island_geography_4", 
    title: "The Big Island's Ferry Route", 
    text: "To get from the Canadian mainland to Wolfe Island, the largest of all the Thousand Islands, vehicles and passengers must cross the 'Bateau Channel.' This deep and relatively wide strait has served as the primary ferry route to the island's main village of Marysville for many generations.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "boating_safety_13", 
    title: "The Boat's Heartbeat", 
    text: "A 'bilge pump' is one of a boat's most essential pieces of safety equipment. Its sole purpose is to pump out any unwanted water that leaks or splashes into the lowest part of the hull, called the bilge. A good captain always makes sure their bilge pump is in perfect working order before leaving the dock.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "cross_border_culture_2", 
    title: "Ontario's Watery Welcome", 
    text: "The 'Great Waterway' is the official tourism branding for the large region of southeastern Ontario that is defined by its relationship with its waterways. This brand highlights the St. Lawrence River, as well as the Rideau Canal and Bay of Quinte, as the region's central cultural, historical, and recreational feature.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "boating_safety_14", 
    title: "The Pointy End", 
    text: "The most basic of all nautical terms is the 'bow,' which simply refers to the very front of a boat. Every sailor, from a brand new recruit to a seasoned admiral, knows their 'bow' (front) from their 'stern' (back).", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "island_names_3", 
    title: "An Industrial Past", 
    text: "Grindstone Island wasn't named because it is shaped like a grindstone. It earned its name from its industrial past as a source of high-quality, durable sandstone. This stone was once actively quarried on the island and was prized for making the large grindstones used by craftsmen to sharpen tools.", 
    unlocked: false, 
    icon: Mountain 
  },
  { 
    key: "local_events_3", 
    title: "Fireworks on the Water", 
    text: "The spectacular annual 4th of July fireworks display in Alexandria Bay is traditionally launched from a specially positioned barge anchored in the middle of the St. Lawrence River. This central location allows for breathtaking views as the vibrant colors explode over and reflect upon the dark water for the massive crowds gathered on boats and on both shores.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "survival_scenario_3", 
    title: "Don't Abandon Ship!", 
    text: "If your small boat capsizes in the river, the golden rule of survival is to stay with the vessel if at all possible. Even an overturned hull is a much larger and more visible target for rescuers to spot from the air or from another boat than a person's head in the water. Climbing on top of the hull also gets you out of the dangerously cold water.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "wildlife_nature_5", 
    title: "The Wing-Dryer", 
    text: "The Double-crested Cormorant, a dark, prehistoric-looking water bird, is a common sight in the islands. They are often seen perched on buoys and rocks with their wings spread wide open in the sun. Unlike a duck's feathers, a cormorant's are not fully waterproof, so they must take time to air-dry them after diving for fish.", 
    unlocked: false, 
    icon: Bird 
  },
  { 
    key: "boating_safety_15", 
    title: "The Tying Post", 
    text: "A 'cleat' is the simple, T-shaped metal or plastic fitting found on docks and boats. Its crucial job is to provide a strong, secure point for tying a rope or dock line. Knowing how to properly tie a 'cleat hitch' knot is one of the most fundamental skills for any boater.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "food_dining_3", 
    title: "Squeaky Cheese", 
    text: "The delicious local delicacy known as fried cheese curds is made from a special, fresh curd cheese, not from aged mozzarella or cheddar. The freshness is key; when the curds are at their freshest, they have a unique, rubbery texture that 'squeaks' against your teeth when you bite into them.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "shipwreck_lore_4", 
    title: "The Keystorm's Grave", 
    text: "The massive wreck of the steel freighter 'Keystorm,' which sank in 1912 with a cargo of coal, is one of the most famous and popular advanced scuba diving sites in the region. It lies in the shadow of Rock Island Lighthouse, a testament to the fact that even modern, steel-hulled ships were not immune to the river's hidden and treacherous shoals.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "island_geography_5", 
    title: "A Cozy Anchorage", 
    text: "While a 'bay' can be a large and open body of water, a 'cove' is specifically a small, circular, and sheltered inlet. For boaters on the St. Lawrence, the river's many coves are prized as the safest and most peaceful places to drop anchor for the night, protected from the wind and the wakes of passing ships.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "boating_history_3", 
    title: "The Skiff Makers", 
    text: "The historic boatbuilding firm of 'Lawlor & Son' in Clayton, New York, was one of the most famous and prolific builders of the iconic St. Lawrence Skiff. Their elegant, high-quality rowing boats are now prized antiques and are celebrated as perfect examples of the region's unique and rich boating heritage.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "boating_safety_16", 
    title: "Head-On at Night", 
    text: "At night, a boat's navigation lights are its eyes and its voice. If you see both a red light (port side) and a green light (starboard side) on another vessel at the same time, it means you are looking at it head-on. This is a potentially dangerous situation, and one or both vessels must take action to avoid a collision.", 
    unlocked: false, 
    icon: Lightbulb 
  },
  { 
    key: "cross_border_culture_3", 
    title: "A Taste of Quebec", 
    text: "Poutine—a hearty and delicious dish of french fries and fresh cheese curds smothered in a rich brown gravy—is a classic French-Canadian comfort food and a national dish of Canada. You're much more likely to find this beloved meal in restaurants on the Ontario side of the river than on the American side.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "local_landmarks_3", 
    title: "A Ringside Seat", 
    text: "The tiny 'Tom Thumb' island, with its single, brave little cottage, is famous for its precarious location. It sits right beside a major shipping channel marker, giving its residents a thrilling, front-row, and sometimes startlingly close view of the massive, 700-foot freighters that glide silently past their window.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "boating_safety_17", 
    title: "The Boater's Best Friend", 
    text: "The acronym PFD stands for Personal Flotation Device. More commonly known as a life jacket or life vest, it's the single most important piece of safety equipment on any boat. Having enough properly-fitting PFDs for every passenger on board isn't just a good idea—it's the law.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "architecture_clue_6", 
    title: "A Castle's Game Room", 
    text: "The Alster Tower at Boldt Castle, also known by the playful nickname 'the Hennery,' was designed for pure entertainment. Tucked away inside this whimsical structure was a complete, two-lane bowling alley for the amusement of the Boldt family and their Gilded Age guests. It was the ultimate private game room.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "environmental_fact_6", 
    title: "The Purple Plague", 
    text: "Purple Loosestrife is a classic example of a beautiful but dangerous invasive species. Its tall, vibrant purple flowers may look pretty in wetlands, but this non-native plant spreads aggressively, choking out the native vegetation like cattails that local wildlife depends on for food and shelter.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "survival_scenario_4", 
    title: "A Tree's Inner Strength", 
    text: "A knowledgeable woodsman or a well-read survivalist knows that in a desperate situation, sustenance can be found in unexpected places. The soft, cambium layer of inner bark on most pine trees is edible and has been used as a source of emergency nourishment for centuries by Indigenous peoples and lost explorers alike.", 
    unlocked: false, 
    icon: Trees 
  },
  { 
    key: "boating_history_4", 
    title: "Measuring the Deeps", 
    text: "A 'fathom' is an old nautical unit of measurement used specifically for water depth, equal to six feet. Before modern electronic depth sounders, sailors would drop a lead-weighted line marked in fathoms over the side to measure the depth of the water beneath their ship to avoid running aground.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "island_geography_6", 
    title: "The Bridge's Anchor", 
    text: "The Thousand Islands Bridge system uses several islands as 'stepping stones' to cross the river. The main Canadian span of the bridge lands on Hill Island, which serves as the crucial anchor point for the bridge on the northern side of the river and is also home to the 400-foot tall 1000 Islands Tower.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "ghost_story_2", 
    title: "The Spectral Sentry", 
    text: "The massive limestone walls of Fort Henry in Kingston are said to be patrolled by a spectral sentry. For years, late-night visitors and staff have reported seeing the ghostly figure of a lone soldier in an old 19th-century uniform, still walking his post on the ramparts, forever on duty.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "fishing_lore_3", 
    title: "The Troller's Technique", 
    text: "'Trolling' is a popular and highly effective fishing technique where a lure or bait is let out on a long line and dragged at a specific speed and depth behind a slowly moving boat. It's a great way to cover a lot of water and present a lure to active, hunting fish like pike, walleye, or trout.", 
    unlocked: false, 
    icon: Fish 
  },
  { 
    key: "boating_safety_18", 
    title: "Guardians of the Waterway", 
    text: "On the U.S. side of the river, the United States Coast Guard is the primary federal agency responsible for maritime safety. Their duties are extensive and include search and rescue operations, enforcing boating laws and safety regulations, and maintaining the vital aids to navigation like buoys and lighthouses.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "island_names_4", 
    title: "A Colorful Map", 
    text: "The historic islands and shoals of the St. Lawrence have some wonderfully descriptive and quirky names, from 'Sugar Island' and 'Bloodletter Island' to the winding 'Fiddler's Elbow' channel. But if you're looking for 'Mermaid Island' on an official nautical chart, you'll be looking forever—it's one name that's purely from a fantasy tale.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "island_geography_7", 
    title: "A Lake Within a River", 
    text: "The 'Lake of the Isles' is a beautiful and aptly named body of water. It feels like its own separate, tranquil lake, but it is actually the narrow, winding, and sheltered back channel that separates the large Wellesley Island from the U.S. mainland.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "boating_safety_19", 
    title: "Four Letters for Left", 
    text: "Here's an easy trick for remembering the most basic but crucial nautical terms: the 'port' side of a boat is the left side when you are facing forward. The memory aid is simple: both 'port' and 'left' are four-letter words. The right side is 'starboard.'", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "environmental_fact_7", 
    title: "Turbulent Waters", 
    text: "A 'boil' is the term for the turbulent, often violent, swirling water that is typically found downstream from a large dam or a major set of rapids. These powerful upwellings are created by the immense energy of the water and are extremely hazardous for any boat or swimmer.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "cross_border_culture_4", 
    title: "The First Faceoff", 
    text: "Local hockey historians claim that the very first international hockey game was played on the frozen river in the 1880s between teams from Kingston, Ontario, and Sackets Harbor, New York. It was the start of a long and storied, but friendly, cross-border rivalry in the sport.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "local_history_4", 
    title: "A Grand Hotel's Ghost", 
    text: "The Crossmon House was one of Alexandria Bay's largest and grandest Gilded Age hotels, famous for hosting President Ulysses S. Grant. Like many of the massive wooden structures of its time, it was tragically and completely destroyed by a massive fire in 1897.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "survival_scenario_5", 
    title: "Aground!", 
    text: "If your boat runs aground on a shoal, your first instinct might be to slam the engine in reverse, but this often just digs the propeller into the mud and makes things worse. A better first step is to shift weight by having passengers and heavy gear move to the part of the boat that is still floating deepest. This can sometimes be enough to lift the grounded part of the hull just enough to float free.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "boating_safety_20", 
    title: "The Diver Down Flag", 
    text: "The 'Alpha' flag—a distinctive blue and white swallow-tailed flag—is an important international signal that all boaters must recognize and respect. It signifies that the vessel flying it has a scuba diver in the water nearby. By law, other boats must keep well clear and operate at a slow, no-wake speed.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "boating_safety_21", 
    title: "A Friendly Inspection", 
    text: "The Canadian Coast Guard Auxiliary, a volunteer organization, offers a free, courtesy vessel safety check program sometimes known as 'C-Way.' Volunteers will come to your boat and inspect it for free to ensure you have all the required safety equipment on board, helping to prevent problems and fines before they happen.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "boating_safety_22", 
    title: "A Fork in the River", 
    text: "A navigation buoy with both red and green horizontal bands is called a 'bifurcation buoy,' and it marks where a channel splits into two. The color of the top band indicates the preferred, or main, channel. If the top band is green, you should keep the buoy on your left to stay in the main channel, following the 'Red, Right, Returning' rule.", 
    unlocked: false, 
    icon: MapPin 
  }
]

    

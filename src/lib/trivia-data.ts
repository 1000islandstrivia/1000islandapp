
import type { LucideIcon } from 'lucide-react';
import { Castle, Diamond, Fish, Scroll, Ship, Star, Trophy, Leaf, Anchor, MapPin, Lightbulb, BookOpen, Palette, Mountain, Trees, Waves, Bird, Shield, ShieldHalf, ShieldCheck, Gem, Award, Medal, Crown, Zap } from 'lucide-react';

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
    text: "The river's surface tells a story of sunlight and speedboats, but its cold, clear depths hold a much older, quieter tale. This is a paradise for those who seek history in the silence of a shipwreck.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "island_count_1", 
    title: "A Watery Labyrinth", 
    text: "To be an island here, you need to be above water all year and host at least two living trees. By that count, there are 1,864 islands, forming a beautiful and confusing maze.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "dressing_origin_1", 
    title: "A Tangy Tale", 
    text: "Gossip travels fast on the river, and one of the tastiest rumors is that the world-famous Thousand Island Dressing was whipped up right here, born from a fishing guide's wife and made famous in a grand Gilded Age hotel.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "singer_castle_1", 
    title: "The Castle of Secrets", 
    text: "On Dark Island, a castle of secrets stands guard. Built by the head of the Singer Sewing Machine company, it's a medieval fantasy complete with dungeons, secret passages, and gargoyles that watch the river with stony eyes.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "geology_rock_1", 
    title: "Foundation of Ages", 
    text: "The very bones of these islands are made of ancient granite, part of the Frontenac Arch. These are the worn-down tops of mountains that are among the oldest on the planet.", 
    unlocked: false, 
    icon: Mountain 
  },
  { 
    key: "boat_museum_1", 
    title: "Echoes of Wooden Hulls", 
    text: "The Antique Boat Museum in Clayton isn't just a collection of boats; it's a library of river stories, where every polished mahogany hull and gleaming brass fitting speaks of a bygone era of elegance and craftsmanship.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "river_rat_meaning_1", 
    title: "Lore Keepers", 
    text: "To be called a 'River Rat' is a badge of honor. It means you know the river’s moods, its secrets, and its stories. It means you're part of the river, and the river is part of you.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "boldt_construction_1", 
    title: "A Frozen Moment", 
    text: "The year 1904. That was when the hammers fell silent at Boldt Castle, freezing a moment of Gilded Age ambition and turning a monument of love into a memorial of loss.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "scenic_byway_1", 
    title: "The Winding Path", 
    text: "There are roads that follow the river's curves on both shores, offering breathtaking views at every turn. They are paths not just of pavement, but of history and natural wonder.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "smallest_post_office_1", 
    title: "Tiny Dispatches", 
    text: "Even the smallest of islands can play a part in connecting the world. The tiny, unofficial post office on Sugar Island is a testament to the quirky, independent spirit of island life.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "lost_ships_1", 
    title: "Underwater Ghosts", 
    text: "The cold, fresh water of the St. Lawrence is a perfect tomb. It preserves the 'Lost Ships of the 1000 Islands,' turning the riverbed into a silent, underwater museum of maritime history.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "singer_castle_material_1", 
    title: "Island Stone", 
    text: "Singer Castle was built from the very rock it stands upon. The granite was quarried from a neighboring island, making the castle a true child of the river.", unlocked:false, 
    icon: Mountain 
  },
  { 
    key: "canadian_gateway_1", 
    title: "The Limestone City", 
    text: "Kingston, Ontario, the 'Limestone City,' stands as a historic guardian at the river's gateway to Lake Ontario, its old stone forts and buildings rich with tales of Canada's past.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "just_room_enough_family_1", 
    title: "A Cozy Claim", 
    text: "The Sizeland family's dogged determination to have their very own island resulted in 'Just Room Enough Island,' a testament to making the most of what you have.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "seaway_agreement_1", 
    title: "Forging a Waterway", 
    text: "It took an agreement between two great nations to tame the river's rapids, forging a deep waterway that would change the course of commerce and the face of the river forever.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "bill_johnston_allegiance_1", 
    title: "The Rebel Pirate", 
    text: "Hero or villain? Bill Johnston fought for a cause, aiding Canadian rebels against the British Crown. To the empire, he was a pirate; to the patriots, a folk hero.", 
    unlocked: false, 
    icon: Diamond 
  },
  { 
    key: "power_authority_center_1", 
    title: "Harnessing the Current", 
    text: "The river's immense power, once a fearsome obstacle, is now harnessed by massive dams, its raw energy transformed into light and electricity for millions.", 
    unlocked: false, 
    icon: Zap 
  },
  { 
    key: "bridge_type_1", 
    title: "Graceful Span", 
    text: "To allow the passage of giant ocean-going ships, the main bridge over the river had to be a suspension bridge, its graceful cables soaring high above the international shipping channel.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "alster_tower_inspiration_1", 
    title: "A German Fairytale", 
    text: "The playful design of Boldt Castle's Alster Tower wasn't born from the river, but from a novel by Sir Walter Scott, a fairytale vision of German castles brought to life in New York.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "national_park_management_1", 
    title: "Canada's Jewel", 
    text: "The Thousand Islands National Park, managed by Canada, is a collection of protected islands dedicated to preserving the natural and cultural heritage of this unique region for all time.", 
    unlocked: false, 
    icon: Trees 
  },
  { 
    key: "us_tourism_hub_1", 
    title: "American Harbors", 
    text: "Towns like Alexandria Bay and Clayton serve as bustling hubs on the American shore, their harbors filled with tour boats and pleasure craft ready to explore the islands.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "bird_of_prey_1", 
    title: "Sky Hunter", 
    text: "Keep an eye on the sky for the Osprey, a magnificent raptor known as the 'fish hawk.' Watching one plunge into the river and emerge with a fish is a classic Thousand Islands sight.", 
    unlocked: false, 
    icon: Bird 
  },
  { 
    key: "boldt_yacht_house_1", 
    title: "Floating Palaces", 
    text: "The immense Boldt Yacht House was no mere boathouse; it was a cathedral of wood, designed to shelter the luxurious steam yachts and houseboats of the Gilded Age.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "muskellunge_name_1", 
    title: "The River King", 
    text: "The Muskellunge, or 'Muskie,' is the king of the river's predators. Elusive, powerful, and massive, it is the ultimate prize for any angler who dares to seek it.", 
    unlocked: false, 
    icon: Fish 
  },
  { 
    key: "cottage_country_1", 
    title: "Summer Sanctuaries", 
    text: "During the Gilded Age, the wealthy elite transformed the islands into their personal 'cottage country,' building grand seasonal homes to escape the city and enjoy the river's splendor.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "half_moon_bay_1", 
    title: "Sculpted by Water", 
    text: "Half Moon Bay is a natural amphitheater carved from the rock by the river itself. For decades, it has served as a unique floating church, with a minister preaching from a rocky pulpit to a congregation in boats.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "international_rift_1", 
    title: "Borderline Depths", 
    text: "The International Rift is a deep, narrow channel where the US-Canada border is squeezed between two islands, a place where you can cross a country's border in a single boat length.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "skiff_life_1", 
    title: "River Ramblers", 
    text: "The St. Lawrence Skiff is more than a boat; it's a way of life. These agile, elegant wooden boats are perfectly designed for the 'river rambling' lifestyle of exploring island nooks and crannies.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "cornwall_bridge_1", 
    title: "Vital Link", 
    text: "The bridge at Cornwall does more than carry cars; it's a vital link in the power grid and a key crossing in the commercial lifeblood of two nations.", 
    unlocked: false, 
    icon: Zap 
  },
  { 
    key: "devils_oven_1", 
    title: "Ancient Shelter", 
    text: "They say the pirate Bill Johnston used this natural cave as a hideout. Devil's Oven Island has offered shelter to fugitives, fishermen, and storytellers for centuries.", 
    unlocked: false, 
    icon: Mountain 
  },
  { 
    key: "biosphere_reserve_1", 
    title: "Living Harmony", 
    text: "The entire region is a UNESCO Biosphere Reserve, a special designation that recognizes its unique ecosystem and the community's effort to live in harmony with nature.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "haudenosaunee_territory_1", 
    title: "The People of the Longhouse", 
    text: "This entire region is the ancestral territory of the Haudenosaunee Confederacy. Their stories and traditions are the deepest, oldest layer of the river's history.", 
    unlocked: false, 
    icon: Bird 
  },
  { 
    key: "winery_known_for_1", 
    title: "Island Vines", 
    text: "The unique, rocky soil and moderating effect of the river create a special 'terroir' for growing grapes, leading to the rise of award-winning wineries along the shore.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "gananoque_boat_line_1", 
    title: "Canadian Cruises", 
    text: "From the charming Canadian town of Gananoque, fleets of tour boats depart, offering visitors stunning vistas of the 'Admiralty' and 'Lake' groups of islands.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "seaway_lock_1", 
    title: "River Elevators", 
    text: "The giant locks of the Seaway are true engineering marvels, using gravity and water to lift and lower massive ships over 80 feet at a time on their journey.", 
    unlocked: false, 
    icon: Zap 
  },
  { 
    key: "tibbetts_point_1", 
    title: "Gateway Guardian", 
    text: "This lighthouse stands as a lonely guardian at the very point where the mighty St. Lawrence River is born from the vastness of Lake Ontario.", 
    unlocked: false, 
    icon: Lightbulb 
  },
  { 
    key: "smugglers_run_1", 
    title: "Whiskey and Shadows", 
    text: "During Prohibition, the dark, confusing channels of the Thousand Islands became the perfect 'smuggler's run' for illicit Canadian whiskey flowing into the United States.", 
    unlocked: false, 
    icon: Diamond 
  },
  { 
    key: "pirate_days_1", 
    title: "Swashbuckler's Bash", 
    text: "Every year, Alexandria Bay celebrates its rogue history with 'Pirate Days,' a week of festivities honoring the pirate Bill Johnston with parades, battles, and general swashbuckling.", 
    unlocked: false, 
    icon: Diamond 
  },
  { 
    key: "islands_tower_1", 
    title: "Sky-High Views", 
    text: "For the ultimate perspective, the 1000 Islands Tower on the Canadian side lifts you 400 feet above the river for a breathtaking, panoramic map of the watery labyrinth below.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "seaway_president_1", 
    title: "Visionary Leader", 
    text: "It took the vision and political will of a former general, U.S. President Dwight D. Eisenhower, to finally push through the legislation that created the modern St. Lawrence Seaway.", 
    unlocked: false, 
    icon: BookOpen 
  },
  { 
    key: "eel_fishing_1", 
    title: "Ancient Tradition", 
    text: "The nighttime spearfishing of eels is an ancient tradition, practiced for generations by the Mohawk people of Akwesasne, a testament to a deep and enduring connection to the river's resources.", 
    unlocked: false, 
    icon: Fish 
  },
  { 
    key: "lost_channel_1", 
    title: "Navigational Challenge", 
    text: "The 'Lost Channel' earned its name when a British army got hopelessly lost in its confusing passages in 1760. It remains a challenge for boaters today.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "poker_run_1", 
    title: "High-Speed Cards", 
    text: "One of the river's most modern and thrilling traditions is the annual Poker Run, where high-performance speedboats race between islands, not for time, but to collect the best poker hand for charity.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "alster_tower_purpose_1", 
    title: "Playful Retreat", 
    text: "The Alster Tower at Boldt Castle, with its bowling alley and entertainment rooms, was not a defensive structure, but a whimsical, fairytale retreat designed for the Boldt children.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "parkway_location_1", 
    title: "The Northern Shore", 
    text: "The Thousand Islands Parkway is a dedicated scenic road that winds along the Canadian shoreline, offering stunning, unobstructed views of the river and islands.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "calumet_island_owner_1", 
    title: "Tobacco Baron's Isle", 
    text: "Calumet Island was once the site of a magnificent castle owned by Charles Emery, a tobacco tycoon, proving that the Gilded Age dream of a private island kingdom was widespread.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "zenda_farms_1", 
    title: "Pastoral Preserve", 
    text: "Zenda Farms isn't just a park; it's a preserve that protects the historic rural and agricultural character of the region, offering a peaceful glimpse into a different kind of river life.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "windmill_battle_location_1", 
    title: "Rebellion's Stand", 
    text: "The old windmill near Prescott, Ontario, was the site of a bloody battle during the Patriot War, a stark reminder of the region's turbulent political past.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "duck_migration_1", 
    title: "Feathered Travelers", 
    text: "The river serves as a vital resting and feeding stop on the Atlantic Flyway, a migratory highway for countless ducks, geese, and other waterfowl.", 
    unlocked: false, 
    icon: Bird 
  },
  { 
    key: "rideau_canal_connects_1", 
    title: "Historic Waterway", 
    text: "The Rideau Canal, a 19th-century engineering marvel, connects the St. Lawrence at Kingston to Ottawa, creating a historic inland waterway and a UNESCO World Heritage site.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "minna_anthony_location_1", 
    title: "Island Nature Hub", 
    text: "Within Wellesley Island State Park lies the Minna Anthony Common Nature Center, the largest nature center in the NY State Park system and a hub for environmental education.", 
    unlocked: false, 
    icon: Trees 
  },
  { 
    key: "tilt_mission_1", 
    title: "Guardians of the Green", 
    text: "The Thousand Islands Land Trust (TILT) acts as a guardian for the region's wild spaces, working to conserve land and protect the natural beauty for future generations.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "frontenac_fate_1", 
    title: "Steamboat's Demise", 
    text: "The grand steamboat 'Frontenac' was a floating palace of the Gilded Age until 1907, when a tragic fire consumed it, leaving a ghostly wreck on the riverbed.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "tibs_focus_1", 
    title: "River Scientists", 
    text: "The Thousand Islands Biological Station (TIBS) is where scientists study the river's pulse, researching everything from invasive species to fish populations to keep the ecosystem healthy.", 
    unlocked: false, 
    icon: Fish 
  },
  { 
    key: "playhouse_known_for_1", 
    title: "Stage by the River", 
    text: "The Thousand Islands Playhouse in Gananoque, ON, offers professional theatre in one of the most scenic settings in Canada, with the St. Lawrence River as its dramatic backdrop.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "shoal_definition_1", 
    title: "Hidden Hazard", 
    text: "A shoal is a captain's nightmare: a hidden shallow area of rock or sand that can rip the bottom out of an unsuspecting boat. The river is full of them.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "covenanter_shipwreck_1", 
    title: "Diver's Destination", 
    text: "The wreck of the schooner 'Covenanter' is a popular destination for scuba divers, a well-preserved piece of 19th-century maritime history resting on the river floor.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "fort_henry_1", 
    title: "Garrison Hill", 
    text: "The massive Fort Henry in Kingston was built by the British to defend their naval dockyards and control the entrance to the Rideau Canal and the St. Lawrence River.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "zavikon_island_bridge_1", 
    title: "A Bridge of Contention", 
    text: "The tiny bridge between the two Zavikon Islands is famously and humorously claimed to be the shortest international bridge, though in reality, both islands are in Canada.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "dressing_origin_2", 
    title: "From River to Ritz", 
    text: "Though born in a rustic fishing camp on the river, Thousand Island dressing became world-famous when hotel magnate George Boldt put it on the menu at his luxurious Waldorf-Astoria Hotel in New York City.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "shipwreck_lore_1", 
    title: "The Silent Fleet", 
    text: "The cold, fresh water of the St. Lawrence acts as a time capsule. Down in the dark, dozens of shipwrecks—schooners, steamers, barges—rest in a state of stunning preservation, their stories waiting for divers to read.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "architecture_clue_1", 
    title: "Blueprints for a Dream", 
    text: "The grand castles of the Gilded Age weren't just whimsical fancies. They were meticulously designed by prominent architectural firms, who were challenged to build European-style fortresses on rugged, remote river islands.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "environmental_fact_1", 
    title: "The Unseen Invaders", 
    text: "The river's ecosystem is in a constant battle with unseen invaders. Tiny organisms like Zebra Mussels have drastically changed the water clarity and food web, a permanent mark left by global shipping.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "boating_safety_1", 
    title: "The River's Rules", 
    text: "Navigating the river isn't just about steering. It's about knowing the 'rules of the road.' Simple mnemonics about the color and shape of buoys are the difference between a safe passage and a costly mistake.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "fishing_lore_1", 
    title: "A Fisherman's Paradise", 
    text: "The river is a world-class fishery, so famous that it attracts major professional bass tournaments. The fight of a St. Lawrence Smallmouth Bass is the stuff of legends among anglers.", 
    unlocked: false, 
    icon: Fish 
  },
  { 
    key: "ghost_story_1", 
    title: "Whispers on the Water", 
    text: "Every old river rat has a ghost story. They tell of haunted lighthouses, phantom ships from long-forgotten wars, and the spirits of those who met a tragic end in the river's icy embrace. At night, every shadow on the water holds a tale.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "famous_people_1", 
    title: "Presidential Retreat", 
    text: "The Thousand Islands became a fashionable retreat after a visit from President Ulysses S. Grant in 1872. His stay at the Crossmon House Hotel in Alexandria Bay put the region on the map for America's elite.", 
    unlocked: false, 
    icon: BookOpen 
  },
  { 
    key: "cross_border_culture_1", 
    title: "A Shared Heritage", 
    text: "The river doesn't divide; it connects. The culture of the Thousand Islands is a unique blend of American and Canadian traditions, where you're just as likely to hear about hockey as you are about baseball, and where both currencies are often welcome.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "shipping_history_1", 
    title: "Lakers and Salties", 
    text: "There are two kinds of giants on the Seaway. The 'Lakers' are long, narrow ships built for the Great Lakes. The 'Salties' are stout, ocean-going vessels from ports around the world. A true river rat can tell the difference from a mile away.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "wildlife_nature_1", 
    title: "Nature's Pharmacy", 
    text: "The islands are a living pharmacy for those who know where to look. The common Jewelweed, for instance, often grows right next to its nemesis, poison ivy, and its sap is a well-known folk remedy for the itchy rash.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "local_events_1", 
    title: "A Community's Heartbeat", 
    text: "The rhythm of the seasons is marked by beloved local events. From the roar of the engines during the Poker Run to the quiet reverence of the Antique Boat Show, these gatherings are the heartbeat of the river community.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "river_cruises_1", 
    title: "Stories on the Water", 
    text: "For over a century, tour boats have been the primary storytellers of the river, their captains narrating tales of pirates, castles, and calamities as they guide visitors through the island maze.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "local_history_1", 
    title: "Loyalist Legacy", 
    text: "The Canadian side of the river is steeped in the legacy of the United Empire Loyalists, who, after the American Revolution, were granted land here to begin new lives under the British Crown. Their spirit of endurance shaped the region.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "scenic_spots_1", 
    title: "The Golden Hour", 
    text: "Photographers and romantics know the best time on the river is the 'golden hour'—the hour just after sunrise or before sunset. The low, warm light sets the granite islands ablaze and turns the water to liquid gold.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "island_names_1", 
    title: "What's in a Name?", 
    text: "The names of the islands are a map of history themselves. 'Grindstone' recalls a quarrying past, the 'Admiralty' group speaks of British naval surveys, and names like 'Bloodletter' hint at darker, more violent tales.", 
    unlocked: false, 
    icon: BookOpen 
  },
  { 
    key: "food_dining_1", 
    title: "Taste of the River", 
    text: "The ultimate local flavor is a plate of pan-fried walleye or perch, freshly caught from the river. It's a taste of place, a simple, delicious connection to the waters that define the region.", 
    unlocked: false, 
    icon: Fish 
  },
  { 
    key: "survival_scenario_1", 
    title: "Marooned!", 
    text: "Every boater has had the fleeting thought: what if I were stranded? The river's currents are strong and its nights are cold. Knowing the basics of survival—shelter, water, and how to signal for help—is a part of the unwritten code of the River Rat.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "nepco_spill_1", 
    title: "The Black Day", 
    text: "The winter of 1976 is remembered for a black tide. The tanker 'NEPCO 140' ran aground in icy conditions, spilling over 300,000 gallons of crude oil. It was a devastating blow to the river's ecosystem, coating miles of shoreline and wildlife in a thick, toxic sludge. The cleanup took years and the event became a powerful catalyst for change, leading to stricter environmental laws and a deeper appreciation for the river's fragility. The river still bears the scars, and the story serves as a somber reminder of the constant vigilance needed to protect this natural treasure.", 
    unlocked: false, 
    icon: Zap 
  },
  { 
    key: "local_business_1", 
    title: "Guardians of Wood & Varnish", 
    text: "Some businesses are more than just shops; they are institutions. For generations, Chalk's Marine in Clayton has been a sanctuary for classic wooden boats. They are not just mechanics; they are artisans who understand the soul of a St. Lawrence Skiff or a Chris-Craft runabout. Their work is a living link to the Gilded Age, preserving the elegance and craftsmanship of a bygone era, one plank and one coat of varnish at a time. To own a boat cared for by Chalk's is to be a custodian of river history.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "celestial_event_1", 
    title: "Sky Fire", 
    text: "On rare, clear nights, when the sun has unleashed a storm of particles across space, the Thousand Islands gets a visitor from the heavens. The Aurora Borealis, the Northern Lights, will set the northern sky ablaze. Far from city glow, the sky dances with curtains of ethereal green, purple, and white light, reflecting silently on the black water of the river. To the ancient peoples, this was the dance of spirits; to the modern islander, it's a breathtaking reminder of the vast, beautiful universe we float in. It's a celestial treasure, more fleeting and precious than any pirate's gold.", 
    unlocked: false, 
    icon: Star 
  },
  { 
    key: "historic_flood_1", 
    title: "The Raging River", 
    text: "The river is a mighty beast, and sometimes it strains against its leash. In recent years, high water levels in the Great Lakes basin have led to historic '100-year floods.' Docks have been submerged, shorelines eroded, and homes threatened. This has sparked fierce debate over 'Plan 2014,' the international agreement that governs water releases from the main dam. It's a complex battle between shoreline property owners, the shipping industry, and the health of the wetlands. These floods are a stark reminder that while we may build castles and bridges, the river ultimately answers to nature's command.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "local_business_2", 
    title: "A Table by the Water", 
    text: "For over half a century, Cavallario's has been a cornerstone of Alexandria Bay's dining scene. It's a place of memories, where generations of families have gathered for celebratory steak dinners and fresh seafood. Its longevity is a testament to the enduring appeal of good food and classic hospitality, a constant in a town that changes with the seasons.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "seasonal_event_1", 
    title: "The Great Thaw", 
    text: "For a true River Rat, the most important date on the calendar isn't a holiday; it's 'ice-out.' It's the day the winter's icy armor on the river finally groans, cracks, and breaks apart, releasing the water from its prison. It's a dramatic, powerful event that signals the true arrival of spring and the start of another boating season. The sound of the shifting ice is the sound of the river breathing again.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "river_cruises_2", 
    title: "The Castle's Ferryman", 
    text: "While many boat tours ply the waters, only one company holds the key to the castle. The Uncle Sam Boat Tours' 'Two-Nation Tour' is the exclusive ferryman for Boldt Castle, offering visitors the unique privilege of disembarking on Heart Island to wander the grounds of the unfinished monument to love.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "local_business_3", 
    title: "The Fish Fry Beacon", 
    text: "In the small hamlet of Fishers Landing, a weekly tradition signals the start of the weekend: the Friday Fish Fry at Foxy's. It's more than just a meal; it's a community gathering, a place where fishermen, locals, and tourists come together for a taste of classic river life. For decades, it's been a reliable beacon of good food and good company.", 
    unlocked: false, 
    icon: Fish 
  },
  { 
    key: "cross_border_culture_5", 
    title: "The Winteriver", 
    text: "When the tourists leave and the ice sets in, a special breed of islander remains. They call themselves 'winterivers.' They are the hardy souls who embrace the isolation, the beauty, and the challenges of a Thousand Islands winter. They know the sound of the ice shifting, the best way to keep a pipe from freezing, and the profound peace of a snow-covered island. It's a title earned through resilience and a deep love for the river in all its moods.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "local_business_4", 
    title: "A Century of Sightseeing", 
    text: "Since 1926, the Thomson family's Uncle Sam Boat Tours has been introducing visitors to the magic of the Thousand Islands. Starting with small wooden boats and growing into a fleet of modern tour vessels, they have become as much a part of the Alexandria Bay waterfront as the river itself, carrying millions of passengers and countless stories.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "local_landmarks_4", 
    title: "The Granite Shield", 
    text: "The massive breakwall at Cape Vincent is more than just a fishing pier. It is a shield, built from massive, locally quarried granite blocks, designed to protect the harbor from the fury of Lake Ontario's storms, creating a safe haven for vessels at the river's mouth.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "historical_event_1", 
    title: "The Night the Lights Went Out", 
    text: "The Great Blackout of 1965 plunged the entire Northeast into darkness, and it all started with a single, faulty electrical relay near Niagara. The event showcased the interconnectedness and fragility of our power grid, a system that has its roots in the hydroelectric power generated right here on the St. Lawrence.", 
    unlocked: false, 
    icon: Zap 
  },
  { 
    key: "fishing_lore_4", 
    title: "Reading the Water", 
    text: "Serious anglers know that fishing is a science. They use tools to find the 'thermocline,' an invisible layer where the water temperature changes dramatically. This is where baitfish gather, and where the big predators lurk. It's a secret layer of the river that holds the key to a successful catch.", 
    unlocked: false, 
    icon: Fish 
  },
  { 
    key: "cross_border_culture_6", 
    title: "The Invisible Line's Rules", 
    text: "Boating between the US and Canada is easy, but the rules change at the invisible border. A key difference is Canada's requirement for a Pleasure Craft Operator Card (PCOC). Forgetting this can turn a pleasant cruise into a conversation with the authorities.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "historical_event_2", 
    title: "The Ice Storm's Grip", 
    text: "The Ice Storm of 1998 was a catastrophe unlike any other. It wasn't a blizzard, but days of unrelenting freezing rain that encased the region in a thick, heavy shell of ice. The weight toppled transmission towers and ancient trees, leaving communities in the dark and cold for weeks, a powerful display of nature's subtle force.", 
    unlocked: false, 
    icon: Trees 
  },
  { 
    key: "local_culture_2", 
    title: "The Island Lifeline", 
    text: "For islanders who live off the beaten path, the Mailboat is their lifeline. These small, private boats are contracted to deliver not just letters, but groceries, supplies, and news, weaving through the islands to connect the scattered homes of the river community.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "island_geography_8", 
    title: "Threading the Needle", 
    text: "The section of river known as 'The Narrows' is a rite of passage for boaters. This winding, scenic channel demands careful navigation, with beautiful cottages perched on the rocky shores, their owners watching to see who can thread the needle without causing a wake.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "conservation_2", 
    title: "The River's Eyes", 
    text: "How do scientists check the river's vision? With a simple tool called a Secchi disk. By lowering this black and white disk, researchers can measure water clarity. It's a fundamental health check for the river, revealing the impacts of pollution and invasive species.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "famous_people_3", 
    title: "The President's Pastime", 
    text: "An iconic photograph from 1872 helped put the Thousand Islands on the map. It shows President Ulysses S. Grant, a war hero, peacefully fishing from the docks of the Crossmon House Hotel in Alexandria Bay, signaling to the world that this was a place for rest and recreation.", 
    unlocked: false, 
    icon: BookOpen 
  },
  { 
    key: "final_revelation", 
    title: "The River's Heart", 
    text: "You've uncovered many secrets, but here is the last one: the true treasure of the Thousand Islands was never Bill Johnston's gold. It's the enduring spirit of its history, the beauty of its nature, and the tales whispered on the water. You are a true RiverRat now.", 
    unlocked: false, 
    icon: Star 
  },
  { 
    key: "war_history_clue_2", 
    title: "A Watery Highway of War", 
    text: "He who controlled the St. Lawrence, controlled the Great Lakes. During the War of 1812, the river was the primary supply line for troops and forts. The race to build bigger, more powerful sailing warships at Sackets Harbor and Kingston was a desperate struggle for this strategic advantage.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "architecture_clue_2", 
    title: "Gilded Age Playgrounds", 
    text: "The Thousand Islands was one of several summer playgrounds for the Gilded Age elite, who also built their 'cottages' in places like Newport, Rhode Island. The architecture of these grand homes reflects a national trend of showcasing immense wealth.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "fishing_lore_2", 
    title: "The Invisible Ledge", 
    text: "The river's bottom is a landscape of its own, with cliffs, ledges, and drop-offs. Anglers know that predatory fish like walleye and bass often hunt along the 'thermocline', an invisible layer where warm and cold water meet, often found along these underwater structures.", 
    unlocked: false, 
    icon: Fish 
  },
  { 
    key: "shipwreck_lore_2", 
    title: "The Perils of Commerce", 
    text: "Not all shipwrecks are from storms or wars. The wreck of the 'America' near Kingston is a reminder of the everyday perils of river commerce. This package freighter was a workhorse of the river until a navigational error sent her to the bottom.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "boating_safety_2", 
    title: "A Boater's Lexicon", 
    text: "To speak the river's language, you must know your vessel. The 'gunwale' (pronounced 'gunnel') is the top edge of a boat's side. Knowing the right terms isn't just for show; it's crucial for clear communication in an emergency.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "wildlife_nature_2", 
    title: "A Graceful Return", 
    text: "The return of the white-tailed deer to the islands is a triumph of conservation. Once hunted out of the region, these graceful creatures have made a remarkable comeback, and it's not uncommon to see them swimming between islands at dawn or dusk.", 
    unlocked: false, 
    icon: Trees 
  },
  { 
    key: "local_landmarks_1", 
    title: "A Private Fantasy", 
    text: "While Boldt and Singer Castles are open to all, some of the river's castles remain private summer homes. Jorstadt Castle on Westminster Park is one such place, a modern-day fairytale that remains a family's private retreat.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "local_events_2", 
    title: "A Nation's Birthday", 
    text: "The river is a stage for national celebrations. On Canada Day, the skies above Kingston's harbour explode in a fireworks display launched from a floating barge, a spectacular celebration of Canadian pride reflected in the water.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "boating_safety_3", 
    title: "Green for Go-Left", 
    text: "The river's navigation rules are simple but vital. A green 'can' buoy always marks the left side of the channel when you're heading upstream, away from the sea. It's the other half of the 'Red, Right, Returning' rule.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "scenic_spots_2", 
    title: "The Eagle's Eye View", 
    text: "From the top of the 1000 Islands Tower on Hill Island, the complex international border becomes a visible reality. You can see both American and Canadian islands, the bridges that link them, and the ships that navigate the channel between them, all at once.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "war_history_clue_3", 
    title: "A Fort's Purpose", 
    text: "Fort Wellington in Prescott wasn't built for show. It was a key defensive position on the British side, constructed to protect the vital St. Lawrence supply line from American attack during the War of 1812.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "wildlife_nature_3", 
    title: "The Hardy Pioneer", 
    text: "The pitch pine is a true survivor. This hardy tree is known for its ability to grow in the most inhospitable places, its roots clinging to bare granite rock where other trees would quickly perish. It is a symbol of the islands' rugged endurance.", 
    unlocked: false, 
    icon: Trees 
  },
  { 
    key: "boating_safety_4", 
    title: "The Silent Giants", 
    text: "The biggest danger in the shipping channel isn't what you can see; it's what you can't anticipate. The massive freighters move much faster than they appear, create huge wakes, and cannot stop or turn quickly. A wise captain gives them a very wide berth.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "environmental_fact_3", 
    title: "The Blue Line Connection", 
    text: "The Frontenac Arch is a geological bridge that connects the Canadian Shield to the massive Adirondack Park to the south. The park's famous 'Blue Line' boundary, drawn on a map in 1892, marks one of the largest protected wilderness areas in the United States.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "lighthouse_legend_3", 
    title: "A Guiding Pair", 
    text: "Some lighthouses work in tandem. The Sister Island Lighthouse was part of a pair, its beam working with another light to create a safe path through a particularly hazardous stretch of water. They were a team, guiding sailors through the dark.", 
    unlocked: false, 
    icon: Lightbulb 
  },
  { 
    key: "recreation_1", 
    title: "From River to Capital", 
    text: "The Rideau Trail is a long-distance hiking path that stretches from Kingston at the mouth of the St. Lawrence all the way to Canada's capital, Ottawa, roughly following the route of the historic Rideau Canal.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "boating_history_1", 
    title: "The Captain's Taxi", 
    text: "In the Gilded Age, the owner of a grand steam yacht wouldn't use the main vessel for a quick trip ashore. They used a 'gig'—a light, fast, and elegant tender boat, essentially a luxurious water taxi to ferry guests and supplies.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "island_geography_3", 
    title: "A Sea of Islands", 
    text: "The term 'archipelago' is the perfect word for the Thousand Islands. It's a geographical term for a large group or chain of islands, perfectly capturing the scattered, maze-like nature of the region.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "architecture_clue_3", 
    title: "A German Dream", 
    text: "George Boldt's vision for his castle was drawn from the romantic, turreted fortresses he had seen along the Rhine River in Germany. The style, known as Châteauesque or Rhineland Castle, was meant to bring a piece of old-world European fantasy to the new world.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "boating_safety_5", 
    title: "Riding the Waves", 
    text: "A freighter's wake can easily swamp a small boat. The safest maneuver for a kayaker or canoeist is not to flee, but to turn and face the wave head-on, pointing the bow directly into the approaching swell to maintain stability.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "conservation_1", 
    title: "A Voice for the River", 
    text: "The organization 'Save The River' acts as a watchdog and advocate for the St. Lawrence. They publish guides for safe boating and work to protect the river's fragile ecosystem from pollution and invasive species.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "local_history_2", 
    title: "The River's Name for a Nation", 
    text: "The name of a whole country was born on this river. 'Canada' comes from the Iroquoian word 'Kanata,' meaning 'village' or 'settlement.' When the first European explorers asked what the area was called, the local inhabitants were simply referring to their village, but the name stuck for the entire nation.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "famous_people_2", 
    title: "Astor's Abode", 
    text: "The Vanderbilts weren't the only Gilded Age dynasty to seek refuge on the river. The Astor family, another of America's wealthiest clans, built 'Hopewell Hall' as their grand summer 'cottage' near Alexandria Bay.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "boating_safety_6", 
    title: "A Sound of Warning", 
    text: "On the water, horns are a language. Five or more short, rapid blasts from a ship's horn is the universal signal for 'Danger!' or 'I don't understand your intentions.' It's a clear warning to all nearby vessels to be on high alert.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "wildlife_nature_4", 
    title: "A Tale of Two Necks", 
    text: "It can be tricky to tell the river's large wading birds apart. The easiest way is to see them in flight: a Great Blue Heron flies with its neck tucked into an 'S' curve, while the larger Sandhill Crane flies with its neck fully extended.", 
    unlocked: false, 
    icon: Bird 
  },
  { 
    key: "shipping_history_2", 
    title: "A Fiery End", 
    text: "Many of the grand wooden steamboats of the Gilded Age met a similar, fiery fate. The 'Frontenac,' a luxurious side-wheel steamer, wasn't sunk by a storm but was destroyed by a fire while docked in 1907, a blaze that consumed the floating palace.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "local_landmarks_2", 
    title: "A Harbor's Shield", 
    text: "A 'breakwater' is a man-made wall built to shield a harbor from the open water's fury. The one at Cape Vincent, for instance, creates a calm, safe area for boats to moor, protected from the often-rough waves of Lake Ontario.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "recreation_2", 
    title: "A Paddler's Pace", 
    text: "To truly experience the river's hidden beauty, you have to slow down. Kayaking and canoeing allow you to glide silently into narrow channels and shallow coves that are inaccessible to larger boats, offering an intimate connection with nature.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "survival_scenario_2", 
    title: "Engine Failure!", 
    text: "If your engine cuts out on the river, the wind and current become your enemies, pushing you towards shoals or the shipping lane. The most important first action is to deploy your anchor, securing your position while you troubleshoot or call for help.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "architecture_clue_4", 
    title: "The Silent Chime", 
    text: "The grand clock tower on Boldt Castle's Power House was designed to hold a carillon of bells that would have chimed out across the water. But like so many parts of the castle, they were never installed, leaving the tower beautiful but silent.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "boating_safety_7", 
    title: "Right is Right", 
    text: "An easy trick to remember nautical terms: the 'starboard' side of a boat is the right side when you're facing forward. Both 'starboard' and 'right' contain the letter 'R'.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "environmental_fact_4", 
    title: "The Goby's Game", 
    text: "The Round Goby is an aggressive, bottom-dwelling invasive fish that arrived in ballast water. It multiplies rapidly, out-competing native species for food and spawning grounds, significantly altering the river's delicate food web.", 
    unlocked: false, 
    icon: Fish 
  },
  { 
    key: "island_names_2", 
    title: "A Veteran's Reward", 
    text: "The 'Navy' group of islands in the Canadian sector earned their name because they were granted by the British Crown to naval veterans as a reward for their service in the French and Indian War, long before the American Revolution.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "food_dining_2", 
    title: "The Hotel Connection", 
    text: "It took a hotelier with a vision to take Thousand Island dressing from a local fisherman's secret to a global phenomenon. George Boldt, proprietor of the Waldorf-Astoria Hotel, introduced the dressing to his elite clientele, and the rest is history.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "boating_safety_8", 
    title: "Fore and Aft", 
    text: "Knowing your boat's directions is key. 'Aft' is the nautical term for the rear of the vessel. So 'abaft' simply means toward the rear. A simple but essential piece of a mariner's vocabulary.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "lighthouse_legend_4", 
    title: "A Beacon on the Hazard", 
    text: "Some lighthouses warn of a danger from a safe distance. The Sunken Rock Lighthouse does the opposite. It is built directly on top of the treacherous, mid-channel shoal it marks, a stark and constant reminder of the hazard lurking just beneath the waves.", 
    unlocked: false, 
    icon: Lightbulb 
  },
  { 
    key: "boating_history_2", 
    title: "A Hole for a Purpose", 
    text: "In a classic wooden boat, a 'limber hole' is a small notch or hole cut into the boat's frames. It's not a mistake; it's a crucial design feature that allows any water inside the hull to drain to the lowest point so it can be pumped out by the bilge pump.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "war_history_clue_4", 
    title: "A Fleet Immortalized", 
    text: "The names of the 'Lake Fleet' islands on the Canadian side serve as a floating memorial. Many are named after the British warships that fought in the naval battles on the Great Lakes during the War of 1812.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "boating_safety_9", 
    title: "The Ripples of Responsibility", 
    text: "A boat's wake can cause significant damage to docks, shorelines, and smaller boats. 'No Wake' zones, marked by white buoys with orange symbols, are legally enforceable areas where boats must slow to idle speed to prevent creating a damaging wake.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "architecture_clue_5", 
    title: "The Skyscraper Architect", 
    text: "The architect for Singer Castle was Ernest Flagg, a prominent American designer who was also responsible for one of New York City's most famous early skyscrapers, the Singer Building. The castle on Dark Island was his fairytale retreat from the city.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "boating_safety_10", 
    title: "A Captain's Map", 
    text: "A 'nautical chart' is a boater's most important tool. It's a special map that details not the land, but the world beneath the water, showing water depths, navigation channels, shoals, and other hazards essential for safe passage.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "shipwreck_lore_3", 
    title: "A Captain's Choice", 
    text: "When fire broke out on the passenger steamer 'Iroquoi', the captain made a heroic choice. Instead of letting it sink in deep water, he intentionally beached the burning ship, saving all the passengers and leaving behind a wreck that divers still explore today.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "boating_safety_11", 
    title: "The 'Hello, I'm Here!' Signal", 
    text: "On the water, you can't see around corners. That's why one prolonged horn blast is the standard signal a boater uses when leaving a dock or approaching a blind bend. It's a simple way of announcing your presence to unseen vessels.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "environmental_fact_5", 
    title: "An Eastern Pioneer", 
    text: "While Canada's most famous national parks are in the Rocky Mountains, the Thousand Islands National Park was a pioneer in its own right. Established in 1904, it was the very first Canadian national park located east of the Rockies.", 
    unlocked: false, 
    icon: Trees 
  },
  { 
    key: "boating_safety_12", 
    title: "How Low Can You Go?", 
    text: "A boat's 'draft' is the minimum depth of water it needs to float without hitting the bottom. Knowing your boat's draft and comparing it to the depths on a nautical chart is the most fundamental way to avoid running aground.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "local_history_3", 
    title: "The Loyalist Road", 
    text: "King's Highway 2, the old highway on the Canadian shore, is also known as the 'Loyalist Parkway.' It follows the historic settlement route of the United Empire Loyalists who were granted land along the St. Lawrence after fleeing the American Revolution.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "island_geography_4", 
    title: "The Big Island's Ferry Route", 
    text: "To get to Wolfe Island, the largest of the Thousand Islands, from the Canadian mainland, you must cross the 'Bateau Channel.' This strait has served as the primary ferry route to the island for generations.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "boating_safety_13", 
    title: "The Boat's Heartbeat", 
    text: "A 'bilge pump' is a boat's essential lifeline. Its sole purpose is to pump out any unwanted water that leaks or splashes into the hull. A good captain always ensures their bilge pump is in working order before leaving the dock.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "cross_border_culture_2", 
    title: "Ontario's Watery Welcome", 
    text: "The 'Great Waterway' is the official tourism brand for the region of southeastern Ontario that borders the river. The name highlights the St. Lawrence River's central role as the region's defining cultural, historical, and recreational feature.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "boating_safety_14", 
    title: "The Pointy End", 
    text: "The most basic nautical term is 'bow,' which simply refers to the front of a boat. Every sailor, from an admiral to the newest recruit, knows their bow from their stern.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "island_names_3", 
    title: "An Industrial Past", 
    text: "Grindstone Island wasn't named for its shape. It earned its name from the high-quality sandstone that was once quarried there. This stone was prized for making grindstones used to sharpen tools, and the island's name is a link to this industrial past.", 
    unlocked: false, 
    icon: Mountain 
  },
  { 
    key: "local_events_3", 
    title: "Fireworks on the Water", 
    text: "The spectacular 4th of July fireworks display in Alexandria Bay is traditionally launched from a barge anchored in the middle of the St. Lawrence River. This allows for breathtaking views as the colors explode over and reflect upon the water.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "survival_scenario_3", 
    title: "Don't Abandon Ship!", 
    text: "If your boat capsizes, the golden rule of survival is to stay with the vessel. Even an overturned hull is much easier for rescuers to spot from the air or water than a person's head. Climbing on top of the hull also gets you out of the cold water.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "wildlife_nature_5", 
    title: "The Wing-Dryer", 
    text: "The Double-crested Cormorant is a common sight, often seen perched on buoys or rocks with its wings spread wide. Unlike a duck's, a cormorant's feathers are not fully waterproof, so they must air-dry them after diving for fish.", 
    unlocked: false, 
    icon: Bird 
  },
  { 
    key: "boating_safety_15", 
    title: "The Tying Post", 
    text: "A 'cleat' is the simple, T-shaped fitting found on docks and boats. Its crucial job is to provide a secure point for tying a rope or line. Knowing how to tie a 'cleat hitch' is a fundamental skill for any boater.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "food_dining_3", 
    title: "Squeaky Cheese", 
    text: "Fried cheese curds, a beloved local delicacy, are made from a special fresh curd cheese, not mozzarella or cheddar. The fresh curds have a unique, 'squeaky' texture when bitten into.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "shipwreck_lore_4", 
    title: "The Keystorm's Grave", 
    text: "The massive wreck of the steel freighter 'Keystorm' is a legendary dive site. It lies in the shadow of Rock Island Lighthouse, a testament to the fact that even modern ships were not immune to the river's hidden dangers.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "island_geography_5", 
    title: "A Cozy Anchorage", 
    text: "While a 'bay' can be large and open, a 'cove' is specifically a small, sheltered inlet. For boaters, the river's many coves are prized as the safest and most peaceful places to drop anchor for the night.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "boating_history_3", 
    title: "The Skiff Makers", 
    text: "The firm of 'Lawlor & Son' in Clayton was one of the most famous and prolific builders of the iconic St. Lawrence Skiff. Their elegant, high-quality rowing boats are now prized antiques and symbols of the region's rich boating heritage.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "boating_safety_16", 
    title: "Head-On at Night", 
    text: "At night, a boat's lights are its eyes. If you see both a red and a green light on another vessel, it means you are looking at it head-on, and you must take action to avoid a collision. Seeing only one color means it is passing you.", 
    unlocked: false, 
    icon: Lightbulb 
  },
  { 
    key: "cross_border_culture_3", 
    title: "A Taste of Quebec", 
    text: "Poutine—a hearty dish of french fries and cheese curds smothered in gravy—is a classic French-Canadian comfort food. You're much more likely to find this delicious, national dish in restaurants on the Ontario side of the river.", 
    unlocked: false, 
    icon: Palette 
  },
  { 
    key: "local_landmarks_3", 
    title: "A Ringside Seat", 
    text: "The tiny 'Tom Thumb' island, with its single cottage, is famous for its location. It sits right beside a major shipping channel marker, giving its residents a front-row, and sometimes startlingly close, view of the massive freighters gliding past.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "boating_safety_17", 
    title: "The Boater's Best Friend", 
    text: "PFD stands for Personal Flotation Device. More commonly known as a life jacket, it's the single most important piece of safety equipment on any boat. Having enough for every passenger isn't just a good idea—it's the law.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "architecture_clue_6", 
    title: "A Castle's Game Room", 
    text: "The Alster Tower at Boldt Castle, also known as the 'playhouse,' was designed for pure entertainment. Tucked away inside was a complete, two-lane bowling alley for the amusement of the Boldt family and their guests.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "environmental_fact_6", 
    title: "The Purple Plague", 
    text: "Purple Loosestrife is a beautiful but dangerous invader. Its tall, vibrant purple flowers may look pretty, but this non-native plant spreads aggressively in wetlands, choking out native vegetation that wildlife depends on.", 
    unlocked: false, 
    icon: Leaf 
  },
  { 
    key: "survival_scenario_4", 
    title: "A Tree's Inner Strength", 
    text: "A knowledgeable woodsman knows that survival can be found in unexpected places. The soft, cambium layer of inner bark on a pine tree is edible and has been a source of emergency nourishment for centuries.", 
    unlocked: false, 
    icon: Trees 
  },
  { 
    key: "boating_history_4", 
    title: "Measuring the Deeps", 
    text: "A 'fathom' is an old nautical unit of measurement used for water depth, equal to six feet. Before modern depth sounders, sailors would drop a weighted line marked in fathoms to measure the water beneath them.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "island_geography_6", 
    title: "The Bridge's Anchor", 
    text: "The Thousand Islands Bridge system uses several islands as stepping stones. The main Canadian span lands on Hill Island, which serves as the anchor point for the bridge and is home to the 1000 Islands Tower.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "ghost_story_2", 
    title: "The Spectral Sentry", 
    text: "The massive limestone walls of Fort Henry in Kingston are said to be patrolled by a spectral sentry. Visitors and staff report seeing the ghostly figure of a lone soldier in an old uniform, still walking his post, forever on duty.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "fishing_lore_3", 
    title: "The Troller's Technique", 
    text: "'Trolling' is a popular and effective fishing technique where a lure or bait is dragged at a specific speed and depth behind a slowly moving boat. It's a great way to cover a lot of water and find active, hunting fish.", 
    unlocked: false, 
    icon: Fish 
  },
  { 
    key: "boating_safety_18", 
    title: "Guardians of the Waterway", 
    text: "On the U.S. side of the river, the United States Coast Guard is the primary authority for maritime safety. Their duties include search and rescue, enforcing boating laws, and maintaining aids to navigation like buoys and lighthouses.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "island_names_4", 
    title: "A Colorful Map", 
    text: "The islands of the St. Lawrence have some wonderfully descriptive and quirky names, from 'Sugar' and 'Bloodletter' to 'Fiddler's Elbow.' But 'Mermaid Island' is one name you won't find on an official nautical chart.", 
    unlocked: false, 
    icon: MapPin 
  },
  { 
    key: "island_geography_7", 
    title: "A Lake Within a River", 
    text: "The 'Lake of the Isles' is a beautiful, sheltered body of water that feels like its own separate lake, but it's actually the narrow, winding channel that separates Wellesley Island from the U.S. mainland.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "boating_safety_19", 
    title: "Four Letters for Left", 
    text: "An easy trick for remembering nautical terms: the 'port' side of a boat is the left side when you are facing forward. Both 'port' and 'left' are four-letter words.", 
    unlocked: false, 
    icon: Ship 
  },
  { 
    key: "environmental_fact_7", 
    title: "Turbulent Waters", 
    text: "A 'boil' is the term for the turbulent, churning water often found downstream from dams or rapids. These powerful upwellings are created by the immense energy of the water and are extremely hazardous for any boat or swimmer.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "cross_border_culture_4", 
    title: "The First Faceoff", 
    text: "The very first international hockey game is said to have been played on the frozen river in the 1880s between teams from Kingston, Ontario, and Sackets Harbor, New York—the start of a long and friendly cross-border rivalry.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "local_history_4", 
    title: "A Grand Hotel's Ghost", 
    text: "The Crossmon House was one of Alexandria Bay's grandest Gilded Age hotels, famously hosting President Grant. Like many wooden structures of its time, it was tragically destroyed by a massive fire in 1897.", 
    unlocked: false, 
    icon: Castle 
  },
  { 
    key: "survival_scenario_5", 
    title: "Aground!", 
    text: "If your boat runs aground on a shoal, hitting the engine in reverse often just digs you in deeper. A better first step is to shift weight by moving passengers and heavy gear to the part of the boat that's still floating, which can sometimes be enough to lift the hull free.", 
    unlocked: false, 
    icon: Anchor 
  },
  { 
    key: "boating_safety_20", 
    title: "The Diver Down Flag", 
    text: "The 'Alpha' flag—a blue and white swallow-tailed flag—is an international signal that all boaters must recognize. It signifies that the vessel has a scuba diver in the water nearby, and other boats must keep well clear and operate at a slow speed.", 
    unlocked: false, 
    icon: Waves 
  },
  { 
    key: "boating_safety_21", 
    title: "A Friendly Inspection", 
    text: "The Canadian Coast Guard Auxiliary offers a free, courtesy vessel safety check program called 'C-Way.' Volunteers will inspect your boat to ensure you have all the required safety gear, helping to prevent problems before they start.", 
    unlocked: false, 
    icon: Scroll 
  },
  { 
    key: "boating_safety_22", 
    title: "A Fork in the River", 
    text: "A navigation buoy with both red and green horizontal bands is a 'bifurcation buoy,' marking where a channel splits. The top color indicates the preferred, or main, channel. If the top band is green, you should keep the buoy on your left to stay in the main channel.", 
    unlocked: false, 
    icon: MapPin 
  }
]

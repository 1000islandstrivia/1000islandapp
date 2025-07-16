
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
    text: "Arrr, ye think pirates only sailed the sunny Caribbean? Think again, matey! The Thousand Islands had a pirate all its own, a cunning rogue named Bill Johnston. He wasn’t your black-hearted, plank-walking sort, mind you. Bill was an American patriot, a spy, and a first-class smuggler who knew the river’s every secret eddy and hidden cove. During the Patriot War of the 1830s, he aided Canadian rebels, using his fleet of small boats to raid British ships. His most famous act was the burning of the British steamer *Sir Robert Peel*. After the raid, they say he made off with a military payroll, a chest heavy with gold coins. The authorities hunted him for months, but the river was his domain. He vanished into the labyrinth of islands like a fox into its den. Legend says he stashed the gold in a waterfront cave, perhaps Devil’s Oven on Grindstone Island, or some other secret spot known only to him. He was eventually caught, but the treasure was never found. To this day, treasure hunters and hopeful river rats search for Johnston’s lost gold. Some say that on a clear, quiet day, you can see a faint glimmer deep in the water, a wink from ol’ Bill himself, daring you to find his ill-gotten gains. *Perhaps the next piece of lore will lead you closer to the gold…*", 
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
    text: "They say the pirate Bill Johnston used this natural cave as a hideout. Devil's Oven on Grindstone Island has offered shelter to fugitives, fishermen, and storytellers for centuries.", 
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
    key: "final_revelation", 
    title: "The River's Heart", 
    text: "You've uncovered many secrets, but here is the last one: the true treasure of the Thousand Islands was never Bill Johnston's gold. It's the enduring spirit of its history, the beauty of its nature, and the tales whispered on the water. You are a true RiverRat now.", 
    unlocked: false, 
    icon: Star 
  }
];

export interface PlayerRank {
  title: string;
  minScore: number;
  icon: LucideIcon;
}

export const playerRanks: PlayerRank[] = [
  { title: "Seaman Recruit", minScore: 0, icon: Shield },
  { title: "Seaman Apprentice", minScore: 20, icon: ShieldHalf },
  { title: "Seaman", minScore: 50, icon: ShieldCheck },
  { title: "Petty Officer Third Class", minScore: 90, icon: Star },
  { title: "Petty Officer Second Class", minScore: 140, icon: Star },
  { title: "Petty Officer First Class", minScore: 200, icon: Star },
  { title: "Chief Petty Officer", minScore: 270, icon: Gem },
  { title: "Senior Chief Petty Officer", minScore: 350, icon: Gem },
  { title: "Master Chief Petty Officer", minScore: 440, icon: Gem },
  { title: "Chief Warrant Officer 2", minScore: 540, icon: Award },
  { title: "Chief Warrant Officer 3", minScore: 650, icon: Award },
  { title: "Ensign", minScore: 770, icon: Medal },
  { title: "Lieutenant Junior Grade", minScore: 900, icon: Medal },
  { title: "Lieutenant", minScore: 1050, icon: Medal },
  { title: "Lieutenant Commander", minScore: 1200, icon: Crown },
  { title: "Commander", minScore: 1400, icon: Crown },
  { title: "Captain", minScore: 1600, icon: Crown },
  { title: "Rear Admiral", minScore: 1800, icon: Zap },
  { title: "Vice Admiral", minScore: 2000, icon: Zap },
  { title: "Admiral", minScore: 2200, icon: Zap },
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


import type { LucideIcon } from 'lucide-react';
import { Castle, Diamond, Fish, Scroll, Ship, Star, Trophy, Leaf, Anchor, MapPin, Lightbulb, BookOpen, Palette, Mountain, Trees, Water, Waves, Bird } from 'lucide-react';

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
    answer: "Locals who are knowledgeable about the St. Lawrence River",
    storylineHintKey: "pirate_treasure_1",
  },
  {
    id: '15',
    question: "Which of these fish species is a prized catch for anglers in the St. Lawrence River?",
    options: ["Piranha", "Muskellunge (Muskie)", "Clownfish", "Swordfish"],
    answer: "Muskellunge (Muskie)",
    storylineHintKey: "fish_expert_clue",
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
    answer: "Sugar Island (unofficial)",
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
  },
  {
    id: '26',
    question: "Which Great Lake is the primary source of the St. Lawrence River?",
    options: ["Lake Superior", "Lake Huron", "Lake Erie", "Lake Ontario"],
    answer: "Lake Ontario",
    storylineHintKey: "river_origin_clue",
  },
  {
    id: '27',
    question: "What type of bridge is the international span of the Thousand Islands Bridge System that crosses the St. Lawrence River's main shipping channel?",
    options: ["Cantilever bridge", "Suspension bridge", "Arch bridge", "Cable-stayed bridge"],
    answer: "Suspension bridge",
    storylineHintKey: "border_mystery_1",
  },
  {
    id: '28',
    question: "Which famous American president owned a summer home on Campobello Island, near the Thousand Islands region?",
    options: ["Theodore Roosevelt", "Franklin D. Roosevelt", "John F. Kennedy", "Abraham Lincoln"],
    answer: "Franklin D. Roosevelt",
    storylineHintKey: "historical_figure_clue",
  },
  {
    id: '29',
    question: "What is the approximate length of the Thousand Islands region along the St. Lawrence River?",
    options: ["10 miles", "50 miles", "100 miles", "200 miles"],
    answer: "50 miles",
    storylineHintKey: "region_geography_clue",
  },
  {
    id: '30',
    question: "The Alster Tower on Dark Island (Singer Castle) was inspired by a structure in which country?",
    options: ["Germany", "France", "England", "Scotland"],
    answer: "Germany",
    storylineHintKey: "boldt_secret_1",
  },
  {
    id: '31',
    question: "What unique geological feature characterizes many of the Thousand Islands, creating steep cliffs and deep channels?",
    options: ["Volcanic craters", "Glacial sculpting", "Coral reefs", "Meteor impact sites"],
    answer: "Glacial sculpting",
    storylineHintKey: "geology_mystery_clue",
  },
  {
    id: '32',
    question: "The Thousand Islands National Park is managed by which country?",
    options: ["United States", "Canada", "Jointly by US & Canada", "United Nations"],
    answer: "Canada",
    storylineHintKey: "border_mystery_1",
  },
  {
    id: '33',
    question: "What is the primary species of pine tree commonly found on the islands?",
    options: ["Loblolly Pine", "Ponderosa Pine", "Eastern White Pine", "Scots Pine"],
    answer: "Eastern White Pine",
    storylineHintKey: "flora_fauna_clue",
  },
  {
    id: '34',
    question: "Rock Island Lighthouse State Park features a lighthouse built in what century?",
    options: ["17th Century", "18th Century", "19th Century", "20th Century"],
    answer: "19th Century",
    storylineHintKey: "lighthouse_legend_clue",
  },
  {
    id: '35',
    question: "Which of these towns is NOT considered a major hub for Thousand Islands tourism on the US side?",
    options: ["Alexandria Bay, NY", "Clayton, NY", "Sackets Harbor, NY", "Syracuse, NY"],
    answer: "Syracuse, NY",
    storylineHintKey: "region_geography_clue",
  },
  {
    id: '36',
    question: "The Frederic Remington Art Museum, featuring works of the famous Western artist, is located in which nearby town?",
    options: ["Clayton", "Ogdensburg", "Watertown", "Gananoque"],
    answer: "Ogdensburg",
    storylineHintKey: "local_culture_clue",
  },
  {
    id: '37',
    question: "During the War of 1812, which strategic naval base was located near the Thousand Islands on the US side?",
    options: ["Fort Niagara", "Fort Ticonderoga", "Sackets Harbor", "West Point"],
    answer: "Sackets Harbor",
    storylineHintKey: "war_history_clue",
  },
  {
    id: '38',
    question: "What is the name of the large, migratory bird of prey often seen soaring above the Thousand Islands?",
    options: ["Bald Eagle", "Golden Eagle", "Osprey", "Peregrine Falcon"],
    answer: "Osprey",
    storylineHintKey: "flora_fauna_clue",
  },
  {
    id: '39',
    question: "The 'Boldt Castle Yacht House' is notable for housing what?",
    options: ["Modern luxury yachts", "A collection of historic houseboats and antique wooden boats", "A submarine", "A seaplane hangar"],
    answer: "A collection of historic houseboats and antique wooden boats",
    storylineHintKey: "boldt_secret_1",
  },
  {
    id: '40',
    question: "What is the common name for 'Esox masquinongy', a large predatory fish found in the St. Lawrence River?",
    options: ["Northern Pike", "Walleye", "Muskellunge", "Lake Sturgeon"],
    answer: "Muskellunge",
    storylineHintKey: "fish_expert_clue",
  },
  {
    id: '41',
    question: "The term 'cottage country' is often used to describe the Thousand Islands. What does 'cottage' typically refer to here?",
    options: ["Small, rustic shacks", "Modest, one-room cabins", "Seasonal vacation homes, often quite grand", "Agricultural farmhouses"],
    answer: "Seasonal vacation homes, often quite grand",
    storylineHintKey: "local_culture_clue",
  },
  {
    id: '42',
    question: "Which of the Thousand Islands is home to the 'Half Moon Bay', known for its unique rock formations?",
    options: ["Wellesley Island", "Grindstone Island", "Carleton Island", "Howe Island"],
    answer: "Wellesley Island",
    storylineHintKey: "geology_mystery_clue",
  },
  {
    id: '43',
    question: "The International Rift is a narrow, deep section of the river located between which two islands?",
    options: ["Heart Island and Dark Island", "Wellesley Island (US) and Hill Island (Canada)", "Grindstone Island and Wolfe Island", "Just Room Enough Island and Longue Vue Island"],
    answer: "Wellesley Island (US) and Hill Island (Canada)",
    storylineHintKey: "border_mystery_1",
  },
  {
    id: '44',
    question: "What is 'skiff life,' a term associated with the region?",
    options: ["A type of fishing lure", "A lifestyle centered around small, open motorboats", "A competitive rowing sport", "A local theater production"],
    answer: "A lifestyle centered around small, open motorboats",
    storylineHintKey: "local_culture_clue",
  },
  {
    id: '45',
    question: "The Cornwall-Massena International Bridge is another major crossing. What does it primarily facilitate besides passenger vehicles?",
    options: ["Pedestrian traffic", "High-speed rail", "Shipping and power line transmission", "Bicycle tours"],
    answer: "Shipping and power line transmission",
    storylineHintKey: "seaway_journey_1",
  },
  {
    id: '46',
    question: "What does 'Iroquoian' refer to in the context of the Thousand Islands' history?",
    options: ["A style of architecture", "A group of Indigenous peoples native to the region", "A type of sailing ship", "A French colonial fort"],
    answer: "A group of Indigenous peoples native to the region",
    storylineHintKey: "native_history_clue",
  },
  {
    id: '47',
    question: "Devil's Oven on Grindstone Island is what kind of natural feature?",
    options: ["A hot spring", "A large cave or rock shelter", "A volcanic vent", "A meteor crater"],
    answer: "A large cave or rock shelter",
    storylineHintKey: "geology_mystery_clue",
  },
  {
    id: '48',
    question: "The 'Frontenac Arch Biosphere Reserve' encompasses the Thousand Islands. What is a biosphere reserve?",
    options: ["A military exclusion zone", "An area promoting sustainable development based on local community efforts and sound science", "A theme park", "A private hunting ground"],
    answer: "An area promoting sustainable development based on local community efforts and sound science",
    storylineHintKey: "flora_fauna_clue",
  },
  {
    id: '49',
    question: "Before European settlement, the region was primarily the territory of which major Iroquoian confederacy?",
    options: ["The Cherokee Nation", "The Haudenosaunee (Iroquois Confederacy)", "The Anishinaabe", "The Sioux Nation"],
    answer: "The Haudenosaunee (Iroquois Confederacy)",
    storylineHintKey: "native_history_clue",
  },
  {
    id: '50',
    question: "What is the 'Thousand Islands Winery' known for, besides wine?",
    options: ["Its historic castle", "Its extensive cave system", "Its scenic location and local product focus", "Its Olympic-sized swimming pool"],
    answer: "Its scenic location and local product focus",
    storylineHintKey: "local_culture_clue",
  },
  {
    id: '51',
    question: "The Gananoque Boat Line offers tours originating from which country?",
    options: ["USA", "Canada", "Both USA and Canada", "Mexico"],
    answer: "Canada",
    storylineHintKey: "border_mystery_1",
  },
  {
    id: '52',
    question: "What is a 'see-way' lock, as part of the St. Lawrence Seaway system?",
    options: ["A type of fishing net", "A device for raising and lowering boats between different water levels", "A secure storage facility for boats", "A brand of nautical GPS"],
    answer: "A device for raising and lowering boats between different water levels",
    storylineHintKey: "seaway_journey_1",
  },
  {
    id: '53',
    question: "Tibbetts Point Lighthouse marks the entrance of the St. Lawrence River from which Great Lake?",
    options: ["Lake Huron", "Lake Erie", "Lake Ontario", "Lake Superior"],
    answer: "Lake Ontario",
    storylineHintKey: "lighthouse_legend_clue",
  },
  {
    id: '54',
    question: "The 'Smugglers' Run' is a term often associated with the Thousand Islands during which historical period?",
    options: ["The Gold Rush", "The American Revolution", "The Prohibition Era", "The Viking Age"],
    answer: "The Prohibition Era",
    storylineHintKey: "pirate_treasure_1",
  },
  {
    id: '55',
    question: "What popular summer event in Alexandria Bay features a week of pirate-themed festivities?",
    options: ["River Fest", "Boldt Castle Regatta", "Bill Johnston's Pirate Days", "Island Folk Festival"],
    answer: "Bill Johnston's Pirate Days",
    storylineHintKey: "pirate_treasure_1",
  },
  {
    id: '56',
    question: "What is the '1000 Islands Tower'?",
    options: ["A historic lighthouse", "An observation tower on Hill Island, Canada", "A water tower in Alexandria Bay", "A skyscraper in Kingston"],
    answer: "An observation tower on Hill Island, Canada",
    storylineHintKey: "region_geography_clue",
  },
  {
    id: '57',
    question: "Which US President signed the bill creating the St. Lawrence Seaway Development Corporation?",
    options: ["Harry S. Truman", "Dwight D. Eisenhower", "John F. Kennedy", "Lyndon B. Johnson"],
    answer: "Dwight D. Eisenhower",
    storylineHintKey: "historical_figure_clue",
  },
  {
    id: '58',
    question: "What is 'eel fishing' traditionally practiced with in the St. Lawrence River?",
    options: ["Rod and reel", "Nets", "Spears", "Bare hands"],
    answer: "Spears",
    storylineHintKey: "fish_expert_clue",
  },
  {
    id: '59',
    question: "The 'Lost Channel' is a famously difficult-to-navigate area. Why?",
    options: ["It's always foggy", "Strong currents and hidden shoals", "Pirate activity", "Magnetic anomalies"],
    answer: "Strong currents and hidden shoals",
    storylineHintKey: "geology_mystery_clue",
  },
  {
    id: '60',
    question: "What popular boating event involves a 'poker run' in the Thousand Islands?",
    options: ["A charity speedboat event", "A canoe race", "A sailing regatta", "A fishing tournament"],
    answer: "A charity speedboat event",
    storylineHintKey: "local_culture_clue",
  },
  {
    id: '61',
    question: "Alster Tower at Boldt Castle, with its bowling alley, was intended as what?",
    options: ["A guesthouse", "A children's playhouse", "A library", "A boathouse"],
    answer: "A children's playhouse",
    storylineHintKey: "boldt_secret_1",
  },
  {
    id: '62',
    question: "The 'Thousand Islands Parkway' offers scenic views along which country's shoreline?",
    options: ["USA", "Canada", "Mexico", "France"],
    answer: "Canada",
    storylineHintKey: "border_mystery_1",
  },
  {
    id: '63',
    question: "What does the term 'laker' refer to in the context of St. Lawrence Seaway shipping?",
    options: ["A type of pleasure boat", "A large cargo ship designed for the Great Lakes and Seaway", "A resident of the Great Lakes region", "A type of fish"],
    answer: "A large cargo ship designed for the Great Lakes and Seaway",
    storylineHintKey: "seaway_journey_1",
  },
  {
    id: '64',
    question: "'Calumet Island' was once owned by which famous American tobacco tycoon who built a castle there?",
    options: ["R.J. Reynolds", "James Buchanan Duke", "Charles G. Emery", "Pierre Lorillard"],
    answer: "Charles G. Emery",
    storylineHintKey: "historical_figure_clue",
  },
  {
    id: '65',
    question: "What is the 'Zenda Farms Preserve' known for?",
    options: ["A historic amusement park", "A working dairy farm and nature trails", "A vineyard", "An artist colony"],
    answer: "A working dairy farm and nature trails",
    storylineHintKey: "flora_fauna_clue",
  },
  {
    id: '66',
    question: "The 'Battle of the Windmill' in 1838 took place near which present-day Ontario town?",
    options: ["Kingston", "Gananoque", "Prescott", "Brockville"],
    answer: "Prescott",
    storylineHintKey: "war_history_clue",
  },
  {
    id: '67',
    question: "What is the main material used in the construction of the original hotel in the 'Thousand Islands Dressing' origin story?",
    options: ["Stone", "Brick", "Wood", "Concrete"],
    answer: "Wood",
    storylineHintKey: "local_culture_clue",
  },
  {
    id: '68',
    question: "Which of these is a common type of duck seen in the Thousand Islands during migration?",
    options: ["Penguin", "Puffin", "Canvasback", "Ostrich"],
    answer: "Canvasback",
    storylineHintKey: "flora_fauna_clue",
  },
  {
    id: '69',
    question: "The 'Rideau Canal,' a UNESCO World Heritage Site, connects Kingston to which other Canadian city?",
    options: ["Toronto", "Montreal", "Ottawa", "Quebec City"],
    answer: "Ottawa",
    storylineHintKey: "seaway_journey_1",
  },
  {
    id: '70',
    question: "What is the 'Minna Anthony Common Nature Center' located on?",
    options: ["Wellesley Island State Park", "Heart Island", "Dark Island", "Grindstone Island"],
    answer: "Wellesley Island State Park",
    storylineHintKey: "flora_fauna_clue",
  },
  {
    id: '71',
    question: "What is the 'Thousand Islands Land Trust (TILT)' primarily involved in?",
    options: ["Developing luxury resorts", "Conserving natural areas and wildlife habitats", "Operating tour boats", "Managing lighthouses"],
    answer: "Conserving natural areas and wildlife habitats",
    storylineHintKey: "flora_fauna_clue",
  },
  {
    id: '72',
    question: "What is the name of the Canadian island that is home to the '1000 Islands Tower'?",
    options: ["Wolfe Island", "Howe Island", "Hill Island", "Grenadier Island"],
    answer: "Hill Island",
    storylineHintKey: "region_geography_clue",
  },
  {
    id: '73',
    question: "The 'Frontenac' was a famous 19th-century luxury steamboat that unfortunately did what in 1907?",
    options: ["Won many races", "Burned and sank", "Was converted into a casino", "Served as a hospital ship"],
    answer: "Burned and sank",
    storylineHintKey: "seaway_journey_1",
  },
  {
    id: '74',
    question: "What is the 'Thousand Islands Biological Station (TIBS)' primarily focused on?",
    options: ["Astronomical observation", "Aquatic research and education", "Geological surveys", "Bird watching tours"],
    answer: "Aquatic research and education",
    storylineHintKey: "fish_expert_clue",
  },
  {
    id: '75',
    question: "The 'Thousand Islands Playhouse' in Gananoque, ON, is known for what?",
    options: ["Opera performances", "Professional live theatre", "Puppet shows", "Movie screenings"],
    answer: "Professional live theatre",
    storylineHintKey: "local_culture_clue",
  },
  {
    id: '76',
    question: "What does the term 'shoal' mean in a river context?",
    options: ["A deep channel", "A school of fish", "A shallow area dangerous to navigation", "A type of buoy"],
    answer: "A shallow area dangerous to navigation",
    storylineHintKey: "geology_mystery_clue",
  },
  {
    id: '77',
    question: "What is the 'Sister Island Lighthouse' notable for?",
    options: ["Being the tallest lighthouse", "Its unique twin structures (historically)", "Being made entirely of wood", "Its red and white stripes"],
    answer: "Its unique twin structures (historically)",
    storylineHintKey: "lighthouse_legend_clue",
  },
  {
    id: '78',
    question: "The 'Canadian Covenanter,' a shipwreck, is a popular site for what activity?",
    options: ["Fishing", "Scuba diving", "Sunbathing", "Kayaking around"],
    answer: "Scuba diving",
    storylineHintKey: "seaway_journey_1",
  },
  {
    id: '79',
    question: "What is 'Fort Henry' in Kingston, ON, primarily known as?",
    options: ["A modern art gallery", "A 19th-century British military fortress", "A shopping mall", "A sports stadium"],
    answer: "A 19th-century British military fortress",
    storylineHintKey: "war_history_clue",
  },
  {
    id: '80',
    question: "Zavikon Island is famous for what (often mythologized) feature spanning the US-Canada border?",
    options: ["The world's tallest flagpole", "The world's shortest international bridge", "A natural hot spring", "A secret underwater tunnel"],
    answer: "The world's shortest international bridge",
    storylineHintKey: "border_mystery_1",
  }
];

export interface StorylineHint {
  key: string;
  title: string;
  text: string;
  unlocked: boolean;
  icon?: LucideIcon;
}

// Added new storyline keys for new question categories
export const storyline: StorylineHint[] = [
  { key: "boldt_secret_1", title: "The Heart's Whisper", text: "A love story tragically cut short, yet echoes remain within the stone walls...", unlocked: false, icon: Castle },
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
  { key: "final_revelation", title: "The River's Heart", text: "The true treasure of the Thousand Islands isn't gold or jewels, but the enduring spirit of its history and people.", unlocked: false, icon: Star }
];

export interface LeaderboardEntry {
  id: string; // User's username, will serve as document ID in Firestore
  name: string;
  score: number;
  avatar?: string; // URL to avatar image
  rank?: number; // Optional: for client-side display after fetching
  lastUpdated?: Date; // Optional: if you want to show when the score was last updated
}


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
  { id: 'geology_buff', name: "Rock Solid Knowledge", description: "Answered a question about island geology.", icon: Mountain, unlocked: false, criteria: "Answer geology question" },
  { id: 'history_hound', name: "History Hound", description: "Answered a question about local history.", icon: BookOpen, unlocked: false, criteria: "Answer history question" },
];


import type { LucideIcon } from 'lucide-react';
import { Castle, Diamond, Fish, Scroll, Ship, Star, Trophy, Leaf, Anchor, MapPin, Lightbulb, BookOpen, Palette, Mountain, Trees, Waves, Bird, Shield, ShieldHalf, ShieldCheck, Gem, Award, Medal, Crown, Zap } from 'lucide-react';

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
    storylineHintKey: "bridge_info_1",
  },
  {
    id: '7',
    question: "Which of these is a popular water activity in the Thousand Islands?",
    options: ["Surfing", "Scuba diving to shipwrecks", "Whale watching", "White-water rafting"],
    answer: "Scuba diving to shipwrecks",
    storylineHintKey: "water_activity_1",
  },
  {
    id: '8',
    question: "Boldt Castle was built by George C. Boldt as a tribute to whom?",
    options: ["His mother", "His daughter", "His wife, Louise", "Queen Victoria"],
    answer: "His wife, Louise",
    storylineHintKey: "boldt_secret_2",
  },
  {
    id: '9',
    question: "Approximately how many islands are there in the 'Thousand Islands' archipelago?",
    options: ["Exactly 1000", "Around 500", "Over 1800", "Less than 700"],
    answer: "Over 1800",
    storylineHintKey: "island_count_1",
  },
  {
    id: '10',
    question: "What popular salad dressing is said to have originated in the Thousand Islands region?",
    options: ["Ranch Dressing", "Caesar Dressing", "Thousand Island Dressing", "Blue Cheese Dressing"],
    answer: "Thousand Island Dressing",
    storylineHintKey: "dressing_origin_1",
  },
  {
    id: '11',
    question: "Dark Island is home to what historic structure?",
    options: ["A lighthouse", "Singer Castle", "A modern art museum", "A nature preserve"],
    answer: "Singer Castle",
    storylineHintKey: "singer_castle_1",
  },
  {
    id: '12',
    question: "What is the primary type of rock that forms the islands?",
    options: ["Granite", "Sandstone", "Limestone", "Marble"],
    answer: "Granite",
    storylineHintKey: "geology_rock_1",
  },
  {
    id: '13',
    question: "The Clayton Antique Boat Museum showcases what type of vessels?",
    options: ["Modern speedboats", "Freshwater antique and classic wooden boats", "Submarines", "Viking longships"],
    answer: "Freshwater antique and classic wooden boats",
    storylineHintKey: "boat_museum_1",
  },
  {
    id: '14',
    question: "What does the term 'River Rat' affectionately refer to in this region?",
    options: ["A type of invasive rodent", "Locals who are knowledgeable about the St. Lawrence River", "A famous steamboat", "A mythical river creature"],
    answer: "Locals who are knowledgeable about the St. Lawrence River",
    storylineHintKey: "river_rat_meaning_1",
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
    storylineHintKey: "boldt_construction_1",
  },
  {
    id: '17',
    question: "What is the name of the scenic byway that runs along the St. Lawrence River on the US side?",
    options: ["River Road", "The Great Lakes Seaway Trail", "Island View Drive", "The King's Highway"],
    answer: "The Great Lakes Seaway Trail",
    storylineHintKey: "scenic_byway_1",
  },
  {
    id: '18',
    question: "Which island is known for having a U.S. Post Office that is the smallest in the country?",
    options: ["Wellesley Island", "Grindstone Island", "Sugar Island (unofficial)", "Picton Island"],
    answer: "Sugar Island (unofficial)",
    storylineHintKey: "smallest_post_office_1",
  },
  {
    id: '19',
    question: "The 'Lost Ships of the 1000 Islands' refers to what?",
    options: ["A fictional novel series", "A collection of well-preserved shipwrecks", "A fleet that vanished mysteriously", "A type of mirage seen on the river"],
    answer: "A collection of well-preserved shipwrecks",
    storylineHintKey: "lost_ships_1",
  },
  {
    id: '20',
    question: "What material was primarily used for the exterior of Singer Castle?",
    options: ["Local granite", "Imported Italian marble", "Red brick", "Timber"],
    answer: "Local granite",
    storylineHintKey: "singer_castle_material_1",
  },
  {
    id: '21',
    question: "Which Canadian city is a major gateway to the Thousand Islands?",
    options: ["Toronto", "Montreal", "Kingston", "Ottawa"],
    answer: "Kingston",
    storylineHintKey: "canadian_gateway_1",
  },
  {
    id: '22',
    question: "The story of 'Just Room Enough Island' involves a family named?",
    options: ["The Boldts", "The Singers", "The Sizelands", "The Johnstons"],
    answer: "The Sizelands",
    storylineHintKey: "just_room_enough_family_1",
  },
  {
    id: '23',
    question: "What important international agreement led to the creation of the St. Lawrence Seaway?",
    options: ["The Treaty of Paris", "The Webster-Ashburton Treaty", "The St. Lawrence Seaway Agreement of 1954", "The Jay Treaty"],
    answer: "The St. Lawrence Seaway Agreement of 1954",
    storylineHintKey: "seaway_agreement_1",
  },
  {
    id: '24',
    question: "Bill Johnston, the 'Pirate of the Thousand Islands', aided which side during the Patriot War?",
    options: ["The British Crown", "The American Patriots/Rebels", "He remained neutral", "The French forces"],
    answer: "The American Patriots/Rebels",
    storylineHintKey: "bill_johnston_allegiance_1",
  },
  {
    id: '25',
    question: "What is the Power Authority's visitor center near Massena, NY, that offers views of the St. Lawrence-FDR Power Project?",
    options: ["Boldt Castle Visitor Center", "Hawkins Point Visitors Center (Frank S. McCullough, Jr. Powerhouse)", "Minna Anthony Common Nature Center", "Aquatarium"],
    answer: "Hawkins Point Visitors Center (Frank S. McCullough, Jr. Powerhouse)",
    storylineHintKey: "power_authority_center_1",
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
    storylineHintKey: "bridge_type_1",
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
    storylineHintKey: "alster_tower_inspiration_1",
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
    storylineHintKey: "national_park_management_1",
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
    storylineHintKey: "us_tourism_hub_1",
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
    storylineHintKey: "bird_of_prey_1",
  },
  {
    id: '39',
    question: "The 'Boldt Castle Yacht House' is notable for housing what?",
    options: ["Modern luxury yachts", "A collection of historic houseboats and antique wooden boats", "A submarine", "A seaplane hangar"],
    answer: "A collection of historic houseboats and antique wooden boats",
    storylineHintKey: "boldt_yacht_house_1",
  },
  {
    id: '40',
    question: "What is the common name for 'Esox masquinongy', a large predatory fish found in the St. Lawrence River?",
    options: ["Northern Pike", "Walleye", "Muskellunge", "Lake Sturgeon"],
    answer: "Muskellunge",
    storylineHintKey: "muskellunge_name_1",
  },
  {
    id: '41',
    question: "The term 'cottage country' is often used to describe the Thousand Islands. What does 'cottage' typically refer to here?",
    options: ["Small, rustic shacks", "Modest, one-room cabins", "Seasonal vacation homes, often quite grand", "Agricultural farmhouses"],
    answer: "Seasonal vacation homes, often quite grand",
    storylineHintKey: "cottage_country_1",
  },
  {
    id: '42',
    question: "Which of the Thousand Islands is home to the 'Half Moon Bay', known for its unique rock formations?",
    options: ["Wellesley Island", "Grindstone Island", "Carleton Island", "Howe Island"],
    answer: "Wellesley Island",
    storylineHintKey: "half_moon_bay_1",
  },
  {
    id: '43',
    question: "The International Rift is a narrow, deep section of the river located between which two islands?",
    options: ["Heart Island and Dark Island", "Wellesley Island (US) and Hill Island (Canada)", "Grindstone Island and Wolfe Island", "Just Room Enough Island and Longue Vue Island"],
    answer: "Wellesley Island (US) and Hill Island (Canada)",
    storylineHintKey: "international_rift_1",
  },
  {
    id: '44',
    question: "What is 'skiff life,' a term associated with the region?",
    options: ["A type of fishing lure", "A lifestyle centered around small, open motorboats", "A competitive rowing sport", "A local theater production"],
    answer: "A lifestyle centered around small, open motorboats",
    storylineHintKey: "skiff_life_1",
  },
  {
    id: '45',
    question: "The Cornwall-Massena International Bridge is another major crossing. What does it primarily facilitate besides passenger vehicles?",
    options: ["Pedestrian traffic", "High-speed rail", "Shipping and power line transmission", "Bicycle tours"],
    answer: "Shipping and power line transmission",
    storylineHintKey: "cornwall_bridge_1",
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
    storylineHintKey: "devils_oven_1",
  },
  {
    id: '48',
    question: "The 'Frontenac Arch Biosphere Reserve' encompasses the Thousand Islands. What is a biosphere reserve?",
    options: ["A military exclusion zone", "An area promoting sustainable development based on local community efforts and sound science", "A theme park", "A private hunting ground"],
    answer: "An area promoting sustainable development based on local community efforts and sound science",
    storylineHintKey: "biosphere_reserve_1",
  },
  {
    id: '49',
    question: "Before European settlement, the region was primarily the territory of which major Iroquoian confederacy?",
    options: ["The Cherokee Nation", "The Haudenosaunee (Iroquois Confederacy)", "The Anishinaabe", "The Sioux Nation"],
    answer: "The Haudenosaunee (Iroquois Confederacy)",
    storylineHintKey: "haudenosaunee_territory_1",
  },
  {
    id: '50',
    question: "What is the 'Thousand Islands Winery' known for, besides wine?",
    options: ["Its historic castle", "Its extensive cave system", "Its scenic location and local product focus", "Its Olympic-sized swimming pool"],
    answer: "Its scenic location and local product focus",
    storylineHintKey: "winery_known_for_1",
  },
  {
    id: '51',
    question: "The Gananoque Boat Line offers tours originating from which country?",
    options: ["USA", "Canada", "Both USA and Canada", "Mexico"],
    answer: "Canada",
    storylineHintKey: "gananoque_boat_line_1",
  },
  {
    id: '52',
    question: "What is a 'see-way' lock, as part of the St. Lawrence Seaway system?",
    options: ["A type of fishing net", "A device for raising and lowering boats between different water levels", "A secure storage facility for boats", "A brand of nautical GPS"],
    answer: "A device for raising and lowering boats between different water levels",
    storylineHintKey: "seaway_lock_1",
  },
  {
    id: '53',
    question: "Tibbetts Point Lighthouse marks the entrance of the St. Lawrence River from which Great Lake?",
    options: ["Lake Huron", "Lake Erie", "Lake Ontario", "Lake Superior"],
    answer: "Lake Ontario",
    storylineHintKey: "tibbetts_point_1",
  },
  {
    id: '54',
    question: "The 'Smugglers' Run' is a term often associated with the Thousand Islands during which historical period?",
    options: ["The Gold Rush", "The American Revolution", "The Prohibition Era", "The Viking Age"],
    answer: "The Prohibition Era",
    storylineHintKey: "smugglers_run_1",
  },
  {
    id: '55',
    question: "What popular summer event in Alexandria Bay features a week of pirate-themed festivities?",
    options: ["River Fest", "Boldt Castle Regatta", "Bill Johnston's Pirate Days", "Island Folk Festival"],
    answer: "Bill Johnston's Pirate Days",
    storylineHintKey: "pirate_days_1",
  },
  {
    id: '56',
    question: "What is the '1000 Islands Tower'?",
    options: ["A historic lighthouse", "An observation tower on Hill Island, Canada", "A water tower in Alexandria Bay", "A skyscraper in Kingston"],
    answer: "An observation tower on Hill Island, Canada",
    storylineHintKey: "islands_tower_1",
  },
  {
    id: '57',
    question: "Which US President signed the bill creating the St. Lawrence Seaway Development Corporation?",
    options: ["Harry S. Truman", "Dwight D. Eisenhower", "John F. Kennedy", "Lyndon B. Johnson"],
    answer: "Dwight D. Eisenhower",
    storylineHintKey: "seaway_president_1",
  },
  {
    id: '58',
    question: "What is 'eel fishing' traditionally practiced with in the St. Lawrence River?",
    options: ["Rod and reel", "Nets", "Spears", "Bare hands"],
    answer: "Spears",
    storylineHintKey: "eel_fishing_1",
  },
  {
    id: '59',
    question: "The 'Lost Channel' is a famously difficult-to-navigate area. Why?",
    options: ["It's always foggy", "Strong currents and hidden shoals", "Pirate activity", "Magnetic anomalies"],
    answer: "Strong currents and hidden shoals",
    storylineHintKey: "lost_channel_1",
  },
  {
    id: '60',
    question: "What popular boating event involves a 'poker run' in the Thousand Islands?",
    options: ["A charity speedboat event", "A canoe race", "A sailing regatta", "A fishing tournament"],
    answer: "A charity speedboat event",
    storylineHintKey: "poker_run_1",
  },
  {
    id: '61',
    question: "Alster Tower at Boldt Castle, with its bowling alley, was intended as what?",
    options: ["A guesthouse", "A children's playhouse", "A library", "A boathouse"],
    answer: "A children's playhouse",
    storylineHintKey: "alster_tower_purpose_1",
  },
  {
    id: '62',
    question: "The 'Thousand Islands Parkway' offers scenic views along which country's shoreline?",
    options: ["USA", "Canada", "Mexico", "France"],
    answer: "Canada",
    storylineHintKey: "parkway_location_1",
  },
  {
    id: '63',
    question: "What does the term 'laker' refer to in the context of St. Lawrence Seaway shipping?",
    options: ["A type of pleasure boat", "A large cargo ship designed for the Great Lakes and Seaway", "A resident of the Great Lakes region", "A type of fish"],
    answer: "A large cargo ship designed for the Great Lakes and Seaway",
    storylineHintKey: "laker_definition_1",
  },
  {
    id: '64',
    question: "'Calumet Island' was once owned by which famous American tobacco tycoon who built a castle there?",
    options: ["R.J. Reynolds", "James Buchanan Duke", "Charles G. Emery", "Pierre Lorillard"],
    answer: "Charles G. Emery",
    storylineHintKey: "calumet_island_owner_1",
  },
  {
    id: '65',
    question: "What is the 'Zenda Farms Preserve' known for?",
    options: ["A historic amusement park", "A working dairy farm and nature trails", "A vineyard", "An artist colony"],
    answer: "A working dairy farm and nature trails",
    storylineHintKey: "zenda_farms_1",
  },
  {
    id: '66',
    question: "The 'Battle of the Windmill' in 1838 took place near which present-day Ontario town?",
    options: ["Kingston", "Gananoque", "Prescott", "Brockville"],
    answer: "Prescott",
    storylineHintKey: "windmill_battle_location_1",
  },
  {
    id: '67',
    question: "What is the main material used in the construction of the original hotel in the 'Thousand Islands Dressing' origin story?",
    options: ["Stone", "Brick", "Wood", "Concrete"],
    answer: "Wood",
    storylineHintKey: "dressing_hotel_material_1",
  },
  {
    id: '68',
    question: "Which of these is a common type of duck seen in the Thousand Islands during migration?",
    options: ["Penguin", "Puffin", "Canvasback", "Ostrich"],
    answer: "Canvasback",
    storylineHintKey: "duck_migration_1",
  },
  {
    id: '69',
    question: "The 'Rideau Canal,' a UNESCO World Heritage Site, connects Kingston to which other Canadian city?",
    options: ["Toronto", "Montreal", "Ottawa", "Quebec City"],
    answer: "Ottawa",
    storylineHintKey: "rideau_canal_connects_1",
  },
  {
    id: '70',
    question: "What is the 'Minna Anthony Common Nature Center' located on?",
    options: ["Wellesley Island State Park", "Heart Island", "Dark Island", "Grindstone Island"],
    answer: "Wellesley Island State Park",
    storylineHintKey: "minna_anthony_location_1",
  },
  {
    id: '71',
    question: "What is the 'Thousand Islands Land Trust (TILT)' primarily involved in?",
    options: ["Developing luxury resorts", "Conserving natural areas and wildlife habitats", "Operating tour boats", "Managing lighthouses"],
    answer: "Conserving natural areas and wildlife habitats",
    storylineHintKey: "tilt_mission_1",
  },
  {
    id: '72',
    question: "What is the name of the Canadian island that is home to the '1000 Islands Tower'?",
    options: ["Wolfe Island", "Howe Island", "Hill Island", "Grenadier Island"],
    answer: "Hill Island",
    storylineHintKey: "tower_island_1",
  },
  {
    id: '73',
    question: "The 'Frontenac' was a famous 19th-century luxury steamboat that unfortunately did what in 1907?",
    options: ["Won many races", "Burned and sank", "Was converted into a casino", "Served as a hospital ship"],
    answer: "Burned and sank",
    storylineHintKey: "frontenac_fate_1",
  },
  {
    id: '74',
    question: "What is the 'Thousand Islands Biological Station (TIBS)' primarily focused on?",
    options: ["Astronomical observation", "Aquatic research and education", "Geological surveys", "Bird watching tours"],
    answer: "Aquatic research and education",
    storylineHintKey: "tibs_focus_1",
  },
  {
    id: '75',
    question: "The 'Thousand Islands Playhouse' in Gananoque, ON, is known for what?",
    options: ["Opera performances", "Professional live theatre", "Puppet shows", "Movie screenings"],
    answer: "Professional live theatre",
    storylineHintKey: "playhouse_known_for_1",
  },
  {
    id: '76',
    question: "What does the term 'shoal' mean in a river context?",
    options: ["A deep channel", "A school of fish", "A shallow area dangerous to navigation", "A type of buoy"],
    answer: "A shallow area dangerous to navigation",
    storylineHintKey: "shoal_definition_1",
  },
  {
    id: '77',
    question: "What is the 'Sister Island Lighthouse' notable for?",
    options: ["Being the tallest lighthouse", "Its unique twin structures (historically)", "Being made entirely of wood", "Its red and white stripes"],
    answer: "Its unique twin structures (historically)",
    storylineHintKey: "sister_island_lighthouse_1",
  },
  {
    id: '78',
    question: "The 'Canadian Covenanter,' a shipwreck, is a popular site for what activity?",
    options: ["Fishing", "Scuba diving", "Sunbathing", "Kayaking around"],
    answer: "Scuba diving",
    storylineHintKey: "covenanter_shipwreck_1",
  },
  {
    id: '79',
    question: "What is 'Fort Henry' in Kingston, ON, primarily known as?",
    options: ["A modern art gallery", "A 19th-century British military fortress", "A shopping mall", "A sports stadium"],
    answer: "A 19th-century British military fortress",
    storylineHintKey: "fort_henry_1",
  },
  {
    id: '80',
    question: "Zavikon Island is famous for what (often mythologized) feature spanning the US-Canada border?",
    options: ["The world's tallest flagpole", "The world's shortest international bridge", "A natural hot spring", "A secret underwater tunnel"],
    answer: "The world's shortest international bridge",
    storylineHintKey: "zavikon_island_bridge_1",
  },
  {
    id: '81',
    question: "What is the 'Thousand Islands International Bridge' system composed of?",
    options: ["One single, long bridge", "A series of bridges and islands", "A tunnel and a bridge", "Only a ferry system"],
    answer: "A series of bridges and islands",
    storylineHintKey: "bridge_info_1"
  },
  {
    id: '82',
    question: "The town of Gananoque, ON, is often called the 'Gateway to the Thousand Islands' for which country?",
    options: ["USA", "Canada", "Mexico", "France"],
    answer: "Canada",
    storylineHintKey: "canadian_gateway_1"
  },
  {
    id: '83',
    question: "Which type of tree is NOT commonly found giving the Thousand Islands their characteristic forested look?",
    options: ["Oak", "Maple", "Pine", "Palm"],
    answer: "Palm",
    storylineHintKey: "flora_fauna_clue"
  },
  {
    id: '84',
    question: "The 'Aquatarium' in Brockville, ON, primarily focuses on what aspect of the Thousand Islands?",
    options: ["History of piracy", "Aquatic life and ecosystems", "Antique boat building", "Military history"],
    answer: "Aquatic life and ecosystems",
    storylineHintKey: "local_culture_clue"
  },
  {
    id: '85',
    question: "What is the minimum size criterion for an island to be counted in the Thousand Islands?",
    options: ["Must support at least one building", "Must support at least two living trees and be above water year-round", "Must be larger than 10 square feet", "No specific size, just visible land"],
    answer: "Must support at least two living trees and be above water year-round",
    storylineHintKey: "island_count_1"
  },
  {
    id: '86',
    question: "During the winter, large parts of the St. Lawrence River in the Thousand Islands can experience what?",
    options: ["Tropical storms", "Complete freezing over, allowing ice roads", "Increased water levels", "Arrival of migratory whales"],
    answer: "Complete freezing over, allowing ice roads",
    storylineHintKey: "region_geography_clue"
  },
  {
    id: '87',
    question: "The 'Thousand Islands National Park' was the first Canadian National Park established east of what geographical feature?",
    options: ["The Great Lakes", "The Rocky Mountains", "Hudson Bay", "The Appalachian Mountains"],
    answer: "The Rocky Mountains",
    storylineHintKey: "national_park_management_1"
  },
  {
    id: '88',
    question: "What is a 'Tour Boat Captain' in the Thousand Islands primarily responsible for?",
    options: ["Fishing charters", "Navigating tour vessels and providing commentary", "Repairing boat engines", "Selling souvenirs"],
    answer: "Navigating tour vessels and providing commentary",
    storylineHintKey: "river_rat_meaning_1"
  },
  {
    id: '89',
    question: "The construction of the St. Lawrence Seaway in the 1950s involved what major impact on some riverside communities?",
    options: ["They became major tourist hubs overnight", "They were relocated or 'drowned' by rising water levels", "They experienced a gold rush", "They were designated as national parks"],
    answer: "They were relocated or 'drowned' by rising water levels",
    storylineHintKey: "seaway_journey_1"
  },
  {
    id: '90',
    question: "What is the primary industry that historically sustained many small communities in the Thousand Islands before large-scale tourism?",
    options: ["Tech startups", "Manufacturing", "Fishing, logging, and small-scale farming", "Aerospace engineering"],
    answer: "Fishing, logging, and small-scale farming",
    storylineHintKey: "island_traditions_clue" 
  },
  {
    id: '91',
    question: "Which of these is a famous shipwreck visible to divers in the Thousand Islands, known for its intact propeller?",
    options: ["The Edmund Fitzgerald", "The Titanic", "The Sir Robert Peel", "The Roy A. Jodrey"],
    answer: "The Roy A. Jodrey",
    storylineHintKey: "lost_ships_1"
  },
  {
    id: '92',
    question: "The 'Gilded Age' refers to a period of great wealth in the late 19th century. How did this era impact the Thousand Islands?",
    options: ["It led to the area being abandoned", "Wealthy industrialists built elaborate summer homes and castles", "It caused extensive industrial pollution", "The islands were sold to foreign powers"],
    answer: "Wealthy industrialists built elaborate summer homes and castles",
    storylineHintKey: "historical_figure_clue"
  },
  {
    id: '93',
    question: "What is the 'Thousand Islands Emergency Rescue Service (TIERS)'?",
    options: ["A pizza delivery service", "A volunteer-based marine rescue organization", "A historical reenactment group", "A weather forecasting station"],
    answer: "A volunteer-based marine rescue organization",
    storylineHintKey: "skiff_life_1"
  },
  {
    id: '94',
    question: "Many islands have names like 'Grindstone', 'Sugar', or 'Picton'. What do these names often reflect?",
    options: ["Random choices by mapmakers", "Names of famous racehorses", "Historical uses, local legends, or early settlers/owners", "Alien languages"],
    answer: "Historical uses, local legends, or early settlers/owners",
    storylineHintKey: "river_origin_clue" 
  },
  {
    id: '95',
    question: "What role did the Thousand Islands play during the War of 1812 between the US and Great Britain (Canada)?",
    options: ["It was a neutral zone respected by both sides", "It was a primary battlefield with major land engagements", "It was a strategic waterway for troop movement and smuggling, with some skirmishes", "It was completely uninhabited and ignored"],
    answer: "It was a strategic waterway for troop movement and smuggling, with some skirmishes",
    storylineHintKey: "war_history_clue"
  },
  {
    id: '96',
    question: "What is the 'Thousand Islands Water Trail'?",
    options: ["A series of underwater tunnels", "A designated route for kayakers and canoeists", "A famous hiking path", "A water skiing competition course"],
    answer: "A designated route for kayakers and canoeists",
    storylineHintKey: "water_activity_1"
  },
  {
    id: '97',
    question: "The architectural style of Boldt Castle is best described as:",
    options: ["Modern Minimalist", "Art Deco", "Châteauesque / Rhineland Castle", "Log Cabin"],
    answer: "Châteauesque / Rhineland Castle",
    storylineHintKey: "boldt_secret_1"
  },
  {
    id: '98',
    question: "What is a common challenge for homeowners on the smaller, more remote islands?",
    options: ["Too much tourist traffic", "Lack of internet access", "Utility access (water, power, septic) and boat-only access", "Constant pirate attacks"],
    answer: "Utility access (water, power, septic) and boat-only access",
    storylineHintKey: "small_island_clue_1"
  },
  {
    id: '99',
    question: "The 'Muskie Hall of Fame' is located in which Thousand Islands town?",
    options: ["Alexandria Bay, NY", "Clayton, NY", "Gananoque, ON", "Cape Vincent, NY"],
    answer: "Clayton, NY",
    storylineHintKey: "fish_expert_clue"
  },
  {
    id: '100',
    question: "What is the '1000 Islands Charity Poker Run' primarily known for?",
    options: ["Its slow, scenic pace", "High-performance powerboats and fundraising", "Its focus on antique sailboats", "Being a silent, non-motorized event"],
    answer: "High-performance powerboats and fundraising",
    storylineHintKey: "poker_run_1"
  },
  {
    id: '101',
    question: "Besides George Boldt, which other famous hotelier owned property in the Thousand Islands, specifically 'Hopewell Hall'?",
    options: ["Conrad Hilton", "Cesar Ritz", "Abraham Abraham (Abraham & Straus)", "J.W. Marriott"],
    answer: "Abraham Abraham (Abraham & Straus)",
    storylineHintKey: "historical_figure_clue"
  },
  {
    id: '102',
    question: "The 'Mohawk Nation' is part of which larger Indigenous confederacy historically present in the Thousand Islands?",
    options: ["Algonquin", "Sioux", "Haudenosaunee (Iroquois)", "Cherokee"],
    answer: "Haudenosaunee (Iroquois)",
    storylineHintKey: "native_history_clue"
  },
  {
    id: '103',
    question: "What activity is often associated with the 'Narrows' section of the St. Lawrence River near Alexandria Bay?",
    options: ["Calm, easy sailing", "Congested boat traffic and scenic castle views", "White water rafting", "Surfing"],
    answer: "Congested boat traffic and scenic castle views",
    storylineHintKey: "geography_mystery_clue"
  },
  {
    id: '104',
    question: "The 'Thousand Islands Arts Center' in Clayton offers classes and exhibits primarily focused on what?",
    options: ["Digital art and animation", "Traditional crafts like weaving, pottery, and painting", "Automotive design", "Culinary arts"],
    answer: "Traditional crafts like weaving, pottery, and painting",
    storylineHintKey: "local_culture_clue"
  },
  {
    id: '105',
    question: "If someone refers to 'A-Bay', which Thousand Islands town are they likely talking about?",
    options: ["Kingston, ON", "Clayton, NY", "Alexandria Bay, NY", "Gananoque, ON"],
    answer: "Alexandria Bay, NY",
    storylineHintKey: "us_tourism_hub_1"
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
  icon: LucideIcon;
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

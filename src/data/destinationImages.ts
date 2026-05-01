// Real photographs of South Indian destinations bundled locally.
// All images are Vite-imported so they always resolve (no broken URLs).
import alappuzhaImg from "@/assets/destinations/alappuzha.jpg";
import athirampallyImg from "@/assets/destinations/athirampally.jpg";
import bangaloreImg from "@/assets/destinations/bangalore.jpg";
import cochinImg from "@/assets/destinations/cochin.jpg";
import coimbatoreImg from "@/assets/destinations/coimbatore.jpg";
import coorgImg from "@/assets/destinations/coorg.jpg";
import kanyakumariImg from "@/assets/destinations/kanyakumari.jpg";
import kodaikanalImg from "@/assets/destinations/kodaikanal.jpg";
import maduraiImg from "@/assets/destinations/madurai.jpg";
import munnarImg from "@/assets/destinations/munnar.jpg";
import mysoreImg from "@/assets/destinations/mysore.jpg";
import ootyImg from "@/assets/destinations/ooty.jpg";
import palaniImg from "@/assets/destinations/palani.jpg";
import pollachiImg from "@/assets/destinations/pollachi.jpg";
import rameshwaramImg from "@/assets/destinations/rameshwaram.jpg";
import thekkadyImg from "@/assets/destinations/thekkady.jpg";
import valparaiImg from "@/assets/destinations/valparai.jpg";

export const DEFAULT_DESTINATION_IMAGE = ootyImg;

// Exact-name lookup for destination labels used across tour packages.
export const destinationImages: Record<string, string> = {
  // ===== OOTY / NILGIRIS =====
  "Ooty": ootyImg,
  "Ooty Botanical Garden": ootyImg,
  "Ooty Lake": ootyImg,
  "Ooty Lake & Boathouse": ootyImg,
  "Doddabetta": ootyImg,
  "Doddabetta Peak": ootyImg,
  "Rose Garden": ootyImg,
  "Botanical Garden": ootyImg,
  "Pine Forest": ootyImg,
  "Pykara": ootyImg,
  "Pykara Falls": ootyImg,
  "Thread Garden": ootyImg,
  "Coonoor": ootyImg,
  "Kotagiri": ootyImg,
  "Nilgiri Mountain Railway": ootyImg,
  "Sim's Park": ootyImg,
  "Dolphin's Nose": ootyImg,
  "Lamb's Rock": ootyImg,
  "Avalanche": ootyImg,
  "Avalanche Lake": ootyImg,
  "Emerald Lake": ootyImg,
  "Upper Bhavani": ootyImg,
  "Mukurthi": ootyImg,
  "Tea Museum": ootyImg,
  "Tea Factory": ootyImg,

  // ===== KODAIKANAL =====
  "Kodaikanal": kodaikanalImg,
  "Kodaikanal Lake": kodaikanalImg,
  "Pillar Rocks": kodaikanalImg,
  "Bryant Park": kodaikanalImg,
  "Coaker's Walk": kodaikanalImg,
  "Silver Cascade Falls": kodaikanalImg,
  "Green Valley View": kodaikanalImg,
  "Guna Caves": kodaikanalImg,
  "Berijam Lake": kodaikanalImg,
  "Mannavanur": kodaikanalImg,
  "Mannavanur Lake": kodaikanalImg,
  "Vattakanal": kodaikanalImg,
  "Vattakanal Falls": kodaikanalImg,
  "Echo Point": kodaikanalImg,
  "Photo Point": kodaikanalImg,
  "Pagoda Point": kodaikanalImg,
  "Bear Shola Falls": kodaikanalImg,

  // ===== MUNNAR =====
  "Munnar": munnarImg,
  "Munnar Tea Gardens": munnarImg,
  "Tea Gardens": munnarImg,
  "Tea & Coffee Plantations": munnarImg,
  "Mattupetty Dam": munnarImg,
  "Kundala Lake": munnarImg,
  "Top Station": munnarImg,
  "Eravikulam": munnarImg,
  "Eravikulam National Park": munnarImg,
  "Anamudi Peak View": munnarImg,
  "Spice Plantations": munnarImg,
  "Echo Point Munnar": munnarImg,
  "Rose Garden Munnar": munnarImg,
  "Marayoor": munnarImg,
  "Marayoor Sandalwood Forest": munnarImg,
  "Chinnar Wildlife Sanctuary": munnarImg,
  "Nallamudi Viewpoint": munnarImg,

  // ===== THEKKADY =====
  "Thekkady": thekkadyImg,
  "Periyar": thekkadyImg,
  "Periyar Wildlife Sanctuary": thekkadyImg,
  "Periyar Lake": thekkadyImg,
  "Periyar Tiger Reserve": thekkadyImg,
  "Spice Garden": thekkadyImg,
  "Bamboo Rafting": thekkadyImg,

  // ===== ALAPPUZHA / KERALA BACKWATERS =====
  "Alleppey": alappuzhaImg,
  "Alappuzha": alappuzhaImg,
  "Alleppey Backwaters": alappuzhaImg,
  "Alleppey Houseboat": alappuzhaImg,
  "Backwaters": alappuzhaImg,
  "Houseboat": alappuzhaImg,
  "Kovalam": alappuzhaImg,
  "Kovalam Beach": alappuzhaImg,

  // ===== COCHIN =====
  "Cochin": cochinImg,
  "Kochi": cochinImg,
  "Fort Kochi": cochinImg,
  "Chinese Fishing Nets": cochinImg,
  "Jewish Synagogue": cochinImg,
  "Mattancherry Palace": cochinImg,
  "Santa Cruz Basilica": cochinImg,
  "Marine Drive": cochinImg,
  "Trivandrum": cochinImg,
  "Padmanabhaswamy Temple": cochinImg,
  "Padmanabhapuram Palace": cochinImg,
  "Guruvayur Sri Krishna Temple": cochinImg,
  "Mammiyur Mahadeva Temple": cochinImg,
  "Punnathurkotta Elephant Sanctuary": cochinImg,
  "Thrissur Pooram Museum": cochinImg,
  "Chavakkad Beach": cochinImg,

  // ===== ATHIRAPPALLY =====
  "Athirapally Falls": athirampallyImg,
  "Athirapally Waterfalls": athirampallyImg,
  "Vazhachal Falls": athirampallyImg,
  "Vazhachal Waterfalls": athirampallyImg,
  "Malampuzha Dam & Garden": athirampallyImg,

  // ===== MYSORE =====
  "Mysore": mysoreImg,
  "Mysore Palace": mysoreImg,
  "Mysore Zoo": mysoreImg,
  "Chamundi Hills": mysoreImg,
  "Brindavan Gardens": mysoreImg,
  "KRS Dam": mysoreImg,
  "St. Philomena's Church": mysoreImg,
  "Srirangapatna": mysoreImg,
  "Ranganathittu Bird Sanctuary": mysoreImg,

  // ===== BANGALORE =====
  "Bangalore": bangaloreImg,
  "Bangalore Palace": bangaloreImg,
  "Lalbagh": bangaloreImg,
  "Lalbagh Botanical Garden": bangaloreImg,
  "Cubbon Park": bangaloreImg,
  "Vidhana Soudha": bangaloreImg,
  "UB City Mall": bangaloreImg,

  // ===== COORG =====
  "Coorg": coorgImg,
  "Madikeri": coorgImg,
  "Abbey Falls": coorgImg,
  "Raja's Seat": coorgImg,
  "Dubare Elephant Camp": coorgImg,
  "Talacauvery": coorgImg,
  "Namdroling Monastery": coorgImg,
  "Bandipur": coorgImg,
  "Bandipur National Park": coorgImg,
  "Mudumalai": coorgImg,
  "Mudumalai Wildlife Sanctuary": coorgImg,

  // ===== MADURAI =====
  "Madurai": maduraiImg,
  "Meenakshi Amman Temple": maduraiImg,
  "Meenakshi Temple": maduraiImg,
  "Thirumalai Nayakkar Palace": maduraiImg,
  "Gandhi Memorial Museum": maduraiImg,
  "Alagar Kovil": maduraiImg,

  // ===== KANYAKUMARI =====
  "Kanyakumari": kanyakumariImg,
  "Kanyakumari Sunrise/Sunset": kanyakumariImg,
  "Vivekananda Rock Memorial": kanyakumariImg,
  "Thiruvalluvar Statue": kanyakumariImg,
  "Sunset Point": kanyakumariImg,

  // ===== PALANI =====
  "Palani": palaniImg,
  "Palani Temple": palaniImg,
  "Palani Murugan Temple": palaniImg,
  "Palani Hills": palaniImg,
  "Idumban Temple": palaniImg,

  // ===== RAMESHWARAM =====
  "Rameshwaram": rameshwaramImg,
  "Rameswaram": rameshwaramImg,
  "Ramanathaswamy Temple": rameshwaramImg,
  "Pamban Bridge": rameshwaramImg,
  "Dhanushkodi": rameshwaramImg,
  "Agni Theertham": rameshwaramImg,
  "Five-faced Hanuman Temple": rameshwaramImg,
  "Dr. APJ Abdul Kalam Memorial": rameshwaramImg,

  // ===== POLLACHI =====
  "Pollachi": pollachiImg,
  "Aliyar Dam": pollachiImg,
  "Topslip": pollachiImg,
  "Anamalai Tiger Reserve": pollachiImg,
  "Parambikulam Tiger Reserve": pollachiImg,
  "Teak Plantations": pollachiImg,
  "Wildlife Safari": pollachiImg,
  "Elephant Ride": pollachiImg,

  // ===== VALPARAI =====
  "Valparai": valparaiImg,
  "Sholayar Dam": valparaiImg,
  "Monkey Falls": valparaiImg,
  "Chinnakallar Falls": valparaiImg,
  "Grass Hills": valparaiImg,
  "Silent Valley": valparaiImg,
  "Silent Valley View": valparaiImg,
  "40 Hairpin Bends": valparaiImg,

  // ===== TIRUPATI / CHENNAI / YERCAUD =====
  "Tirupati": maduraiImg,
  "Tirumala Venkateswara Temple": maduraiImg,
  "Balaji Temple": maduraiImg,
  "Tiruchanoor Padmavathi Temple": maduraiImg,
  "Silathoranam (Natural Rock Arch)": maduraiImg,
  "Srivari Mettu (Trekking Path)": ootyImg,
  "Chennai": maduraiImg,
  "Fort St. George": maduraiImg,
  "Marina Beach": kanyakumariImg,
  "Kapaleeshwarar Temple": maduraiImg,
  "San Thome Cathedral": maduraiImg,
  "Government Museum": maduraiImg,
  "Yercaud": kodaikanalImg,
  "Yercaud Lake": kodaikanalImg,
  "Shevaroy Temple": kodaikanalImg,
  "Lady's Seat": kodaikanalImg,
  "Bear's Cave": kodaikanalImg,
  "Rock Garden": ootyImg,

  // ===== AMUSEMENT / WATERPARK =====
  "Black Thunder": coimbatoreImg,
  "Fantasy Park": coimbatoreImg,
  "Adventure Rides": coimbatoreImg,
  "Wave Pool": coimbatoreImg,
  "Water Slides": coimbatoreImg,
  "Lazy River": coimbatoreImg,
  "Rain Dance": coimbatoreImg,
  "Kids Zone": coimbatoreImg,
  "Rope Car Ride": coimbatoreImg,

  // ===== COIMBATORE =====
  "Coimbatore": coimbatoreImg,
};

// Keyword-based fallback so any unmapped highlight still gets a relevant image.
const keywordMap: Array<[RegExp, string]> = [
  [/ooty|nilgiri|coonoor|doddabetta|botanical garden|pykara|kotagiri|avalanche|emerald|mukurthi|sim'?s park|dolphin/i, ootyImg],
  [/kodai|pillar rock|coaker|berijam|mannavanur|vattakanal|silver cascade|guna cave|bryant/i, kodaikanalImg],
  [/munnar|mattupetty|eravikulam|anamudi|kundala|top station|tea garden|tea plantation|marayoor|chinnar/i, munnarImg],
  [/thekkady|periyar|spice garden|bamboo raft/i, thekkadyImg],
  [/alleppey|alappuzha|backwater|houseboat|kovalam|kumarakom/i, alappuzhaImg],
  [/cochin|kochi|fort kochi|chinese fishing|mattancherry|guruvayur|trivandrum|padmanabha|chavakkad|marine drive|santa cruz/i, cochinImg],
  [/athirap|vazhachal|malampuzha/i, athirampallyImg],
  [/mysore|chamundi|brindavan|krs|philomena|srirangapatna|ranganathittu/i, mysoreImg],
  [/bangalore|bengaluru|lalbagh|cubbon|vidhana|ub city/i, bangaloreImg],
  [/coorg|madikeri|abbey|talacauvery|dubare|namdroling|bandipur|mudumalai/i, coorgImg],
  [/madurai|meenakshi|thirumalai|gandhi memorial|alagar/i, maduraiImg],
  [/kanyakumari|vivekananda|thiruvalluvar|sunset point|sunrise/i, kanyakumariImg],
  [/palani|murugan|idumban/i, palaniImg],
  [/rameshwaram|rameswaram|ramanathaswamy|pamban|dhanushkodi|agni theertham|hanuman|kalam memorial/i, rameshwaramImg],
  [/pollachi|aliyar|topslip|anamalai|parambikulam|teak/i, pollachiImg],
  [/valparai|sholayar|monkey falls|chinnakallar|grass hills|silent valley|hairpin/i, valparaiImg],
  [/tirupati|tirumala|balaji|venkateswara|padmavathi/i, maduraiImg],
  [/chennai|marina|kapaleeshwarar|fort st\.? george|san thome/i, maduraiImg],
  [/yercaud|shevaroy/i, kodaikanalImg],
  [/black thunder|water park|wave pool|water slide|fantasy park|amusement|rain dance|kids zone/i, coimbatoreImg],
  [/coimbatore/i, coimbatoreImg],
  [/temple|kovil|church|cathedral|basilica|mosque/i, maduraiImg],
  [/beach|sea|ocean/i, kanyakumariImg],
  [/falls|waterfall|cascade/i, athirampallyImg],
  [/lake|dam|boating/i, kodaikanalImg],
  [/wildlife|safari|tiger|elephant|sanctuary|national park|forest/i, thekkadyImg],
  [/hill|peak|view ?point|valley/i, ootyImg],
];

export const getDestinationImage = (placeName: string): string => {
  if (!placeName) return DEFAULT_DESTINATION_IMAGE;
  const exact = destinationImages[placeName];
  if (exact) return exact;
  for (const [pattern, img] of keywordMap) {
    if (pattern.test(placeName)) return img;
  }
  return DEFAULT_DESTINATION_IMAGE;
};

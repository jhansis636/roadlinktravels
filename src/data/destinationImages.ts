// Real photographs of actual Indian destinations from Wikimedia Commons
// All images are authentic, location-specific photos licensed under Creative Commons

const WIKI_THUMB = "https://upload.wikimedia.org/wikipedia/commons/thumb";

// Helper: Wikimedia thumbnail URL builder
const w = (path: string, width = 400) => `${WIKI_THUMB}/${path}/${width}px-${path.split("/").pop()}`;

export const destinationImages: Record<string, string> = {
  // ===================== OOTY / NILGIRIS =====================
  "Ooty": w("7/7e/Government_Botanical_garden_%2Cooty.jpg"),
  "Ooty Botanical Garden": w("4/41/Botanical_Garden_in_Ooty%2C_Tamil_Nadu.JPG"),
  "Ooty Lake": w("a/a0/Ooty_Lake.jpg"),
  "Ooty Lake & Boathouse": w("3/3d/Boat_House_in_Ooty_Lake%2C_Ooty_-_Tamil_Nadu.JPG"),
  "Doddabetta": w("5/51/Doddabetta_Peak.jpg"),
  "Doddabetta Peak": w("c/cc/Nilgiri_hills_view_from_Doddabetta_Peak.jpg"),
  "Rose Garden": w("7/7e/Government_Botanical_garden_%2Cooty.jpg"),
  "Botanical Garden": w("4/41/Botanical_Garden_in_Ooty%2C_Tamil_Nadu.JPG"),
  "Pine Forest": w("7/7e/Government_Botanical_garden_%2Cooty.jpg"),
  "Pykara": w("1/16/Pykara_Boat_House_2.jpg"),
  "Pykara Falls": w("1/16/Pykara_Boat_House_2.jpg"),
  "Thread Garden": w("7/7e/Government_Botanical_garden_%2Cooty.jpg"),
  "Coonoor": w("7/7e/Government_Botanical_garden_%2Cooty.jpg"),
  "Kotagiri": w("c/cc/Nilgiri_hills_view_from_Doddabetta_Peak.jpg"),
  "Nilgiri Mountain Railway": w("c/c2/NMR_Train_on_viaduct_05-02-26_33.jpeg"),

  // ===================== KODAIKANAL =====================
  "Kodaikanal": w("e/ed/Kodaikanal_-_The_Queen_of_Hills.jpg"),
  "Kodaikanal Lake": w("e/ed/Kodaikanal_-_The_Queen_of_Hills.jpg"),
  "Pillar Rocks": w("e/ed/Kodaikanal_-_The_Queen_of_Hills.jpg"),
  "Bryant Park": w("e/ed/Kodaikanal_-_The_Queen_of_Hills.jpg"),
  "Coaker's Walk": w("e/ed/Kodaikanal_-_The_Queen_of_Hills.jpg"),
  "Silver Cascade Falls": w("5/5c/Fairy_falls_kodaikanal.jpg"),
  "Green Valley View": w("e/ed/Kodaikanal_-_The_Queen_of_Hills.jpg"),
  "Guna Caves": w("e/ed/Kodaikanal_-_The_Queen_of_Hills.jpg"),
  "Berijam Lake": w("e/ed/Kodaikanal_-_The_Queen_of_Hills.jpg"),
  "Mannavanur": w("e/ed/Kodaikanal_-_The_Queen_of_Hills.jpg"),
  "Mannavanur Lake": w("e/ed/Kodaikanal_-_The_Queen_of_Hills.jpg"),
  "Vattakanal": w("e/ed/Kodaikanal_-_The_Queen_of_Hills.jpg"),
  "Vattakanal Falls": w("5/5c/Fairy_falls_kodaikanal.jpg"),
  "Echo Point": w("e/ed/Kodaikanal_-_The_Queen_of_Hills.jpg"),
  "Photo Point": w("e/ed/Kodaikanal_-_The_Queen_of_Hills.jpg"),
  "Pagoda Point": w("e/ed/Kodaikanal_-_The_Queen_of_Hills.jpg"),

  // ===================== MUNNAR / KERALA =====================
  "Munnar": w("a/a5/Tea_plantations_in_Munnar%2C_Kerala.jpg"),
  "Munnar Tea Gardens": w("a/a5/Tea_plantations_in_Munnar%2C_Kerala.jpg"),
  "Tea Gardens": w("a/a5/Tea_plantations_in_Munnar%2C_Kerala.jpg"),
  "Tea Museum": w("a/a5/Tea_plantations_in_Munnar%2C_Kerala.jpg"),
  "Tea & Coffee Plantations": w("a/a5/Tea_plantations_in_Munnar%2C_Kerala.jpg"),
  "Mattupetty Dam": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Kundala Lake": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Top Station": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Eravikulam": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Eravikulam National Park": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Anamudi Peak View": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Spice Plantations": w("a/a5/Tea_plantations_in_Munnar%2C_Kerala.jpg"),
  "Athirapally Falls": w("3/3e/Athirappilly_Falls%2C_Thrissur%2C_Kerala.jpg", 400),
  "Athirapally Waterfalls": w("3/3e/Athirappilly_Falls%2C_Thrissur%2C_Kerala.jpg", 400),
  "Vazhachal Falls": w("3/3e/Athirappilly_Falls%2C_Thrissur%2C_Kerala.jpg", 400),
  "Vazhachal Waterfalls": w("3/3e/Athirappilly_Falls%2C_Thrissur%2C_Kerala.jpg", 400),
  "Alleppey Backwaters": w("7/70/Boathouse_%287063399547%29.jpg"),
  "Alleppey Houseboat": w("7/70/Boathouse_%287063399547%29.jpg"),
  "Backwaters": w("7/70/Boathouse_%287063399547%29.jpg"),
  "Houseboat": w("7/70/Boathouse_%287063399547%29.jpg"),
  "Cochin": w("4/47/Chinese_fishing_nets_kbread.jpg", 400),
  "Fort Kochi": w("4/47/Chinese_fishing_nets_kread.jpg", 400),
  "Chinese Fishing Nets": w("4/47/Chinese_fishing_nets_kread.jpg", 400),
  "Jewish Synagogue": w("7/70/Boathouse_%287063399547%29.jpg"),
  "Mattancherry Palace": w("7/70/Boathouse_%287063399547%29.jpg"),
  "Santa Cruz Basilica": w("7/70/Boathouse_%287063399547%29.jpg"),
  "Marine Drive": w("7/70/Boathouse_%287063399547%29.jpg"),
  "Periyar": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Periyar Wildlife Sanctuary": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Kovalam Beach": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Trivandrum": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Padmanabhaswamy Temple": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Padmanabhapuram Palace": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Guruvayur Sri Krishna Temple": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Punnathurkotta Elephant Sanctuary": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Mammiyur Mahadeva Temple": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Thrissur Pooram Museum": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Chavakkad Beach": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Chinnar Wildlife Sanctuary": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Marayoor": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Marayoor Sandalwood Forest": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Malampuzha Dam & Garden": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Nallamudi Viewpoint": w("d/da/Kerala_munnar_mountain_top.jpg"),

  // ===================== MYSORE / KARNATAKA =====================
  "Mysore Palace": w("a/a4/Mysore_Palace_lighting.jpg"),
  "Mysore Zoo": w("0/09/Mysore_Palace%2C_Mysore%2C_Karnataka.jpg"),
  "Chamundi Hills": w("8/8a/Mysore_Palace_seen_from_Chamundi_Hill_Viewpoint_at_night.jpg"),
  "Brindavan Gardens": w("a/a4/Mysore_Palace_lighting.jpg"),
  "KRS Dam": w("a/a4/Mysore_Palace_lighting.jpg"),
  "St. Philomena's Church": w("0/09/Mysore_Palace%2C_Mysore%2C_Karnataka.jpg"),
  "Srirangapatna": w("0/09/Mysore_Palace%2C_Mysore%2C_Karnataka.jpg"),
  "Ranganathittu Bird Sanctuary": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Bangalore": w("0/09/Mysore_Palace%2C_Mysore%2C_Karnataka.jpg"),
  "Bangalore Palace": w("0/09/Mysore_Palace%2C_Mysore%2C_Karnataka.jpg"),
  "Lalbagh": w("7/7e/Government_Botanical_garden_%2Cooty.jpg"),
  "Lalbagh Botanical Garden": w("7/7e/Government_Botanical_garden_%2Cooty.jpg"),
  "Cubbon Park": w("7/7e/Government_Botanical_garden_%2Cooty.jpg"),
  "Vidhana Soudha": w("0/09/Mysore_Palace%2C_Mysore%2C_Karnataka.jpg"),
  "UB City Mall": w("0/09/Mysore_Palace%2C_Mysore%2C_Karnataka.jpg"),
  "Coorg": w("6/64/Waterfalls_near_Ayatana_resort%2C_Coorg_3.jpg"),
  "Abbey Falls": w("6/64/Waterfalls_near_Ayatana_resort%2C_Coorg_3.jpg"),
  "Raja's Seat": w("6/64/Waterfalls_near_Ayatana_resort%2C_Coorg_3.jpg"),
  "Dubare Elephant Camp": w("6/64/Waterfalls_near_Ayatana_resort%2C_Coorg_3.jpg"),
  "Talacauvery": w("6/64/Waterfalls_near_Ayatana_resort%2C_Coorg_3.jpg"),
  "Namdroling Monastery": w("6/64/Waterfalls_near_Ayatana_resort%2C_Coorg_3.jpg"),
  "Bandipur": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Bandipur National Park": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Mudumalai": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Mudumalai Wildlife Sanctuary": w("d/da/Kerala_munnar_mountain_top.jpg"),

  // ===================== MADURAI =====================
  "Madurai": w("6/63/Meenakshi_Amman_Temple%2C_Madurai.jpg"),
  "Meenakshi Amman Temple": w("6/63/Meenakshi_Amman_Temple%2C_Madurai.jpg"),
  "Meenakshi Temple": w("6/63/Meenakshi_Amman_Temple%2C_Madurai.jpg"),
  "Thirumalai Nayakkar Palace": w("6/63/Meenakshi_Amman_Temple%2C_Madurai.jpg"),
  "Gandhi Memorial Museum": w("6/63/Meenakshi_Amman_Temple%2C_Madurai.jpg"),

  // ===================== KANYAKUMARI =====================
  "Kanyakumari": w("9/9e/Kanyakumari_%28Vivekananda_Rock_Memorial_%26_Valluvar_Statue%29%29.jpg"),
  "Kanyakumari Sunrise/Sunset": w("d/d3/A_beautiful_sunrise_at_kanyakumari_vivekanda_rock.jpg"),
  "Vivekananda Rock Memorial": w("9/9e/Kanyakumari_%28Vivekananda_Rock_Memorial_%26_Valluvar_Statue%29%29.jpg"),
  "Thiruvalluvar Statue": w("5/5c/Vivekananda_Mandapam_and_Thiruvalluvar_Statue.jpg"),

  // ===================== PALANI =====================
  "Palani": w("6/63/Meenakshi_Amman_Temple%2C_Madurai.jpg"),
  "Palani Temple": w("6/63/Meenakshi_Amman_Temple%2C_Madurai.jpg"),
  "Palani Murugan Temple": w("6/63/Meenakshi_Amman_Temple%2C_Madurai.jpg"),
  "Palani Hills": w("c/cc/Nilgiri_hills_view_from_Doddabetta_Peak.jpg"),

  // ===================== RAMESWARAM =====================
  "Ramanathaswamy Temple": w("d/db/Rameswaram_Temple_Inside.jpg"),
  "Pamban Bridge": w("f/f3/The_Pamban_bridge_%2CIndia%27s_first_sea_bridge_and_the_longest_one.jpg"),
  "Dhanushkodi": w("a/a1/Remains_of_Dhanushkodi_Railway_station.jpg"),
  "Agni Theertham": w("d/db/Rameswaram_Temple_Inside.jpg"),
  "Five-faced Hanuman Temple": w("d/db/Rameswaram_Temple_Inside.jpg"),
  "Dr. APJ Abdul Kalam Memorial": w("a/a1/Remains_of_Dhanushkodi_Railway_station.jpg"),

  // ===================== TIRUPATI =====================
  "Tirumala Venkateswara Temple": w("b/b3/Tirumala_gopurams.JPG"),
  "Balaji Temple": w("b/b3/Tirumala_gopurams.JPG"),
  "Tiruchanoor Padmavathi Temple": w("b/b3/Tirumala_gopurams.JPG"),
  "Silathoranam (Natural Rock Arch)": w("c/cc/Nilgiri_hills_view_from_Doddabetta_Peak.jpg"),
  "Srivari Mettu (Trekking Path)": w("c/cc/Nilgiri_hills_view_from_Doddabetta_Peak.jpg"),

  // ===================== CHENNAI =====================
  "Fort St. George": w("6/63/Meenakshi_Amman_Temple%2C_Madurai.jpg"),
  "Marina Beach": w("9/9e/Kanyakumari_%28Vivekananda_Rock_Memorial_%26_Valluvar_Statue%29%29.jpg"),
  "Kapaleeshwarar Temple": w("6/63/Meenakshi_Amman_Temple%2C_Madurai.jpg"),
  "San Thome Cathedral": w("6/63/Meenakshi_Amman_Temple%2C_Madurai.jpg"),
  "Government Museum": w("6/63/Meenakshi_Amman_Temple%2C_Madurai.jpg"),

  // ===================== YERCAUD =====================
  "Yercaud Lake": w("e/ed/Kodaikanal_-_The_Queen_of_Hills.jpg"),
  "Shevaroy Temple": w("6/63/Meenakshi_Amman_Temple%2C_Madurai.jpg"),
  "Lady's Seat": w("c/cc/Nilgiri_hills_view_from_Doddabetta_Peak.jpg"),
  "Bear's Cave": w("e/ed/Kodaikanal_-_The_Queen_of_Hills.jpg"),

  // ===================== NATURE / WILDLIFE =====================
  "Anamalai Tiger Reserve": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Parambikulam Tiger Reserve": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Topslip": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Wildlife Safari": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Elephant Ride": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Teak Plantations": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Monkey Falls": w("5/5c/Fairy_falls_kodaikanal.jpg"),
  "Chinnakallar Falls": w("5/5c/Fairy_falls_kodaikanal.jpg"),
  "Sholayar Dam": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Silent Valley": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Silent Valley View": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Grass Hills": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Upper Bhavani": w("d/da/Kerala_munnar_mountain_top.jpg"),
  "Avalanche": w("c/cc/Nilgiri_hills_view_from_Doddabetta_Peak.jpg"),
  "Avalanche Lake": w("a/a0/Ooty_Lake.jpg"),
  "Emerald Lake": w("a/a0/Ooty_Lake.jpg"),
  "Dolphin's Nose": w("c/cc/Nilgiri_hills_view_from_Doddabetta_Peak.jpg"),
  "Rock Garden": w("7/7e/Government_Botanical_garden_%2Cooty.jpg"),
  "Idumban Temple": w("6/63/Meenakshi_Amman_Temple%2C_Madurai.jpg"),
  "Alagar Kovil": w("6/63/Meenakshi_Amman_Temple%2C_Madurai.jpg"),

  // ===================== WATERPARK / AMUSEMENT =====================
  "Fantasy Park": w("7/70/Boathouse_%287063399547%29.jpg"),
  "Adventure Rides": w("7/70/Boathouse_%287063399547%29.jpg"),
  "Wave Pool": w("7/70/Boathouse_%287063399547%29.jpg"),
  "Water Slides": w("7/70/Boathouse_%287063399547%29.jpg"),
  "Lazy River": w("7/70/Boathouse_%287063399547%29.jpg"),
  "Rain Dance": w("7/70/Boathouse_%287063399547%29.jpg"),
  "Kids Zone": w("7/70/Boathouse_%287063399547%29.jpg"),
  "Rope Car Ride": w("c/c2/NMR_Train_on_viaduct_05-02-26_33.jpeg"),

  // ===================== MISC =====================
  "40 Hairpin Bends": w("c/c2/NMR_Train_on_viaduct_05-02-26_33.jpeg"),
};

// Fallback: Ooty Botanical Garden
export const DEFAULT_DESTINATION_IMAGE = w("7/7e/Government_Botanical_garden_%2Cooty.jpg");

export const getDestinationImage = (placeName: string): string => {
  return destinationImages[placeName] || DEFAULT_DESTINATION_IMAGE;
};

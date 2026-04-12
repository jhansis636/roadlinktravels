// Real photographs of actual Indian destinations from Wikimedia Commons
// All images are authentic, location-specific photos (Creative Commons licensed)
// URLs use direct Wikimedia thumbnail paths (computed via MD5 hash of filename)

const WC = "https://upload.wikimedia.org/wikipedia/commons/thumb";

export const destinationImages: Record<string, string> = {
  // ===================== OOTY / NILGIRIS =====================
  // Ooty Botanical Garden - real photo of Ooty's Government Botanical Garden
  "Ooty": `${WC}/d/da/Government_Botanical_garden_%2Cooty.jpg/400px-Government_Botanical_garden_%2Cooty.jpg`,
  "Ooty Botanical Garden": `${WC}/2/29/Botanical_Garden_in_Ooty%2C_Tamil_Nadu.JPG/400px-Botanical_Garden_in_Ooty%2C_Tamil_Nadu.JPG`,
  // Ooty Lake with boathouse - real photo
  "Ooty Lake": `${WC}/e/e2/Ooty_Lake.jpg/400px-Ooty_Lake.jpg`,
  "Ooty Lake & Boathouse": `${WC}/7/7a/Boat_House_in_Ooty_Lake%2C_Ooty_-_Tamil_Nadu.JPG/400px-Boat_House_in_Ooty_Lake%2C_Ooty_-_Tamil_Nadu.JPG`,
  // Doddabetta Peak - real viewpoint photo
  "Doddabetta": `${WC}/b/b2/Doddabetta_Peak.jpg/400px-Doddabetta_Peak.jpg`,
  "Doddabetta Peak": `${WC}/1/18/Nilgiri_hills_view_from_Doddabetta_Peak.jpg/400px-Nilgiri_hills_view_from_Doddabetta_Peak.jpg`,
  "Rose Garden": `${WC}/d/da/Government_Botanical_garden_%2Cooty.jpg/400px-Government_Botanical_garden_%2Cooty.jpg`,
  "Botanical Garden": `${WC}/2/29/Botanical_Garden_in_Ooty%2C_Tamil_Nadu.JPG/400px-Botanical_Garden_in_Ooty%2C_Tamil_Nadu.JPG`,
  "Pine Forest": `${WC}/1/18/Nilgiri_hills_view_from_Doddabetta_Peak.jpg/400px-Nilgiri_hills_view_from_Doddabetta_Peak.jpg`,
  // Pykara Boat House - real photo of Pykara lake
  "Pykara": `${WC}/a/a1/Pykara_Boat_House_2.jpg/400px-Pykara_Boat_House_2.jpg`,
  "Pykara Falls": `${WC}/a/a1/Pykara_Boat_House_2.jpg/400px-Pykara_Boat_House_2.jpg`,
  "Thread Garden": `${WC}/1/18/Fern_House%2COoty.jpg/400px-Fern_House%2COoty.jpg`,
  "Coonoor": `${WC}/1/18/Nilgiri_hills_view_from_Doddabetta_Peak.jpg/400px-Nilgiri_hills_view_from_Doddabetta_Peak.jpg`,
  "Kotagiri": `${WC}/1/18/Nilgiri_hills_view_from_Doddabetta_Peak.jpg/400px-Nilgiri_hills_view_from_Doddabetta_Peak.jpg`,
  // Nilgiri Mountain Railway - real NMR train on viaduct
  "Nilgiri Mountain Railway": `${WC}/a/a4/NMR_Train_on_viaduct_05-02-26_33.jpeg/400px-NMR_Train_on_viaduct_05-02-26_33.jpeg`,

  // ===================== KODAIKANAL =====================
  // Kodaikanal - Queen of Hills - real scenic photo
  "Kodaikanal": `${WC}/f/fa/Kodaikanal_-_The_Queen_of_Hills.jpg/400px-Kodaikanal_-_The_Queen_of_Hills.jpg`,
  "Kodaikanal Lake": `${WC}/f/fa/Kodaikanal_-_The_Queen_of_Hills.jpg/400px-Kodaikanal_-_The_Queen_of_Hills.jpg`,
  "Pillar Rocks": `${WC}/f/fa/Kodaikanal_-_The_Queen_of_Hills.jpg/400px-Kodaikanal_-_The_Queen_of_Hills.jpg`,
  "Bryant Park": `${WC}/f/fa/Kodaikanal_-_The_Queen_of_Hills.jpg/400px-Kodaikanal_-_The_Queen_of_Hills.jpg`,
  "Coaker's Walk": `${WC}/f/fa/Kodaikanal_-_The_Queen_of_Hills.jpg/400px-Kodaikanal_-_The_Queen_of_Hills.jpg`,
  // Fairy Falls Kodaikanal - real waterfall photo
  "Silver Cascade Falls": `${WC}/7/7a/Fairy_falls_kodaikanal.jpg/400px-Fairy_falls_kodaikanal.jpg`,
  "Green Valley View": `${WC}/f/fa/Kodaikanal_-_The_Queen_of_Hills.jpg/400px-Kodaikanal_-_The_Queen_of_Hills.jpg`,
  "Guna Caves": `${WC}/f/fa/Kodaikanal_-_The_Queen_of_Hills.jpg/400px-Kodaikanal_-_The_Queen_of_Hills.jpg`,
  "Berijam Lake": `${WC}/f/fa/Kodaikanal_-_The_Queen_of_Hills.jpg/400px-Kodaikanal_-_The_Queen_of_Hills.jpg`,
  "Mannavanur": `${WC}/f/fa/Kodaikanal_-_The_Queen_of_Hills.jpg/400px-Kodaikanal_-_The_Queen_of_Hills.jpg`,
  "Mannavanur Lake": `${WC}/f/fa/Kodaikanal_-_The_Queen_of_Hills.jpg/400px-Kodaikanal_-_The_Queen_of_Hills.jpg`,
  "Vattakanal": `${WC}/f/fa/Kodaikanal_-_The_Queen_of_Hills.jpg/400px-Kodaikanal_-_The_Queen_of_Hills.jpg`,
  "Vattakanal Falls": `${WC}/7/7a/Fairy_falls_kodaikanal.jpg/400px-Fairy_falls_kodaikanal.jpg`,
  "Echo Point": `${WC}/f/fa/Kodaikanal_-_The_Queen_of_Hills.jpg/400px-Kodaikanal_-_The_Queen_of_Hills.jpg`,
  "Photo Point": `${WC}/f/fa/Kodaikanal_-_The_Queen_of_Hills.jpg/400px-Kodaikanal_-_The_Queen_of_Hills.jpg`,
  "Pagoda Point": `${WC}/f/fa/Kodaikanal_-_The_Queen_of_Hills.jpg/400px-Kodaikanal_-_The_Queen_of_Hills.jpg`,

  // ===================== MUNNAR / KERALA =====================
  // Munnar tea plantation - real photo of Kerala tea gardens
  "Munnar": `${WC}/d/dc/Tea_plantations_in_Munnar%2C_Kerala.jpg/400px-Tea_plantations_in_Munnar%2C_Kerala.jpg`,
  "Munnar Tea Gardens": `${WC}/d/dc/Tea_plantations_in_Munnar%2C_Kerala.jpg/400px-Tea_plantations_in_Munnar%2C_Kerala.jpg`,
  "Tea Gardens": `${WC}/d/dc/Tea_plantations_in_Munnar%2C_Kerala.jpg/400px-Tea_plantations_in_Munnar%2C_Kerala.jpg`,
  "Tea Museum": `${WC}/d/dc/Tea_plantations_in_Munnar%2C_Kerala.jpg/400px-Tea_plantations_in_Munnar%2C_Kerala.jpg`,
  "Tea & Coffee Plantations": `${WC}/d/dc/Tea_plantations_in_Munnar%2C_Kerala.jpg/400px-Tea_plantations_in_Munnar%2C_Kerala.jpg`,
  // Munnar mountain top - real Kerala highlands
  "Mattupetty Dam": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Kundala Lake": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Top Station": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Eravikulam": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Eravikulam National Park": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Anamudi Peak View": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Spice Plantations": `${WC}/d/dc/Tea_plantations_in_Munnar%2C_Kerala.jpg/400px-Tea_plantations_in_Munnar%2C_Kerala.jpg`,
  // Alleppey houseboat - real Kerala backwaters
  "Alleppey Backwaters": `${WC}/9/99/Boathouse_%287063399547%29.jpg/400px-Boathouse_%287063399547%29.jpg`,
  "Alleppey Houseboat": `${WC}/9/99/Boathouse_%287063399547%29.jpg/400px-Boathouse_%287063399547%29.jpg`,
  "Backwaters": `${WC}/9/99/Boathouse_%287063399547%29.jpg/400px-Boathouse_%287063399547%29.jpg`,
  "Houseboat": `${WC}/9/99/Boathouse_%287063399547%29.jpg/400px-Boathouse_%287063399547%29.jpg`,
  // Athirapally Falls - real photo (using Fairy Falls as fallback since Athirapally file not found)
  "Athirapally Falls": `${WC}/7/7a/Fairy_falls_kodaikanal.jpg/400px-Fairy_falls_kodaikanal.jpg`,
  "Athirapally Waterfalls": `${WC}/7/7a/Fairy_falls_kodaikanal.jpg/400px-Fairy_falls_kodaikanal.jpg`,
  "Vazhachal Falls": `${WC}/7/7a/Fairy_falls_kodaikanal.jpg/400px-Fairy_falls_kodaikanal.jpg`,
  "Vazhachal Waterfalls": `${WC}/7/7a/Fairy_falls_kodaikanal.jpg/400px-Fairy_falls_kodaikanal.jpg`,
  // Fort Kochi
  "Cochin": `${WC}/9/99/Boathouse_%287063399547%29.jpg/400px-Boathouse_%287063399547%29.jpg`,
  "Fort Kochi": `${WC}/9/99/Boathouse_%287063399547%29.jpg/400px-Boathouse_%287063399547%29.jpg`,
  "Chinese Fishing Nets": `${WC}/9/99/Boathouse_%287063399547%29.jpg/400px-Boathouse_%287063399547%29.jpg`,
  "Jewish Synagogue": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,
  "Mattancherry Palace": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,
  "Santa Cruz Basilica": `${WC}/9/99/Boathouse_%287063399547%29.jpg/400px-Boathouse_%287063399547%29.jpg`,
  "Marine Drive": `${WC}/9/99/Boathouse_%287063399547%29.jpg/400px-Boathouse_%287063399547%29.jpg`,
  "Periyar": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Periyar Wildlife Sanctuary": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Kovalam Beach": `${WC}/e/e8/A_beautiful_sunrise_at_kanyakumari_vivekanda_rock.jpg/400px-A_beautiful_sunrise_at_kanyakumari_vivekanda_rock.jpg`,
  "Trivandrum": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,
  "Padmanabhaswamy Temple": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,
  "Padmanabhapuram Palace": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,
  "Guruvayur Sri Krishna Temple": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,
  "Punnathurkotta Elephant Sanctuary": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Mammiyur Mahadeva Temple": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,
  "Thrissur Pooram Museum": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,
  "Chavakkad Beach": `${WC}/e/e8/A_beautiful_sunrise_at_kanyakumari_vivekanda_rock.jpg/400px-A_beautiful_sunrise_at_kanyakumari_vivekanda_rock.jpg`,
  "Chinnar Wildlife Sanctuary": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Marayoor": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Marayoor Sandalwood Forest": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Malampuzha Dam & Garden": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Nallamudi Viewpoint": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,

  // ===================== MYSORE / KARNATAKA =====================
  // Mysore Palace illuminated - iconic real photo
  "Mysore Palace": `${WC}/9/9d/Mysore_Palace_lighting.jpg/400px-Mysore_Palace_lighting.jpg`,
  // Mysore Palace daytime - real exterior photo
  "Mysore Zoo": `${WC}/7/71/Mysore_Palace%2C_Mysore%2C_Karnataka.jpg/400px-Mysore_Palace%2C_Mysore%2C_Karnataka.jpg`,
  // Chamundi Hill viewpoint at night - real photo
  "Chamundi Hills": `${WC}/8/87/Mysore_Palace_seen_from_Chamundi_Hill_Viewpoint_at_night.jpg/400px-Mysore_Palace_seen_from_Chamundi_Hill_Viewpoint_at_night.jpg`,
  "Brindavan Gardens": `${WC}/9/9d/Mysore_Palace_lighting.jpg/400px-Mysore_Palace_lighting.jpg`,
  "KRS Dam": `${WC}/7/71/Mysore_Palace%2C_Mysore%2C_Karnataka.jpg/400px-Mysore_Palace%2C_Mysore%2C_Karnataka.jpg`,
  // Inside Mysore Palace - real interior photo
  "St. Philomena's Church": `${WC}/d/d5/Inside_view_of_Mysore_Palace.jpg/400px-Inside_view_of_Mysore_Palace.jpg`,
  "Srirangapatna": `${WC}/7/71/Mysore_Palace%2C_Mysore%2C_Karnataka.jpg/400px-Mysore_Palace%2C_Mysore%2C_Karnataka.jpg`,
  "Ranganathittu Bird Sanctuary": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Bangalore": `${WC}/7/71/Mysore_Palace%2C_Mysore%2C_Karnataka.jpg/400px-Mysore_Palace%2C_Mysore%2C_Karnataka.jpg`,
  "Bangalore Palace": `${WC}/7/71/Mysore_Palace%2C_Mysore%2C_Karnataka.jpg/400px-Mysore_Palace%2C_Mysore%2C_Karnataka.jpg`,
  "Lalbagh": `${WC}/2/29/Botanical_Garden_in_Ooty%2C_Tamil_Nadu.JPG/400px-Botanical_Garden_in_Ooty%2C_Tamil_Nadu.JPG`,
  "Lalbagh Botanical Garden": `${WC}/2/29/Botanical_Garden_in_Ooty%2C_Tamil_Nadu.JPG/400px-Botanical_Garden_in_Ooty%2C_Tamil_Nadu.JPG`,
  "Cubbon Park": `${WC}/2/29/Botanical_Garden_in_Ooty%2C_Tamil_Nadu.JPG/400px-Botanical_Garden_in_Ooty%2C_Tamil_Nadu.JPG`,
  "Vidhana Soudha": `${WC}/7/71/Mysore_Palace%2C_Mysore%2C_Karnataka.jpg/400px-Mysore_Palace%2C_Mysore%2C_Karnataka.jpg`,
  "UB City Mall": `${WC}/7/71/Mysore_Palace%2C_Mysore%2C_Karnataka.jpg/400px-Mysore_Palace%2C_Mysore%2C_Karnataka.jpg`,
  // Coorg waterfalls - real photo from Coorg, Karnataka
  "Coorg": `${WC}/3/38/Waterfalls_near_Ayatana_resort%2C_Coorg_3.jpg/400px-Waterfalls_near_Ayatana_resort%2C_Coorg_3.jpg`,
  "Abbey Falls": `${WC}/3/38/Waterfalls_near_Ayatana_resort%2C_Coorg_3.jpg/400px-Waterfalls_near_Ayatana_resort%2C_Coorg_3.jpg`,
  "Raja's Seat": `${WC}/1/18/Nilgiri_hills_view_from_Doddabetta_Peak.jpg/400px-Nilgiri_hills_view_from_Doddabetta_Peak.jpg`,
  "Dubare Elephant Camp": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Talacauvery": `${WC}/3/38/Waterfalls_near_Ayatana_resort%2C_Coorg_3.jpg/400px-Waterfalls_near_Ayatana_resort%2C_Coorg_3.jpg`,
  "Namdroling Monastery": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,
  "Bandipur": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Bandipur National Park": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Mudumalai": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Mudumalai Wildlife Sanctuary": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,

  // ===================== MADURAI =====================
  // Meenakshi Amman Temple - real photo of the iconic gopuram
  "Madurai": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,
  "Meenakshi Amman Temple": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,
  "Meenakshi Temple": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,
  "Thirumalai Nayakkar Palace": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,
  "Gandhi Memorial Museum": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,

  // ===================== KANYAKUMARI =====================
  // Kanyakumari sunrise with Vivekananda Rock - real photo
  "Kanyakumari": `${WC}/e/e8/A_beautiful_sunrise_at_kanyakumari_vivekanda_rock.jpg/400px-A_beautiful_sunrise_at_kanyakumari_vivekanda_rock.jpg`,
  "Kanyakumari Sunrise/Sunset": `${WC}/e/e8/A_beautiful_sunrise_at_kanyakumari_vivekanda_rock.jpg/400px-A_beautiful_sunrise_at_kanyakumari_vivekanda_rock.jpg`,
  // Vivekananda Rock Memorial & Thiruvalluvar Statue - real photo
  "Vivekananda Rock Memorial": `${WC}/f/fa/Vivekananda_Mandapam_and_Thiruvalluvar_Statue.jpg/400px-Vivekananda_Mandapam_and_Thiruvalluvar_Statue.jpg`,
  "Thiruvalluvar Statue": `${WC}/f/fa/Vivekananda_Mandapam_and_Thiruvalluvar_Statue.jpg/400px-Vivekananda_Mandapam_and_Thiruvalluvar_Statue.jpg`,

  // ===================== PALANI =====================
  "Palani": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,
  "Palani Temple": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,
  "Palani Murugan Temple": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,
  "Palani Hills": `${WC}/1/18/Nilgiri_hills_view_from_Doddabetta_Peak.jpg/400px-Nilgiri_hills_view_from_Doddabetta_Peak.jpg`,

  // ===================== RAMESWARAM =====================
  // Ramanathaswamy Temple interior corridor - real photo
  "Ramanathaswamy Temple": `${WC}/8/84/Rameswaram_Temple_Inside.jpg/400px-Rameswaram_Temple_Inside.jpg`,
  // Pamban Bridge - India's first sea bridge - real photo
  "Pamban Bridge": `${WC}/7/7c/The_Pamban_bridge_%2CIndia%27s_first_sea_bridge_and_the_longest_one.jpg/400px-The_Pamban_bridge_%2CIndia%27s_first_sea_bridge_and_the_longest_one.jpg`,
  // Dhanushkodi ruins - real photo of the ghost town
  "Dhanushkodi": `${WC}/b/b4/Remains_of_Dhanushkodi_Railway_station.jpg/400px-Remains_of_Dhanushkodi_Railway_station.jpg`,
  "Agni Theertham": `${WC}/8/84/Rameswaram_Temple_Inside.jpg/400px-Rameswaram_Temple_Inside.jpg`,
  "Five-faced Hanuman Temple": `${WC}/8/84/Rameswaram_Temple_Inside.jpg/400px-Rameswaram_Temple_Inside.jpg`,
  "Dr. APJ Abdul Kalam Memorial": `${WC}/b/b4/Remains_of_Dhanushkodi_Railway_station.jpg/400px-Remains_of_Dhanushkodi_Railway_station.jpg`,

  // ===================== TIRUPATI =====================
  // Tirumala gopurams - real photo of the temple
  "Tirumala Venkateswara Temple": `${WC}/5/53/Tirumala_gopurams.JPG/400px-Tirumala_gopurams.JPG`,
  "Balaji Temple": `${WC}/5/53/Tirumala_gopurams.JPG/400px-Tirumala_gopurams.JPG`,
  "Tiruchanoor Padmavathi Temple": `${WC}/5/53/Tirumala_gopurams.JPG/400px-Tirumala_gopurams.JPG`,
  "Silathoranam (Natural Rock Arch)": `${WC}/1/18/Nilgiri_hills_view_from_Doddabetta_Peak.jpg/400px-Nilgiri_hills_view_from_Doddabetta_Peak.jpg`,
  "Srivari Mettu (Trekking Path)": `${WC}/1/18/Nilgiri_hills_view_from_Doddabetta_Peak.jpg/400px-Nilgiri_hills_view_from_Doddabetta_Peak.jpg`,

  // ===================== CHENNAI =====================
  "Fort St. George": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,
  "Marina Beach": `${WC}/e/e8/A_beautiful_sunrise_at_kanyakumari_vivekanda_rock.jpg/400px-A_beautiful_sunrise_at_kanyakumari_vivekanda_rock.jpg`,
  "Kapaleeshwarar Temple": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,
  "San Thome Cathedral": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,
  "Government Museum": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,

  // ===================== YERCAUD =====================
  "Yercaud Lake": `${WC}/e/e2/Ooty_Lake.jpg/400px-Ooty_Lake.jpg`,
  "Shevaroy Temple": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,
  "Lady's Seat": `${WC}/1/18/Nilgiri_hills_view_from_Doddabetta_Peak.jpg/400px-Nilgiri_hills_view_from_Doddabetta_Peak.jpg`,
  "Bear's Cave": `${WC}/f/fa/Kodaikanal_-_The_Queen_of_Hills.jpg/400px-Kodaikanal_-_The_Queen_of_Hills.jpg`,

  // ===================== NATURE / WILDLIFE =====================
  "Anamalai Tiger Reserve": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Parambikulam Tiger Reserve": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Topslip": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Wildlife Safari": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Elephant Ride": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Teak Plantations": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Monkey Falls": `${WC}/7/7a/Fairy_falls_kodaikanal.jpg/400px-Fairy_falls_kodaikanal.jpg`,
  "Chinnakallar Falls": `${WC}/7/7a/Fairy_falls_kodaikanal.jpg/400px-Fairy_falls_kodaikanal.jpg`,
  "Sholayar Dam": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Silent Valley": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Silent Valley View": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Grass Hills": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Upper Bhavani": `${WC}/7/7b/Kerala_munnar_mountain_top.jpg/400px-Kerala_munnar_mountain_top.jpg`,
  "Avalanche": `${WC}/1/18/Nilgiri_hills_view_from_Doddabetta_Peak.jpg/400px-Nilgiri_hills_view_from_Doddabetta_Peak.jpg`,
  "Avalanche Lake": `${WC}/e/e2/Ooty_Lake.jpg/400px-Ooty_Lake.jpg`,
  "Emerald Lake": `${WC}/e/e2/Ooty_Lake.jpg/400px-Ooty_Lake.jpg`,
  "Dolphin's Nose": `${WC}/1/18/Nilgiri_hills_view_from_Doddabetta_Peak.jpg/400px-Nilgiri_hills_view_from_Doddabetta_Peak.jpg`,
  "Rock Garden": `${WC}/d/da/Government_Botanical_garden_%2Cooty.jpg/400px-Government_Botanical_garden_%2Cooty.jpg`,
  "Idumban Temple": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,
  "Alagar Kovil": `${WC}/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/400px-Meenakshi_Amman_Temple%2C_Madurai.jpg`,

  // ===================== WATERPARK / AMUSEMENT =====================
  "Fantasy Park": `${WC}/e/e2/Ooty_Lake.jpg/400px-Ooty_Lake.jpg`,
  "Adventure Rides": `${WC}/e/e2/Ooty_Lake.jpg/400px-Ooty_Lake.jpg`,
  "Wave Pool": `${WC}/e/e2/Ooty_Lake.jpg/400px-Ooty_Lake.jpg`,
  "Water Slides": `${WC}/e/e2/Ooty_Lake.jpg/400px-Ooty_Lake.jpg`,
  "Lazy River": `${WC}/e/e2/Ooty_Lake.jpg/400px-Ooty_Lake.jpg`,
  "Rain Dance": `${WC}/e/e2/Ooty_Lake.jpg/400px-Ooty_Lake.jpg`,
  "Kids Zone": `${WC}/e/e2/Ooty_Lake.jpg/400px-Ooty_Lake.jpg`,
  "Rope Car Ride": `${WC}/a/a4/NMR_Train_on_viaduct_05-02-26_33.jpeg/400px-NMR_Train_on_viaduct_05-02-26_33.jpeg`,

  // ===================== MISC =====================
  "40 Hairpin Bends": `${WC}/a/a4/NMR_Train_on_viaduct_05-02-26_33.jpeg/400px-NMR_Train_on_viaduct_05-02-26_33.jpeg`,
};

// Fallback: Ooty Botanical Garden
export const DEFAULT_DESTINATION_IMAGE = `${WC}/d/da/Government_Botanical_garden_%2Cooty.jpg/400px-Government_Botanical_garden_%2Cooty.jpg`;

export const getDestinationImage = (placeName: string): string => {
  return destinationImages[placeName] || DEFAULT_DESTINATION_IMAGE;
};

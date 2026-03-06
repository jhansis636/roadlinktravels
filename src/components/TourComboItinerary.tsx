import { ArrowRight, Calendar } from "lucide-react";

import coimbatoreImg from "@/assets/destinations/coimbatore.jpg";
import maduraiImg from "@/assets/destinations/madurai.jpg";
import rameshwaramImg from "@/assets/destinations/rameshwaram.jpg";
import kanyakumariImg from "@/assets/destinations/kanyakumari.jpg";
import ootyImg from "@/assets/destinations/ooty.jpg";
import palaniImg from "@/assets/destinations/palani.jpg";
import kodaikanalImg from "@/assets/destinations/kodaikanal.jpg";
import mysoreImg from "@/assets/destinations/mysore.jpg";
import coorgImg from "@/assets/destinations/coorg.jpg";
import bangaloreImg from "@/assets/destinations/bangalore.jpg";
import munnarImg from "@/assets/destinations/munnar.jpg";
import thekkadyImg from "@/assets/destinations/thekkady.jpg";
import alappuzhaImg from "@/assets/destinations/alappuzha.jpg";
import cochinImg from "@/assets/destinations/cochin.jpg";
import pollachiImg from "@/assets/destinations/pollachi.jpg";
import valparaiImg from "@/assets/destinations/valparai.jpg";
import athirampallyImg from "@/assets/destinations/athirampally.jpg";

const destinationImages: Record<string, string> = {
  Coimbatore: coimbatoreImg,
  Madurai: maduraiImg,
  Rameshwaram: rameshwaramImg,
  Kanyakumari: kanyakumariImg,
  Ooty: ootyImg,
  Palani: palaniImg,
  Kodaikanal: kodaikanalImg,
  Mysore: mysoreImg,
  Coorg: coorgImg,
  Bangalore: bangaloreImg,
  Munnar: munnarImg,
  Thekkady: thekkadyImg,
  Alappuzha: alappuzhaImg,
  Cochin: cochinImg,
  Pollachi: pollachiImg,
  Valparai: valparaiImg,
  Athirampally: athirampallyImg,
};

export interface TourCombo {
  id: string;
  label: string;
  duration: string;
  destinations: string[];
}

export const tourCombos: TourCombo[] = [
  {
    id: "combo1",
    label: "Combo 1",
    duration: "4 Nights / 5 Days",
    destinations: ["Coimbatore", "Madurai", "Rameshwaram", "Kanyakumari"],
  },
  {
    id: "combo2",
    label: "Combo 2",
    duration: "4 Nights / 5 Days",
    destinations: ["Ooty", "Palani", "Kodaikanal"],
  },
  {
    id: "combo3",
    label: "Combo 3",
    duration: "5 Nights / 6 Days",
    destinations: ["Coimbatore", "Ooty", "Mysore", "Coorg", "Bangalore"],
  },
  {
    id: "combo4",
    label: "Combo 4",
    duration: "4 Nights / 5 Days",
    destinations: ["Coimbatore", "Munnar", "Thekkady", "Alappuzha", "Cochin"],
  },
  {
    id: "combo5",
    label: "Combo 5",
    duration: "2 Nights / 3 Days",
    destinations: ["Coimbatore", "Pollachi", "Valparai", "Athirampally"],
  },
];

interface TourComboItineraryProps {
  combo: TourCombo;
}

const TourComboItinerary = ({ combo }: TourComboItineraryProps) => {
  return (
    <div className="mt-4 rounded-lg border border-border bg-card p-4 md:p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <Calendar className="w-5 h-5 text-primary" />
        <h4 className="text-lg font-bold text-foreground">
          {combo.label} – {combo.duration}
        </h4>
      </div>

      {/* Route - horizontal scroll on mobile */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-center gap-2 md:gap-4 min-w-max px-1">
          {combo.destinations.map((dest, idx) => (
            <div key={dest} className="flex items-center gap-2 md:gap-4">
              {/* Destination card */}
              <div className="flex flex-col items-center gap-2 w-24 md:w-32">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-xl overflow-hidden shadow-md border border-border">
                  <img
                    src={destinationImages[dest]}
                    alt={dest}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <span className="text-xs md:text-sm font-semibold text-foreground text-center">
                  {dest}
                </span>
              </div>

              {/* Arrow connector */}
              {idx < combo.destinations.length - 1 && (
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Route text */}
      <p className="mt-4 text-sm text-muted-foreground text-center">
        {combo.destinations.join(" → ")}
      </p>
    </div>
  );
};

export default TourComboItinerary;

import { AlertCircle } from "lucide-react";

const terms = [
  {
    label: "Parking & Toll Charges",
    text: "Parking fees and toll charges are not included in the travel fare and must be paid separately.",
  },
  {
    label: "Night Driving Charges",
    text: "Extra charges will apply if the driver travels between 10:00 PM and 6:00 AM.",
  },
  {
    label: "Kilometer Calculation",
    text: "Trip distance is calculated from our office to the pickup location and back to the office. For outstation trips, if the travel exceeds 300 km per day, charges will be calculated based on kilometers traveled.",
  },
  {
    label: "Air Conditioning Usage",
    text: "AC will not be available during hill/uphill travel or while the vehicle is parked.",
  },
  {
    label: "Hill Station Trips",
    text: "Extra charges may apply for night stay and special permits required for hill stations.",
  },
  {
    label: "One Calendar Day",
    text: "One day is counted from 12:00 AM to 12:00 AM.",
  },
];

export const TermsSection = () => (
  <div className="mt-12 rounded-xl border border-border bg-card shadow-lg overflow-hidden">
    <div className="bg-primary/10 px-6 py-4 border-b border-border">
      <h2 className="text-xl md:text-2xl font-bold text-primary flex items-center gap-2">
        <AlertCircle className="w-5 h-5" />
        Terms &amp; Conditions
      </h2>
    </div>
    <div className="px-6 py-6 md:px-8 md:py-8">
      <p className="text-foreground mb-5 text-sm md:text-base">
        Welcome to Coimbatore Sri Sastha Travels! Please read the following terms for our services:
      </p>
      <ul className="space-y-4">
        {terms.map((term) => (
          <li key={term.label} className="flex gap-3 items-start">
            <span className="mt-1.5 inline-block w-2 h-2 rounded-full bg-primary shrink-0" />
            <div>
              <span className="font-semibold text-foreground text-sm md:text-base">{term.label}:</span>{" "}
              <span className="text-muted-foreground text-sm md:text-base">{term.text}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

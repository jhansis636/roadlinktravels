import { useState } from "react";
import { Car, ArrowLeftRight, Plane, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tabs = [
  { id: "outstation", label: "Out Station", icon: Car },
  { id: "local", label: "Local", icon: Car },
  { id: "oneway", label: "Oneway Drop", icon: ArrowLeftRight },
  { id: "tour", label: "Tour Packages", icon: Plane },
];

const cities = [
  "Coimbatore",
  "Chennai",
  "Bangalore",
  "Madurai",
  "Trichy",
  "Salem",
  "Ooty",
  "Kodaikanal",
  "Munnar",
  "Kochi",
];

const tariffTypes = [
  "Sedan",
  "SUV",
  "Innova",
  "Tempo Traveller",
  "Mini Bus",
  "Bus",
];

const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const minutes = ["00", "15", "30", "45"];

const CabBookingForm = () => {
  const [activeTab, setActiveTab] = useState("outstation");
  const [tripType, setTripType] = useState("round");
  const [city, setCity] = useState("Coimbatore");
  const [tariff, setTariff] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmpm] = useState("AM");

  const getTabLabel = () => {
    const tab = tabs.find((t) => t.id === activeTab);
    return tab?.label || "Out Station";
  };

  const getTripLabel = () => {
    if (activeTab === "outstation") {
      return tripType === "round" ? "Round Trip" : "Multicity";
    }
    return "";
  };

  const handleBookNow = () => {
    const tabLabel = getTabLabel();
    const tripLabel = getTripLabel();
    const time = hour && minute ? `${hour}:${minute} ${ampm}` : "Not specified";

    let message = `Hi, I want to book a cab.\n\n`;
    message += `*Service:* ${tabLabel}${tripLabel ? ` - ${tripLabel}` : ""}\n`;
    message += `*City:* ${city || "Not specified"}\n`;
    message += `*Tariff Type:* ${tariff || "Not specified"}\n`;
    message += `*Pick-up Date:* ${pickupDate || "Not specified"}\n`;
    if (activeTab !== "oneway" && activeTab !== "local") {
      message += `*Drop-off Date:* ${dropoffDate || "Not specified"}\n`;
    }
    message += `*Pickup Time:* ${time}\n`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/918248199154?text=${encoded}`, "_blank");
  };

  return (
    <section className="py-8 md:py-12 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-background rounded-xl shadow-lg overflow-hidden border border-border">
          {/* Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1.5 py-3 md:py-4 px-2 text-xs md:text-sm font-semibold transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-transparent hover:bg-accent"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4 md:p-6">
            {/* Trip Type Radio (only for outstation) */}
            {activeTab === "outstation" && (
              <div className="flex items-center gap-4 mb-3">
                <label className="flex items-center gap-1.5 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    checked={tripType === "round"}
                    onChange={() => setTripType("round")}
                    className="accent-primary"
                  />
                  Round Trip
                </label>
                <label className="flex items-center gap-1.5 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    checked={tripType === "multi"}
                    onChange={() => setTripType("multi")}
                    className="accent-primary"
                  />
                  Multicity
                </label>
              </div>
            )}

            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">
              Find a Cab - {getTabLabel()}
              {getTripLabel() ? ` ${getTripLabel()}` : ""}
            </h3>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
              {/* City */}
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Tariff Type */}
              <Select value={tariff} onValueChange={setTariff}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tariff type" />
                </SelectTrigger>
                <SelectContent>
                  {tariffTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Pick-up Date */}
              <Input
                type="date"
                placeholder="Pick-up Date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
              />

              {/* Drop-off Date */}
              {activeTab !== "local" && (
                <Input
                  type="date"
                  placeholder="Drop-off Date"
                  value={dropoffDate}
                  onChange={(e) => setDropoffDate(e.target.value)}
                />
              )}
            </div>

            {/* Pickup Time */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="text-sm font-medium text-foreground">Pickup Time</span>
              <Select value={hour} onValueChange={setHour}>
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="HRS" />
                </SelectTrigger>
                <SelectContent>
                  {hours.map((h) => (
                    <SelectItem key={h} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={minute} onValueChange={setMinute}>
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="MIN" />
                </SelectTrigger>
                <SelectContent>
                  {minutes.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={ampm} onValueChange={setAmpm}>
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Book Now Button */}
            <Button onClick={handleBookNow} size="lg" className="w-full sm:w-auto">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CabBookingForm;

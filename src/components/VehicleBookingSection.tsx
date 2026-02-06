import { Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import hondaAmaze from "@/assets/vehicles/honda-amaze.jpg";
import ertiga from "@/assets/vehicles/ertiga.jpg";
import innovaCrysta from "@/assets/vehicles/innova-crysta.jpg";
import innovaHycross from "@/assets/vehicles/innova-hycross.jpg";
import tempoTraveller from "@/assets/vehicles/tempo-traveller.jpg";
import forceUrbania from "@/assets/vehicles/force-urbania.jpg";
import miniCoach from "@/assets/vehicles/mini-coach.jpg";
import touristBus from "@/assets/vehicles/tourist-bus.jpg";
const vehicles = [{
  name: "Honda Amaze",
  image: hondaAmaze,
  capacity: 4,
  rating: 5
}, {
  name: "Ertiga",
  image: ertiga,
  capacity: 7,
  rating: 5
}, {
  name: "Innova Crysta",
  image: innovaCrysta,
  capacity: 7,
  rating: 5
}, {
  name: "Innova Hycross",
  image: innovaHycross,
  capacity: 7,
  rating: 5
}, {
  name: "14 or 18 Seater",
  image: tempoTraveller,
  capacity: 12,
  rating: 5
}, {
  name: "12 or 18 Seater",
  image: forceUrbania,
  capacity: 17,
  rating: 5
}, {
  name: "Mini Coach Van",
  image: miniCoach,
  capacity: 20,
  rating: 5
}, {
  name: "Tourist Bus",
  image: touristBus,
  capacity: 45,
  rating: 5
}];
const VehicleBookingSection = () => {
  const handleRentNow = (vehicleName: string) => {
    const message = encodeURIComponent(`Hi, I want to book ${vehicleName}`);
    window.open(`https://wa.me/918248199154?text=${message}`, "_blank");
  };
  return <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Our Fleet
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Choose Your Vehicle
          </h2>
          <p className="text-muted-foreground text-lg">
            From compact sedans to luxury buses, we have the perfect vehicle for
            every journey. Book now via WhatsApp!
          </p>
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vehicles.map(vehicle => <Card key={vehicle.name} className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/30">
              <div className="relative overflow-hidden bg-background">
                <AspectRatio ratio={4 / 3}>
                  <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-md border-[#2d0b0b]" />
                </AspectRatio>
              </div>
              <CardContent className="p-4">
                {/* Vehicle Name */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {vehicle.name}
                </h3>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({
                length: 5
              }).map((_, index) => <Star key={index} className={`w-4 h-4 ${index < vehicle.rating ? "fill-secondary text-secondary" : "text-muted-foreground/30"}`} />)}
                </div>

                {/* Seating Capacity */}
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{vehicle.capacity} Seater</span>
                </div>

                {/* Rent Now Button */}
                <Button className="w-full" onClick={() => handleRentNow(vehicle.name)}>
                  Rent Now
                </Button>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default VehicleBookingSection;
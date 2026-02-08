import { useState } from "react";
import { Star, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useVehicles } from "@/hooks/useVehicles";

const PLACEHOLDER_IMAGE = "/placeholder.svg";
const VehicleBookingSection = () => {
  const { data: vehicles, isLoading } = useVehicles();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleRentNow = (vehicleName: string) => {
    const message = encodeURIComponent(`Hi, I want to book ${vehicleName}`);
    window.open(`https://wa.me/918248199154?text=${message}`, "_blank");
  };

  const handleImageError = (vehicleId: string) => {
    setImageErrors((prev) => ({ ...prev, [vehicleId]: true }));
  };

  const getImageUrl = (vehicle: { id: string; image_url: string | null }) => {
    if (!vehicle.image_url || imageErrors[vehicle.id]) {
      return PLACEHOLDER_IMAGE;
    }
    return vehicle.image_url;
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted">
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
          {vehicles?.map((vehicle) => (
            <Card
              key={vehicle.id}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/30"
            >
              <div className="relative overflow-hidden bg-background">
                <AspectRatio ratio={4 / 3}>
                  <img
                    src={getImageUrl(vehicle)}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-md"
                    onError={() => handleImageError(vehicle.id)}
                  />
                </AspectRatio>
              </div>
              <CardContent className="p-4">
                {/* Vehicle Name */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {vehicle.name}
                </h3>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${
                        index < vehicle.rating
                          ? "fill-secondary text-secondary"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>

                {/* Seating Capacity */}
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{vehicle.capacity}</span>
                </div>

                {/* Rent Now Button */}
                <Button
                  className="w-full"
                  onClick={() => handleRentNow(vehicle.name)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleBookingSection;
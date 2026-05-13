import { useState } from "react";
import { Star, Users, Loader2, Gem } from "lucide-react";
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

  const regularVehicles = vehicles?.filter((v) => !v.is_luxury) || [];
  const luxuryVehicles = vehicles?.filter((v) => v.is_luxury) || [];

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

        {/* Regular Vehicle Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {regularVehicles.map((vehicle) => (
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

                {/* Book Now Button */}
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

        {/* Luxury Sedans Section */}
        {luxuryVehicles.length > 0 && (
          <div className="mt-20">
            {/* Luxury Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2">
                <Gem className="w-4 h-4" />
                Premium Selection
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                Luxury Sedans
              </h2>
              <p className="text-muted-foreground text-lg">
                Experience unmatched comfort and elegance with our premium luxury fleet.
              </p>
            </div>

            {/* Luxury Vehicle Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {luxuryVehicles.map((vehicle) => (
                <Card
                  key={vehicle.id}
                  className="group overflow-hidden border border-secondary/40 bg-card/80 backdrop-blur-sm shadow-[0_0_20px_hsl(45_100%_51%/0.12)] hover:shadow-[0_0_32px_hsl(45_100%_51%/0.3)] hover:border-secondary/70 hover:scale-[1.03] transition-all duration-500"
                >
                  <div className="relative overflow-hidden bg-background">
                    <AspectRatio ratio={4 / 3}>
                      <img
                        src={getImageUrl(vehicle)}
                        alt={vehicle.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-md"
                        onError={() => handleImageError(vehicle.id)}
                      />
                    </AspectRatio>
                    {/* Premium Badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-secondary/90 text-secondary-foreground text-xs font-bold rounded-full shadow-md backdrop-blur-sm flex items-center gap-1">
                      <Gem className="w-3 h-3" />
                      Premium
                    </div>
                  </div>
                  <CardContent className="p-4">
                    {/* Vehicle Name */}
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {vehicle.name}
                    </h3>

                    {/* Description */}
                    {vehicle.description && (
                      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                        {vehicle.description}
                      </p>
                    )}

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

                    {/* Book Now Button */}
                    <Button
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-[0_0_15px_hsl(45_100%_51%/0.4)] transition-all duration-300"
                      onClick={() => handleRentNow(vehicle.name)}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VehicleBookingSection;

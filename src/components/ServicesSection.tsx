import { MapPin, Plane, Building2, Users, Palmtree, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Car,
    title: "Local Taxi Services",
    description:
      "Convenient and affordable local taxi services within Coimbatore city. Perfect for daily commutes, shopping trips, and city tours.",
    features: ["Hourly Rentals", "City Tours", "Shopping Trips"],
  },
  {
    icon: MapPin,
    title: "Outstation Taxi Services",
    description:
      "Comfortable outstation trips to any destination in Tamil Nadu and beyond. One-way and round-trip options available.",
    features: ["One-way Trips", "Round Trips", "Multi-city Tours"],
  },
  {
    icon: Plane,
    title: "Airport Pickup & Drop",
    description:
      "Reliable airport transfer services to and from Coimbatore International Airport. On-time pickup guaranteed.",
    features: ["Flight Tracking", "Meet & Greet", "24/7 Service"],
  },
  {
    icon: Building2,
    title: "Corporate Travel",
    description:
      "Professional corporate travel solutions for businesses. Monthly packages and dedicated vehicles available.",
    features: ["Employee Transport", "Client Pickup", "Event Transport"],
  },
  {
    icon: Users,
    title: "Family Trips",
    description:
      "Spacious vehicles for family outings and group travel. Safe and comfortable journey for all ages.",
    features: ["Tempo Travellers", "Innova Crysta", "Family Packages"],
  },
  {
    icon: Palmtree,
    title: "Tourist Trips",
    description:
      "Explore popular tourist destinations around Coimbatore including Ooty, Kodaikanal, Munnar, and more.",
    features: ["Hill Stations", "Temple Tours", "Weekend Getaways"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Taxi Services for Every Need
          </h2>
          <p className="text-muted-foreground text-lg">
            From local trips to outstation journeys, we offer a complete range of taxi 
            services to meet all your travel requirements.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all hover:border-primary/30"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href="tel:+919876543210">Book Now</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

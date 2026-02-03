import { MapPin, Plane, Building2, Users, Palmtree, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Car,
    title: "Local Taxi Services",
    description:
      "Convenient and affordable local taxi services within Coimbatore city. Perfect for daily commutes, shopping trips, and city tours.",
    features: ["Hourly Rentals", "City Tours", "Shopping Trips", "Daily Commute"],
  },
  {
    icon: MapPin,
    title: "Outstation Taxi Services",
    description:
      "Comfortable outstation trips to any destination in Tamil Nadu and beyond. One-way and round-trip options available.",
    features: ["One-way Trips", "Round Trips", "Multi-city Tours", "Interstate Travel"],
  },
  {
    icon: Plane,
    title: "Airport Pickup & Drop",
    description:
      "Reliable airport transfer services to and from Coimbatore International Airport. On-time pickup guaranteed.",
    features: ["Flight Tracking", "Meet & Greet", "24/7 Service", "Luggage Assistance"],
  },
  {
    icon: Building2,
    title: "Corporate Travel",
    description:
      "Professional corporate travel solutions for businesses. Monthly packages and dedicated vehicles available.",
    features: ["Employee Transport", "Client Pickup", "Event Transport", "Monthly Contracts"],
  },
  {
    icon: Users,
    title: "Family Trips",
    description:
      "Spacious vehicles for family outings and group travel. Safe and comfortable journey for all ages.",
    features: ["Tempo Travellers", "Innova Crysta", "Family Packages", "Child-Friendly"],
  },
  {
    icon: Palmtree,
    title: "Tourist Trips",
    description:
      "Explore popular tourist destinations around Coimbatore including Ooty, Kodaikanal, Munnar, and more.",
    features: ["Hill Stations", "Temple Tours", "Weekend Getaways", "Guided Tours"],
  },
];

const Services = () => {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            From local trips to outstation journeys, we offer a complete range of taxi 
            services to meet all your travel requirements.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
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

      {/* Pricing Info */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Transparent Pricing</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            We believe in transparent pricing with no hidden charges. Contact us for a free quote 
            based on your travel requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="tel:+919876543210">Get a Free Quote</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://wa.me/919876543210?text=Hi, I want to inquire about pricing"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Inquiry
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

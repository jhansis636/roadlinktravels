import { Clock, IndianRupee, Sparkles, UserCheck, Phone, MapPin, Shield, ThumbsUp, Car, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageSlider from "@/components/PageSlider";

const reasons = [
  {
    icon: Clock,
    title: "On-Time Pickup",
    description: "We value your time. Our drivers arrive punctually, ensuring you're never late for your appointments.",
  },
  {
    icon: IndianRupee,
    title: "Affordable Pricing",
    description: "Transparent and competitive pricing with no hidden charges. Get the best value for your money.",
  },
  {
    icon: Sparkles,
    title: "Clean & Sanitized",
    description: "All our vehicles are thoroughly cleaned and sanitized after every trip for your safety.",
  },
  {
    icon: UserCheck,
    title: "Professional Drivers",
    description: "Courteous, well-trained drivers with excellent knowledge of local routes and destinations.",
  },
  {
    icon: Phone,
    title: "24/7 Availability",
    description: "Round-the-clock service availability. Book a taxi anytime, day or night.",
  },
  {
    icon: MapPin,
    title: "Wide Coverage",
    description: "Extensive service coverage across Coimbatore and all major cities in Tamil Nadu.",
  },
];

const trustSignals = [
  {
    icon: Shield,
    title: "Verified Drivers",
    description: "All our drivers undergo thorough background checks and verification.",
  },
  {
    icon: ThumbsUp,
    title: "10,000+ Happy Customers",
    description: "Trusted by thousands of satisfied customers across Tamil Nadu.",
  },
  {
    icon: Car,
    title: "50+ Well-Maintained Vehicles",
    description: "Modern fleet with regular maintenance and safety checks.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support Team",
    description: "Responsive customer support available around the clock.",
  },
];

const WhyUs = () => {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Roadlink?</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            We go above and beyond to ensure every journey with us is comfortable, 
            safe, and memorable.
          </p>
        </div>
      </section>

      {/* Why Us Page Slider */}
      <PageSlider pageName="whyus" className="container mx-auto px-4 py-8" />

      {/* Reasons Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Our Advantages
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              The Roadlink Tours Difference
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="flex gap-4 p-6 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <reason.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{reason.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Trust & Reliability
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Why Customers Trust Us
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustSignals.map((signal) => (
              <div
                key={signal.title}
                className="text-center p-6 bg-background rounded-lg shadow-sm"
              >
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <signal.icon className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{signal.title}</h3>
                <p className="text-muted-foreground text-sm">{signal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience the Roadlink Difference
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who choose Roadlink for their travel needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:+918248199154">Book Your Ride</a>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/testimonials">See Customer Reviews</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyUs;

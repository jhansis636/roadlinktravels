import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import CabBookingForm from "@/components/CabBookingForm";
import VehicleBookingSection from "@/components/VehicleBookingSection";
import PageSlider from "@/components/PageSlider";
import PageVideos from "@/components/PageVideos";
import { Link } from "react-router-dom";
import { Shield, Users, Car, Headphones, MapPin, Plane, Building2, Palmtree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import Tilt3DCard from "@/components/Tilt3DCard";
import FloatingLogo from "@/components/FloatingLogo";
import RadialLogoMenu from "@/components/RadialLogoMenu";

const features = [
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Your safety is our priority with verified drivers and sanitized vehicles.",
  },
  {
    icon: Users,
    title: "Experienced Drivers",
    description: "Professional drivers with years of experience and local knowledge.",
  },
  {
    icon: Car,
    title: "Well-Maintained Fleet",
    description: "Modern, clean, and regularly serviced vehicles for comfortable rides.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer support for all your travel needs.",
  },
];

const services = [
  {
    icon: Car,
    title: "Local Taxi Services",
    description: "Convenient and affordable local taxi services within Coimbatore city.",
  },
  {
    icon: MapPin,
    title: "Outstation Taxi",
    description: "Comfortable outstation trips to any destination in Tamil Nadu and beyond.",
  },
  {
    icon: Plane,
    title: "Airport Transfers",
    description: "Reliable airport transfer services to and from Coimbatore International Airport.",
  },
  {
    icon: Building2,
    title: "Corporate Travel",
    description: "Professional corporate travel solutions for businesses.",
  },
  {
    icon: Users,
    title: "Family Trips",
    description: "Spacious vehicles for family outings and group travel.",
  },
  {
    icon: Palmtree,
    title: "Tourist Trips",
    description: "Explore popular tourist destinations around Coimbatore.",
  },
];

const Home = () => {
  const containerRef = useScrollAnimations();
  const [triggerBooking, setTriggerBooking] = useState(false);

  return (
    <div ref={containerRef} style={{ perspective: "1200px" }}>
      <FloatingLogo />
      
      {/* Home Page Slider */}
      <div data-anim="banner">
        <PageSlider pageName="home" className="container mx-auto px-4 py-8" />
      </div>
      
      {/* Home Page Videos */}
      <div data-anim="section">
        <PageVideos pageName="home" title="Watch Our Videos" />
      </div>
      
      {/* Vehicle Booking Section */}
      <RadialLogoMenu />
      <div data-anim="section" style={{ willChange: "transform" }}>
        <VehicleBookingSection />
      </div>

      {/* Cab Booking Form below fleet */}
      <div className="-mt-10 pb-8 bg-muted" data-anim="section">
        <CabBookingForm />
      </div>

      {/* About Preview Section */}
      <section className="py-20 bg-muted overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-anim="section" style={{ willChange: "transform" }}>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                Your Trusted Taxi Partner in Coimbatore
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Roadlink Tours and Travels is a premier taxi service provider in Coimbatore, offering safe, 
                affordable, and comfortable rides for all your travel needs.
              </p>
              <Button asChild>
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-6" data-anim="card-group">
              {features.map((feature) => (
                <Tilt3DCard
                  key={feature.title}
                  className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </Tilt3DCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Page Slider */}
      <div data-anim="banner">
        <PageSlider pageName="services" className="container mx-auto px-4 py-8" />
      </div>

      {/* Services Preview Section */}
      <section className="py-12 bg-muted overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-8" data-anim="section" style={{ willChange: "transform" }}>
            <span className="text-primary font-bold text-sm uppercase tracking-wider">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
              Taxi Services for Every Need
            </h2>
            <p className="text-foreground/70 text-lg">
              From local trips to outstation journeys, we offer a complete range of taxi 
              services to meet all your travel requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <div
                key={service.title}
                className="group bg-card border border-border rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 hover:border-primary/40"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8" data-anim="section">
            <Button size="lg" asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground overflow-hidden" data-anim="parallax-bg">
        <div className="container mx-auto px-4 text-center" data-anim="section" style={{ willChange: "transform" }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Book Your Ride?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Experience the best taxi service in Coimbatore. Book now and travel with comfort and reliability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-anim="parallax-fg">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:+918248199154">Call Now</a>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/20 text-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import { useState } from "react";
import { Phone, MessageCircle, MapPin, Clock, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import BookingModal from "./BookingModal";

const HeroSection = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full px-4 py-2 mb-6">
              <MapPin className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-background">Coimbatore, Tamil Nadu</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4 leading-tight">
              Reliable Taxi & Travel Services in{" "}
              <span className="text-secondary">Coimbatore</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-background/90 mb-4">
              KavyaTravels – Your Trusted Travel Partner
            </p>

            {/* Services List */}
            <div className="flex flex-wrap gap-3 mb-8">
              {["Local Taxi", "Outstation", "Airport Pickup", "Tour Packages"].map(
                (service) => (
                  <span
                    key={service}
                    className="bg-background/10 backdrop-blur-sm border border-background/20 rounded-full px-4 py-2 text-sm text-background"
                  >
                    {service}
                  </span>
                )
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8"
                onClick={() => setIsBookingOpen(true)}
              >
                <CalendarCheck className="w-5 h-5 mr-2" />
                Book Online
              </Button>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8"
                asChild
              >
                <a href="tel:+919876543210" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-background/10 border-background/30 text-background hover:bg-background/20 text-lg px-8"
                asChild
              >
                <a
                  href="https://wa.me/919876543210?text=Hi, I want to book a taxi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-background/90">
                <Clock className="w-5 h-5 text-secondary" />
                <span>24/7 Available</span>
              </div>
              <div className="flex items-center gap-2 text-background/90">
                <MapPin className="w-5 h-5 text-secondary" />
                <span>All Over Tamil Nadu</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </>
  );
};

export default HeroSection;

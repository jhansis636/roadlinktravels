import { useState, useEffect, useCallback } from "react";
import { Phone, MessageCircle, MapPin, Clock, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBannerImages, useBannerSettings } from "@/hooks/useBannerImages";
import heroBg from "@/assets/hero-banner.png";
import BookingModal from "./BookingModal";

const HeroSection = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { data: bannerImages } = useBannerImages(true);
  const { data: settings } = useBannerSettings();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = bannerImages && bannerImages.length > 0 ? bannerImages : null;
  const isSlider = settings?.mode === "slider" && images && images.length > 1;
  const duration = (settings?.slide_duration || 4) * 1000;
  const effect = settings?.transition_effect || "fade";

  const goToNext = useCallback(() => {
    if (!images) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
      setIsTransitioning(false);
    }, 300);
  }, [images]);

  useEffect(() => {
    if (!isSlider) return;
    const interval = setInterval(goToNext, duration);
    return () => clearInterval(interval);
  }, [isSlider, duration, goToNext]);

  // Determine current background
  const currentBg = images ? images[currentSlide]?.image_url : heroBg;

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20 overflow-hidden">
        {/* Background Images for Slider */}
        {isSlider && images ? (
          images.map((img, idx) => (
            <div
              key={img.id}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ease-in-out"
              style={{
                backgroundImage: `url(${img.image_url})`,
                opacity: idx === currentSlide && !isTransitioning ? 1 : 0,
                zIndex: idx === currentSlide ? 1 : 0,
              }}
            />
          ))
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${currentBg})` }}
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/50 via-foreground/30 to-foreground/10 md:from-foreground/40 md:to-foreground/10" style={{ zIndex: 2 }} />

        {/* Content */}
        <div className="relative container mx-auto px-4 py-12 md:py-20" style={{ zIndex: 3 }}>
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6">
              <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary" />
              <span className="text-xs md:text-sm font-medium text-background">Coimbatore, Tamil Nadu</span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-background mb-3 md:mb-4 leading-tight">
              Reliable Taxi & Travel Services in{" "}
              <span className="text-secondary">Coimbatore</span>
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-xl text-background/90 mb-3 md:mb-4">
              Roadlink Tours and Travels – Your Trusted Travel Partner
            </p>

            {/* Services List */}
            <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
              {["Day Basis, Hourly/Km Basis, Airport Transfers, Corporate Booking, Round Trips, Temple Tours, Honeymoon Packages, Adventure Packages, IV Trips & Students Trips, Group Trip, Hotels, Resorts and Tent House Booking, Flight, Train and Bus"].map(service => (
                <span key={service} className="bg-background/10 backdrop-blur-sm border border-background/20 rounded-full px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-background">
                  {service}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base md:text-lg px-6 md:px-8 h-11 md:h-12" onClick={() => setIsBookingOpen(true)}>
                <CalendarCheck className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Book Online
              </Button>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base md:text-lg px-6 md:px-8 h-11 md:h-12" asChild>
                <a href="tel:+918248199154" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  Call Now
                </a>
              </Button>
              <Button size="lg" variant="outline" className="bg-background/10 border-background/30 text-background hover:bg-background/20 text-base md:text-lg px-6 md:px-8 h-11 md:h-12" asChild>
                <a href="https://wa.me/918248199154?text=Hi, I want to book a taxi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                  WhatsApp
                </a>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 md:gap-6">
              <div className="flex items-center gap-2 text-background/90 text-sm md:text-base">
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
                <span>24/7 Available</span>
              </div>
              <div className="flex items-center gap-2 text-background/90 text-sm md:text-base">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
                <span>All Over South India🌍 💬Our Chauffeur Knows English, Hindi, Telugu, Malayalam, Kannada, Tamil</span>
              </div>
            </div>

            {/* Slider Dots */}
            {isSlider && images && (
              <div className="flex gap-2 mt-6">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setIsTransitioning(true); setTimeout(() => { setCurrentSlide(idx); setIsTransitioning(false); }, 300); }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide ? "bg-secondary w-6" : "bg-background/50 hover:bg-background/70"}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <BookingModal open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </>
  );
};

export default HeroSection;

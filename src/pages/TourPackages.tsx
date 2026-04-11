import { useParams, Link } from "react-router-dom";
import { MapPin, Clock, Navigation, ChevronRight, Phone, Star, Route } from "lucide-react";
import { tourPackagesData } from "@/data/tourPackagesData";
import { getDestinationImage } from "@/data/destinationImages";
import { Button } from "@/components/ui/button";

const TourPackages = () => {
  const { duration } = useParams();
  const packageData = duration ? tourPackagesData[duration] : null;

  if (!packageData) {
    return (
      <div className="min-h-screen pt-8">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Tour Packages</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Select a tour package duration to view available routes and itineraries.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {Object.entries(tourPackagesData).map(([slug, data]) => (
              <Link
                key={slug}
                to={`/tour-packages/${slug}`}
                className="p-4 rounded-lg border border-border bg-card hover:border-primary hover:shadow-md transition-all duration-200 text-center"
              >
                <span className="text-sm font-semibold text-primary">{data.heading.replace(" from Coimbatore", "")}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8">
      {/* Hero Section */}
      <div className="bg-primary/5 border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">Tour Packages</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-primary font-medium">{packageData.heading.replace(" from Coimbatore", "")}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {packageData.heading}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-4xl leading-relaxed">
            {packageData.introduction}
          </p>
        </div>
      </div>

      {/* Packages List */}
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="space-y-10 md:space-y-14">
          {packageData.routes.map((route, index) => (
            <article
              key={index}
              className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
            >
              {/* Package Header */}
              <div className="bg-primary/5 border-b border-border px-5 md:px-8 py-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-foreground">
                        {route.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-3 mt-1.5">
                        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="w-3.5 h-3.5 text-primary" />
                          {route.duration}
                        </span>
                        {route.distance && (
                          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Route className="w-3.5 h-3.5 text-primary" />
                            {route.distance}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 w-fit" asChild>
                    <a
                      href={`https://wa.me/918248199154?text=Hi, I'm interested in the ${route.title} (${route.duration}) tour package. Please share details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="w-3.5 h-3.5 mr-1.5" />
                      Enquire Now
                    </a>
                  </Button>
                </div>
              </div>

              <div className="px-5 md:px-8 py-6 space-y-6">
                {/* Description */}
                <p className="text-foreground/80 leading-relaxed text-[15px]">
                  {route.description}
                </p>

                {/* Highlights */}
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary" />
                    Places Covered / Highlights
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {route.highlights.map((highlight, hIdx) => (
                      <span
                        key={hIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 text-sm text-foreground/80 border border-primary/10"
                      >
                        <MapPin className="w-3 h-3 text-primary" />
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Itinerary */}
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-primary" />
                    Detailed Itinerary
                  </h3>
                  <div className="space-y-2.5">
                    {route.itinerary.map((step, sIdx) => (
                      <div key={sIdx} className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                          {sIdx + 1}
                        </div>
                        <p className="text-foreground/75 text-sm leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center bg-primary/5 rounded-xl border border-border p-8 md:p-10">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
            Need a Customized Tour Package?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We specialize in creating personalized itineraries based on your preferences, budget, and travel dates. Contact us today for a free quotation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild>
              <a href="tel:+918248199154" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call: +91 82481 99154
              </a>
            </Button>
            <Button variant="outline" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 border-secondary" asChild>
              <a
                href="https://wa.me/918248199154?text=Hi, I need a customized tour package from Coimbatore. Please help."
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPackages;

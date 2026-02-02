import { Clock, IndianRupee, Sparkles, UserCheck, Phone, MapPin } from "lucide-react";

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

const WhyChooseUsSection = () => {
  return (
    <section id="why-us" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            The Kavya Tours Difference
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            We go above and beyond to ensure every journey with us is comfortable, 
            safe, and memorable.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="flex gap-3 md:gap-4 p-4 md:p-6 rounded-lg bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center">
                  <reason.icon className="w-5 h-5 md:w-6 md:h-6 text-secondary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">{reason.title}</h3>
                <p className="text-primary-foreground/80 text-xs md:text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

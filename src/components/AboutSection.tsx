import { Shield, Users, Car, Headphones } from "lucide-react";

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

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              Your Trusted Taxi Partner in Coimbatore
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Kavya Tours and Travels is a premier taxi service provider in Coimbatore, offering safe, 
              affordable, and comfortable rides for all your travel needs. Whether you need 
              a local taxi, outstation travel, or airport pickup, we've got you covered.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              With a fleet of well-maintained vehicles and a team of experienced, professional 
              drivers, we ensure that every journey with us is smooth, reliable, and enjoyable. 
              Our commitment to customer satisfaction has made us the preferred choice for 
              thousands of travelers in Coimbatore and surrounding areas.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <div className="text-center p-2 md:p-4 bg-background rounded-lg shadow-sm">
                <div className="text-xl md:text-3xl font-bold text-primary">10+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center p-2 md:p-4 bg-background rounded-lg shadow-sm">
                <div className="text-xl md:text-3xl font-bold text-primary">50+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Vehicles</div>
              </div>
              <div className="text-center p-2 md:p-4 bg-background rounded-lg shadow-sm">
                <div className="text-xl md:text-3xl font-bold text-primary">10K+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Happy Customers</div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

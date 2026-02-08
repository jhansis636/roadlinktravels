import { Shield, Users, Car, Headphones, Award, Target, Heart } from "lucide-react";
import PageSlider from "@/components/PageSlider";
const features = [{
  icon: Shield,
  title: "Safe & Secure",
  description: "Your safety is our priority with verified drivers and sanitized vehicles."
}, {
  icon: Users,
  title: "Experienced Drivers",
  description: "Professional drivers with years of experience and local knowledge."
}, {
  icon: Car,
  title: "Well-Maintained Fleet",
  description: "Modern, clean, and regularly serviced vehicles for comfortable rides."
}, {
  icon: Headphones,
  title: "24/7 Support",
  description: "Round-the-clock customer support for all your travel needs."
}];
const About = () => {
  return <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Roadlink Tours and Travels</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto"></p>
        </div>
      </section>

      {/* About Page Slider */}
      <PageSlider pageName="about" className="container mx-auto px-4 py-8" />

      {/* About Content */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">OUR STORY</span>
              <h2 className="text-3xl text-foreground mt-2 mb-6 my-[12px] py-0 font-serif font-medium text-left md:text-lg">Roadlink Tours and Travels is a premier taxi service provider in Coimbatore, offering safe, affordable, and comfortable rides for all your travel needs. Founded 10 years ago by Mr. Dinesh with a small setup, the company has now grown into a vast network of vehicles, serving customers across India. Our service is exceptional, and we are committed to providing reliable rides at competitive and affordable rates.</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed"></p>
              <p className="text-muted-foreground mb-8 leading-relaxed"></p>

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
              {features.map(feature => <div key={feature.title} className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              What Drives Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Our Mission, Vision & Values
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-muted rounded-lg">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide safe, reliable, and affordable transportation services that exceed customer expectations while maintaining the highest standards of professionalism.
              </p>
            </div>

            <div className="text-center p-8 bg-muted rounded-lg">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become the most trusted and preferred taxi service provider in Tamil Nadu, known for excellence in customer service and operational efficiency.
              </p>
            </div>

            <div className="text-center p-8 bg-muted rounded-lg">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Our Values</h3>
              <p className="text-muted-foreground leading-relaxed">
                Customer safety, punctuality, transparency in pricing, continuous improvement, and building lasting relationships with our valued customers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default About;
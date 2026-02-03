import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Coimbatore",
    rating: 5,
    text: "Excellent service! The driver arrived on time and the car was spotlessly clean. I regularly use Roadlink Tours and Travels for my airport transfers. Highly recommended!",
  },
  {
    name: "Priya Venkatesh",
    location: "Chennai",
    rating: 5,
    text: "Booked a taxi for our Ooty trip. The driver was very professional and knew all the best spots. Made our family vacation truly memorable.",
  },
  {
    name: "Mohammed Farhan",
    location: "Coimbatore",
    rating: 5,
    text: "Very reliable service for corporate travel. Our clients are always impressed with the quality of vehicles and punctuality. Great for business needs.",
  },
  {
    name: "Lakshmi Sundaram",
    location: "Tirupur",
    rating: 5,
    text: "Used their service for my daughter's wedding. Multiple vehicles, coordinated pickup, and excellent service. Will definitely use again!",
  },
  {
    name: "Arun Prakash",
    location: "Coimbatore",
    rating: 5,
    text: "The best taxi service in Coimbatore! Affordable prices, clean cars, and friendly drivers. My go-to choice for all travel needs.",
  },
  {
    name: "Sangeetha Ravi",
    location: "Coimbatore",
    rating: 5,
    text: "Safe and comfortable ride even during late night hours. The 24/7 availability is a huge plus. Thank you Roadlink Tours and Travels!",
  },
  {
    name: "Karthik Subramanian",
    location: "Erode",
    rating: 5,
    text: "Excellent outstation service. The driver was patient, knowledgeable, and ensured our comfort throughout the journey. Will recommend to friends.",
  },
  {
    name: "Meena Krishnan",
    location: "Salem",
    rating: 5,
    text: "Used their airport pickup service. The driver was waiting for us despite our flight delay. Very professional and understanding service.",
  },
  {
    name: "Vijay Anand",
    location: "Coimbatore",
    rating: 5,
    text: "Great experience with the corporate travel package. Reliable, punctual, and the vehicles are always in pristine condition.",
  },
];

const Testimonials = () => {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Customer Testimonials</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our valued customers have to say about their experience with Roadlink Tours and Travels.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">10,000+</div>
              <div className="text-muted-foreground text-sm">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">4.9/5</div>
              <div className="text-muted-foreground text-sm">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">98%</div>
              <div className="text-muted-foreground text-sm">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">10+</div>
              <div className="text-muted-foreground text-sm">Years of Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow relative"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Our Service?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Join our family of happy customers. Book your ride today and see why we're the preferred choice in Coimbatore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:+919876543210">Book Now</a>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;

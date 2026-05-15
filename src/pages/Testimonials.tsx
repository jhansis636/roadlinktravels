import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTestimonials } from "@/hooks/useTestimonials";
import SEO from "@/components/SEO";
import PageSlider from "@/components/PageSlider";
import PageVideos from "@/components/PageVideos";

const defaultTestimonials = [
  {
    id: "1",
    customer_name: "Rajesh Kumar",
    location: "Coimbatore",
    rating: 5,
    review_text: "Excellent service! The driver arrived on time and the car was spotlessly clean. I regularly use Roadlink Tours and Travels for my airport transfers. Highly recommended!",
    avatar_url: null,
    is_featured: false,
    is_active: true,
    display_order: 0,
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    customer_name: "Priya Venkatesh",
    location: "Chennai",
    rating: 5,
    review_text: "Booked a taxi for our Ooty trip. The driver was very professional and knew all the best spots. Made our family vacation truly memorable.",
    avatar_url: null,
    is_featured: false,
    is_active: true,
    display_order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: "3",
    customer_name: "Mohammed Farhan",
    location: "Coimbatore",
    rating: 5,
    review_text: "Very reliable service for corporate travel. Our clients are always impressed with the quality of vehicles and punctuality. Great for business needs.",
    avatar_url: null,
    is_featured: false,
    is_active: true,
    display_order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: "4",
    customer_name: "Lakshmi Sundaram",
    location: "Tirupur",
    rating: 5,
    review_text: "Used their service for my daughter's wedding. Multiple vehicles, coordinated pickup, and excellent service. Will definitely use again!",
    avatar_url: null,
    is_featured: false,
    is_active: true,
    display_order: 3,
    created_at: "",
    updated_at: "",
  },
  {
    id: "5",
    customer_name: "Arun Prakash",
    location: "Coimbatore",
    rating: 5,
    review_text: "The best taxi service in Coimbatore! Affordable prices, clean cars, and friendly drivers. My go-to choice for all travel needs.",
    avatar_url: null,
    is_featured: false,
    is_active: true,
    display_order: 4,
    created_at: "",
    updated_at: "",
  },
  {
    id: "6",
    customer_name: "Sangeetha Ravi",
    location: "Coimbatore",
    rating: 5,
    review_text: "Safe and comfortable ride even during late night hours. The 24/7 availability is a huge plus. Thank you Roadlink Tours and Travels!",
    avatar_url: null,
    is_featured: false,
    is_active: true,
    display_order: 5,
    created_at: "",
    updated_at: "",
  },
];

const Testimonials = () => {
  const { data: dbTestimonials, isLoading } = useTestimonials(true);
  
  // Use database testimonials if available, otherwise use defaults
  const testimonials = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : defaultTestimonials;

  return (
    <div className="pt-16 md:pt-20">
      <SEO
        title="Customer Reviews — Roadlink Coimbatore Taxi & Travels"
        description="Read genuine customer reviews of Roadlink Tours and Travels — Coimbatore's most reviewed taxi service for airport pickup, outstation trips and tour packages."
        path="/testimonials"
        keywords="Coimbatore taxi reviews, best Coimbatore travels reviews"
      />
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Customer Testimonials</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our valued customers have to say about their experience with Roadlink Tours and Travels.
          </p>
        </div>
      </section>

      {/* Testimonials Page Slider */}
      <PageSlider pageName="testimonials" className="container mx-auto px-4 py-8" />

      {/* Testimonials Page Videos */}
      <PageVideos pageName="testimonials" />

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
          {isLoading ? (
            <div className="text-center text-muted-foreground py-12">Loading testimonials...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow relative"
                >
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                    "{testimonial.review_text}"
                  </p>
                  <div className="flex items-center gap-3">
                    {testimonial.avatar_url ? (
                      <img
                        src={testimonial.avatar_url}
                        alt={testimonial.customer_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-semibold text-sm">
                          {testimonial.customer_name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-foreground text-sm">
                        {testimonial.customer_name}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
              <a href="tel:+918248199154">Book Now</a>
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

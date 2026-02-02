import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Coimbatore",
    rating: 5,
    text: "Excellent service! The driver arrived on time and the car was spotlessly clean. I regularly use Roadlink Tours and Travels for my airport transfers. Highly recommended!",
  },
  {
    name: "Priya Venkatesh",
    location: "Tirupur",
    rating: 5,
    text: "We booked a taxi for our family trip to Ooty. The driver was very professional and knew all the scenic routes. Made our trip memorable!",
  },
  {
    name: "Mohammed Farook",
    location: "Coimbatore",
    rating: 5,
    text: "Best taxi service in Coimbatore! Affordable rates, punctual drivers, and well-maintained vehicles. I've been using their service for over 2 years.",
  },
  {
    name: "Lakshmi Narayanan",
    location: "Erode",
    rating: 5,
    text: "Booked an outstation taxi to Chennai. The booking process was smooth and the journey was very comfortable. Will definitely use again.",
  },
  {
    name: "Arun Prakash",
    location: "Salem",
    rating: 5,
    text: "Very reliable service for corporate travel. They handle all our employee transportation needs efficiently. Great partnership!",
  },
  {
    name: "Sangeetha Ravi",
    location: "Coimbatore",
    rating: 5,
    text: "Safe and comfortable ride even during late night hours. The 24/7 availability is a huge plus. Thank you Roadlink Tours and Travels!",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it. Here's what our happy customers have to say 
            about their experience with Kavya Tours and Travels.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-secondary text-secondary"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

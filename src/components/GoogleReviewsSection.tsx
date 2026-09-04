import { Star } from "lucide-react";
import img1 from "@/assets/customer-1.png.asset.json";
import img2 from "@/assets/customer-2.png.asset.json";
import img3 from "@/assets/customer-3.png.asset.json";

const reviews = [
  {
    image: img1.url,
    alt: "Family with their Roadlink cab on the hill road to Ooty",
    name: "Karthikeyan M.",
    initial: "K",
    when: "2 weeks ago",
    rating: 5,
    text: "Booked a car for our Ooty family trip. Driver Suresh was on time at 5 AM, drove very safely on the ghat roads and even stopped wherever we wanted for photos. Car was clean and AC worked perfectly. Fully worth the money.",
  },
  {
    image: img2.url,
    alt: "Roadlink tourist buses with a group before departure",
    name: "Divya Ramesh",
    initial: "D",
    when: "1 month ago",
    rating: 5,
    text: "We hired two buses for our office temple tour, 40+ people. Everything was arranged properly from pickup to drop. Both drivers were polite and the buses were neat with good music system. Booking through WhatsApp was very easy.",
  },
  {
    image: img3.url,
    alt: "Family arriving at Coimbatore airport with a Roadlink Innova",
    name: "Anand Subramanian",
    initial: "A",
    when: "3 weeks ago",
    rating: 5,
    text: "Airport pickup at Coimbatore for my parents and kids. Driver was waiting before the flight landed and helped with all the luggage. No last minute price change, exactly what was quoted. Will use Roadlink again for sure.",
  },
];

const GoogleLogo = () => (
  <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden="true">
    <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.3h12.1c-.2 2-1.6 5-4.5 7l6.9 5.3c4.1-3.8 6.6-9.4 6.6-15.6z" />
    <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.3c-1.8 1.3-4.3 2.2-7.6 2.2-5.8 0-10.7-3.8-12.4-9.1l-7.1 5.5C8.1 41.1 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.6 28.5c-.5-1.4-.7-2.9-.7-4.5s.3-3.1.7-4.5l-7.1-5.5C2.9 17 2 20.4 2 24s.9 7 2.5 10l7.1-5.5z" />
    <path fill="#EA4335" d="M24 10.6c4.1 0 6.9 1.8 8.5 3.3l6.2-6C34.9 4.5 29.9 2 24 2 15.4 2 8.1 6.9 4.5 14l7.1 5.5c1.7-5.3 6.6-8.9 12.4-8.9z" />
  </svg>
);

const GoogleReviewsSection = () => {
  return (
    <section className="py-10 md:py-14 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 shadow-sm">
            <GoogleLogo />
            <span className="text-sm font-semibold text-foreground">Google Reviews</span>
            <span className="flex items-center gap-0.5 ml-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-secondary text-secondary" />
              ))}
            </span>
            <span className="text-sm font-bold text-foreground">4.8</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-4">Happy Travellers</h2>
          <p className="text-muted-foreground mt-2">Real trips, real people, real reviews.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {reviews.map((r) => (
            <article
              key={r.name}
              className="rounded-2xl overflow-hidden border border-border bg-card shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <img
                src={r.image}
                alt={r.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {r.initial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-foreground truncate">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.when}</div>
                  </div>
                  <GoogleLogo />
                </div>
                <div className="flex items-center gap-0.5 mt-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">{r.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;

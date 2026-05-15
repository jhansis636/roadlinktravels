import { Link } from "react-router-dom";

const faqs = [
  {
    q: "Which is the best taxi service in Coimbatore?",
    a: "Roadlink Tours and Travels is one of the most trusted taxi services in Coimbatore, offering 24/7 cab booking, airport pickup and drop, outstation trips, luxury car rentals and customised tour packages with verified drivers and transparent pricing.",
  },
  {
    q: "How do I book a Coimbatore taxi or cab online?",
    a: "You can book a Coimbatore taxi instantly by calling +91 82481 99154, sending a WhatsApp message, or using the booking form on our website. We confirm bookings within minutes and serve all areas in and around Coimbatore.",
  },
  {
    q: "Do you offer Coimbatore airport taxi pickup and drop?",
    a: "Yes. We provide round-the-clock Coimbatore airport taxi service with on-time pickup and drop for domestic and international flights, including Sedan, SUV, Innova Crysta and luxury sedan options.",
  },
  {
    q: "What is the fare for an outstation taxi from Coimbatore to Ooty?",
    a: "Outstation Coimbatore to Ooty taxi fares start from competitive per-km and per-day packages depending on the vehicle (Swift, Etios, Ertiga, Innova, Crysta, Tempo Traveller). Visit our Tariff page or WhatsApp us for an instant quote.",
  },
  {
    q: "Do you provide luxury car rentals in Coimbatore?",
    a: "Yes, we offer premium luxury sedan rentals in Coimbatore including Audi, Mercedes-Benz, BMW and Jaguar for weddings, corporate travel, airport transfers and special occasions.",
  },
  {
    q: "Which destinations are covered in your Coimbatore tour packages?",
    a: "Our Coimbatore tour packages cover popular South India destinations such as Ooty, Munnar, Kodaikanal, Mysore, Valparai, Wayanad, Coorg, Bangalore and more — available as 1 to 8 day customised itineraries.",
  },
];

const HomeSeoContent = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="py-16 bg-background" aria-labelledby="why-roadlink-heading">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="text-center mb-10">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Best Taxi Service in Coimbatore
          </span>
          <h2 id="why-roadlink-heading" className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Why Roadlink Tours &amp; Travels is Coimbatore's Most Trusted Travel Partner
          </h2>
          <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
            Roadlink Tours and Travels is a leading Coimbatore taxi service offering safe,
            affordable and 24/7 cab booking across Coimbatore and South India. From local trips
            and Coimbatore airport pickup &amp; drop to outstation taxi rides to Ooty, Munnar,
            Kodaikanal, Mysore and Valparai — we make every journey comfortable and reliable.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12 text-foreground/80 leading-relaxed">
          <article>
            <h3 className="text-xl font-bold text-foreground mb-2">Wide Range of Vehicles</h3>
            <p>
              Choose from Sedans (Swift, Etios, Dzire), SUVs (Ertiga, Innova, Innova Crysta,
              Hycross), Tempo Traveller, Urbania, Coach Van, Bus and luxury sedans like Audi,
              Mercedes-Benz, BMW and Jaguar — perfect for family trips, corporate travel,
              weddings and tourist tours.
            </p>
          </article>
          <article>
            <h3 className="text-xl font-bold text-foreground mb-2">Coimbatore Airport Taxi</h3>
            <p>
              Round-the-clock Coimbatore airport pickup and drop with flight-tracked
              on-time arrival. Pre-book your airport cab from anywhere in Coimbatore at
              transparent flat fares.
            </p>
          </article>
          <article>
            <h3 className="text-xl font-bold text-foreground mb-2">Outstation Taxi from Coimbatore</h3>
            <p>
              Comfortable outstation trips from Coimbatore to{" "}
              <Link to="/tour-packages/2-days" className="text-primary hover:underline">Ooty</Link>,
              {" "}Munnar, Kodaikanal, Mysore, Valparai, Wayanad and Bangalore on{" "}
              <Link to="/tariff/day-basis" className="text-primary hover:underline">day basis</Link> or{" "}
              <Link to="/tariff/km-basis" className="text-primary hover:underline">kilometre basis</Link>{" "}
              tariff.
            </p>
          </article>
          <article>
            <h3 className="text-xl font-bold text-foreground mb-2">Customised Tour Packages</h3>
            <p>
              Explore our{" "}
              <Link to="/tour-packages/1-day" className="text-primary hover:underline">
                1 to 8 day Coimbatore tour packages
              </Link>{" "}
              covering the best of South India hill stations, temples and wildlife
              destinations with experienced local drivers.
            </p>
          </article>
          <article>
            <h3 className="text-xl font-bold text-foreground mb-2">Luxury Car Rentals in Coimbatore</h3>
            <p>
              Premium luxury sedan rentals in Coimbatore — Audi, Mercedes-Benz, BMW and
              Jaguar — for weddings, VIP travel, corporate events and special occasions.
            </p>
          </article>
          <article>
            <h3 className="text-xl font-bold text-foreground mb-2">24/7 Customer Support</h3>
            <p>
              Our Coimbatore travels team is available 24x7 on call and WhatsApp to assist
              with bookings, fare quotes and route planning. Reach us anytime at{" "}
              <a href="tel:+918248199154" className="text-primary hover:underline">+91 82481 99154</a>.
            </p>
          </article>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            Frequently Asked Questions about Coimbatore Taxi Booking
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group bg-card border border-border rounded-xl p-5 shadow-sm open:shadow-md transition-shadow"
              >
                <summary className="cursor-pointer font-semibold text-foreground text-base md:text-lg list-none flex justify-between items-center gap-4">
                  <span>{f.q}</span>
                  <span className="text-primary text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-foreground/70 leading-relaxed text-sm md:text-base">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </div>
    </section>
  );
};

export default HomeSeoContent;
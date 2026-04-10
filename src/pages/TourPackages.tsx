import { useParams } from "react-router-dom";

const packageLabels: Record<string, string> = {
  "1-day": "One Day Tour Packages",
  "2-days": "Two Days Tour Packages",
  "3-days": "Three Days Tour Packages",
  "4-days": "Four Days Tour Packages",
  "5-days": "Five Days Tour Packages",
  "6-days": "Six Days Tour Packages",
  "7-days": "Seven Days Tour Packages",
  "8-days": "Eight Days Tour Packages",
};

const TourPackages = () => {
  const { duration } = useParams();
  const title = duration ? packageLabels[duration] || "Tour Packages" : "Tour Packages";

  return (
    <div className="min-h-screen pt-8">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{title}</h1>
        <p className="text-muted-foreground text-lg">
          Explore our curated {title.toLowerCase()} across Tamil Nadu and South India. Contact us for customized itineraries.
        </p>
      </div>
    </div>
  );
};

export default TourPackages;

import { Link } from "react-router-dom";
import { Map, ChevronRight } from "lucide-react";

interface SitemapLink {
  label: string;
  href: string;
}

interface SitemapColumn {
  title: string;
  links: SitemapLink[];
}

const columns: SitemapColumn[] = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Why Choose Us", href: "/why-us" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Our Services", href: "/services" },
      { label: "Tariff – Day Basis", href: "/tariff/day-basis" },
      { label: "Tariff – Km Basis", href: "/tariff/km-basis" },
    ],
  },
  {
    title: "Tour Packages",
    links: [
      { label: "1 Day Packages", href: "/tour-packages/1-day" },
      { label: "2 Days Packages", href: "/tour-packages/2-days" },
      { label: "3 Days Packages", href: "/tour-packages/3-days" },
      { label: "4 Days Packages", href: "/tour-packages/4-days" },
      { label: "5 Days Packages", href: "/tour-packages/5-days" },
      { label: "6 Days Packages", href: "/tour-packages/6-days" },
      { label: "7 Days Packages", href: "/tour-packages/7-days" },
      { label: "8 Days Packages", href: "/tour-packages/8-days" },
    ],
  },
];

const Sitemap = () => {
  return (
    <section className="py-16 bg-background border-t border-border" data-anim="section">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Map className="w-5 h-5 text-primary" />
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Sitemap</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="group flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-primary/60 group-hover:text-primary transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sitemap;

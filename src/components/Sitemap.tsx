import { useState } from "react";
import { Link } from "react-router-dom";
import { Map, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

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
  const [open, setOpen] = useState(false);

  return (
    <section className="py-10 bg-background border-t border-border flex justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="lg" variant="outline" className="gap-2">
            <Map className="w-4 h-4" />
            Site Map
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Map className="w-6 h-6 text-primary" />
              Site Map
            </DialogTitle>
            <DialogDescription>
              Click any page below to navigate.
            </DialogDescription>
          </DialogHeader>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3 pb-2 border-b border-border">
                  {column.title}
                </h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-1.5 text-foreground hover:text-primary transition-colors text-sm font-medium"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-primary/60 group-hover:translate-x-0.5 transition-transform" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Sitemap;
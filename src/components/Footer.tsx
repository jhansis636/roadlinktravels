import { Phone, MessageCircle, MapPin, Mail, Download, Facebook, Instagram, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { canInstall, installApp, isInstalled } = usePWAInstall();
  const { toast } = useToast();
  const services = ["Local Taxi Services", "Outstation Taxi", "Airport Pickup & Drop", "Corporate Travel", "Family Trips", "Tourist Packages"];
  const quickLinks = [{
    href: "/",
    label: "Home"
  }, {
    href: "/about",
    label: "About Us"
  }, {
    href: "/services",
    label: "Services"
  }, {
    href: "/why-us",
    label: "Why Choose Us"
  }, {
    href: "/testimonials",
    label: "Testimonials"
  }, {
    href: "/contact",
    label: "Contact"
  }, {
    href: "/admin/login",
    label: "Admin"
  }];
  return <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-base md:text-lg">R</span>
              </div>
              <span className="text-lg md:text-xl font-bold">Roadlink Tours and Travels</span>
            </Link>
            <p className="text-background/70 mb-4 md:mb-6 text-xs md:text-sm leading-relaxed">
              Your trusted taxi service partner in Coimbatore. Safe, reliable, and 
              affordable travel solutions for all your needs.
            </p>
            <div className="flex gap-2 md:gap-3">
              <a href="tel:+918248199154" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="https://wa.me/918248199154" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="mailto:info@roadlinktravels.com" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="https://www.facebook.com/people/Road-Link-Tours-and-Travels-Coimbatore/61574651784647/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-[#1877F2] transition-colors">
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="https://www.instagram.com/roadlinktoursandtravels?igsh=MW12NHZiNXk0MjFyNQ==" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-[#E4405F] transition-colors">
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="https://g.page/r/CWb9iblFoyItEBM/review" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-[#FBBC05] transition-colors">
                <Star className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
            {!isInstalled && (
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  const prompted = await installApp();
                  if (!prompted) {
                    toast({
                      title: "Install feature not supported on this browser.",
                      description: "Try opening this website in Chrome on Android for the best experience.",
                    });
                  }
                }}
                className="mt-4 flex items-center gap-2 bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
              >
                <Download className="w-4 h-4" />
                Install App
              </Button>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Quick Links</h3>
            <ul className="space-y-1.5 md:space-y-2">
              {quickLinks.map(link => <li key={link.href}>
                  <Link to={link.href} className="text-background/70 hover:text-secondary transition-colors text-xs md:text-sm">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Our Services</h3>
            <ul className="space-y-1.5 md:space-y-2">
              {services.map(service => <li key={service}>
                  <Link to="/services" className="text-background/70 hover:text-secondary transition-colors text-xs md:text-sm">
                    {service}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Contact Info</h3>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-2 md:gap-3">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs md:text-sm font-medium">Phone</div>
                  <a href="tel:+918248199154" className="text-background/70 text-xs md:text-sm hover:text-secondary block">+91 82481 99154</a>
                  <a href="tel:+919003305085" className="text-background/70 text-xs md:text-sm hover:text-secondary block">+91 90033 05085</a>
                </div>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs md:text-sm font-medium">Email</div>
                  <a href="mailto:info@roadlinktravels.com" className="text-background/70 text-xs md:text-sm hover:text-secondary break-all">roadlinktoursandtravels95@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs md:text-sm font-medium">Service Area</div>
                  <span className="text-background/70 text-xs md:text-sm">22XV+4FV Civil Aerodrome Post, Peelamedu, Tamil Nadu</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      {/* SEO keyword block */}
      <div className="border-t border-background/10 bg-foreground/95">
        <div className="container mx-auto px-4 py-6 text-background/60 text-xs leading-relaxed">
          <h3 className="text-sm font-semibold text-background/80 mb-2">
            Coimbatore Taxi Service — Popular Routes &amp; Vehicles
          </h3>
          <p>
            Roadlink Tours &amp; Travels offers the{" "}
            <Link to="/" className="hover:text-secondary">best taxi service in Coimbatore</Link> with
            24/7 cab booking, <Link to="/services" className="hover:text-secondary">Coimbatore airport taxi</Link>,
            outstation cabs and customised{" "}
            <Link to="/tour-packages/1-day" className="hover:text-secondary">tour packages</Link>.
            Popular outstation routes from Coimbatore: Coimbatore to Ooty taxi, Coimbatore to
            Munnar taxi, Coimbatore to Kodaikanal taxi, Coimbatore to Mysore taxi, Coimbatore to
            Valparai taxi, Coimbatore to Wayanad and Coimbatore to Bangalore. Choose from Sedan,
            SUV, <Link to="/tariff/day-basis" className="hover:text-secondary">Innova rental Coimbatore</Link>,
            Innova Crysta, <Link to="/tariff/km-basis" className="hover:text-secondary">Tempo Traveller Coimbatore</Link>,
            Urbania, Coach Van and luxury sedan rentals (Audi, Mercedes-Benz, BMW, Jaguar) for
            airport transfers, weddings, corporate travel and family trips.
          </p>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/60">
            <p>© {currentYear} Roadlink Tours and Travels. All rights reserved.</p>
            <p>Designed by - Digi Eyez</p>
            <p>Taxi Services in Coimbatore, Tamil Nadu</p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
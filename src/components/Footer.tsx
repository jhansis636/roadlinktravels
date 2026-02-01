import { Phone, MessageCircle, MapPin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    "Local Taxi Services",
    "Outstation Taxi",
    "Airport Pickup & Drop",
    "Corporate Travel",
    "Family Trips",
    "Tourist Packages",
  ];

  const quickLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About Us" },
    { href: "#services", label: "Services" },
    { href: "#why-us", label: "Why Choose Us" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
    { href: "/admin/login", label: "Admin" },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">K</span>
              </div>
              <div>
                <span className="text-xl font-bold">Kavya</span>
                <span className="text-xl font-bold text-secondary">Travels</span>
              </div>
            </div>
            <p className="text-background/70 mb-6 text-sm leading-relaxed">
              Your trusted taxi service partner in Coimbatore. Safe, reliable, and 
              affordable travel solutions for all your needs.
            </p>
            <div className="flex gap-3">
              <a
                href="tel:+919876543210"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@kavyatravels.com"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-secondary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-background/70 hover:text-secondary transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Phone</div>
                  <a
                    href="tel:+919876543210"
                    className="text-background/70 text-sm hover:text-secondary"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Email</div>
                  <a
                    href="mailto:info@kavyatravels.com"
                    className="text-background/70 text-sm hover:text-secondary"
                  >
                    info@kavyatravels.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Service Area</div>
                  <span className="text-background/70 text-sm">
                    Coimbatore, Tamil Nadu
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/60">
            <p>© {currentYear} KavyaTravels. All rights reserved.</p>
            <p>Taxi Services in Coimbatore, Tamil Nadu</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

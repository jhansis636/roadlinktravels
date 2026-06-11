import { useState } from "react";
import { Phone, Menu, X, Download, ChevronDown, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import BookingModal from "./BookingModal";

const tourPackages = [
  { href: "/tour-packages/1-day", label: "One Day Tour Packages" },
  { href: "/tour-packages/2-days", label: "Two Days Tour Packages" },
  { href: "/tour-packages/3-days", label: "Three Days Tour Packages" },
  { href: "/tour-packages/4-days", label: "Four Days Tour Packages" },
  { href: "/tour-packages/5-days", label: "Five Days Tour Packages" },
  { href: "/tour-packages/6-days", label: "Six Days Tour Packages" },
  { href: "/tour-packages/7-days", label: "Seven Days Tour Packages" },
  { href: "/tour-packages/8-days", label: "Eight Days Tour Packages" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isTariffOpen, setIsTariffOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const location = useLocation();
  const { canInstall, installApp, isInstalled } = usePWAInstall();
  const { toast } = useToast();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
  ];

  const tariffItems = [
    { href: "/tariff/day-basis", label: "Outstation Tariff Day Basis" },
    { href: "/tariff/km-basis", label: "Outstation Tariff Kilometre Basis" },
  ];

  const isTariffActive = location.pathname.startsWith("/tariff");

  const navLinksAfterTour = [
    { href: "/why-us", label: "Why Us" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/payment-review", label: "Payment / Review" },
    { href: "/contact", label: "Contact Us" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isTourActive = location.pathname.startsWith("/tour-packages");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Roadlink Tours and Travels" className="h-14 md:h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-3 xl:px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                  isActive(link.href)
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Tariff Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsTariffOpen(true)}
              onMouseLeave={() => setIsTariffOpen(false)}
            >
              <button
                className={cn(
                  "flex items-center gap-1 px-3 xl:px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer",
                  isTariffActive
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary hover:bg-muted"
                )}
              >
                Tariff
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-300",
                    isTariffOpen && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "absolute top-full left-0 pt-2 transition-all duration-200",
                  isTariffOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                )}
              >
                <div className="bg-background rounded-lg border border-border shadow-xl py-2 min-w-[300px]">
                  {tariffItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "block px-4 py-2.5 text-sm transition-all duration-200 cursor-pointer",
                        isActive(item.href)
                          ? "bg-[hsl(152,73%,18%)] text-white font-semibold"
                          : "text-foreground/80 hover:bg-[hsl(152,73%,18%)]/10 hover:text-[hsl(152,73%,18%)] hover:font-semibold hover:pl-5"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="relative group"
              onMouseEnter={() => setIsTourOpen(true)}
              onMouseLeave={() => setIsTourOpen(false)}
            >
              <button
                className={cn(
                  "flex items-center gap-1 px-3 xl:px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer",
                  isTourActive
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary hover:bg-muted"
                )}
              >
                Tour Packages
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-300",
                    isTourOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Dropdown */}
              <div
                className={cn(
                  "absolute top-full left-0 pt-2 transition-all duration-200",
                  isTourOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                )}
              >
                <div className="bg-background rounded-lg border border-border shadow-xl py-2 min-w-[260px]">
                  {tourPackages.map((pkg) => (
                    <Link
                      key={pkg.href}
                      to={pkg.href}
                      className={cn(
                        "block px-4 py-2.5 text-sm transition-all duration-200 cursor-pointer",
                        isActive(pkg.href)
                          ? "bg-[hsl(152,73%,18%)] text-white font-semibold"
                          : "text-foreground/80 hover:bg-[hsl(152,73%,18%)]/10 hover:text-[hsl(152,73%,18%)] hover:font-semibold hover:pl-5"
                      )}
                    >
                      {pkg.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navLinksAfterTour.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-3 xl:px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                  isActive(link.href)
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setIsBookingOpen(true)}>
              <CalendarCheck className="w-4 h-4 mr-1" />
              Book Online
            </Button>
            {!isInstalled && (
              <Button variant="outline" size="sm" onClick={async () => {
                const prompted = await installApp();
                if (!prompted) {
                  toast({ title: "Install feature not supported on this browser.", description: "Try opening this website in Chrome on Android for the best experience." });
                }
              }} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Install App
              </Button>
            )}
            <Button variant="outline" size="sm" asChild>
              <a href="tel:+918248199154" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </Button>
            <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
              <a
                href="https://wa.me/918248199154?text=Hi, I want to book a taxi"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-2.5 rounded-md transition-colors font-medium text-sm",
                    isActive(link.href)
                      ? "text-primary bg-primary/5"
                      : "text-foreground/80 hover:text-primary hover:bg-muted"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Tariff Accordion */}
              <div>
                <button
                  onClick={() => setIsTariffOpen(!isTariffOpen)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-2.5 rounded-md transition-colors font-medium text-sm cursor-pointer",
                    isTariffActive
                      ? "text-primary bg-primary/5"
                      : "text-foreground/80 hover:text-primary hover:bg-muted"
                  )}
                >
                  Tariff
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      isTariffOpen && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isTariffOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="ml-4 border-l-2 border-border pl-3 py-1">
                    {tariffItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={cn(
                          "block px-3 py-2 rounded-md text-sm transition-all duration-200",
                          isActive(item.href)
                            ? "text-[hsl(152,73%,18%)] font-semibold bg-[hsl(152,73%,18%)]/10"
                            : "text-foreground/70 hover:text-[hsl(152,73%,18%)] hover:bg-[hsl(152,73%,18%)]/5 hover:font-semibold"
                        )}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsTariffOpen(false);
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Tour Packages Accordion */}
              <div>
                <button
                  onClick={() => setIsTourOpen(!isTourOpen)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-2.5 rounded-md transition-colors font-medium text-sm cursor-pointer",
                    isTourActive
                      ? "text-primary bg-primary/5"
                      : "text-foreground/80 hover:text-primary hover:bg-muted"
                  )}
                >
                  Tour Packages
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      isTourOpen && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isTourOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="ml-4 border-l-2 border-border pl-3 py-1">
                    {tourPackages.map((pkg) => (
                      <Link
                        key={pkg.href}
                        to={pkg.href}
                        className={cn(
                          "block px-3 py-2 rounded-md text-sm transition-all duration-200",
                          isActive(pkg.href)
                            ? "text-[hsl(152,73%,18%)] font-semibold bg-[hsl(152,73%,18%)]/10"
                            : "text-foreground/70 hover:text-[hsl(152,73%,18%)] hover:bg-[hsl(152,73%,18%)]/5 hover:font-semibold"
                        )}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsTourOpen(false);
                        }}
                      >
                        {pkg.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {navLinksAfterTour.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-2.5 rounded-md transition-colors font-medium text-sm",
                    isActive(link.href)
                      ? "text-primary bg-primary/5"
                      : "text-foreground/80 hover:text-primary hover:bg-muted"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border mt-2">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2" onClick={() => { setIsMenuOpen(false); setIsBookingOpen(true); }}>
                  <CalendarCheck className="w-4 h-4" />
                  Book Online
                </Button>
                {!isInstalled && (
                  <Button variant="outline" onClick={async () => {
                    const prompted = await installApp();
                    if (!prompted) {
                      toast({ title: "Install feature not supported on this browser.", description: "Try opening this website in Chrome on Android for the best experience." });
                    }
                  }} className="flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Install App
                  </Button>
                )}
                <Button variant="outline" asChild>
                  <a href="tel:+918248199154" className="flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                </Button>
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
                  <a
                    href="https://wa.me/918248199154?text=Hi, I want to book a taxi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp Booking
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
      <BookingModal open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </header>
  );
};

export default Header;

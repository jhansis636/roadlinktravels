import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Info, Briefcase, Wallet, MapPinned, Sparkles, MessageSquareQuote, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { useIsMobile } from "@/hooks/use-mobile";

const items = [
  { label: "About Us", to: "/about", Icon: Info },
  { label: "Services", to: "/services", Icon: Briefcase },
  { label: "Tariff", to: "/tariff/day-basis", Icon: Wallet },
  { label: "Tour Packages", to: "/tour-packages", Icon: MapPinned },
  { label: "Why Us", to: "/why-us", Icon: Sparkles },
  { label: "Testimonials", to: "/testimonials", Icon: MessageSquareQuote },
  { label: "Contact Us", to: "/contact", Icon: Phone },
];

const RadialLogoMenu = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const wrapRef = useRef<HTMLDivElement>(null);

  // close on outside click (mobile)
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, [open]);

  // open on scroll into view (mobile)
  useEffect(() => {
    if (!isMobile || !wrapRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          setOpen(true);
        }
      },
      { threshold: [0, 0.6, 1] }
    );
    obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, [isMobile]);

  const radius = isMobile ? 130 : 180;
  const count = items.length;

  return (
    <section className="py-12 bg-gradient-to-b from-background via-muted/40 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          ref={wrapRef}
          className="relative mx-auto flex items-center justify-center"
          style={{ height: isMobile ? 360 : 460, width: "100%" }}
          onMouseEnter={() => !isMobile && setOpen(true)}
          onMouseLeave={() => !isMobile && setOpen(false)}
        >
          {/* Rotating ring */}
          <div
            className="absolute rounded-full border-2 border-dashed border-primary/40"
            style={{
              width: radius * 2 + 40,
              height: radius * 2 + 40,
              animation: "spin 18s linear infinite",
            }}
          />
          {/* Pulse ring */}
          <div
            className="absolute rounded-full bg-primary/10"
            style={{
              width: 180,
              height: 180,
              animation: "pulse-soft 2.4s ease-in-out infinite",
            }}
          />

          {/* Orbiting buttons */}
          {items.map((item, i) => {
            // start at top (-90deg) and distribute
            const angle = (-90 + (360 / count) * i) * (Math.PI / 180);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const delay = open ? i * 0.05 : (count - i) * 0.03;
            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="absolute group"
                style={{
                  transform: open
                    ? `translate(${x}px, ${y}px) scale(1)`
                    : `translate(0px, 0px) scale(0.2)`,
                  opacity: open ? 1 : 0,
                  pointerEvents: open ? "auto" : "none",
                  transition: `transform 0.55s cubic-bezier(0.34,1.56,0.64,1) ${delay}s, opacity 0.4s ease ${delay}s`,
                  willChange: "transform, opacity",
                }}
              >
                <div
                  className="flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 text-center backdrop-blur-md border border-white/30 shadow-lg hover:scale-110 hover:shadow-2xl hover:border-primary/60 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--background) / 0.85), hsl(var(--card) / 0.7))",
                    minWidth: isMobile ? 78 : 96,
                  }}
                >
                  <item.Icon className="w-5 h-5 text-primary" />
                  <span className="text-[11px] md:text-xs font-semibold text-foreground whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}

          {/* Center logo */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="relative z-10 rounded-full p-3 transition-transform duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "radial-gradient(circle at 30% 30%, hsl(var(--background)), hsl(var(--muted)))",
              boxShadow:
                "0 0 0 6px hsl(var(--primary) / 0.08), 0 0 40px hsl(var(--primary) / 0.35), 0 20px 50px -10px hsl(var(--primary) / 0.4)",
            }}
          >
            <img
              src={logo}
              alt="Roadlink Tours and Travels"
              className="object-contain"
              style={{
                width: isMobile ? 110 : 150,
                height: isMobile ? 110 : 150,
                filter: "drop-shadow(0 4px 12px hsl(var(--primary) / 0.4))",
              }}
            />
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-2">
          {isMobile ? "Tap the logo to explore" : "Hover the logo to explore"}
        </p>
      </div>

      <style>{`
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); opacity: 0.35; }
          50% { transform: scale(1.15); opacity: 0.15; }
        }
      `}</style>
    </section>
  );
};

export default RadialLogoMenu;

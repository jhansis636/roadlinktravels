import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Info, Briefcase, Wallet, MapPinned, Sparkles, MessageSquareQuote, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { useIsMobile } from "@/hooks/use-mobile";

type SubItem = { label: string; to: string };
type RadialItem = {
  label: string;
  to?: string;
  Icon: typeof Info;
  submenu?: SubItem[];
};

const items: RadialItem[] = [
  { label: "About Us", to: "/about", Icon: Info },
  { label: "Services", to: "/services", Icon: Briefcase },
  {
    label: "Tariff",
    Icon: Wallet,
    submenu: [
      { label: "Outstation Tariff Day Basis", to: "/tariff/day-basis" },
      { label: "Outstation Tariff Kilometre Basis", to: "/tariff/km-basis" },
    ],
  },
  {
    label: "Tour Packages",
    Icon: MapPinned,
    submenu: [
      { label: "One Day Tour Packages", to: "/tour-packages/1-day" },
      { label: "Two Days Tour Packages", to: "/tour-packages/2-day" },
      { label: "Three Days Tour Packages", to: "/tour-packages/3-day" },
      { label: "Four Days Tour Packages", to: "/tour-packages/4-day" },
      { label: "Five Days Tour Packages", to: "/tour-packages/5-day" },
      { label: "Six Days Tour Packages", to: "/tour-packages/6-day" },
      { label: "Seven Days Tour Packages", to: "/tour-packages/7-day" },
      { label: "Eight Days Tour Packages", to: "/tour-packages/8-day" },
    ],
  },
  { label: "Why Us", to: "/why-us", Icon: Sparkles },
  { label: "Testimonials", to: "/testimonials", Icon: MessageSquareQuote },
  { label: "Contact Us", to: "/contact", Icon: Phone },
];

const RadialLogoMenu = () => {
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const wrapRef = useRef<HTMLDivElement>(null);

  // close on outside click (mobile)
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setOpenSubmenu(null);
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
          onMouseLeave={() => {
            if (!isMobile) {
              setOpen(false);
              setOpenSubmenu(null);
            }
          }}
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
            const hasSub = !!item.submenu;
            const isSubOpen = openSubmenu === item.label;

            const buttonInner = (
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
            );

            // Direction the submenu fans out (away from the center)
            const dirX = Math.cos(angle);
            const dirY = Math.sin(angle);

            return (
              <div
                key={item.label}
                className="absolute"
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
                {hasSub ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenSubmenu(isSubOpen ? null : item.label);
                    }}
                    aria-expanded={isSubOpen}
                    className="group"
                  >
                    {buttonInner}
                  </button>
                ) : (
                  <Link
                    to={item.to!}
                    onClick={() => {
                      setOpen(false);
                      setOpenSubmenu(null);
                    }}
                    className="group"
                  >
                    {buttonInner}
                  </Link>
                )}

                {/* Submenu */}
                {hasSub && (
                  <div
                    className="absolute z-20"
                    style={{
                      // anchor submenu just outward from the item
                      left: "50%",
                      top: "50%",
                      transform: `translate(calc(-50% + ${dirX * 70}px), calc(-50% + ${dirY * 70}px))`,
                      pointerEvents: isSubOpen ? "auto" : "none",
                    }}
                  >
                    <div
                      className="rounded-xl border border-white/30 backdrop-blur-md shadow-2xl p-2 flex flex-col gap-1 min-w-[200px] origin-center"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(var(--background) / 0.95), hsl(var(--card) / 0.9))",
                        opacity: isSubOpen ? 1 : 0,
                        transform: isSubOpen ? "scale(1)" : "scale(0.85)",
                        transition: "opacity 0.25s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                      }}
                    >
                      {item.submenu!.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.to}
                          onClick={() => {
                            setOpen(false);
                            setOpenSubmenu(null);
                          }}
                          className="text-xs md:text-sm font-medium text-foreground/90 hover:text-primary hover:bg-primary/10 rounded-md px-3 py-1.5 transition-colors text-left whitespace-nowrap"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Center logo */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => {
              setOpen((v) => {
                if (v) setOpenSubmenu(null);
                return !v;
              });
            }}
            className="relative z-10 rounded-full p-4 transition-transform duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
            style={{
              background: "radial-gradient(circle at 30% 30%, hsl(var(--background)), hsl(var(--muted)))",
              boxShadow:
                "0 0 0 6px hsl(var(--primary) / 0.08), 0 0 40px hsl(var(--primary) / 0.35), 0 20px 50px -10px hsl(var(--primary) / 0.4)",
              width: isMobile ? 170 : 230,
              height: isMobile ? 170 : 230,
            }}
          >
            <img
              src={logo}
              alt="Roadlink Tours and Travels"
              className="object-contain w-full h-full"
              style={{
                filter: "drop-shadow(0 4px 12px hsl(var(--primary) / 0.4))",
              }}
            />
          </button>
        </div>

        <p className="text-center text-sm font-bold text-black mt-2">
          CLICK THE LOGO TO EXPLORE
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

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Info, Briefcase, Wallet, MapPinned, Sparkles, MessageSquareQuote, CreditCard, Phone } from "lucide-react";
import logo from "@/assets/logo.webp";
import msmeCertificate from "@/assets/msme-certificate.webp";
import radialSectionBg from "@/assets/radial-section-bg.jpg";
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
  { label: "Payment / Review", to: "/payment-review", Icon: CreditCard },
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
    <section
      className="relative py-12 overflow-hidden"
      style={{
        backgroundImage: `url(${radialSectionBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* White overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-white/75" aria-hidden="true" />
      {/* Animated taxi background */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
        {[
          { top: "12%", dur: 26, delay: 0, dir: "ltr", scale: 1, color: "#f5b800" },
          { top: "32%", dur: 34, delay: 6, dir: "rtl", scale: 0.85, color: "#0f5132" },
          { top: "58%", dur: 30, delay: 2, dir: "ltr", scale: 0.9, color: "#222" },
          { top: "78%", dur: 38, delay: 10, dir: "rtl", scale: 1.1, color: "#f5b800" },
          { top: "46%", dur: 42, delay: 14, dir: "ltr", scale: 0.75, color: "#0f5132", mobileHide: true },
          { top: "22%", dur: 36, delay: 18, dir: "rtl", scale: 0.8, color: "#222", mobileHide: true },
        ].map((c, i) => (
          <div
            key={i}
            className={`absolute rl-car ${c.dir === "ltr" ? "rl-ltr" : "rl-rtl"} ${c.mobileHide ? "hidden md:block" : ""}`}
            style={{
              top: c.top,
              animationDuration: `${c.dur}s`,
              animationDelay: `${c.delay}s`,
              transform: `scale(${c.scale})`,
              opacity: 0.18,
            }}
          >
            <svg width="56" height="28" viewBox="0 0 56 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 18 L8 10 Q10 6 14 6 L34 6 Q38 6 42 10 L48 16 L52 17 Q54 17 54 19 L54 22 Q54 24 52 24 L46 24 A4 4 0 0 1 38 24 L18 24 A4 4 0 0 1 10 24 L4 24 Q2 24 2 22 L2 20 Q2 18 4 18 Z" fill={c.color} />
              <rect x="14" y="9" width="8" height="6" rx="1" fill="#cfe8ff" />
              <rect x="24" y="9" width="10" height="6" rx="1" fill="#cfe8ff" />
              <circle cx="14" cy="24" r="3" fill="#1a1a1a" />
              <circle cx="42" cy="24" r="3" fill="#1a1a1a" />
              <rect x="22" y="2" width="12" height="4" rx="1" fill="#fff" stroke="#222" strokeWidth="0.5" />
            </svg>
          </div>
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4">
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
                <item.Icon className="w-5 h-5 text-primary" strokeWidth={2.5} />
                <span
                  className="text-[12px] md:text-sm font-extrabold text-foreground whitespace-nowrap"
                  style={{
                    letterSpacing: "0.03em",
                    textShadow:
                      "0 1px 2px hsl(var(--background) / 0.9), 0 0 6px hsl(var(--background) / 0.6)",
                    WebkitFontSmoothing: "antialiased",
                  }}
                >
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
                          className="text-xs md:text-sm font-bold text-foreground hover:text-primary hover:bg-primary/10 rounded-md px-3 py-1.5 transition-colors text-left whitespace-nowrap"
                          style={{
                            letterSpacing: "0.02em",
                            textShadow: "0 1px 2px hsl(var(--background) / 0.8)",
                          }}
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

        <p
          className="text-center text-sm md:text-base font-extrabold text-black mt-2"
          style={{
            letterSpacing: "0.08em",
            textShadow: "0 1px 2px hsl(0 0% 100% / 0.9), 0 0 8px hsl(0 0% 100% / 0.7)",
          }}
        >
          CLICK THE LOGO TO EXPLORE
        </p>

        <div className="flex justify-center mt-6 mb-2">
          <img
            src={msmeCertificate}
            alt="MSME Certificate - Ministry of MSME, Govt. of India - UDYAM TN-03-0046434"
            className="w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] h-auto object-contain"
            loading="lazy"
          />
        </div>
      </div>

      <style>{`
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); opacity: 0.35; }
          50% { transform: scale(1.15); opacity: 0.15; }
        }
        @keyframes rl-drive-ltr {
          0%   { left: -80px; }
          100% { left: calc(100% + 80px); }
        }
        @keyframes rl-drive-rtl {
          0%   { right: -80px; }
          100% { right: calc(100% + 80px); }
        }
        .rl-car { will-change: transform, left, right; }
        .rl-ltr { animation: rl-drive-ltr linear infinite; }
        .rl-rtl { animation: rl-drive-rtl linear infinite; transform-origin: center; }
        .rl-rtl svg { transform: scaleX(-1); }
        @media (prefers-reduced-motion: reduce) {
          .rl-car { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default RadialLogoMenu;

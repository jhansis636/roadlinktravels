import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Premium parallax road scene with moving taxis.
 * Layers (back -> front): sky gradient, hills, skyline, road, taxis.
 * Pure CSS animations for performance; scroll subtly tweaks speed.
 */
const Taxi = ({
  color = "#facc15",
  flip = false,
  scale = 1,
}: {
  color?: string;
  flip?: boolean;
  scale?: number;
}) => (
  <svg
    viewBox="0 0 220 90"
    width={120 * scale}
    height={50 * scale}
    style={{ transform: flip ? "scaleX(-1)" : undefined, overflow: "visible" }}
    aria-hidden
  >
    {/* shadow */}
    <ellipse cx="110" cy="82" rx="92" ry="6" fill="rgba(0,0,0,0.25)" />
    {/* body */}
    <path
      d="M10 65 Q14 40 38 38 L70 36 Q86 18 120 18 L160 18 Q182 20 196 38 L208 42 Q214 46 214 56 L214 66 Q214 72 208 72 L196 72 A14 14 0 0 0 168 72 L72 72 A14 14 0 0 0 44 72 L18 72 Q10 72 10 66 Z"
      fill={color}
      stroke="#1f2937"
      strokeWidth="1.5"
    />
    {/* roof sign */}
    <rect x="98" y="6" width="34" height="12" rx="2" fill="#111827" />
    <text x="115" y="15" fontSize="8" fill="#facc15" textAnchor="middle" fontWeight="700" fontFamily="Arial">TAXI</text>
    {/* windows */}
    <path d="M78 38 L92 22 L150 22 L168 38 Z" fill="#1e293b" opacity="0.85" />
    <path d="M122 22 L122 38" stroke="#0f172a" strokeWidth="1.5" />
    {/* checker stripe */}
    <g>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x={30 + i * 18} y={50} width={9} height={6} fill={i % 2 === 0 ? "#111827" : "#fff"} />
      ))}
    </g>
    {/* headlight */}
    <circle cx="208" cy="50" r="3" fill="#fde68a" />
    <circle cx="14" cy="56" r="2" fill="#ef4444" />
    {/* wheels */}
    <circle cx="58" cy="72" r="11" fill="#111827" />
    <circle cx="58" cy="72" r="4" fill="#9ca3af" />
    <circle cx="182" cy="72" r="11" fill="#111827" />
    <circle cx="182" cy="72" r="4" fill="#9ca3af" />
  </svg>
);

const AnimatedRoadScene = () => {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);

  // Subtle scroll-based speed boost via CSS variable
  useEffect(() => {
    let raf = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    const tick = () => {
      const now = performance.now();
      const dy = Math.abs(window.scrollY - lastY);
      const dt = Math.max(1, now - lastT);
      const v = Math.min(2.2, 1 + (dy / dt) * 1.5); // 1x..2.2x
      ref.current?.style.setProperty("--speed", v.toFixed(2));
      lastY = window.scrollY;
      lastT = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const taxiCount = isMobile ? 2 : 4;
  const reverseCount = isMobile ? 1 : 2;

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={
        {
          height: isMobile ? 240 : 320,
          background:
            "linear-gradient(to bottom, hsl(200 80% 92%) 0%, hsl(195 70% 85%) 45%, hsl(40 30% 88%) 70%, hsl(40 25% 80%) 100%)",
          ["--speed" as never]: 1,
        } as React.CSSProperties
      }
      aria-label="Animated road with taxis"
    >
      {/* Sun */}
      <div
        className="absolute rounded-full"
        style={{
          width: 70,
          height: 70,
          top: "8%",
          right: "12%",
          background: "radial-gradient(circle, #fde68a 0%, #fbbf24 60%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />

      {/* Hills (back) */}
      <svg
        className="absolute bottom-[35%] left-0 w-[200%] h-[40%]"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        style={{ animation: "scene-pan-slow calc(80s / var(--speed)) linear infinite" }}
      >
        <path d="M0 180 Q150 80 300 140 T600 130 T900 150 T1200 120 L1200 200 L0 200 Z" fill="hsl(150 30% 55%)" opacity="0.55" />
      </svg>

      {/* Skyline (mid) */}
      <svg
        className="absolute bottom-[32%] left-0 w-[200%] h-[30%]"
        viewBox="0 0 1200 150"
        preserveAspectRatio="none"
        style={{ animation: "scene-pan-mid calc(50s / var(--speed)) linear infinite" }}
      >
        {Array.from({ length: 30 }).map((_, i) => {
          const x = i * 40;
          const h = 30 + ((i * 37) % 70);
          return <rect key={i} x={x} y={150 - h} width={28} height={h} fill="hsl(150 25% 35%)" opacity="0.55" />;
        })}
      </svg>

      {/* Trees */}
      <svg
        className="absolute bottom-[30%] left-0 w-[200%] h-[20%]"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        style={{ animation: "scene-pan-fast calc(30s / var(--speed)) linear infinite" }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <g key={i} transform={`translate(${i * 50 + (i % 2) * 15} ${60 + (i % 3) * 6})`}>
            <circle cx="10" cy="20" r="14" fill="hsl(140 35% 30%)" />
            <rect x="8" y="28" width="4" height="10" fill="#5b3a1a" />
          </g>
        ))}
      </svg>

      {/* Road */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "30%",
          background:
            "linear-gradient(to bottom, #2a2a2e 0%, #1a1a1d 60%, #0f0f12 100%)",
        }}
      >
        {/* lane markings */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "48%",
            height: 4,
            backgroundImage:
              "repeating-linear-gradient(to right, #fde68a 0 36px, transparent 36px 72px)",
            animation: "road-dash calc(1.4s / var(--speed)) linear infinite",
            opacity: 0.9,
          }}
        />
        {/* edge lines */}
        <div className="absolute left-0 right-0 top-[6%]" style={{ height: 2, background: "rgba(255,255,255,0.4)" }} />
        <div className="absolute left-0 right-0 bottom-[8%]" style={{ height: 2, background: "rgba(255,255,255,0.4)" }} />
      </div>

      {/* Taxis going right */}
      {Array.from({ length: taxiCount }).map((_, i) => {
        const dur = 14 + i * 6;
        const delay = -(i * (dur / taxiCount));
        const lane = i % 2 === 0 ? "10%" : "2%";
        const scale = i % 2 === 0 ? 1 : 0.85;
        const colors = ["#facc15", "#f59e0b", "#fbbf24", "#eab308"];
        return (
          <div
            key={`r-${i}`}
            className="absolute"
            style={{
              bottom: lane,
              left: 0,
              animation: `taxi-right ${dur}s linear infinite`,
              animationDelay: `${delay}s`,
              animationDuration: `calc(${dur}s / var(--speed))`,
              filter: "drop-shadow(0 6px 6px rgba(0,0,0,0.35))",
            }}
          >
            <Taxi color={colors[i % colors.length]} scale={scale} />
          </div>
        );
      })}

      {/* Taxis going left */}
      {Array.from({ length: reverseCount }).map((_, i) => {
        const dur = 18 + i * 5;
        const delay = -(i * (dur / Math.max(1, reverseCount)) + 3);
        const lane = i % 2 === 0 ? "18%" : "22%";
        const scale = 0.75 - i * 0.05;
        const colors = ["#1f2937", "#111827"];
        return (
          <div
            key={`l-${i}`}
            className="absolute"
            style={{
              bottom: lane,
              right: 0,
              animation: `taxi-left ${dur}s linear infinite`,
              animationDelay: `${delay}s`,
              animationDuration: `calc(${dur}s / var(--speed))`,
              filter: "drop-shadow(0 4px 5px rgba(0,0,0,0.3)) blur(0.3px)",
            }}
          >
            <Taxi color={colors[i % colors.length]} flip scale={scale} />
          </div>
        );
      })}

      {/* Soft top and bottom fade to blend with surrounding sections */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-background/80 to-transparent" />

      <style>{`
        @keyframes taxi-right {
          0%   { transform: translateX(-15vw); }
          100% { transform: translateX(115vw); }
        }
        @keyframes taxi-left {
          0%   { transform: translateX(15vw) scaleX(1); }
          100% { transform: translateX(-115vw) scaleX(1); }
        }
        @keyframes road-dash {
          0%   { background-position: 0 0; }
          100% { background-position: -72px 0; }
        }
        @keyframes scene-pan-slow {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scene-pan-mid {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scene-pan-fast {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-label="Animated road with taxis"] * {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedRoadScene;
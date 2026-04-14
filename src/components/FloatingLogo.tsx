import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import floatingLogo from "@/assets/floating-logo.png";

const FloatingLogo = ({ onBookingClick }: { onBookingClick: () => void }) => {
  const logoRef = useRef<HTMLImageElement>(null);
  const [hidden, setHidden] = useState(false);
  const posRef = useRef({ x: 100, y: 100, vx: 1.5, vy: 1.2 });
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const el = logoRef.current;
    if (!el) return;
    const p = posRef.current;
    const isMobile = window.innerWidth < 768;
    const size = isMobile ? 70 : 90;
    const maxX = window.innerWidth - size;
    const maxY = window.innerHeight - size;
    const speed = isMobile ? 0.7 : 1;

    p.x += p.vx * speed;
    p.y += p.vy * speed;

    if (p.x <= 0 || p.x >= maxX) { p.vx *= -1; p.x = Math.max(0, Math.min(p.x, maxX)); }
    if (p.y <= 0 || p.y >= maxY) { p.vy *= -1; p.y = Math.max(0, Math.min(p.y, maxY)); }

    el.style.transform = `translate(${p.x}px, ${p.y}px)`;
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (hidden) return;
    posRef.current = {
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
      vx: (Math.random() > 0.5 ? 1 : -1) * (1.2 + Math.random() * 0.6),
      vy: (Math.random() > 0.5 ? 1 : -1) * (1 + Math.random() * 0.5),
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hidden, animate]);

  const handleClick = () => {
    setHidden(true);
    cancelAnimationFrame(rafRef.current);
    onBookingClick();
  };

  if (hidden) return null;

  return (
    <img
      ref={logoRef}
      src={floatingLogo}
      alt="Roadlink Logo"
      onClick={handleClick}
      onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.15, duration: 0.3, ease: "back.out(1.7)" })}
      onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })}
      className="fixed top-0 left-0 cursor-pointer drop-shadow-lg"
      style={{
        zIndex: 9999,
        width: "clamp(70px, 12vw, 100px)",
        height: "auto",
        background: "none",
        border: "none",
        pointerEvents: "auto",
        willChange: "transform",
      }}
    />
  );
};

export default FloatingLogo;

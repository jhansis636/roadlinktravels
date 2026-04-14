import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // Hero text animation
      gsap.from("[data-anim='hero-text']", {
        opacity: 0,
        scale: 0.6,
        y: 120,
        rotateX: isMobile ? 10 : 25,
        rotateY: isMobile ? 5 : 10,
        filter: isMobile ? "blur(0px)" : "blur(10px)",
        duration: 1.4,
        ease: "back.out(1.7)",
        stagger: 0.2,
        delay: 0.3,
      });

      // Hero buttons with bounce
      gsap.from("[data-anim='hero-buttons']", {
        opacity: 0,
        scale: 0.5,
        y: 80,
        rotateX: isMobile ? 5 : 15,
        duration: 1.2,
        ease: "back.out(2)",
        delay: 0.8,
      });

      // Dramatic 3D entrance for sections
      const sections = containerRef.current!.querySelectorAll("[data-anim='section']");
      sections.forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 20%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          scale: 0.6,
          y: 120,
          rotateX: isMobile ? 8 : 25,
          rotateY: isMobile ? 3 : 10,
          filter: isMobile ? "blur(0px)" : "blur(10px)",
          duration: 1.4,
          ease: "back.out(1.7)",
        });
      });

      // Staggered cards animation
      const cardGroups = containerRef.current!.querySelectorAll("[data-anim='card-group']");
      cardGroups.forEach((group) => {
        const cards = group.querySelectorAll("[data-anim='card']");
        gsap.from(cards, {
          scrollTrigger: {
            trigger: group,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          scale: 0.6,
          y: 120,
          rotateX: isMobile ? 8 : 25,
          rotateY: isMobile ? 3 : 10,
          filter: isMobile ? "blur(0px)" : "blur(10px)",
          duration: 1.2,
          ease: "back.out(1.7)",
          stagger: 0.2,
        });
      });

      // Parallax backgrounds
      const parallaxBgs = containerRef.current!.querySelectorAll("[data-anim='parallax-bg']");
      parallaxBgs.forEach((bg) => {
        gsap.to(bg, {
          scrollTrigger: {
            trigger: bg,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          y: -100,
          ease: "none",
        });
      });

      // Parallax foreground (faster)
      const parallaxFgs = containerRef.current!.querySelectorAll("[data-anim='parallax-fg']");
      parallaxFgs.forEach((fg) => {
        gsap.to(fg, {
          scrollTrigger: {
            trigger: fg,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          y: 60,
          ease: "none",
        });
      });

      // Overshoot scale effect for images/banners
      const banners = containerRef.current!.querySelectorAll("[data-anim='banner']");
      banners.forEach((banner) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: banner,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
        tl.from(banner, {
          opacity: 0,
          scale: 0.6,
          y: 100,
          rotateX: isMobile ? 5 : 20,
          filter: isMobile ? "blur(0px)" : "blur(8px)",
          duration: 1,
          ease: "back.out(1.7)",
        }).to(banner, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        }).to(banner, {
          scale: 1,
          duration: 0.4,
          ease: "elastic.out(1, 0.5)",
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
};

// 3D tilt on hover for cards
export const useTilt3D = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.innerWidth < 768) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotateY: x * 15,
        rotateX: -y * 15,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return ref;
};

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(glow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(glow, { opacity: 0, duration: 0.3 });
    };

    const onMouseEnter = () => {
      gsap.to(glow, { opacity: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow hidden md:block" />;
}

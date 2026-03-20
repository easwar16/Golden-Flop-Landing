"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(glow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const onLeave = () => gsap.to(glow, { opacity: 0, duration: 0.3 });
    const onEnter = () => gsap.to(glow, { opacity: 1, duration: 0.3 });

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow hidden lg:block" />;
}

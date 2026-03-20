"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  return containerRef;
}

export function useFadeInOnScroll(
  options: {
    y?: number;
    duration?: number;
    start?: string;
    stagger?: number;
    childSelector?: string;
  } = {}
) {
  const {
    y = 40,
    duration = 0.8,
    start = "top 85%",
    stagger = 0.1,
    childSelector,
  } = options;
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const targets = childSelector
        ? ref.current.querySelectorAll(childSelector)
        : ref.current;

      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        stagger: childSelector ? stagger : 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: ref }
  );

  return ref;
}

"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   1. useFloating — slow oscillation loop
   ═══════════════════════════════════════════ */
export function useFloating(
  selector: string,
  options?: {
    y?: number;
    rotation?: number;
    duration?: number;
    delay?: number;
  }
) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const { y = -15, rotation = 0, duration = 3.5, delay = 0 } = options || {};
      gsap.to(selector, {
        y,
        rotation,
        duration,
        delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope }
  );

  return scope;
}

/* ═══════════════════════════════════════════
   2. useStaggerReveal — scroll-triggered entrance
   ═══════════════════════════════════════════ */
export function useStaggerReveal(
  selector: string,
  options?: {
    y?: number;
    stagger?: number;
    duration?: number;
    start?: string;
    trigger?: string;
  }
) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const {
        y = 60,
        stagger = 0.15,
        duration = 0.8,
        start = "top 82%",
        trigger,
      } = options || {};

      gsap.from(selector, {
        opacity: 0,
        y,
        stagger,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: trigger || selector,
          start,
        },
      });
    },
    { scope }
  );

  return scope;
}

/* ═══════════════════════════════════════════
   3. useParallax — scrub-linked scroll motion
   ═══════════════════════════════════════════ */
export function useParallax(
  selector: string,
  options?: {
    yPercent?: number;
    scale?: number;
    start?: string;
    end?: string;
  }
) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const {
        yPercent = -20,
        scale,
        start = "top bottom",
        end = "bottom top",
      } = options || {};

      const vars: gsap.TweenVars = {
        yPercent,
        ease: "none",
        scrollTrigger: {
          trigger: selector,
          start,
          end,
          scrub: true,
        },
      };
      if (scale !== undefined) vars.scale = scale;

      gsap.to(selector, vars);
    },
    { scope }
  );

  return scope;
}

/* ═══════════════════════════════════════════
   4. useCountUp — animate a number on viewport enter
   ═══════════════════════════════════════════ */
export function useCountUp(target: number, duration = 2) {
  const ref = useRef<HTMLSpanElement>(null);
  const ran = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !ran.current) {
          ran.current = true;
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = Math.floor(obj.v).toLocaleString();
            },
          });
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return ref;
}

/* ═══════════════════════════════════════════
   5. useGlowPulse — repeating box-shadow pulse
   ═══════════════════════════════════════════ */
export function useGlowPulse(
  selector: string,
  color: string = "0,240,255",
  options?: { scope?: React.RefObject<HTMLElement | null> }
) {
  useGSAP(
    () => {
      gsap.to(selector, {
        boxShadow: `0 0 40px rgba(${color},0.45), 0 0 90px rgba(${color},0.15)`,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: options?.scope }
  );
}

/* ═══════════════════════════════════════════
   6. useMagneticButton — cursor-follow effect
   ═══════════════════════════════════════════ */
export function useMagneticButton() {
  const ref = useRef<HTMLElement>(null);

  const onMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    gsap.to(el, {
      x: (e.clientX - cx) * 0.2,
      y: (e.clientY - cy) * 0.2,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const onLeave = useCallback(() => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [onMove, onLeave]);

  return ref;
}

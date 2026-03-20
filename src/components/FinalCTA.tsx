"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.from(".cta-content", {
        opacity: 0,
        scale: 0.9,
        y: 40,
        duration: 0.9,
        ease: "power2.out",
      });

      // Button pulse animation
      gsap.to(".cta-pulse", {
        boxShadow: "0 0 60px rgba(212, 168, 67, 0.4), 0 0 120px rgba(212, 168, 67, 0.1)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="cta" className="relative py-32 px-6">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,#0d3b1e20,transparent)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />

      <div className="cta-content relative max-w-3xl mx-auto text-center">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Join the table
        </h2>
        <p className="text-xl text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed">
          The cards are dealt. The pot is growing. Your seat is waiting.
        </p>

        <button className="cta-pulse group relative px-12 py-5 rounded-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(212,168,67,0.3)]">
          Play Now
          <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        <p className="mt-6 text-zinc-500 text-sm">
          No download required. Connect your wallet and start playing.
        </p>
      </div>
    </section>
  );
}

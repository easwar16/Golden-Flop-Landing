"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Content slides up
      gsap.from(".cta-content", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: ".cta-content", start: "top 80%" },
      });

      // Button gold glow pulse
      gsap.to(".cta-btn-glow", {
        boxShadow:
          "0 0 50px rgba(255,200,87,0.45), 0 0 100px rgba(255,200,87,0.15)",
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Decorative orbs pulse
      gsap.to(".cta-orb", {
        scale: 1.2,
        opacity: 0.7,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1,
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="cta"
      className="relative py-32 md:py-44 px-4 sm:px-6 overflow-hidden"
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-bg-dark/60 backdrop-blur-sm pointer-events-none" />

      {/* BG glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="cta-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-gold/[0.03] blur-[120px]" />
        <div className="cta-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[250px] rounded-full bg-cyan/[0.025] blur-[80px]" />
        <div className="cta-orb absolute top-[30%] left-[20%] w-[200px] h-[200px] rounded-full bg-pink/[0.02] blur-[100px]" />
      </div>

      {/* Decorative top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-lg h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="cta-content relative max-w-2xl mx-auto text-center">
        {/* Label */}
        <span className="t-label text-[10px] text-gold/60 block mb-6 tracking-widest">
          {"<"} FINAL CALL {">"}
        </span>

        {/* Title */}
        <h2 className="t-section grad-gold glow-gold mb-6 text-[clamp(1.2rem,3vw,2rem)]">
          YOUR SEAT IS WAITING
        </h2>

        {/* Description */}
        <p className="text-[#9CA3AF] text-base md:text-lg mb-12 max-w-md mx-auto leading-relaxed">
          Connect your wallet, pick your table, and play the first on-chain
          poker experience built for real players.
        </p>

        {/* CTA Button — Gold */}
        <a
          href="#"
          className="cta-btn-glow inline-block t-btn text-sm px-14 py-5 rounded-xl bg-gradient-to-r from-gold via-[#FFE29A] to-gold text-bg-dark transition-all duration-300 hover:scale-105 box-glow-gold relative group"
        >
          ENTER TABLE
          <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>

        {/* Powered by */}
        <p className="t-label text-[8px] text-zinc-600 mt-10 tracking-[0.2em]">
          POWERED BY SOLANA
        </p>
      </div>
    </section>
  );
}

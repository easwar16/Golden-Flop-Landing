"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.6, delay: 0.5 })
      .from(".hero-title", { y: 60, opacity: 0, duration: 0.9 }, "-=0.3")
      .from(".hero-subtitle", { y: 40, opacity: 0, duration: 0.7 }, "-=0.5")
      .from(".hero-cta", { y: 30, opacity: 0, stagger: 0.15, duration: 0.6 }, "-=0.3")
      .from(".hero-stats", { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.2");

    // Parallax background
    gsap.to(bgRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0">
        {/* Radial gradient for poker table feel */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,#0d3b1e_0%,#061a0d_40%,#0a0a0a_100%)]" />
        {/* Gold accent glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,168,67,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-sm mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Live on Solana Mainnet
        </div>

        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
          <span className="text-white">Real-time poker.</span>
          <br />
          <span className="text-gradient-gold">On-chain.</span>
          <br />
          <span className="text-white">Provably fair.</span>
        </h1>

        <p className="hero-subtitle text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Play multiplayer poker with bots and real players, powered by Solana.
          Lightning-fast settlement. Verifiable outcomes. No house edge.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="hero-cta group relative px-8 py-4 rounded-full bg-gradient-to-r from-gold to-gold-light text-black font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,168,67,0.4)] hover:scale-105">
            Play Now
            <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <button className="hero-cta px-8 py-4 rounded-full border border-white/10 text-white font-medium text-lg hover:bg-white/5 hover:border-white/20 transition-all duration-300">
            View Demo
          </button>
        </div>

        <div className="flex justify-center gap-12 md:gap-16">
          <div className="hero-stats text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">10K+</div>
            <div className="text-xs text-zinc-500 mt-1">Active Players</div>
          </div>
          <div className="hero-stats text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">$2M+</div>
            <div className="text-xs text-zinc-500 mt-1">Settled On-chain</div>
          </div>
          <div className="hero-stats text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">&lt;200ms</div>
            <div className="text-xs text-zinc-500 mt-1">Avg Latency</div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}

"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function GameplayPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Heading
      gsap.from(".gp-heading", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: ".gp-heading", start: "top 85%" },
      });

      // Main preview card — parallax + scale
      gsap.from(".gp-preview", {
        opacity: 0,
        scale: 0.92,
        y: 60,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".gp-preview", start: "top 80%" },
      });

      // Parallax on inner elements
      gsap.to(".gp-table", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ".gp-preview",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Side cards
      gsap.from(".gp-side-card", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ".gp-side-cards", start: "top 80%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="gameplay" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="gp-heading text-center mb-16">
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
            Gameplay
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built for serious players
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            A premium poker experience designed for speed, strategy, and stakes.
          </p>
        </div>

        {/* Main preview */}
        <div className="gp-preview relative rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-b from-green-dark to-[#0a0a0a] p-1 mb-12">
          <div className="rounded-[22px] overflow-hidden bg-gradient-to-b from-green-felt/50 to-[#0a0a0a] p-8 md:p-16 relative">
            {/* Mock poker table UI */}
            <div className="gp-table relative">
              {/* Table */}
              <div className="mx-auto max-w-2xl aspect-[2/1] rounded-[50%] bg-gradient-to-b from-[#1a5c35] to-[#0f3d22] border-4 border-[#8B6914]/40 shadow-[inset_0_0_60px_rgba(0,0,0,0.5)] flex items-center justify-center relative">
                {/* Center pot */}
                <div className="text-center">
                  <div className="text-zinc-400 text-xs mb-1">POT</div>
                  <div className="text-gold text-2xl md:text-3xl font-bold">
                    42.5 SOL
                  </div>
                </div>

                {/* Community cards */}
                <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 flex gap-2">
                  {["A♠", "K♥", "10♦", "7♣", "?"].map((card, i) => (
                    <div
                      key={i}
                      className={`w-10 h-14 md:w-12 md:h-16 rounded-lg flex items-center justify-center text-sm md:text-base font-bold shadow-lg ${
                        card === "?"
                          ? "bg-gradient-to-br from-gold/30 to-gold/10 text-gold border border-gold/30"
                          : "bg-white text-black"
                      }`}
                    >
                      {card}
                    </div>
                  ))}
                </div>

                {/* Players around the table */}
                {[
                  { pos: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2", name: "Player 3", bal: "12.4" },
                  { pos: "top-1/4 right-0 translate-x-1/2", name: "Bot 1", bal: "8.7" },
                  { pos: "bottom-1/4 right-0 translate-x-1/2", name: "Player 5", bal: "22.1" },
                  { pos: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2", name: "You", bal: "15.3", isYou: true },
                  { pos: "bottom-1/4 left-0 -translate-x-1/2", name: "Player 2", bal: "5.9" },
                  { pos: "top-1/4 left-0 -translate-x-1/2", name: "Bot 2", bal: "18.0" },
                ].map((player, i) => (
                  <div key={i} className={`absolute ${player.pos}`}>
                    <div className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap ${
                      "isYou" in player && player.isYou
                        ? "bg-gold/20 border border-gold/40 text-gold"
                        : "bg-black/60 border border-white/10 text-zinc-300"
                    }`}>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-[10px] opacity-70">{player.bal} SOL</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Your hand */}
            <div className="mt-8 flex justify-center gap-3">
              {["A♠", "K♠"].map((card, i) => (
                <div
                  key={i}
                  className="w-16 h-24 rounded-xl bg-white text-black flex items-center justify-center text-2xl font-bold shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-2 border-gold/30"
                >
                  {card}
                </div>
              ))}
            </div>

            {/* Action bar */}
            <div className="mt-6 flex justify-center gap-3">
              {["Fold", "Check", "Raise"].map((action) => (
                <button
                  key={action}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    action === "Raise"
                      ? "bg-gold text-black hover:bg-gold-light"
                      : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Side cards */}
        <div className="gp-side-cards grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Hands per hour", value: "120+", desc: "Industry-leading speed" },
            { label: "Settlement time", value: "~400ms", desc: "Solana finality" },
            { label: "Tables available", value: "24/7", desc: "Always live, always fair" },
          ].map((stat, i) => (
            <div
              key={i}
              className="gp-side-card glass-card rounded-2xl p-6 text-center hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="text-3xl font-bold text-gradient-gold mb-1">
                {stat.value}
              </div>
              <div className="text-white font-medium mb-1">{stat.label}</div>
              <div className="text-zinc-500 text-sm">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

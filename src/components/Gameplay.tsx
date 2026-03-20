"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTS = [
  {
    label: "Player Seats",
    desc: "6 players per table with unique avatars",
    color: "text-cyan glow-cyan",
    border: "border-cyan/20",
    bg: "bg-cyan/[0.05]",
  },
  {
    label: "Provably Fair",
    desc: "On-chain deck shuffle — every outcome verifiable",
    color: "text-gold glow-gold",
    border: "border-gold/20",
    bg: "bg-gold/[0.05]",
  },
  {
    label: "Instant Actions",
    desc: "Fold, Call, Raise, All-In — settled on Solana",
    color: "text-pink glow-pink",
    border: "border-pink/20",
    bg: "bg-pink/[0.05]",
  },
];

export default function Gameplay() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Heading
      gsap.from(".gp-heading", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        scrollTrigger: { trigger: ".gp-heading", start: "top 85%" },
      });

      // Left screen slides in from left
      gsap.from(".gp-screen-left", {
        opacity: 0,
        x: -80,
        rotation: -8,
        scale: 0.85,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".gp-screens", start: "top 80%" },
      });

      // Right screen slides in from right
      gsap.from(".gp-screen-right", {
        opacity: 0,
        x: 80,
        rotation: 8,
        scale: 0.85,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".gp-screens", start: "top 80%" },
      });

      // Parallax scroll on both screens
      gsap.to(".gp-screen-left", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ".gp-screens",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".gp-screen-right", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: ".gp-screens",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Callout labels stagger in
      gsap.from(".gp-callout", {
        opacity: 0,
        y: 20,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".gp-screens", start: "top 60%" },
      });

      // Highlight cards
      gsap.from(".gp-highlight", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".gp-highlights", start: "top 82%" },
      });

      // Floating glow
      gsap.to(".gp-glow", {
        scale: 1.15,
        opacity: 0.7,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="gameplay"
      className="relative py-28 md:py-40 px-4 md:px-6 overflow-hidden"
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-bg-dark/60 backdrop-blur-sm pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Heading */}
        <div className="gp-heading text-center mb-16 md:mb-20">
          <span className="t-label text-[10px] text-gold glow-gold block mb-4 tracking-widest">
            {"<"} GAMEPLAY {">"}
          </span>
          <h2 className="t-section text-white mb-5">SEE IT IN ACTION</h2>
          <p className="text-[#9CA3AF] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            A premium poker experience built for the blockchain era. Every hand, every pot — on-chain.
          </p>
        </div>

        {/* Two-phone showcase */}
        <div className="gp-screens relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 mb-16 md:mb-20">
          {/* Ambient glow behind */}
          <div className="gp-glow absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,240,255,0.04),transparent)] pointer-events-none" />

          {/* Left screen — ss3 */}
          <div className="gp-screen-left relative w-[260px] md:w-[300px] lg:w-[360px] flex-shrink-0 -rotate-3">
            <div className="relative rounded-[1.8rem] overflow-hidden shadow-[0_0_60px_rgba(0,240,255,0.1),0_20px_50px_rgba(0,0,0,0.5)] border border-cyan/[0.1]">
              <Image
                src="/screenshots/ss3.png"
                alt="The Table Is Set"
                width={380}
                height={760}
                className="w-full h-auto"
                sizes="(max-width: 768px) 260px, 360px"
              />
            </div>
            {/* Callout labels */}
            <div className="gp-callout absolute top-[8%] -left-3 md:-left-10 px-3 py-2 rounded-lg bg-cyan/[0.08] border border-cyan/25 t-label text-[8px] text-cyan whitespace-nowrap shadow-[0_0_15px_rgba(0,240,255,0.12)] glow-cyan">
              6 PLAYER SEATS
            </div>
            <div className="gp-callout absolute bottom-[28%] -right-2 md:-right-8 px-3 py-2 rounded-lg bg-gold/[0.08] border border-gold/25 t-label text-[8px] text-gold whitespace-nowrap shadow-[0_0_15px_rgba(255,200,87,0.12)] glow-gold">
              SOLANA POWERED
            </div>
          </div>

          {/* Right screen — ss4 */}
          <div className="gp-screen-right relative w-[260px] md:w-[300px] lg:w-[360px] flex-shrink-0 rotate-3">
            <div className="relative rounded-[1.8rem] overflow-hidden shadow-[0_0_60px_rgba(255,200,87,0.08),0_20px_50px_rgba(0,0,0,0.5)] border border-gold/[0.1]">
              <Image
                src="/screenshots/ss4.png"
                alt="Live Gameplay"
                width={380}
                height={760}
                className="w-full h-auto"
                sizes="(max-width: 768px) 260px, 360px"
              />
            </div>
            {/* Callout labels */}
            <div className="gp-callout absolute top-[5%] -right-2 md:-right-10 px-3 py-2 rounded-lg bg-pink/[0.08] border border-pink/25 t-label text-[8px] text-pink whitespace-nowrap shadow-[0_0_15px_rgba(255,77,157,0.12)] glow-pink">
              LIVE GAME
            </div>
            <div className="gp-callout absolute top-[38%] -left-3 md:-left-12 px-3 py-2 rounded-lg bg-gold/[0.08] border border-gold/25 t-label text-[8px] text-gold whitespace-nowrap shadow-[0_0_15px_rgba(255,200,87,0.12)] glow-gold">
              PRE-FLOP
            </div>
            <div className="gp-callout absolute bottom-[10%] -left-2 md:-left-8 px-3 py-2 rounded-lg bg-cyan/[0.08] border border-cyan/25 t-label text-[7px] text-cyan whitespace-nowrap shadow-[0_0_15px_rgba(0,240,255,0.12)] glow-cyan">
              FOLD &bull; CALL &bull; RAISE
            </div>
          </div>
        </div>

        {/* Highlight cards */}
        <div className="gp-highlights grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {HIGHLIGHTS.map((h, i) => (
            <div
              key={i}
              className={`gp-highlight neon-card rounded-xl p-6 text-center hover:scale-[1.03] transition-all duration-300 border ${h.border}`}
            >
              <div className={`t-label text-[10px] mb-2.5 ${h.color}`}>
                {h.label}
              </div>
              <div className="text-[#9CA3AF] text-sm leading-relaxed">
                {h.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

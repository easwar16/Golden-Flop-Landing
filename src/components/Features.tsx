"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    img: "/screenshots/ss2.png",
    title: "Find Your Table",
    desc: "Browse open tables, filter by stakes, and jump into a game in seconds.",
    accent: "cyan" as const,
    icon: "🎯",
  },
  {
    img: "/screenshots/ss4.png",
    title: "Real-Time Multiplayer",
    desc: "6-player Texas Hold'em with low-latency real-time gameplay.",
    accent: "gold" as const,
    icon: "⚡",
  },
  {
    img: "/screenshots/ss3.png",
    title: "On-Chain Settlement",
    desc: "Every pot settled transparently on Solana. Provably fair, always.",
    accent: "cyan" as const,
    icon: "🔗",
  },
  {
    img: "/screenshots/ss1.png",
    title: "Bot Gameplay",
    desc: "Practice against AI opponents before putting real SOL on the line.",
    accent: "gold" as const,
    icon: "🤖",
  },
];

export default function Features() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Heading entrance
      gsap.from(".feat-label", {
        opacity: 0,
        y: 25,
        duration: 0.5,
        scrollTrigger: { trigger: ".feat-heading", start: "top 85%" },
      });
      gsap.from(".feat-title", {
        opacity: 0,
        y: 35,
        duration: 0.6,
        scrollTrigger: { trigger: ".feat-heading", start: "top 85%" },
      });

      // Cards stagger in
      gsap.from(".feat-card", {
        opacity: 0,
        y: 70,
        scale: 0.95,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: ".feat-grid", start: "top 82%" },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="features" className="relative py-24 md:py-36 px-4 sm:px-6">
      {/* Dark overlay so cards and text are visible over the bg image */}
      <div className="absolute inset-0 bg-bg-dark/60 backdrop-blur-sm" />

      <div className="relative max-w-6xl mx-auto">
        {/* Heading */}
        <div className="feat-heading text-center mb-16 md:mb-20">
          <span className="feat-label t-label text-[10px] text-cyan glow-cyan block mb-4 tracking-widest">
            {"<"} FEATURES {">"}
          </span>
          <h2 className="feat-title t-section text-white">STACK THE DECK</h2>
        </div>

        {/* Grid */}
        <div className="feat-grid grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {FEATURES.map((f, i) => {
            const isCyan = f.accent === "cyan";
            return (
              <div
                key={i}
                className="feat-card neon-card rounded-2xl overflow-hidden group hover:scale-[1.03] transition-all duration-300 cursor-default"
                style={{
                  borderColor: isCyan
                    ? "rgba(0,240,255,0.12)"
                    : "rgba(255,200,87,0.12)",
                }}
              >
                {/* Screenshot */}
                <div className="relative h-[260px] sm:h-[300px] overflow-hidden bg-bg-deep">
                  <Image
                    src={f.img}
                    alt={f.title}
                    fill
                    className="object-contain object-center p-3 transition-transform duration-500 group-hover:scale-[1.06]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  {/* Hover overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      isCyan ? "from-cyan/[0.06]" : "from-gold/[0.06]"
                    } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400`}
                  />
                  {/* Corner glow */}
                  <div
                    className={`absolute top-3 right-3 w-16 h-16 rounded-full blur-[40px] transition-opacity duration-400 opacity-0 group-hover:opacity-100 ${
                      isCyan ? "bg-cyan/[0.15]" : "bg-gold/[0.15]"
                    }`}
                  />
                </div>

                {/* Text */}
                <div className="p-6 border-t border-white/[0.04]">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-lg">{f.icon}</span>
                    <h3
                      className={`t-label text-[11px] ${
                        isCyan ? "text-cyan glow-cyan" : "text-gold glow-gold"
                      }`}
                    >
                      {f.title}
                    </h3>
                  </div>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

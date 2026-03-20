"use client";

import { FaShieldAlt, FaLink, FaWallet, FaUsers } from "react-icons/fa";

const SIGNALS = [
  {
    icon: FaLink,
    label: "Live on Solana",
    color: "#9945FF",
    glow: "drop-shadow-[0_0_6px_rgba(153,69,255,0.3)]",
  },
  {
    icon: FaUsers,
    label: "2,341 players online",
    color: "#00FF88",
    glow: "drop-shadow-[0_0_6px_rgba(0,255,136,0.3)]",
  },
  {
    icon: FaShieldAlt,
    label: "Provably fair",
    color: "#00F0FF",
    glow: "drop-shadow-[0_0_6px_rgba(0,240,255,0.3)]",
  },
  {
    icon: FaWallet,
    label: "Non-custodial",
    color: "#FFC857",
    glow: "drop-shadow-[0_0_6px_rgba(255,200,87,0.3)]",
  },
];

export default function TrustStrip() {
  return (
    <section className="relative z-30 py-8 sm:py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {SIGNALS.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2.5 group"
            >
              <s.icon
                size={14}
                className={`transition-all duration-300 ${s.glow}`}
                style={{ color: s.color }}
              />
              <span
                className="text-[11px] sm:text-[12px] font-medium text-white/50 group-hover:text-white/80 transition-colors duration-300 tracking-wide"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

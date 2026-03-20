"use client";

import { FaShieldAlt, FaEye, FaBolt, FaLock } from "react-icons/fa";

const REASONS = [
  {
    icon: FaShieldAlt,
    title: "No House Edge",
    desc: "Player-vs-player. The protocol takes a transparent rake — no hidden advantage.",
    color: "#FFC857",
  },
  {
    icon: FaBolt,
    title: "On-Chain Settlement",
    desc: "Every pot is settled on Solana. Finality in under a second.",
    color: "#00F0FF",
  },
  {
    icon: FaEye,
    title: "Transparent Gameplay",
    desc: "Card shuffles use verifiable randomness. Audit any hand, any time.",
    color: "#9945FF",
  },
  {
    icon: FaLock,
    title: "Self-Custody",
    desc: "Your funds never leave your wallet until you act. No deposits to a platform.",
    color: "#00FF88",
  },
];

export default function WhyGoldenFlop() {
  return (
    <section id="why" className="relative z-30 py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2
            className="font-pixel text-[clamp(1rem,2.5vw,1.5rem)] uppercase tracking-[0.06em] text-[#FFD505] mb-3"
            style={{ textShadow: "0 0 12px rgba(255,213,5,0.2)" }}
          >
            Why Golden Flop
          </h2>
          <p
            className="text-[14px] sm:text-[15px] text-white/50 max-w-md mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Built for players who demand fairness
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {REASONS.map((r) => (
            <div
              key={r.title}
              className="group flex gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-7 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${r.color}15`,
                  boxShadow: `0 0 20px ${r.color}10`,
                }}
              >
                <r.icon size={18} style={{ color: r.color }} />
              </div>

              <div>
                <h3 className="font-pixel text-[10px] uppercase tracking-[0.04em] text-white/90 mb-1.5">
                  {r.title}
                </h3>
                <p
                  className="text-[13px] leading-[1.6] text-white/45"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { FaWallet, FaChair, FaPlay } from "react-icons/fa";

const STEPS = [
  {
    icon: FaWallet,
    step: "01",
    title: "Connect Wallet",
    desc: "Link your Solana wallet in one click. No sign-ups, no KYC.",
    color: "#9945FF",
  },
  {
    icon: FaChair,
    step: "02",
    title: "Join a Table",
    desc: "Pick your stakes and buy in. Funds stay in your wallet until you play.",
    color: "#00F0FF",
  },
  {
    icon: FaPlay,
    step: "03",
    title: "Play Instantly",
    desc: "Real-time hands with on-chain settlement. Every deal is provably fair.",
    color: "#FFC857",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative z-30 py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2
            className="font-pixel text-[clamp(1rem,2.5vw,1.5rem)] uppercase tracking-[0.06em] text-[#FFD505] mb-3"
            style={{ textShadow: "0 0 12px rgba(255,213,5,0.2)" }}
          >
            How It Works
          </h2>
          <p
            className="text-[14px] sm:text-[15px] text-white/50 max-w-md mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Three steps to your first hand
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-7 sm:p-8 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              {/* Step number */}
              <span
                className="font-pixel text-[9px] uppercase tracking-widest block mb-4"
                style={{ color: s.color, opacity: 0.6 }}
              >
                Step {s.step}
              </span>

              {/* Icon */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${s.color}15`,
                  boxShadow: `0 0 20px ${s.color}10`,
                }}
              >
                <s.icon size={18} style={{ color: s.color }} />
              </div>

              {/* Title */}
              <h3
                className="font-pixel text-[11px] uppercase tracking-[0.04em] text-white/90 mb-2"
              >
                {s.title}
              </h3>

              {/* Description */}
              <p
                className="text-[13px] leading-[1.6] text-white/45"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

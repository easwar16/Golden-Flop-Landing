"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Connect Wallet",
    description: "Link your Solana wallet — Phantom, Solflare, or any SPL-compatible wallet. One click, instant connection.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Join a Table",
    description: "Browse open tables or create your own. Choose your stakes, set your buy-in, and take your seat.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Play & Settle On-chain",
    description: "Every hand, every pot, every outcome — settled instantly on Solana. Transparent, verifiable, and final.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Heading animation
      gsap.from(".hiw-heading", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".hiw-heading",
          start: "top 85%",
        },
      });

      // Timeline for sequential step reveals
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hiw-steps",
          start: "top 75%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".hiw-step", {
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.25,
        ease: "power2.out",
      });

      // Animate connecting lines
      tl.from(
        ".hiw-connector",
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.5,
          stagger: 0.25,
          ease: "power2.inOut",
        },
        "-=1.2"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="how-it-works" className="relative py-32 px-6">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,#0d3b1e10,transparent)]" />

      <div className="relative max-w-5xl mx-auto">
        <div className="hiw-heading text-center mb-20">
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
            How It Works
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Three steps to the table
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            From wallet to table in under 30 seconds.
          </p>
        </div>

        <div className="hiw-steps relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className="hiw-step flex flex-col items-center text-center px-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center text-gold mb-6 relative">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold text-black text-xs font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>

              {i < steps.length - 1 && (
                <div className="hiw-connector hidden md:block w-full h-[2px] bg-gradient-to-r from-gold/40 to-gold/10 mx-2 flex-shrink" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

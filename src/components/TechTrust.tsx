"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const trustItems = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75" />
      </svg>
    ),
    title: "Built on Solana",
    description: "Leveraging Solana's high throughput for real-time gameplay with minimal transaction costs.",
    stat: "65,000 TPS",
    statLabel: "Network capacity",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Low Latency Systems",
    description: "Custom infrastructure optimized for sub-200ms response times from action to on-chain settlement.",
    stat: "<200ms",
    statLabel: "End-to-end latency",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Secure & Verifiable",
    description: "Open-source smart contracts audited by leading security firms. Every outcome is cryptographically provable.",
    stat: "100%",
    statLabel: "Verifiable outcomes",
  },
];

export default function TechTrust() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".tt-heading", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: ".tt-heading", start: "top 85%" },
      });

      gsap.from(".tt-card", {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: ".tt-grid", start: "top 80%" },
      });

      // Animate stat numbers
      gsap.from(".tt-stat", {
        opacity: 0,
        scale: 0.8,
        stagger: 0.15,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".tt-grid", start: "top 75%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="tech" className="relative py-32 px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,#0d3b1e08,transparent)]" />

      <div className="relative max-w-6xl mx-auto">
        <div className="tt-heading text-center mb-16">
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
            Technology
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trust the stack
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Engineered for performance, built for transparency.
          </p>
        </div>

        <div className="tt-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustItems.map((item, i) => (
            <div
              key={i}
              className="tt-card glass-card rounded-2xl p-8 group hover:bg-white/[0.06] hover:border-gold/10 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="text-gold/60 mb-6 group-hover:text-gold transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
                {item.description}
              </p>
              <div className="tt-stat pt-4 border-t border-white/5">
                <div className="text-2xl font-bold text-gradient-gold">
                  {item.stat}
                </div>
                <div className="text-zinc-500 text-xs mt-0.5">
                  {item.statLabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

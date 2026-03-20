"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/* ═══════════════════════════════════════════════════════
   HERO — cinematic full-screen, 5-layer depth composition
   ═══════════════════════════════════════════════════════ */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    /* ── ENTRANCE TIMELINE ── */
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Layer 1-2: ambient orbs fade in
    tl.from(".orb", { opacity: 0, scale: 0.5, duration: 1.5, stagger: 0.2, ease: "power2.out" });

    // Text content
    tl.from(".title-line", { y: 70, opacity: 0, duration: 0.9, stagger: 0.12 }, 0.55);
    tl.from(".subtitle", { y: 35, opacity: 0, duration: 0.65 }, "-=0.4");
    tl.from(".desc", { y: 20, opacity: 0, duration: 0.5 }, "-=0.25");
    tl.from(".cta-btn", { y: 25, opacity: 0, scale: 0.9, duration: 0.5, stagger: 0.12 }, "-=0.2");

    // Layer 2: Far decorations (blurred, faint) pop in early
    tl.from(".layer-far", { opacity: 0, scale: 0.3, duration: 0.8, stagger: 0.15, ease: "power2.out" }, 0.6);

    // Layer 3: Phones slam up with spring
    tl.from(".phone", {
      y: 180, opacity: 0, scale: 0.6, duration: 1.3, stagger: 0.1, ease: "back.out(1.4)",
    }, "-=0.7");

    // Layer 4: Mid-foreground cards
    tl.from(".layer-mid", {
      opacity: 0, scale: 0, rotation: -20, duration: 0.6,
      stagger: { amount: 0.5, from: "random" }, ease: "back.out(2)",
    }, "-=0.5");

    // Layer 5: Foreground chips (biggest impact, last to land)
    tl.from(".layer-front", {
      opacity: 0, scale: 0, y: 40, duration: 0.6,
      stagger: { amount: 0.4, from: "random" }, ease: "back.out(2.5)",
    }, "-=0.3");

    /* ── IDLE FLOATING LOOPS ── */

    // Phones — each at different speed/amplitude
    gsap.to(".phone-center", { y: -16, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".phone-left",   { y: -11, rotation: "+=1.5", duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.6 });
    gsap.to(".phone-right",  { y: -14, rotation: "-=1.5", duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.1 });

    // Foreground chips — big, slow float + spin
    gsap.to(".layer-front", {
      y: -12, rotation: 20, duration: 3.2, repeat: -1, yoyo: true,
      ease: "sine.inOut", stagger: { amount: 2, from: "random" },
    });

    // Mid cards — gentle drift
    gsap.to(".layer-mid", {
      y: -8, rotation: "-=5", duration: 3.8, repeat: -1, yoyo: true,
      ease: "sine.inOut", stagger: { amount: 1.5, from: "random" },
    });

    // Far elements — barely perceptible drift
    gsap.to(".layer-far", {
      y: -4, rotation: 3, duration: 5, repeat: -1, yoyo: true,
      ease: "sine.inOut", stagger: { amount: 2, from: "random" },
    });

    // Glow orbs breathe
    gsap.to(".orb", {
      scale: 1.15, opacity: 0.75, duration: 3.5, repeat: -1, yoyo: true,
      ease: "sine.inOut", stagger: 1.2,
    });

    // Primary CTA glow pulse
    gsap.to(".cta-primary", {
      boxShadow: "0 0 35px rgba(255,200,87,0.5), 0 0 80px rgba(255,200,87,0.15)",
      duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut",
    });
  }, { scope: root });

  return (
    <section
      ref={root}
      className="relative w-full min-h-screen flex items-center justify-center overflow-visible py-20"
    >
      {/* ═══ LAYER 0: Transparent — site bg shows through ═══ */}

      {/* ═══ LAYER 1: Gradient overlays ═══ */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,rgba(20,10,42,0.9),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_30%_at_50%_90%,rgba(0,240,255,0.02),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_25%_at_75%_15%,rgba(255,200,87,0.015),transparent)]" />
      </div>

      {/* ═══ LAYER 2: Ambient glow orbs ═══ */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="orb absolute top-[18%] left-[12%] w-[320px] h-[320px] rounded-full bg-neon/[0.035] blur-[110px]" />
        <div className="orb absolute bottom-[15%] right-[10%] w-[260px] h-[260px] rounded-full bg-pink/[0.04] blur-[100px]" />
        <div className="orb absolute top-[40%] left-[50%] -translate-x-1/2 w-[450px] h-[450px] rounded-full bg-gold/[0.02] blur-[140px]" />
      </div>

      {/* ═══ LAYER 3: Main content ═══ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-10">

          {/* ── LEFT: Text + CTAs ── */}
          <div className="lg:flex-[1.2] text-left order-2 lg:order-1 max-w-xl space-y-4">
            {/* Headline — pixel font ONLY here */}
            <h1 className="title-line font-pixel text-[clamp(1.6rem,3.5vw,3rem)] uppercase leading-[1.1] tracking-[0.06em] text-[#FFD505] max-w-[500px]"
              style={{ textShadow: "0 0 14px rgba(255,213,5,0.3), 0 0 40px rgba(255,213,5,0.1)" }}>
              Golden Flop
            </h1>

            {/* Subheading — Inter, split color */}
            <p className="subtitle text-[clamp(0.85rem,1.6vw,1.1rem)] uppercase tracking-[0.14em] font-semibold leading-[1.4]"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              <span className="text-white/60">On-Chain Poker </span>
              <span className="text-neon"
                style={{ textShadow: "0 0 8px rgba(0,240,255,0.3)" }}>
                Experience
              </span>
            </p>

            {/* Description — Inter, readable, no pixel font */}
            <p className="desc max-w-[480px] text-[14px] sm:text-[15px] leading-[1.7] text-white/70"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              Real-time poker. On-chain. No delays. No house edge.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#cta"
                className="cta-btn cta-primary group relative font-pixel text-[10px] uppercase tracking-[0.06em] px-9 py-[16px] rounded-xl bg-gradient-to-r from-gold via-[#FFE29A] to-gold text-bg-dark transition-all duration-300 hover:scale-105 text-center"
                style={{ boxShadow: "0 0 20px rgba(255,200,87,0.3), 0 0 60px rgba(255,200,87,0.08)" }}>
                Play Now
                <span className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
              </a>
              <a href="#gameplay"
                className="cta-btn group font-pixel text-[10px] uppercase tracking-[0.06em] px-9 py-[16px] rounded-xl border border-neon/25 bg-neon/[0.06] text-neon transition-all duration-300 hover:scale-105 hover:bg-neon/[0.12] hover:border-neon/40 text-center"
                style={{ textShadow: "0 0 8px rgba(0,240,255,0.35)", boxShadow: "0 0 15px rgba(0,240,255,0.08)" }}>
                Watch Gameplay
              </a>
            </div>
          </div>

          {/* ── RIGHT: 5-Layer phone showcase ── */}
          <div className="flex-1 relative w-full min-h-[400px] sm:min-h-[480px] lg:min-h-[560px] xl:min-h-[600px] order-1 lg:order-2">

            {/* ─── LAYER 2: Far elements (low opacity, small, blurred) ─── */}

            {/* Tiny card back — top-left corner, faded */}
            <div className="layer-far absolute z-[5]" style={{ top: "5%", left: "5%" }}>
              <Image src="/assets/card-back.png" alt="" width={60} height={85}
                className="w-[30px] sm:w-[40px] md:w-[50px] h-auto -rotate-[25deg] opacity-30 blur-[1px]
                  drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]" />
            </div>

            {/* Tiny chip — top-right corner, faded */}
            <div className="layer-far absolute z-[5]" style={{ top: "2%", right: "15%" }}>
              <Image src="/assets/chip-stack.png" alt="" width={50} height={40}
                className="w-[25px] sm:w-[35px] md:w-[45px] h-auto opacity-25 blur-[1px]
                  drop-shadow-[0_4px_10px_rgba(0,240,255,0.1)]" />
            </div>

            {/* Tiny card back — far right edge, barely visible */}
            <div className="layer-far absolute z-[5]" style={{ top: "65%", right: "0%" }}>
              <Image src="/assets/card-back.png" alt="" width={45} height={65}
                className="w-[22px] sm:w-[30px] md:w-[38px] h-auto rotate-[30deg] opacity-20 blur-[1.5px]" />
            </div>


            {/* ─── LAYER 3: Phones (main focus) ─── */}

            {/* Center phone — ss1 "Go All In" (largest, sharpest) */}
            <div className="phone phone-center absolute z-30"
              style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "clamp(170px, 22vw, 260px)" }}>
              <div className="rounded-[1.8rem] overflow-hidden border border-white/[0.07]"
                style={{ boxShadow: "0 0 80px rgba(0,240,255,0.1), 0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
                <Image src="/screenshots/ss1.png" alt="Golden Flop — Go All In"
                  width={400} height={800} className="w-full h-auto block" priority />
              </div>
            </div>

            {/* Left phone — ss3 "The Table Is Set" (slightly smaller, tilted, dimmer) */}
            <div className="phone phone-left absolute z-20"
              style={{ top: "46%", left: "8%", transform: "translateY(-50%) rotate(-7deg)", width: "clamp(135px, 18vw, 215px)" }}>
              <div className="rounded-[1.5rem] overflow-hidden border border-white/[0.04] opacity-80"
                style={{ boxShadow: "0 25px 50px rgba(0,0,0,0.55)" }}>
                <Image src="/screenshots/ss3.png" alt="The Table Is Set"
                  width={400} height={800} className="w-full h-auto block" />
              </div>
            </div>

            {/* Right phone — ss4 "Your Seat Is Waiting" */}
            <div className="phone phone-right absolute z-20"
              style={{ top: "48%", right: "5%", transform: "translateY(-50%) rotate(7deg)", width: "clamp(135px, 18vw, 215px)" }}>
              <div className="rounded-[1.5rem] overflow-hidden border border-white/[0.04] opacity-80"
                style={{ boxShadow: "0 25px 50px rgba(0,0,0,0.55)" }}>
                <Image src="/screenshots/ss4.png" alt="Your Seat Is Waiting"
                  width={400} height={800} className="w-full h-auto block" />
              </div>
            </div>


            {/* ─── LAYER 4: Mid-foreground cards (overlap phones, add depth) ─── */}

            {/* Royal flush fan — behind right phone, partially overlapping */}
            <div className="layer-mid absolute z-[15]" style={{ top: "8%", right: "2%" }}>
              <Image src="/assets/cards-fan.png" alt="" width={200} height={160}
                className="w-[100px] sm:w-[130px] md:w-[170px] h-auto rotate-[12deg] opacity-70
                  drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]" />
            </div>

            {/* Ace of spades — bottom-left, partially behind left phone */}
            <div className="layer-mid absolute z-[18]" style={{ bottom: "12%", left: "8%" }}>
              <Image src="/assets/card-ace.png" alt="" width={80} height={110}
                className="w-[45px] sm:w-[60px] md:w-[80px] h-auto -rotate-[15deg]
                  drop-shadow-[0_8px_25px_rgba(0,0,0,0.5)]" />
            </div>

            {/* King of hearts — top-left, between phones */}
            <div className="layer-mid absolute z-[25]" style={{ top: "15%", left: "28%" }}>
              <Image src="/assets/card-king.png" alt="" width={65} height={90}
                className="w-[35px] sm:w-[45px] md:w-[60px] h-auto rotate-[20deg] opacity-75
                  drop-shadow-[0_6px_20px_rgba(0,0,0,0.5)]" />
            </div>


            {/* ─── LAYER 5: Foreground chips (biggest, sharpest, strongest glow) ─── */}

            {/* Large chip — bottom-right, closest to viewer */}
            <div className="layer-front absolute z-[45]" style={{ bottom: "8%", right: "10%" }}>
              <Image src="/assets/chip-large.png" alt="" width={120} height={90}
                className="w-[60px] sm:w-[80px] md:w-[110px] h-auto
                  drop-shadow-[0_0_25px_rgba(0,240,255,0.3)]" />
            </div>

            {/* Scattered chips — bottom-left, slightly smaller */}
            <div className="layer-front absolute z-[45]" style={{ bottom: "15%", left: "2%" }}>
              <Image src="/assets/chips-scattered.png" alt="" width={100} height={65}
                className="w-[55px] sm:w-[70px] md:w-[95px] h-auto
                  drop-shadow-[0_0_20px_rgba(0,240,255,0.25)]" />
            </div>

            {/* Chip stack — top area, medium size (between foreground and mid) */}
            <div className="layer-front absolute z-[40]" style={{ top: "10%", left: "18%" }}>
              <Image src="/assets/chip-stack.png" alt="" width={70} height={50}
                className="w-[35px] sm:w-[50px] md:w-[65px] h-auto
                  drop-shadow-[0_0_15px_rgba(0,240,255,0.2)] opacity-85" />
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Top vignette only ═══ */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-bg-dark/50 to-transparent z-20 pointer-events-none" />
    </section>
  );
}

"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/* ═══════════════════════════════════════════════════════
   HERO — cinematic full-screen, layered depth composition
   ═══════════════════════════════════════════════════════ */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  // Smooth GSAP quickTo setters — created once in useGSAP
  const phoneRotX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const phoneRotY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const midX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const midY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const frontX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const frontY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const glowOpacity = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useGSAP(() => {
    /* ══════════════════════════════════════════════════
       CINEMATIC ENTRY SEQUENCE — "The game is loading"
       Total: ~1200ms, feels like a polished game boot
       ══════════════════════════════════════════════════ */
    const entry = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: startIdleAnimations,
    });

    // Step 1 — Background fade (0ms → 300ms)
    entry.from(".hero-bg-layer", { opacity: 0.85, duration: 0.3, ease: "power1.inOut" }, 0);
    entry.from(".orb", { opacity: 0, scale: 0.8, duration: 0.5, stagger: 0.1 }, 0);

    // Step 2 — Text reveal (150ms → 500ms)
    entry.from(".title-line", { y: 10, opacity: 0, duration: 0.35 }, 0.15);
    entry.from(".subtitle", { y: 10, opacity: 0, duration: 0.3 }, 0.25);
    entry.from(".desc", { y: 8, opacity: 0, duration: 0.3 }, 0.35);
    entry.from(".live-indicator", { opacity: 0, duration: 0.3 }, 0.3);

    // Step 3 — CTA reveal (350ms → 700ms)
    entry.from(".cta-btn", {
      opacity: 0, scale: 0.95, duration: 0.35, stagger: 0.08,
    }, 0.35);

    // Step 4 — Phone entrance (400ms → 900ms)
    entry.from(".phone", {
      y: 40, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power2.out",
    }, 0.4);
    // Phone glow fades in gradually
    entry.from(".phone-backglow", { opacity: 0, scale: 0.8, duration: 0.6 }, 0.5);

    // Step 5 — Secondary elements (600ms → 1100ms)
    entry.from(".layer-mid", {
      y: 10, opacity: 0, duration: 0.4,
      stagger: { amount: 0.15, from: "random" },
    }, 0.6);
    entry.from(".layer-front", {
      y: 10, opacity: 0, duration: 0.4,
      stagger: { amount: 0.15, from: "random" },
    }, 0.7);

    // Glow activation — CTA glow comes last
    entry.from(".cta-primary", {
      boxShadow: "0 0 0px rgba(255,200,87,0), 0 0 0px rgba(255,200,87,0)",
      duration: 0.4,
    }, 0.8);

    /* ══════════════════════════════════════════════════
       IDLE STATE — begins after entry completes
       ══════════════════════════════════════════════════ */
    function startIdleAnimations() {
      // Phones — slow float ±10px
      gsap.to(".phone-center", { y: -10, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".phone-left", { y: -8, duration: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.8 });
      gsap.to(".phone-right", { y: -9, duration: 4.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });

      // Cards — slight rotation loop ±5deg
      gsap.to(".layer-mid", {
        rotation: "+=5", duration: 5, repeat: -1, yoyo: true,
        ease: "sine.inOut", stagger: { amount: 1.5, from: "random" },
      });

      // Chips — very slow drift
      gsap.to(".layer-front", {
        y: -6, rotation: 3, duration: 6, repeat: -1, yoyo: true,
        ease: "sine.inOut", stagger: { amount: 2, from: "random" },
      });

      // Orbs breathe
      gsap.to(".orb", {
        scale: 1.08, opacity: 0.65, duration: 5, repeat: -1, yoyo: true,
        ease: "sine.inOut", stagger: 1.5,
      });

      // CTA pulse — gold glow every ~2.5s
      gsap.to(".cta-primary", {
        boxShadow: "0 0 30px rgba(255,200,87,0.5), 0 0 70px rgba(255,200,87,0.15)",
        scale: 1.03, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut",
      });

      // Secondary CTA — subtle cyan pulse
      gsap.to(".cta-secondary", {
        boxShadow: "0 0 18px rgba(0,240,255,0.12), 0 0 40px rgba(0,240,255,0.04)",
        duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut",
      });

      // Neon flicker — very subtle opacity shimmer on cyan elements
      gsap.to(".neon-flicker", {
        opacity: 0.7, duration: 0.08, repeat: -1, yoyo: true,
        ease: "steps(1)", repeatDelay: 3 + Math.random() * 4,
      });
    }

    /* ── PARALLAX TILT — quickTo for 60fps smooth movement ── */
    phoneRotX.current = gsap.quickTo(".phone-tilt-wrapper", "rotateX", { duration: 0.6, ease: "power2.out" });
    phoneRotY.current = gsap.quickTo(".phone-tilt-wrapper", "rotateY", { duration: 0.6, ease: "power2.out" });
    midX.current = gsap.quickTo(".layer-mid", "x", { duration: 0.8, ease: "power2.out" });
    midY.current = gsap.quickTo(".layer-mid", "y", { duration: 0.8, ease: "power2.out" });
    frontX.current = gsap.quickTo(".layer-front", "x", { duration: 1, ease: "power2.out" });
    frontY.current = gsap.quickTo(".layer-front", "y", { duration: 1, ease: "power2.out" });
    glowOpacity.current = gsap.quickTo(".phone-hover-glow", "opacity", { duration: 0.4, ease: "power2.out" });

    // Set initial perspective + will-change
    gsap.set(".phone-tilt-wrapper", { transformPerspective: 800, willChange: "transform" });
    gsap.set(".layer-mid, .layer-front", { willChange: "transform" });
    gsap.set(".phone-hover-glow", { opacity: 0 });
  }, { scope: root });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = showcaseRef.current;
    if (!el) return;
    isHovering.current = true;

    const rect = el.getBoundingClientRect();
    // Normalized -1 to 1
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    // Phones: tilt up to ±8deg
    phoneRotX.current?.(-ny * 8);
    phoneRotY.current?.(nx * 8);

    // Cards: move opposite direction (parallax), medium intensity
    midX.current?.(-nx * 12);
    midY.current?.(-ny * 8);

    // Chips: very subtle opposite drift
    frontX.current?.(-nx * 6);
    frontY.current?.(-ny * 4);

    // Glow response
    glowOpacity.current?.(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;

    // Smooth reset to center
    phoneRotX.current?.(0);
    phoneRotY.current?.(0);
    midX.current?.(0);
    midY.current?.(0);
    frontX.current?.(0);
    frontY.current?.(0);
    glowOpacity.current?.(0);
  }, []);

  return (
    <section
      ref={root}
      className="relative w-full min-h-screen flex items-center justify-center overflow-visible py-20"
    >
      {/* ═══ LAYER 1: Gradient overlays ═══ */}
      <div className="hero-bg-layer absolute inset-0 z-1 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,transparent_30%,rgba(5,7,15,0.95))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,rgba(5,7,15,0.8),transparent)]" />
        {/* Strong left-side darkening — quiet zone for text */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,15,0.97)_0%,rgba(5,7,15,0.9)_30%,rgba(5,7,15,0.5)_55%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_25%_at_50%_95%,rgba(0,240,255,0.015),transparent)]" />
      </div>

      {/* ═══ LAYER 1b: Subtle pixel grid on left side — 4% opacity ═══ */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(to right, black 0%, black 40%, transparent 60%)",
          WebkitMaskImage: "linear-gradient(to right, black 0%, black 40%, transparent 60%)",
        }} />

      {/* ═══ LAYER 2: Ambient glow orbs ═══ */}
      <div className="absolute inset-0 z-2 pointer-events-none">
        <div className="orb absolute top-[20%] left-[35%] w-[250px] h-[250px] rounded-full bg-neon/[0.02] blur-[130px]" />
        <div className="orb absolute bottom-[18%] right-[12%] w-[240px] h-[240px] rounded-full bg-pink/[0.03] blur-[110px]" />
        <div className="orb absolute top-[42%] left-[55%] -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-gold/[0.015] blur-[150px]" />
      </div>

      {/* ═══ LAYER 3: Main content ═══ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* ══ LEFT: Text + CTAs — left-aligned, max 640px ══ */}
          <div className="lg:flex-[1.2] text-center lg:text-left order-2 lg:order-1 max-w-[700px] relative">
            {/* Dark scrim — extends left for text contrast */}

            <div className="relative">
              {/* [players online] → mb-16px */}
              {/* <div className="live-indicator inline-flex items-center gap-2 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full opacity-60" style={{ backgroundColor: "#00FF88" }} />
                  <span className="relative rounded-full h-2 w-2" style={{ backgroundColor: "#00FF88" }} />
                </span>
                <span className="text-[11px] font-medium tracking-wide" style={{ fontFamily: "'Inter', sans-serif", color: "#00FF88" }}>
                  2,341 players online
                </span>
              </div> */}

              {/* [GOLDEN FLOP] → mb-24px */}
              <div className="title-line mb-10 flex items-center justify-center">
                <div className="led-board">
                  <div className="led-board__text">
                    <h1 className="led-board__inner font-pixel text-[clamp(1.6rem,3.5vw,3rem)] uppercase leading-[1.15] whitespace-nowrap tracking-[0.02em]">
                      Golden Flop
                    </h1>
                  </div>
                </div>
              </div>

              {/* [ON-CHAIN POKER EXPERIENCE] → mb-16px */}
              <br />
              <div className="subtitle mt-16 mb-6 text-[clamp(0.85rem,1.5vw,1.1rem)] uppercase tracking-[0.2em] font-semibold leading-[1.4] flex items-center justify-center gap-4">
                <div className="text-[#A1A1AA]">On-Chain Poker</div>
                <div className="neon-flicker text-[#F5C542] font-bold">
                  Experience
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                {/* [Main line] → mb-8px */}
                {/* <br />
                <br /> */}
                <p className="desc ml-2 mt-4 mb-6 max-w-[480px] font-pixel text-[clamp(7px,2vw,10px)] leading-[2] font-medium text-[#E6E6E6] uppercase tracking-[0.04em]"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}>
                    Deal yourself in
                  {/* <div className="font-pixel mt-4 mb-18 max-w-[480px] text-[8px] text-neon">
                    Funds stay in your wallet. Every hand is provable.
                  </div> */}
                </p>

                {/* [Supporting line] → mb-32px */}


                {/* [CTA buttons] */}
                <div className="flex flex-col items-center lg:items-start">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    {/* PRIMARY */}
                    {/* <a href="#cta"
                    className="cta-btn cta-primary group relative font-pixel text-[10px] uppercase tracking-[0.06em] rounded-xl bg-[#F5C542] text-[#05070F] font-bold transition-transform duration-200 hover:scale-105 active:scale-[0.96] text-center inline-block overflow-hidden"
                    style={{ padding: "18px 48px", boxShadow: "0 4px 12px rgba(0,0,0,0.4), 0 0 20px rgba(245,197,66,0.15)" }}
                    onMouseDown={(e) => {
                      gsap.to(e.currentTarget, { scale: 0.96, duration: 0.1, ease: "power2.in" });
                      gsap.to(e.currentTarget, { boxShadow: "0 2px 8px rgba(0,0,0,0.5), 0 0 25px rgba(245,197,66,0.25)", duration: 0.1 });
                    }}
                    onMouseUp={(e) => {
                      gsap.to(e.currentTarget, { scale: 1, duration: 0.15, ease: "power2.out" });
                      gsap.to(e.currentTarget, { boxShadow: "0 4px 12px rgba(0,0,0,0.4), 0 0 20px rgba(245,197,66,0.15)", duration: 0.3 });
                    }}>
                    Enter Table
                    <span className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
                  </a> */}

                    {/* SECONDARY */}
                    {/* <a href="#gameplay"
                    className="cta-btn cta-secondary group relative font-pixel text-[9px] uppercase tracking-[0.06em] rounded-xl border border-neon/40 bg-neon/5 text-neon transition-transform duration-200 hover:scale-105 active:scale-[0.96] text-center inline-block"
                    style={{ padding: "18px 40px" }}
                    onMouseDown={(e) => {
                      gsap.to(e.currentTarget, { scale: 0.96, duration: 0.1, ease: "power2.in" });
                    }}
                    onMouseUp={(e) => {
                      gsap.to(e.currentTarget, { scale: 1, duration: 0.15, ease: "power2.out" });
                    }}>
                    Watch Gameplay
                  </a> */}
                  </div>

                  {/* [microcopy] → mt-8px */}
                  {/* <div className="mt-8 text-[11px] text-[#6B7280] font-medium tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Start playing instantly
                  </div> */}

                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Interactive phone showcase ── */}
          <div
            ref={showcaseRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="flex-1 relative w-full min-h-[400px] sm:min-h-[480px] lg:min-h-[560px] xl:min-h-[600px] order-1 lg:order-2"
          >
            {/* ─── LIGHTING ─── */}
            <div className="absolute pointer-events-none z-5" style={{ top: "20%", left: "45%", transform: "translate(-50%, -50%)" }}>
              <div className="w-[500px] h-[500px] rounded-full blur-[100px]"
                style={{ background: "radial-gradient(ellipse at center, rgba(0,240,255,0.09) 0%, rgba(100,60,180,0.06) 40%, transparent 70%)" }} />
            </div>
            <div className="absolute inset-0 pointer-events-none z-5 bg-[linear-gradient(to_top_right,rgba(11,6,24,0.5)_0%,transparent_50%)]" />

            {/* ─── Hover glow — blooms on interaction ─── */}
            <div className="phone-hover-glow absolute pointer-events-none z-8"
              style={{ top: "45%", left: "50%", transform: "translate(-50%, -50%)", width: "350px", height: "450px", opacity: 0 }}>
              <div className="w-full h-full rounded-[3rem] blur-[60px]"
                style={{ background: "radial-gradient(ellipse at center, rgba(0,240,255,0.1) 0%, rgba(100,60,180,0.06) 50%, transparent 75%)" }} />
            </div>

            {/* ─── Phone tilt wrapper — all 3 phones tilt together ─── */}
            <div className="phone-tilt-wrapper absolute inset-0" style={{ transformStyle: "preserve-3d" }}>

              {/* Center phone */}
              <div className="phone phone-center absolute z-30"
                style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "clamp(170px, 22vw, 260px)" }}>
                {/* Ground shadow — elliptical, grounding the phone */}
                <div className="absolute pointer-events-none z-[-1]"
                  style={{ bottom: "-12%", left: "50%", transform: "translateX(-50%)", width: "120%", height: "30px" }}>
                  <div className="w-full h-full rounded-[50%] blur-[20px] opacity-40"
                    style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, transparent 80%)" }} />
                </div>
                <div className="phone-backglow absolute -inset-10 rounded-[2.5rem] blur-[50px] pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(0,240,255,0.1), rgba(100,60,180,0.05) 60%, transparent)" }} />
                <div className="relative rounded-[1.8rem] overflow-hidden"
                  style={{
                    boxShadow: "0 0 80px rgba(0,240,255,0.12), 0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.3)",
                    border: "1px solid rgba(0,240,255,0.12)"
                  }}>
                  <Image src="/screenshots/ss1.png" alt="Golden Flop — Go All In"
                    width={400} height={800} className="w-full h-auto block" priority />
                </div>
              </div>

              {/* Left phone */}
              <div className="phone phone-left absolute z-20"
                style={{ top: "46%", left: "6%", transform: "translateY(-50%) rotate(-9deg) scale(0.9)", width: "clamp(135px, 18vw, 215px)" }}>
                <div className="rounded-3xl overflow-hidden opacity-75"
                  style={{
                    boxShadow: "0 25px 50px rgba(0,0,0,0.6), 2px 0 12px rgba(0,240,255,0.08)",
                    border: "1px solid transparent",
                    borderImage: "linear-gradient(to right, rgba(255,255,255,0.02), rgba(0,240,255,0.1)) 1"
                  }}>
                  <Image src="/screenshots/ss3.png" alt="The Table Is Set"
                    width={400} height={800} className="w-full h-auto block" />
                </div>
              </div>

              {/* Right phone */}
              <div className="phone phone-right absolute z-20"
                style={{ top: "48%", right: "3%", transform: "translateY(-50%) rotate(9deg) scale(0.85)", width: "clamp(135px, 18vw, 215px)" }}>
                <div className="rounded-3xl overflow-hidden opacity-70"
                  style={{
                    boxShadow: "0 25px 50px rgba(0,0,0,0.6), -2px 0 12px rgba(0,240,255,0.08)",
                    border: "1px solid transparent",
                    borderImage: "linear-gradient(to left, rgba(255,255,255,0.02), rgba(0,240,255,0.1)) 1"
                  }}>
                  <Image src="/screenshots/ss4.png" alt="Your Seat Is Waiting"
                    width={400} height={800} className="w-full h-auto block" />
                </div>
              </div>
            </div>

            {/* ─── Mid-layer cards (move opposite to cursor) ─── */}
            <div className="layer-mid absolute z-15" style={{ top: "10%", right: "4%" }}>
              <Image src="/assets/cards-fan.png" alt="" width={200} height={160}
                className="w-[90px] sm:w-[120px] md:w-[160px] h-auto rotate-12 opacity-55 blur-[1px]
                  drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]" />
            </div>
            <div className="layer-mid absolute z-18" style={{ bottom: "14%", left: "10%" }}>
              <Image src="/assets/card-ace.png" alt="" width={80} height={110}
                className="w-[40px] sm:w-[55px] md:w-[70px] h-auto -rotate-15 blur-[1px]
                  drop-shadow-[0_8px_25px_rgba(0,0,0,0.5)]" />
            </div>

            {/* ─── Foreground chips (subtle opposite drift) ─── */}
            <div className="layer-front absolute z-45" style={{ bottom: "10%", right: "12%" }}>
              <Image src="/assets/chip-large.png" alt="" width={120} height={90}
                className="w-[55px] sm:w-[75px] md:w-[100px] h-auto blur-[2px]
                  drop-shadow-[0_0_20px_rgba(0,240,255,0.25)]" />
            </div>
            <div className="layer-front absolute z-45" style={{ bottom: "16%", left: "4%" }}>
              <Image src="/assets/chips-scattered.png" alt="" width={100} height={65}
                className="w-[50px] sm:w-[65px] md:w-[85px] h-auto blur-[2px]
                  drop-shadow-[0_0_18px_rgba(0,240,255,0.2)]" />
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Top vignette ═══ */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-bg-dark/60 to-transparent z-20 pointer-events-none" />
    </section>
  );
}

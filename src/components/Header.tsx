"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Github, Twitter, BookOpen, Menu, X } from "lucide-react";

// const NAV_LINKS = [
//   { label: "Home", href: "#" },
//   { label: "Gameplay", href: "#gameplay" },
//   { label: "Docs", href: "#docs" },
// ];

// const SOCIAL_LINKS = [
//   {
//     icon: Twitter,
//     href: "https://twitter.com",
//     label: "Twitter",
//     hoverColor: "hover:text-neon hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]",
//   },
//   {
//     icon: Github,
//     href: "https://github.com",
//     label: "GitHub",
//     hoverColor: "hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]",
//   },
//   {
//     icon: BookOpen,
//     href: "#docs",
//     label: "Docs",
//     hoverColor: "hover:text-gold hover:drop-shadow-[0_0_8px_rgba(255,200,87,0.5)]",
//   },
// ];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ── Entrance animation ── */
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".nav-logo", {
        x: -30,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
      });

      tl.from(
        ".nav-link",
        {
          y: -15,
          opacity: 0,
          duration: 0.4,
          stagger: 0.08,
        },
        "-=0.3"
      );

      tl.from(
        ".nav-social",
        {
          y: -10,
          opacity: 0,
          scale: 0.8,
          duration: 0.35,
          stagger: 0.06,
        },
        "-=0.2"
      );

      // nav-cta animation removed — conflicts with Button component rendering
    },
    { scope: headerRef }
  );


  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-100"
    >
      {/* Nav background image with top-to-bottom fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/assets/navigation_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div className="relative h-[68px] flex items-center justify-between" style={{ paddingLeft: "clamp(2rem, 5vw, 5rem)", paddingRight: "clamp(2rem, 5vw, 5rem)" }}>
        {/* ═══ LEFT: Logo ═══ */}
        <a href="#" className="nav-logo flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="Golden Flop"
            width={28}
            height={32}
            className="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(255,200,87,0.5)] group-hover:scale-110 -translate-y-px"
            style={{ imageRendering: "pixelated" }}
          />
          <span
            className="font-pixel text-[11px] sm:text-[12px] uppercase tracking-[0.06em] text-[#FFD505] hidden sm:inline transition-all duration-300 leading-none"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
          >
            Golden
            <span className="ml-[0.15em]">Flop</span>
          </span>
        </a>
        {/* ═══ CENTER: Nav links (desktop) ═══ */}
        <nav className="hidden md:flex items-center gap-1">
          {/* {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link relative px-4 py-2 text-[13px] font-body text-muted transition-all duration-250 hover:text-neon group"
            >
              {link.label}
              <span className="absolute bottom-0.5 left-4 right-4 h-[1px] bg-neon scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-60" />
            </a>
          ))} */}

          {/* Separator */}
          <div className="w-[1px] h-4 bg-white/[0.06] mx-2" />

          {/* Social icons in nav */}
          {/* {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`nav-social p-2 text-muted/60 transition-all duration-300 hover:scale-110 ${s.hoverColor}`}
            >
              <s.icon size={16} strokeWidth={1.8} />
            </a>
          ))} */}
        </nav>

        {/* ═══ RIGHT: Badge + CTA + Mobile toggle ═══ */}
        <div className="flex items-center gap-3">
          {/* Live on Solana badge */}
          <div className="hidden sm:inline-flex items-center gap-2.5 px-5 py-2.5 bg-neon/5">
            <div className="relative flex h-2 w-2">
              <div className="animate-ping absolute h-full w-full rounded-full bg-neon opacity-50" />
              <div className="relative rounded-full h-2 w-2 bg-neon" />
            </div>
            <div className="text-[10px] uppercase tracking-widest text-neon font-medium leading-none font-pixel" style={{ textShadow: "0 0 6px rgba(0,240,255,0.35)" }}
              >
              Live on Daap Store
            </div>
          </div>

          {/* CTA — pixel art button image */}
          {/* <a href="#" className="nav-cta hover:scale-105 transition-transform duration-200">
            <Image
              src="/assets/play-btn.png"
              alt="Play"
              width={90}
              height={90}
              className="h-[38px] sm:h-[42px] w-[140px] sm:w-[160px]"
              style={{ imageRendering: "pixelated" }}
            />
          </a> */}

          {/* Mobile hamburger — hidden */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="hidden p-2 text-muted hover:text-neon transition-colors duration-200"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X size={22} strokeWidth={1.8} />
            ) : (
              <Menu size={22} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </div>

      {/* ═══ MOBILE MENU ═══ */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="bg-bg-dark/95 backdrop-blur-2xl border-t border-neon/[0.05] px-6 py-6 space-y-1">
          {/* {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-3 text-sm text-muted hover:text-neon transition-colors duration-200 border-b border-white/[0.03] last:border-0"
            >
              {link.label}
            </a>
          ))} */}

          {/* Social row */}
          <div className="flex items-center gap-4 pt-4 px-3">
            {/* {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  s.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className={`p-2 text-muted/50 transition-all duration-300 hover:scale-110 ${s.hoverColor}`}
              >
                <s.icon size={18} strokeWidth={1.8} />
              </a>
            ))} */}
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Github, Twitter, BookOpen, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Gameplay", href: "#gameplay" },
  { label: "Docs", href: "#docs" },
];

const SOCIAL_LINKS = [
  {
    icon: Twitter,
    href: "https://twitter.com",
    label: "Twitter",
    hoverColor: "hover:text-neon hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]",
  },
  {
    icon: Github,
    href: "https://github.com",
    label: "GitHub",
    hoverColor: "hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]",
  },
  {
    icon: BookOpen,
    href: "#docs",
    label: "Docs",
    hoverColor: "hover:text-gold hover:drop-shadow-[0_0_8px_rgba(255,200,87,0.5)]",
  },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
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

      tl.from(
        ".nav-cta",
        {
          scale: 0.85,
          opacity: 0,
          duration: 0.5,
        },
        "-=0.15"
      );
    },
    { scope: headerRef }
  );

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
          ? "bg-bg-dark/92 backdrop-blur-2xl border-b border-neon/[0.06] shadow-[0_2px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
        }`}
    >
      <div className="h-[68px] flex items-center justify-between" style={{ paddingLeft: "clamp(2rem, 5vw, 5rem)", paddingRight: "clamp(2rem, 5vw, 5rem)" }}>
        {/* ═══ LEFT: Logo ═══ */}
        <a href="#" className="nav-logo flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="Golden Flop"
            width={28}
            height={32}
            className="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(255,200,87,0.5)] group-hover:scale-110 -translate-y-[1px]"
            style={{ imageRendering: "pixelated" }}
          />
          <span
            className="font-pixel text-[11px] sm:text-[12px] uppercase tracking-[0.06em] text-[#FFD505] hidden sm:inline transition-all duration-300 leading-none"
            style={{
              textShadow: "0 0 10px rgba(255,213,5,0.15)",
            }}
          >
            Golden
            <span className="ml-[0.15em]">Flop</span>
          </span>
        </a>
        {/* ═══ CENTER: Nav links (desktop) ═══ */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link relative px-4 py-2 text-[13px] font-body text-muted transition-all duration-250 hover:text-neon group"
            >
              {link.label}
              {/* Underline indicator */}
              <span className="absolute bottom-0.5 left-4 right-4 h-[1px] bg-neon scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-60" />
            </a>
          ))}

          {/* Separator */}
          <div className="w-[1px] h-4 bg-white/[0.06] mx-2" />

          {/* Social icons in nav */}
          {SOCIAL_LINKS.map((s) => (
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
          ))}
        </nav>

        {/* ═══ RIGHT: Badge + CTA + Mobile toggle ═══ */}
        <div className="flex items-center gap-3">
          {/* Live on Solana badge */}
          <div className="hidden sm:inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-neon/20 bg-neon/5">
            <div className="relative flex h-2 w-2">
              <div className="animate-ping absolute h-full w-full rounded-full bg-neon opacity-50" />
              <div className="relative rounded-full h-2 w-2 bg-neon" />
            </div>
            <div className="text-[10px] uppercase tracking-widest text-neon font-medium leading-none"
              style={{ fontFamily: "'Inter', sans-serif", textShadow: "0 0 6px rgba(0,240,255,0.35)" }}>
              Live on Solana
            </div>
          </div>

          {/* CTA */}
          <a
            href="#"
            className="nav-cta relative font-pixel text-[9px] sm:text-[10px] uppercase tracking-[0.05em] px-8 sm:px-9 py-3.5 rounded-lg bg-gradient-to-r from-gold via-[#FFE29A] to-gold text-bg-dark transition-transform duration-300 hover:scale-105 group leading-none"
            style={{
              boxShadow:
                "0 0 15px rgba(255,200,87,0.2), 0 0 40px rgba(255,200,87,0.06)",
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                boxShadow:
                  "0 0 25px rgba(255,200,87,0.45), 0 0 60px rgba(255,200,87,0.15)",
                duration: 0.3,
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                boxShadow:
                  "0 0 15px rgba(255,200,87,0.2), 0 0 40px rgba(255,200,87,0.06)",
                duration: 0.4,
              });
            }}
          >
            Play Now
            <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted hover:text-neon transition-colors duration-200"
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
          {/* Nav links */}
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-3 text-sm text-muted hover:text-neon transition-colors duration-200 border-b border-white/[0.03] last:border-0"
            >
              {link.label}
            </a>
          ))}

          {/* Social row */}
          <div className="flex items-center gap-4 pt-4 px-3">
            {SOCIAL_LINKS.map((s) => (
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
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

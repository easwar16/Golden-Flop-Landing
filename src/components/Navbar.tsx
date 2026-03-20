"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2,
    });
  }, { scope: navRef });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
            <span className="text-black font-bold text-sm">GF</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            Golden Flop
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#gameplay" className="hover:text-white transition-colors">Gameplay</a>
          <a href="#tech" className="hover:text-white transition-colors">Technology</a>
        </div>

        <a
          href="#cta"
          className="px-5 py-2 rounded-full bg-gradient-to-r from-gold to-gold-light text-black text-sm font-semibold hover:shadow-[0_0_20px_rgba(212,168,67,0.4)] transition-shadow duration-300"
        >
          Play Now
        </a>
      </div>
    </nav>
  );
}

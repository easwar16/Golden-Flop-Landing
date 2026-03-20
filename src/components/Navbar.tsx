"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(
    () => {
      gsap.from(ref.current, {
        y: -60,
        opacity: 0,
        duration: 0.7,
        delay: 0.15,
        ease: "power3.out",
      });
    },
    { scope: ref }
  );

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      ref={ref}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-bg-dark/90 backdrop-blur-xl border-b border-cyan/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <Image
            src="/icon.png"
            alt="Golden Flop"
            width={34}
            height={34}
            className="rounded-lg group-hover:shadow-[0_0_15px_rgba(255,200,87,0.3)] transition-shadow duration-300"
          />
          <span className="t-label text-[10px] text-white glow-gold hidden sm:inline">
            GOLDEN<span className="text-gold">FLOP</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-[#9CA3AF]">
          {["Features", "Gameplay", "Stats"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="hover:text-cyan transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-cyan after:transition-all after:duration-300 hover:after:w-full"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#cta"
            className="t-btn text-[10px] px-5 py-2.5 rounded-lg bg-cyan/[0.08] border border-cyan/20 text-cyan hover:bg-cyan/[0.15] hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] transition-all duration-300 glow-cyan"
          >
            PLAY NOW
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            aria-label="Menu"
          >
            <span
              className={`block w-5 h-[1.5px] bg-cyan transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[4px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-cyan transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[2.5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg-dark/95 backdrop-blur-xl border-t border-cyan/[0.06] px-6 py-5 flex flex-col gap-4">
          {["Features", "Gameplay", "Stats"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-[#9CA3AF] hover:text-cyan transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

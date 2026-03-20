"use client";

import { GiGhost } from "react-icons/gi";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "Docs", href: "#", ext: true },
  { label: "GitHub", href: "https://github.com", ext: true },
  { label: "Terms", href: "#" },
  { label: "Privacy", href: "#" },
];

const SOCIALS = [
  { Icon: GiGhost, href: "https://twitter.com", label: "Twitter",  glow: "hover:text-neon hover:border-neon/30 hover:shadow-[0_0_14px_rgba(0,240,255,0.2)]" },
  { Icon: GiGhost, href: "https://github.com",  label: "GitHub",   glow: "hover:text-white hover:border-white/20 hover:shadow-[0_0_14px_rgba(255,255,255,0.1)]" },
  { Icon: GiGhost, href: "https://discord.gg",   label: "Discord",  glow: "hover:text-[#7C6AEF] hover:border-[#7C6AEF]/25 hover:shadow-[0_0_14px_rgba(124,106,239,0.2)]" },
];

export default function Footer() {
  return (
    <footer className="relative z-40 mt-8">
      {/* Top separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-neon/10 to-transparent" />

      <div className="px-8 sm:px-12 lg:px-20 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* LEFT: Copyright */}
          <span className="text-[11px] text-white/20" style={{ fontFamily: "'Inter', sans-serif" }}>
            &copy; 2026 Golden Flop
          </span>

          {/* CENTER: Inline links */}
          <div className="flex items-center gap-5 sm:gap-6">
            {LINKS.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target={link.ext ? "_blank" : undefined}
                rel={link.ext ? "noopener noreferrer" : undefined}
                className="text-[12px] text-white/30 hover:text-neon transition-all duration-200"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* RIGHT: Social icons */}
          <div className="flex items-center gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/25 transition-all duration-300 hover:scale-110 ${s.glow}`}
              >
                <s.Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

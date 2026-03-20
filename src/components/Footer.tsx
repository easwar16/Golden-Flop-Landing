"use client";

import { FaTwitter, FaGithub, FaDiscord } from "react-icons/fa";

const LINKS = [
  { label: "Copyright", href: "https://easwar16.github.io/goldenflop-copyright/", ext: true },
  { label: "Terms", href: "https://easwar16.github.io/goldenflop-license/", ext: true },
  { label: "Privacy", href: "https://easwar16.github.io/goldenflop-privacy-policy/", ext: true },
];

const SOCIALS = [
  { Icon: FaTwitter,  href: "https://x.com/goldenflop_skr", label: "Twitter",  hover: "hover:text-neon hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]" },
  { Icon: FaGithub,   href: "https://github.com/easwar16/Golden-Flop",  label: "GitHub",   hover: "hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" },
  // { Icon: FaDiscord,  href: "https://discord.gg",   label: "Discord",  hover: "hover:text-[#7C6AEF] hover:drop-shadow-[0_0_8px_rgba(124,106,239,0.4)]" },
];

export default function Footer() {
  return (
    <footer className="relative z-40 mt-18 py-10">
      {/* Top separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-neon/10 to-transparent" />

      <div className="pl-8 pr-16 sm:pl-12 sm:pr-20 lg:pl-20 lg:pr-28 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* LEFT: Copyright */}
          <span className="font-pixel text-[8px] text-white/40 uppercase tracking-[0.06em]">
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
                className="font-pixel text-[8px] text-white/50 uppercase tracking-[0.06em] hover:text-neon transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* RIGHT: Social icons */}
          <div className="flex items-center gap-4 mr-8">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-white/50 transition-all duration-300 hover:scale-110 ${s.hover}`}
              >
                <s.Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

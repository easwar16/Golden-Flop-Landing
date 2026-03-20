"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
              <span className="text-black font-bold text-xs">GF</span>
            </div>
            <span className="text-sm font-semibold text-white">Golden Flop</span>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Docs</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-zinc-600">
            &copy; 2026 Golden Flop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

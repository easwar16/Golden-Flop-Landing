"use client";

const TABLES = [
  { name: "The High Roller", players: 6, maxPlayers: 6, pot: "42.5 SOL", blind: "1/2 SOL", hot: true },
  { name: "Neon Nights", players: 4, maxPlayers: 6, pot: "18.2 SOL", blind: "0.5/1 SOL", hot: false },
  { name: "Whale Watch", players: 5, maxPlayers: 6, pot: "127.8 SOL", blind: "5/10 SOL", hot: true },
  { name: "Beginner's Table", players: 3, maxPlayers: 6, pot: "3.4 SOL", blind: "0.1/0.2 SOL", hot: false },
];

export default function LiveTables() {
  return (
    <section id="tables" className="relative z-30 py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full opacity-60" style={{ backgroundColor: "#00FF88" }} />
              <span className="relative rounded-full h-2 w-2" style={{ backgroundColor: "#00FF88" }} />
            </span>
            <span className="text-[11px] font-medium uppercase tracking-widest" style={{ fontFamily: "'Inter', sans-serif", color: "#00FF88" }}>
              Live Now
            </span>
          </div>
          <h2
            className="font-pixel text-[clamp(1rem,2.5vw,1.5rem)] uppercase tracking-[0.06em] text-[#FFD505] mb-3"
            style={{ textShadow: "0 0 12px rgba(255,213,5,0.2)" }}
          >
            Active Tables
          </h2>
          <p
            className="text-[14px] sm:text-[15px] text-white/50 max-w-md mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Jump into a game right now
          </p>
        </div>

        {/* Table list */}
        <div className="space-y-3">
          {TABLES.map((t) => (
            <div
              key={t.name}
              className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
              style={{ padding: "16px 24px" }}
            >
              {/* Left: name + blind */}
              <div className="flex items-center gap-4 min-w-0">
                {t.hot && (
                  <span className="text-[9px] font-pixel uppercase tracking-wider text-[#FF4D9D]"
                    style={{ textShadow: "0 0 8px rgba(255,77,157,0.4)" }}>
                    HOT
                  </span>
                )}
                <div className="min-w-0">
                  <span className="font-pixel text-[10px] uppercase tracking-[0.04em] text-white/85 block truncate">
                    {t.name}
                  </span>
                  <span className="text-[11px] text-white/30 block" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Blinds: {t.blind}
                  </span>
                </div>
              </div>

              {/* Center: players */}
              <div className="hidden sm:flex items-center gap-1.5">
                {Array.from({ length: t.maxPlayers }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full transition-colors duration-300"
                    style={{
                      backgroundColor: i < t.players ? "#00FF88" : "rgba(255,255,255,0.1)",
                      boxShadow: i < t.players ? "0 0 4px rgba(0,255,136,0.3)" : "none",
                    }}
                  />
                ))}
                <span className="text-[11px] text-white/40 ml-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {t.players}/{t.maxPlayers}
                </span>
              </div>

              {/* Right: pot + join */}
              <div className="flex items-center gap-5">
                <div className="text-right hidden sm:block">
                  <span className="text-[11px] text-white/30 block" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Pot
                  </span>
                  <span className="font-pixel text-[10px] text-neon"
                    style={{ textShadow: "0 0 6px rgba(0,240,255,0.3)" }}>
                    {t.pot}
                  </span>
                </div>
                <a
                  href="#"
                  className="font-pixel text-[8px] uppercase tracking-[0.04em] text-bg-dark rounded-lg bg-gradient-to-r from-gold via-[#FFE29A] to-gold transition-transform duration-200 hover:scale-105 active:scale-95"
                  style={{ padding: "8px 16px", boxShadow: "0 0 12px rgba(255,200,87,0.2)" }}
                >
                  Join
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

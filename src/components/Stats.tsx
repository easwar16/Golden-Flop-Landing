"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ── Counter component ── */
function Counter({
  target,
  prefix = "",
  suffix = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const [val, setVal] = useState(0);
  const el = useRef<HTMLDivElement>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (!el.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !ran.current) {
          ran.current = true;
          const o = { v: 0 };
          gsap.to(o, {
            v: target,
            duration: 2.2,
            ease: "power2.out",
            onUpdate: () => setVal(Math.floor(o.v)),
          });
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el.current);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={el}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </div>
  );
}

const STATS = [
  {
    value: 12847,
    suffix: "+",
    label: "ACTIVE PLAYERS",
    color: "text-cyan glow-cyan",
    borderColor: "border-cyan/15",
    icon: (
      <svg
        className="w-6 h-6 text-cyan/60"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      </svg>
    ),
  },
  {
    value: 342,
    label: "TABLES RUNNING",
    color: "text-gold glow-gold",
    borderColor: "border-gold/15",
    icon: (
      <svg
        className="w-6 h-6 text-gold/60"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
        />
      </svg>
    ),
  },
  {
    value: 2400000,
    prefix: "$",
    suffix: "+",
    label: "SOL SETTLED",
    color: "text-pink glow-pink",
    borderColor: "border-pink/15",
    icon: (
      <svg
        className="w-6 h-6 text-pink/60"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export default function Stats() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".stats-head", {
        opacity: 0,
        y: 35,
        duration: 0.7,
        scrollTrigger: { trigger: ".stats-head", start: "top 85%" },
      });
      gsap.from(".stat-item", {
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ".stats-row", start: "top 82%" },
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="stats"
      className="relative py-24 md:py-36 px-4 sm:px-6"
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-bg-dark/60 backdrop-blur-sm pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="stats-head text-center mb-14 md:mb-20">
          <span className="t-label text-[10px] text-pink glow-pink block mb-4 tracking-widest">
            {"<"} STATS {">"}
          </span>
          <h2 className="t-section text-white">THE NUMBERS SPEAK</h2>
        </div>

        <div className="stats-row grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`stat-item neon-card rounded-2xl p-8 md:p-10 text-center group hover:scale-[1.03] transition-all duration-300 border ${s.borderColor}`}
            >
              {/* Icon */}
              <div className="flex justify-center mb-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                {s.icon}
              </div>

              {/* Animated number */}
              <div className={`t-section mb-4 ${s.color}`}>
                <Counter
                  target={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                />
              </div>

              {/* Label */}
              <div className="t-label text-[9px] text-[#9CA3AF] tracking-[0.15em]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

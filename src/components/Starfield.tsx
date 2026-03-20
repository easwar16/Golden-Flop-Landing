"use client";

import { useRef, useEffect } from "react";

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const STAR_COUNT = 140;
    const stars: {
      x: number;
      y: number;
      r: number;
      speed: number;
      alpha: number;
      pulse: number;
      isCyan: boolean;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize stars
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        speed: Math.random() * 0.12 + 0.015,
        alpha: Math.random() * 0.5 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        isCyan: Math.random() > 0.75,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        star.pulse += star.speed * 0.04;
        const alpha = star.alpha + Math.sin(star.pulse) * 0.25;

        // Drift down slowly
        star.y += star.speed;
        if (star.y > canvas.height + 5) {
          star.y = -5;
          star.x = Math.random() * canvas.width;
        }

        // Star body
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = star.isCyan
          ? `rgba(0, 240, 255, ${alpha * 0.55})`
          : `rgba(255, 255, 255, ${alpha * 0.45})`;
        ctx.fill();

        // Glow halo for larger stars
        if (star.r > 0.9) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = star.isCyan
            ? `rgba(0, 240, 255, ${alpha * 0.06})`
            : `rgba(200, 180, 255, ${alpha * 0.04})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  );
}

"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePointer } from "@/hooks/usePointer";
import { useMotionCapability } from "@/hooks/useMotionCapability";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const COLORS = [
  "rgba(242, 186, 140, 0.35)",
  "rgba(147, 90, 82, 0.3)",
  "rgba(244, 234, 225, 0.25)",
  "rgba(182, 173, 164, 0.2)",
  "rgba(89, 23, 27, 0.25)",
];

const REPEL_RADIUS = 160;
const REPEL_STRENGTH = 8;

// Deterministic PRNG (mulberry32) so server and client render identical
// particle positions from the same seed — avoids a Math.random() hydration mismatch.
function mulberry32(seed: number) {
  return function () {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateParticles(count: number): Particle[] {
  const rand = mulberry32(42);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rand() * 100,
    y: rand() * 100,
    size: rand() * 4 + 1,
    duration: rand() * 15 + 10,
    delay: rand() * 15,
    color: COLORS[Math.floor(rand() * COLORS.length)],
  }));
}

export function ParticleField() {
  const { enableFancyEffects } = useMotionCapability();
  const count = enableFancyEffects ? 30 : 0;
  const particles = useMemo(() => generateParticles(count), [count]);
  const elRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pointer = usePointer();

  useEffect(() => {
    if (!enableFancyEffects || particles.length === 0) return;

    let rafId: number;
    const tick = () => {
      elRefs.current.forEach((el, i) => {
        if (!el) return;
        const p = particles[i];
        const px = (p.x / 100) * window.innerWidth;
        const py = (p.y / 100) * window.innerHeight;
        const dx = px - pointer.x;
        const dy = py - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          const nudgeX = (dx / dist) * force;
          const nudgeY = (dy / dist) * force;
          el.style.translate = `${nudgeX}px ${nudgeY}px`;
        } else {
          el.style.translate = "0px 0px";
        }
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [enableFancyEffects, particles, pointer]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={p.id}
          ref={(el) => {
            elRefs.current[i] = el;
          }}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

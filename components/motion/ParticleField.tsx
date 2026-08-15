"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePointer } from "@/hooks/usePointer";
import { useMotionCapability } from "@/hooks/useMotionCapability";
import { mulberry32 } from "@/lib/utils";

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
  "rgba(253, 226, 236, 0.35)",
  "rgba(242, 166, 194, 0.3)",
  "rgba(251, 240, 244, 0.25)",
  "rgba(178, 92, 133, 0.22)",
  "rgba(74, 26, 66, 0.25)",
];

const REPEL_RADIUS = 160;
const REPEL_STRENGTH = 8;

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

"use client";

import { useEffect, useRef } from "react";
import { usePointer } from "@/hooks/usePointer";
import { useMotionCapability } from "@/hooks/useMotionCapability";

interface OrbConfig {
  depth: number;
  size: number;
  className: string;
}

const ORBS: OrbConfig[] = [
  { depth: 0.02, size: 420, className: "top-[-8%] left-[-6%] bg-[radial-gradient(circle,var(--gradient-cream)_0%,transparent_65%)] opacity-[0.06] blur-[110px]" },
  { depth: 0.035, size: 520, className: "bottom-[-12%] right-[-8%] bg-[radial-gradient(circle,var(--gradient-soft)_0%,transparent_65%)] opacity-[0.07] blur-[130px]" },
  { depth: 0.015, size: 320, className: "top-[40%] right-[10%] bg-[radial-gradient(circle,var(--gradient-cream)_0%,transparent_65%)] opacity-[0.05] blur-[100px]" },
];

export function AmbientBackground() {
  const { enableFancyEffects } = useMotionCapability();
  const pointer = usePointer();
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const current = useRef(ORBS.map(() => ({ x: 0, y: 0 })));

  useEffect(() => {
    if (!enableFancyEffects) return;

    let rafId: number;
    const tick = () => {
      const cx = pointer.nx * 60;
      const cy = -pointer.ny * 60;

      ORBS.forEach((orb, i) => {
        const target = current.current[i];
        target.x += (cx * orb.depth * 10 - target.x) * 0.04;
        target.y += (cy * orb.depth * 10 - target.y) * 0.04;
        const el = orbRefs.current[i];
        if (el) el.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      });

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [enableFancyEffects, pointer]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)",
          color: "var(--foreground)",
        }}
      />
      {ORBS.map((orb, i) => (
        <div
          key={i}
          ref={(el) => {
            orbRefs.current[i] = el;
          }}
          className={`absolute rounded-full will-change-transform animate-float ${orb.className}`}
          style={{ width: orb.size, height: orb.size, animationDuration: `${14 + i * 4}s`, animationDelay: `${i * 1.5}s` }}
        />
      ))}
    </div>
  );
}

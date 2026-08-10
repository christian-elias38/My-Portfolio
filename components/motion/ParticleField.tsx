"use client";

import { useEffect, useState, useCallback } from "react";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const COLORS = [
  "rgba(229, 242, 201, 0.4)",
  "rgba(180, 183, 157, 0.3)",
  "rgba(140, 112, 95, 0.3)",
  "rgba(178, 163, 138, 0.2)",
  "rgba(134, 98, 85, 0.25)",
];

export function ParticleField({ count = 30 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const generateParticles = useCallback(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 15,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
  }, [count]);

  useEffect(() => {
    setParticles(generateParticles());
  }, [generateParticles]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
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

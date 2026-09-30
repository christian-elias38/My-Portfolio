"use client";

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const petals: Petal[] = Array.from({ length: 18 }, (_, id) => ({
  id,
  left: (id * 47 + 13) % 100,
  size: ((id * 17) % 11) + 8,
  duration: ((id * 7) % 9) + 10,
  delay: (id * 13) % 8,
  opacity: (((id * 7) % 6) + 3) / 10,
}));

export function SakuraPetals() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="sakura-petal"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.4}px`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            opacity: petal.opacity,
          }}
        />
      ))}
    </div>
  );
}

"use client";

import { ParticleField } from "@/components/motion/ParticleField";
import { TypeWriter } from "@/components/motion/TypeWriter";

interface HeroClientProps {
  typewriter?: boolean;
  texts?: string[];
}

export function HeroClient({ typewriter, texts }: HeroClientProps) {
  if (typewriter && texts) {
    return <TypeWriter texts={texts} />;
  }

  return <ParticleField count={25} />;
}

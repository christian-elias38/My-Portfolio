"use client";

import dynamic from "next/dynamic";
import { usePointer } from "@/hooks/usePointer";
import { useMotionCapability } from "@/hooks/useMotionCapability";

const Hero3D = dynamic(() => import("./Hero3D").then((mod) => mod.Hero3D), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

export function Hero3DWrapper() {
  const { nx, ny } = usePointer();
  const { enableFancyEffects } = useMotionCapability();

  if (!enableFancyEffects) return null;

  return <Hero3D mouse={{ x: nx, y: ny }} />;
}

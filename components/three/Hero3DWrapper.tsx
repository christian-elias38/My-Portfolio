"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("./Hero3D").then((mod) => mod.Hero3D), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

export function Hero3DWrapper() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({ x: (e.clientX / window.innerWidth) * 2 - 1, y: -(e.clientY / window.innerHeight) * 2 + 1 });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <Hero3D mouse={mouse} />;
}
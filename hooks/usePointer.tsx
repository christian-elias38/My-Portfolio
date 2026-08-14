"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useMotionCapability } from "@/hooks/useMotionCapability";

export interface PointerState {
  x: number;
  y: number;
  nx: number;
  ny: number;
}

const defaultPointer: PointerState = { x: 0, y: 0, nx: 0, ny: 0 };

const PointerContext = createContext<PointerState>(defaultPointer);

export function PointerProvider({ children }: { children: React.ReactNode }) {
  const { isTouch } = useMotionCapability();
  const [pointer, setPointer] = useState<PointerState>(defaultPointer);
  const rafId = useRef<number | null>(null);
  const latest = useRef<PointerState>(defaultPointer);

  useEffect(() => {
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      latest.current = {
        x,
        y,
        nx: (x / window.innerWidth) * 2 - 1,
        ny: -(y / window.innerHeight) * 2 + 1,
      };

      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        setPointer(latest.current);
        document.documentElement.style.setProperty(
          "--cursor-x",
          `${(latest.current.x / window.innerWidth) * 100}%`
        );
        document.documentElement.style.setProperty(
          "--cursor-y",
          `${(latest.current.y / window.innerHeight) * 100}%`
        );
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [isTouch]);

  return <PointerContext.Provider value={pointer}>{children}</PointerContext.Provider>;
}

export function usePointer() {
  return useContext(PointerContext);
}

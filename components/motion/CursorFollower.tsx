"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { View } from "lucide-react";
import { useMotionCapability } from "@/hooks/useMotionCapability";

type CursorState = "default" | "button" | "link" | "project";

const MAGNET_PULL = 0.35;

export function CursorFollower() {
  const { isTouch, prefersReducedMotion } = useMotionCapability();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [state, setState] = useState<CursorState>("default");
  const springX = useSpring(pos.x, { stiffness: 120, damping: 18, mass: 0.15 });
  const springY = useSpring(pos.y, { stiffness: 120, damping: 18, mass: 0.15 });
  const magnetCenter = useRef<{ x: number; y: number } | null>(null);
  const rawPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (isTouch) return;

    const applyPos = (x: number, y: number) => {
      const target = magnetCenter.current
        ? {
            x: x + (magnetCenter.current.x - x) * MAGNET_PULL,
            y: y + (magnetCenter.current.y - y) * MAGNET_PULL,
          }
        : { x, y };
      setPos(target);
      springX.set(target.x);
      springY.set(target.y);
    };

    const move = (e: MouseEvent) => {
      rawPos.current = { x: e.clientX, y: e.clientY };
      applyPos(e.clientX, e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magnetEl = target.closest("button, [role='button'], a") as HTMLElement | null;

      if (magnetEl) {
        const rect = magnetEl.getBoundingClientRect();
        magnetCenter.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }

      const anchor = target.closest("a") as HTMLAnchorElement | null;
      const isExternalLink = anchor && anchor.target === "_blank";

      if (target.closest("button, [role='button']") || (anchor && !isExternalLink)) {
        // real buttons and same-page/internal anchors (nav, CTAs) — ring only, no label
        setState("button");
      } else if (isExternalLink) {
        setState("link");
      } else if (target.closest("[data-cursor='project']")) {
        setState("project");
      } else {
        setState("default");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, [role='button'], a")) {
        magnetCenter.current = null;
        applyPos(rawPos.current.x, rawPos.current.y);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, [isTouch, springX, springY]);

  if (isTouch) return null;

  if (prefersReducedMotion) {
    return (
      <div className="pointer-events-none fixed inset-0 z-100 hidden md:block mix-blend-difference">
        <div
          className="absolute top-0 left-0 rounded-full bg-foreground"
          style={{ width: 6, height: 6, transform: `translate(${pos.x - 3}px, ${pos.y - 3}px)` }}
        />
      </div>
    );
  }

  const ringSize = state === "button" ? 48 : state === "project" ? 60 : state === "link" ? 44 : 36;
  const dotSize = state === "button" ? 6 : state === "project" || state === "link" ? 0 : 5;
  const label = state === "project" ? "VIEW" : state === "link" ? "OPEN" : null;

  return (
    <div className="pointer-events-none fixed inset-0 z-100 hidden md:block mix-blend-difference">
      <motion.div
        className="absolute top-0 left-0 rounded-full border border-foreground/80"
        style={{
          width: ringSize,
          height: ringSize,
          x: springX.get() - ringSize / 2,
          y: springY.get() - ringSize / 2,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      />
      {dotSize > 0 && (
        <motion.div
          className="absolute top-0 left-0 rounded-full bg-foreground"
          style={{
            width: dotSize,
            height: dotSize,
            x: springX.get() - dotSize / 2,
            y: springY.get() - dotSize / 2,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.2 }}
        />
      )}
      {label && (
        <motion.div
          className="absolute top-0 left-0 rounded-full border border-foreground/80 flex items-center justify-center gap-1 text-foreground text-[9px] font-bold uppercase tracking-widest"
          style={{
            width: ringSize,
            height: ringSize,
            x: springX.get() - ringSize / 2,
            y: springY.get() - ringSize / 2,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
          {state === "project" && <View className="w-3 h-3" />}
          {label}
        </motion.div>
      )}
    </div>
  );
}

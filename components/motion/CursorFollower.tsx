"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { View } from "lucide-react";

type CursorState = "default" | "button" | "link" | "project";

export function CursorFollower() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [state, setState] = useState<CursorState>("default");
  const springX = useSpring(pos.x, { stiffness: 120, damping: 18, mass: 0.15 });
  const springY = useSpring(pos.y, { stiffness: 120, damping: 18, mass: 0.15 });

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, [role='button']")) {
        setState("button");
      } else if (target.closest("a")) {
        setState("link");
      } else if (target.closest("[data-cursor='project']")) {
        setState("project");
      } else {
        setState("default");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, [springX, springY]);

  const ringSize = state === "button" ? 48 : state === "project" ? 56 : 36;
  const dotSize = state === "button" ? 6 : state === "project" ? 0 : 5;
  const showLabel = state === "project";

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block mix-blend-difference">
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
      {showLabel && (
        <motion.div
          className="absolute top-0 left-0 rounded-full border border-foreground/80 flex items-center justify-center text-foreground text-[10px] font-bold uppercase tracking-widest"
          style={{
            width: ringSize,
            height: ringSize,
            x: springX.get() - ringSize / 2,
            y: springY.get() - ringSize / 2,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
          <View className="w-3 h-3" />
        </motion.div>
      )}
    </div>
  );
}
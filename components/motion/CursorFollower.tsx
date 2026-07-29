"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useWindowEvent } from "@/hooks/useWindowEvent";

export function CursorFollower() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useWindowEvent("mousemove", (e) => setPos({ x: e.clientX, y: e.clientY }));

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-5 h-5 rounded-full bg-foreground mix-blend-difference z-[100] hidden md:block"
      animate={{ x: pos.x - 10, y: pos.y - 10 }}
      transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.2 }}
    />
  );
}
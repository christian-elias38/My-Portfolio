"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const languages = ["JavaScript", "TypeScript", "Python", "Dart", "C / C++", "SQL"];

export function LanguageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % languages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="inline-flex h-7 items-center overflow-hidden leading-none"
      style={{ perspective: "400px" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={languages[index]}
          initial={{ rotateX: -90, opacity: 0, y: 10 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          exit={{ rotateX: 90, opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="text-primary font-semibold inline-flex items-center origin-center leading-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          {languages[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
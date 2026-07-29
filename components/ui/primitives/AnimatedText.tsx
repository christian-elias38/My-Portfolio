"use client";
import { motion } from "framer-motion";

export function AnimatedText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {text}
    </motion.p>
  );
}

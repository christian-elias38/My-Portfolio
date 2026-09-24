"use client";

import { motion } from "framer-motion";

export function PixelCat() {
  return (
    <div className="relative flex items-center justify-center p-8 w-full max-w-sm mx-auto">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-linear-to-tr from-purple-900/30 via-pink-600/20 to-transparent rounded-full blur-3xl -z-10 animate-pulse-glow" />

      {/* Floating Sparkles around the pixel cat */}
      <motion.div
        animate={{ y: [-4, 4, -4], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex items-center justify-center"
      >
        {/* Sparkle 1 Top Left */}
        <motion.div
          animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-6 -left-6 text-pink-300 text-xl font-bold font-mono"
        >
          ✦
        </motion.div>

        {/* Sparkle 2 Top Right */}
        <motion.div
          animate={{ scale: [1.2, 0.7, 1.2], opacity: [0.8, 0.4, 0.8] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
          className="absolute -top-4 -right-4 text-purple-300 text-2xl font-bold font-mono"
        >
          ✖
        </motion.div>

        {/* Sparkle 3 Bottom Left */}
        <motion.div
          animate={{ scale: [0.9, 1.4, 0.9], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}
          className="absolute -bottom-4 -left-4 text-pink-400 text-lg font-mono"
        >
          ✖
        </motion.div>

        {/* Sparkle 4 Bottom Right */}
        <motion.div
          animate={{ scale: [1.1, 0.8, 1.1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 0.8, ease: "easeInOut" }}
          className="absolute -bottom-6 -right-6 text-purple-400 text-xl font-mono"
        >
          ✦
        </motion.div>

        {/* Pixel Art Cat Canvas / SVG */}
        <svg
          width="200"
          height="180"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-48 h-48 drop-shadow-[0_0_25px_rgba(216,120,200,0.6)]"
          style={{ imageRendering: "pixelated" }}
        >
          {/* Left Ear */}
          <rect x="2" y="2" width="1" height="1" fill="#c084fc" />
          <rect x="3" y="1" width="1" height="1" fill="#c084fc" />
          <rect x="4" y="2" width="1" height="1" fill="#c084fc" />
          <rect x="3" y="2" width="1" height="1" fill="#e9d5ff" />

          {/* Right Ear */}
          <rect x="15" y="2" width="1" height="1" fill="#c084fc" />
          <rect x="16" y="1" width="1" height="1" fill="#c084fc" />
          <rect x="17" y="2" width="1" height="1" fill="#c084fc" />
          <rect x="16" y="2" width="1" height="1" fill="#e9d5ff" />

          {/* Head Top & Fill */}
          <rect x="5" y="2" width="10" height="1" fill="#c084fc" />
          <rect x="2" y="3" width="16" height="7" fill="#a855f7" />
          <rect x="3" y="3" width="14" height="6" fill="#c084fc" />

          {/* Eyes */}
          <rect x="5" y="5" width="2" height="2" fill="#1e1b4b" />
          <rect x="5" y="5" width="1" height="1" fill="#ffffff" />
          <rect x="13" y="5" width="2" height="2" fill="#1e1b4b" />
          <rect x="13" y="5" width="1" height="1" fill="#ffffff" />

          {/* Nose & Mouth */}
          <rect x="9.5" y="6.5" width="1" height="1" fill="#f472b6" />
          <rect x="8" y="7.5" width="4" height="0.5" fill="#581c87" />

          {/* Cheeks */}
          <rect x="3.5" y="6.5" width="1.5" height="1" fill="#f472b6" opacity="0.8" />
          <rect x="15" y="6.5" width="1.5" height="1" fill="#f472b6" opacity="0.8" />

          {/* Body */}
          <rect x="3" y="10" width="14" height="5" fill="#a855f7" />
          <rect x="4" y="10" width="12" height="4" fill="#c084fc" />

          {/* Paws */}
          <rect x="4" y="14" width="3" height="2" fill="#9333ea" />
          <rect x="5" y="14" width="1" height="2" fill="#e9d5ff" />
          <rect x="13" y="14" width="3" height="2" fill="#9333ea" />
          <rect x="14" y="14" width="1" height="2" fill="#e9d5ff" />

          {/* Tail */}
          <rect x="17" y="12" width="2" height="1" fill="#c084fc" />
          <rect x="18" y="10" width="1" height="2" fill="#a855f7" />
          <rect x="18" y="9" width="1" height="1" fill="#e9d5ff" />
        </svg>
      </motion.div>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function Butterfly() {
  const butterflyRef = useRef<HTMLDivElement>(null);

  // Motion values for position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics springs for responsive movement
  const springX = useSpring(mouseX, { stiffness: 140, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 140, damping: 20 });

  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const lastPos = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!butterflyRef.current) return;
    const rect = butterflyRef.current.getBoundingClientRect();

    // Relative offset from butterfly center
    const relativeX = e.clientX - (rect.left + rect.width / 2);
    const relativeY = e.clientY - (rect.top + rect.height / 2);

    // Limit position range for natural localized movement
    const clampedX = Math.max(-90, Math.min(90, relativeX));
    const clampedY = Math.max(-80, Math.min(80, relativeY));

    // Turn butterfly towards cursor direction
    const dx = clampedX - lastPos.current.x;
    const dy = clampedY - lastPos.current.y;
    if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      setRotation(angle);
    }

    lastPos.current = { x: clampedX, y: clampedY };
    mouseX.set(clampedX);
    mouseY.set(clampedY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Instantly return to resting center position when cursor leaves
    mouseX.set(0);
    mouseY.set(0);
    setRotation(0);
    lastPos.current = { x: 0, y: 0 };
  };

  return (
    <div className="relative flex items-center justify-center p-6 w-full max-w-md h-80 mx-auto select-none overflow-visible">
      {/* Soft background ambient glow */}
      <div className="absolute inset-0 bg-radial from-[#E6C88A]/15 via-[#C99555]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Floating Sparkles in Background */}
      <motion.div
        animate={{ opacity: isHovered ? [0.4, 0.9, 0.4] : 0.3, scale: isHovered ? [0.9, 1.2, 0.9] : 1 }}
        transition={{ duration: 3, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
        className="absolute top-8 left-12 text-[#F0D9A5] text-sm pointer-events-none"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ opacity: isHovered ? [0.3, 0.8, 0.3] : 0.3, scale: isHovered ? [1, 1.3, 1] : 1 }}
        transition={{ duration: 3.5, repeat: isHovered ? Infinity : 0, delay: 0.5, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 text-[#E6C88A] text-base pointer-events-none"
      >
        ✦
      </motion.div>

      {/* Interactive Butterfly (ONLY moves when cursor is directly on top of it) */}
      <motion.div
        ref={butterflyRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          x: isHovered ? springX : 0,
          y: isHovered ? springY : 0,
          rotate: isHovered ? rotation : 0,
        }}
        animate={{
          y: isHovered ? [0, -4, 0] : 0,
        }}
        transition={{
          y: { duration: 2, repeat: isHovered ? Infinity : 0, ease: "easeInOut" },
        }}
        className="relative cursor-pointer z-20 flex items-center justify-center p-6 rounded-full group"
      >
        {/* Glow behind Butterfly */}
        <div
          className={`absolute inset-0 bg-[#E6C88A]/40 rounded-full blur-xl scale-125 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-40"
          }`}
        />

        {/* Butterfly SVG with Animated Flapping Wings */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 drop-shadow-[0_0_25px_rgba(230,200,138,0.7)] flex items-center justify-center">
          {/* Left Wings */}
          <motion.svg
            width="100"
            height="160"
            viewBox="0 0 100 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ rotateY: isHovered ? [0, 65, 0] : 15 }}
            transition={{ duration: 0.45, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
            style={{ transformOrigin: "right center" }}
            className="absolute right-1/2 top-0"
          >
            {/* Upper Left Wing */}
            <path
              d="M100 80 C60 10 10 20 5 60 C0 90 40 100 100 80 Z"
              fill="url(#leftWingGradientUpper)"
              stroke="#F0D9A5"
              strokeWidth="2"
            />
            {/* Lower Left Wing */}
            <path
              d="M100 80 C50 90 20 120 35 145 C50 165 90 130 100 80 Z"
              fill="url(#leftWingGradientLower)"
              stroke="#E6C88A"
              strokeWidth="2"
            />
            {/* Decorative Wing Patterns */}
            <circle cx="45" cy="55" r="10" fill="#ffffff" opacity="0.6" />
            <circle cx="55" cy="115" r="6" fill="#F7F1E8" opacity="0.7" />

            <defs>
              <linearGradient id="leftWingGradientUpper" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E6C88A" />
                <stop offset="0.6" stopColor="#D9A85B" />
                <stop offset="1" stopColor="#E6C88A" />
              </linearGradient>
              <linearGradient id="leftWingGradientLower" x1="0" y1="50" x2="100" y2="150" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E6C88A" />
                <stop offset="0.7" stopColor="#B8734F" />
                <stop offset="1" stopColor="#F0D9A5" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Right Wings */}
          <motion.svg
            width="100"
            height="160"
            viewBox="0 0 100 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ rotateY: isHovered ? [0, -65, 0] : -15 }}
            transition={{ duration: 0.45, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
            style={{ transformOrigin: "left center" }}
            className="absolute left-1/2 top-0"
          >
            {/* Upper Right Wing */}
            <path
              d="M0 80 C40 10 90 20 95 60 C100 90 60 100 0 80 Z"
              fill="url(#rightWingGradientUpper)"
              stroke="#F0D9A5"
              strokeWidth="2"
            />
            {/* Lower Right Wing */}
            <path
              d="M0 80 C50 90 80 120 65 145 C50 165 10 130 0 80 Z"
              fill="url(#rightWingGradientLower)"
              stroke="#E6C88A"
              strokeWidth="2"
            />
            {/* Decorative Wing Patterns */}
            <circle cx="55" cy="55" r="10" fill="#ffffff" opacity="0.6" />
            <circle cx="45" cy="115" r="6" fill="#F7F1E8" opacity="0.7" />

            <defs>
              <linearGradient id="rightWingGradientUpper" x1="100" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E6C88A" />
                <stop offset="0.6" stopColor="#D9A85B" />
                <stop offset="1" stopColor="#E6C88A" />
              </linearGradient>
              <linearGradient id="rightWingGradientLower" x1="100" y1="50" x2="0" y2="150" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E6C88A" />
                <stop offset="0.7" stopColor="#B8734F" />
                <stop offset="1" stopColor="#F0D9A5" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Butterfly Body & Antennae */}
          <div className="relative z-30 flex flex-col items-center">
            {/* Antennae */}
            <div className="flex gap-4 -mb-1.5">
              <div className="w-4 h-6 border-t-2 border-l-2 border-[#F7F1E8] rounded-tl-full transform -rotate-12" />
              <div className="w-4 h-6 border-t-2 border-r-2 border-[#F7F1E8] rounded-tr-full transform rotate-12" />
            </div>
            {/* Body Segment */}
            <div className="w-3.5 h-16 bg-linear-to-b from-[#F7F1E8] via-[#E6C88A] to-[#504234] rounded-full shadow-lg border border-white/40" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

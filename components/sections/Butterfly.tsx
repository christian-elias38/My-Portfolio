"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function Butterfly() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion values for smooth position following
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for natural organic movement
  const springX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Calculate relative coordinates within the container
      const relativeX = e.clientX - (rect.left + rect.width / 2);
      const relativeY = e.clientY - (rect.top + rect.height / 2);

      // Bound movement within container limits
      const clampedX = Math.max(-140, Math.min(140, relativeX));
      const clampedY = Math.max(-120, Math.min(120, relativeY));

      // Calculate movement angle for realistic turning direction
      const dx = clampedX - lastX;
      const dy = clampedY - lastY;
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        setRotation(angle);
      }

      lastX = clampedX;
      lastY = clampedY;

      mouseX.set(clampedX);
      mouseY.set(clampedY);
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      // Gently glide back to center when cursor leaves
      mouseX.set(0);
      mouseY.set(0);
      setRotation(0);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center p-8 w-full max-w-md h-85 mx-auto select-none overflow-visible"
    >
      {/* Soft magical ambient glow */}
      <div className="absolute inset-0 bg-radial from-[#E6C88A]/20 via-[#C99555]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Floating Sparkles in Background */}
      <motion.div
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.2, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 left-12 text-[#F0D9A5] text-sm pointer-events-none"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 text-[#E6C88A] text-base pointer-events-none"
      >
        ✦
      </motion.div>

      {/* Interactive Butterfly */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          rotate: rotation,
        }}
        animate={{
          y: isHovered ? [0, -6, 0] : [-8, 8, -8],
        }}
        transition={{
          y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative cursor-pointer z-20 flex items-center justify-center"
      >
        {/* Glow behind Butterfly */}
        <div className="absolute inset-0 bg-[#E6C88A]/40 rounded-full blur-xl scale-125" />

        {/* Butterfly SVG with Animated Flapping Wings */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 drop-shadow-[0_0_25px_rgba(230,200,138,0.7)] flex items-center justify-center">
          {/* Left Wings */}
          <motion.svg
            width="100"
            height="160"
            viewBox="0 0 100 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ rotateY: [0, 65, 0] }}
            transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
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
            animate={{ rotateY: [0, -65, 0] }}
            transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
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

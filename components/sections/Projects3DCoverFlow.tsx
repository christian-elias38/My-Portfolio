"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SiGithub } from "@icons-pack/react-simple-icons";
import {
  SquareArrowOutUpRight,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Check,
  Lock,
  Code2,
  MousePointer2,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { ProjectExtra } from "./Projects";

export function Projects3DCoverFlow({ projects }: { projects: ProjectExtra[] }) {
  const [targetPos, setTargetPos] = useState(0);
  const [currentPos, setCurrentPos] = useState(0);
  const targetPosRef = useRef(0);
  const currentPosRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const total = projects.length;

  // Keep targetPosRef synchronized
  useEffect(() => {
    targetPosRef.current = targetPos;
  }, [targetPos]);

  // Smooth lerp animation loop for damped cursor movement horizontal scroll ("not so fast")
  useEffect(() => {
    let frameId: number;
    const loop = () => {
      const diff = targetPosRef.current - currentPosRef.current;
      if (Math.abs(diff) > 0.0005) {
        // Controlled lerp factor (0.05) creates smooth, gentle horizontal movement tracking cursor direction
        currentPosRef.current += diff * 0.05;
        setCurrentPos(currentPosRef.current);
      }
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Cursor movement handler across the stage container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || total <= 1) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    // Map cursor X position to project index range (with 5% side margins for natural alignment)
    const paddedRatio = Math.max(0, Math.min(1, (mouseX - rect.width * 0.05) / (rect.width * 0.9)));
    const newTarget = paddedRatio * (total - 1);
    targetPosRef.current = newTarget;
    setTargetPos(newTarget);
  };

  // Horizontal wheel scroll handler
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
    const sensitivity = 0.0015;
    const next = Math.max(0, Math.min(total - 1, targetPosRef.current + delta * sensitivity));
    targetPosRef.current = next;
    setTargetPos(next);
  };

  const handlePrev = () => {
    const next = Math.max(0, Math.floor(currentPosRef.current - 0.5));
    targetPosRef.current = next;
    setTargetPos(next);
  };

  const handleNext = () => {
    const next = Math.min(total - 1, Math.ceil(currentPosRef.current + 0.5));
    targetPosRef.current = next;
    setTargetPos(next);
  };

  const handleOpenProject = (index: number) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };

  const handleModalPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleModalNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const activeIndex = Math.round(currentPos);
  const currentModalProject = projects[selectedIndex] || projects[0];

  const defaultFeaturesMap: Record<string, string[]> = {
    "Dreamy Portfolio & Web Platform": [
      "Liquid wave ambient canvas background",
      "Interactive 3D Three.js graphic canvas",
      "Expandable project card details & lightbox image viewer",
      "Full stack Next.js & Prisma API backend",
    ],
    "Car Maintenance Tracker": [
      "Cross-platform Flutter & Dart mobile application",
      "Service schedule & maintenance log tracking",
      "Cost tracking & fuel analytics",
      "Offline-first SQLite database storage",
    ],
    "Maze Pathfinding & Generation": [
      "Maze generation via Depth-First Search & Prim's algorithm",
      "A* and Dijkstra shortest path solver routines",
      "Real-time grid state visualization",
      "Visual step execution tracking metrics",
    ],
    "Student Registration Platform": [
      "Student enrollment & record management",
      "RESTful Express API backend server",
      "Relational database storage & queries",
      "Clean responsive administration interface",
    ],
    "Fitness Challenge App": [
      "Custom workout challenge creation",
      "Daily fitness progress monitoring",
      "Goal completion analytics & charts",
      "Interactive Flutter mobile UI",
    ],
    "Gojo Real Estate": [
      "Property search & filtering system",
      "Detailed property view cards",
      "Responsive real estate showcase",
      "Modern Next.js frontend architecture",
    ],
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto py-2">
      {/* Top Header Bar */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-3 rounded-2xl bg-[#1E1518]/90 border border-[#504234]/70 backdrop-blur-xl shadow-xl w-full text-xs text-[#CFC1B5]">
        {/* Left Badge */}
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E6C88A] animate-pulse" />
          <span className="font-mono font-bold text-[#F3E7D3] uppercase tracking-wider text-xs">
            3D SPATIAL SHOWCASE
          </span>
        </div>

        {/* Center Title Explorer */}
        <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#150913]/90 border border-[#504234]/60 text-[#F3E7D3] font-mono text-xs shadow-inner max-w-md w-full sm:w-auto">
          <Lock className="w-3.5 h-3.5 text-[#E6C88A]" />
          <span className="truncate font-semibold tracking-wide">
            portfolio.explorer / {projects[activeIndex]?.title || "3D Spatial View"}
          </span>
        </div>

        {/* Right Cursor Navigation Prompt */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-[#E6C88A]">
          <MousePointer2 className="w-3.5 h-3.5 animate-pulse text-[#E6C88A]" />
          <span>Move cursor left/right to scroll spatial view</span>
        </div>
      </div>

      {/* 3D Spatial Cover Flow Stage */}
      <div className="relative w-full py-2">
        {/* Arrow Navigation & Counter */}
        <div className="mb-4 flex items-center justify-center gap-3">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-[#24151C] hover:bg-[#504234] text-[#E6C88A] hover:text-white transition-all border border-[#504234] shadow-md cursor-pointer active:scale-95"
            title="Previous Project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-mono text-xs font-bold text-[#F0D9A5] px-4 py-1.5 rounded-full bg-[#150913]/80 border border-[#504234]/60 shadow-inner">
            {activeIndex + 1} / {total}
          </span>
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-[#24151C] hover:bg-[#504234] text-[#E6C88A] hover:text-white transition-all border border-[#504234] shadow-md cursor-pointer active:scale-95"
            title="Next Project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive 3D Spatial Stage (Sensing cursor movement) */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onWheel={handleWheel}
          className="relative w-full h-175 sm:h-190 md:h-205 flex items-center justify-center overflow-hidden py-4 select-none touch-pan-x"
          style={{ perspective: "1500px" }}
        >
          <div className="relative w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl h-full flex items-center justify-center">
            {projects.map((proj, index) => {
              const offset = index - currentPos;
              const absOffset = Math.abs(offset);
              const isActive = absOffset < 0.5;

              // 3D Spatial transformation parameters
              const rotateY = Math.max(-38, Math.min(38, -offset * 22));
              const translateX = offset * 500; // Expanded spacing for larger cards
              const scale = Math.max(0.72, 1 - Math.min(0.28, absOffset * 0.14));
              const opacity = Math.max(0.15, 1 - Math.min(0.85, absOffset * 0.35));
              const zIndex = Math.round(50 - absOffset * 10);

              const isMobileApp =
                proj.imageUrl?.includes("car-maintenance") ||
                proj.imageUrl?.includes("fitness-challenge");

              return (
                <motion.div
                  key={proj.id}
                  onClick={() => handleOpenProject(index)}
                  style={{
                    rotateY: rotateY,
                    x: translateX,
                    scale: scale,
                    opacity: opacity,
                    zIndex: zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 32,
                    mass: 0.6,
                  }}
                  className={`absolute inset-0 w-full h-150 sm:h-167.5 md:h-182.5 rounded-3xl cursor-pointer select-none transition-shadow duration-300 ${
                    isActive
                      ? "bg-linear-to-b from-[#24151C]/95 via-[#1E1518]/95 to-[#1E1518]/95 border-2 border-[#E6C88A]/80 shadow-[0_25px_80px_rgba(230,200,138,0.35)] backdrop-blur-2xl"
                      : "bg-[#1E1518]/85 border border-[#504234]/50 shadow-xl backdrop-blur-md hover:border-[#E6C88A]/40"
                  } overflow-hidden flex flex-col justify-between`}
                >
                  {/* Card Top Header */}
                  <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#504234]/40 bg-[#1E1518]/70">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E6C88A] animate-pulse" />
                      <span className="text-xs sm:text-sm font-mono font-bold text-[#F3E7D3] uppercase tracking-wider">
                        {proj.category || "Project"}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#24151C] border border-[#504234] text-[#F0D9A5] text-xs font-bold shadow-xs">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </span>
                  </div>

                  {/* Screenshot Preview Container (Large image layout) */}
                  {proj.imageUrl && (
                    <div className="relative h-72 sm:h-80 md:h-96 w-full bg-[#150913] overflow-hidden border-b border-[#504234]/40 shrink-0">
                      <Image
                        src={proj.imageUrl}
                        alt={proj.title}
                        fill
                        sizes="(min-width: 1024px) 1024px, 100vw"
                        priority={isActive}
                        className={`transition-transform duration-500 hover:scale-103 ${
                          isMobileApp
                            ? "object-contain p-4 bg-[#150913]"
                            : "object-cover object-top"
                        }`}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[#1E1518] via-transparent to-transparent opacity-80" />
                    </div>
                  )}

                  {/* Main Card Info */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug">
                        {proj.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-[#E6C88A] mt-1">
                        {proj.subtitle || `${proj.category || "Full-Stack"} Application`}
                      </p>
                      <p className="text-sm sm:text-base text-[#CFC1B5] mt-2.5 line-clamp-3 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    {/* Tech Badges Row */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#504234]/50">
                      <div className="flex flex-wrap gap-2">
                        {proj.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full bg-[#24151C] border border-[#504234] text-[#F3E7D3] text-xs font-mono font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <SquareArrowOutUpRight className="w-4 h-4 text-[#E6C88A] shrink-0" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                targetPosRef.current = i;
                setTargetPos(i);
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? "w-8 bg-[#E6C88A] shadow-[0_0_12px_rgba(230,200,138,0.5)]"
                  : "w-2.5 bg-[#504234] hover:bg-[#C99555]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* EXPANDED PROJECT SHOWCASE MODAL */}
      <AnimatePresence>
        {modalOpen && currentModalProject && (
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="sm:max-w-4xl lg:max-w-5xl w-full p-6 sm:p-8 bg-[#1E1518] border-2 border-[#E6C88A]/50 text-white rounded-3xl shadow-[0_0_60px_rgba(230,200,138,0.25)]">
              {/* Modal Top Bar Navigation */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-[#504234]/60">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#24151C] border border-[#504234] text-[#E6C88A] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" />
                    {currentModalProject.category || "Featured Project"}
                  </span>
                  <span className="text-xs text-[#CFC1B5] font-mono">
                    Project {selectedIndex + 1} of {total}
                  </span>
                </div>

                {/* Arrow Navigation */}
                <div className="flex items-center gap-2 pr-8">
                  <button
                    onClick={handleModalPrev}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#24151C] hover:bg-[#504234] text-[#E6C88A] hover:text-white transition-all border border-[#504234] text-xs font-bold cursor-pointer"
                    title="Previous Project"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>
                  <button
                    onClick={handleModalNext}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#24151C] hover:bg-[#504234] text-[#E6C88A] hover:text-white transition-all border border-[#504234] text-xs font-bold cursor-pointer"
                    title="Next Project"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <DialogTitle className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {currentModalProject.title}
                </DialogTitle>
                <p className="text-xs sm:text-sm font-semibold text-[#E6C88A] mt-1">
                  {currentModalProject.subtitle || `${currentModalProject.category || "Full-Stack"} Application`}
                </p>
              </div>

              {/* Large Image Showcase Container */}
              {currentModalProject.imageUrl && (
                <div
                  onClick={() => setLightboxUrl(currentModalProject.imageUrl)}
                  className="group relative w-full h-80 sm:h-115 lg:h-130 rounded-2xl overflow-hidden bg-[#150913] border border-[#504234]/70 mb-6 cursor-pointer shadow-2xl flex items-center justify-center"
                >
                  <Image
                    src={currentModalProject.imageUrl}
                    alt={currentModalProject.title}
                    fill
                    sizes="1200px"
                    priority
                    className={`transition-transform duration-500 group-hover:scale-102 ${
                      currentModalProject.imageUrl.includes("car-maintenance") ||
                      currentModalProject.imageUrl.includes("fitness-challenge")
                        ? "object-contain p-4 bg-[#150913]"
                        : "object-cover object-top"
                    }`}
                  />
                </div>
              )}

              {/* Description & Features */}
              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#E6C88A] uppercase tracking-wider mb-2">
                    Project Overview
                  </h4>
                  <p className="text-sm sm:text-base text-[#CFC1B5] leading-relaxed font-normal">
                    {currentModalProject.description}
                  </p>
                </div>

                {/* Features Checklist */}
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#E6C88A] uppercase tracking-wider mb-3">
                    Key Features & Architecture
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(
                      currentModalProject.features ||
                      defaultFeaturesMap[currentModalProject.title] || [
                        `Full-stack ${currentModalProject.title} implementation`,
                        "Responsive, modern user interface design",
                        "Secure backend API logic & database integrations",
                        "Optimized for high performance and reliability",
                      ]
                    ).map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-[#24151C]/60 border border-[#504234]/50 text-xs text-[#CFC1B5]"
                      >
                        <Check className="w-4 h-4 text-[#E6C88A] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technology Badges */}
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#E6C88A] uppercase tracking-wider mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentModalProject.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-3.5 py-1.5 rounded-full bg-[#24151C] border border-[#504234] text-[#F3E7D3] text-xs font-mono font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#504234]/70">
                <div className="flex items-center gap-3">
                  {currentModalProject.githubUrl && (
                    <a
                      href={currentModalProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#504234] bg-[#24151C] text-xs font-bold text-[#F3E7D3] hover:text-white hover:border-[#E6C88A] transition-all shadow-md"
                    >
                      <SiGithub size={16} />
                      <span>GitHub Repository</span>
                    </a>
                  )}

                  {(currentModalProject.liveUrl || currentModalProject.githubUrl) && (
                    <a
                      href={(currentModalProject.liveUrl || currentModalProject.githubUrl) ?? undefined}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-linear-to-r from-[#C99555] to-[#E6C88A] text-xs font-extrabold text-[#24191A] shadow-lg hover:scale-102 transition-all"
                    >
                      <span>Launch Live Application</span>
                      <SquareArrowOutUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* FULL-SCREEN LIGHTBOX IMAGE MODAL */}
      {lightboxUrl && (
        <Dialog open={!!lightboxUrl} onOpenChange={() => setLightboxUrl(null)}>
          <DialogContent className="sm:max-w-6xl w-full bg-[#150913] border border-[#504234] text-white p-4 rounded-3xl">
            <DialogTitle className="text-base font-bold text-[#E6C88A] mb-3 flex items-center justify-between">
              <span>{currentModalProject?.title}</span>
            </DialogTitle>
            <div className="relative w-full h-[75vh] rounded-2xl overflow-hidden bg-[#150913] border border-[#504234]/60">
              <Image
                src={lightboxUrl}
                alt="Full resolution preview"
                fill
                sizes="1600px"
                className="object-contain p-2"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

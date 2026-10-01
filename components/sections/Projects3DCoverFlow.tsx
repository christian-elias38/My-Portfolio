"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SiGithub } from "@icons-pack/react-simple-icons";
import {
  SquareArrowOutUpRight,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Check,
  LayoutGrid,
  Sparkles,
  Lock,
  Mic,
  Code2,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { ProjectExtra } from "./Projects";

export function Projects3DCoverFlow({ projects }: { projects: ProjectExtra[] }) {
  const [viewMode, setViewMode] = useState<"grid" | "coverflow">("grid");
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const total = projects.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
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

  const currentModalProject = projects[selectedIndex] || projects[0];
  const activeCoverProject = projects[activeIndex] || projects[0];

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
      {/* Top Controls Bar with View Mode Switcher */}
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-3 rounded-2xl bg-[#1E1518]/90 border border-[#504234]/70 backdrop-blur-xl shadow-xl w-full text-xs text-[#CFC1B5]">
        {/* Left Side: View Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === "grid"
                ? "bg-linear-to-r from-[#C99555] to-[#E6C88A] text-[#24191A] shadow-md"
                : "bg-[#24151C] text-[#CFC1B5] hover:text-white border border-[#504234]"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Grid Showcase</span>
          </button>

          <button
            onClick={() => setViewMode("coverflow")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === "coverflow"
                ? "bg-linear-to-r from-[#C99555] to-[#E6C88A] text-[#24191A] shadow-md"
                : "bg-[#24151C] text-[#CFC1B5] hover:text-white border border-[#504234]"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>3D Spatial Flow</span>
          </button>
        </div>

        {/* Center Title Explorer */}
        <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#150913]/90 border border-[#504234]/60 text-[#F3E7D3] font-mono text-xs shadow-inner max-w-md w-full sm:w-auto">
          <Lock className="w-3.5 h-3.5 text-[#E6C88A]" />
          <span className="truncate font-semibold tracking-wide">
            portfolio.explorer / {viewMode === "grid" ? "All Featured Projects" : activeCoverProject.title}
          </span>
          <Mic className="w-3.5 h-3.5 text-[#E6C88A]/70 ml-auto shrink-0" />
        </div>

        {/* Right Info Prompt */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-[#E6C88A]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Click any card to expand full view</span>
        </div>
      </div>

      {/* VIEW 1: Full Website Fittable Grid Layout */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          {projects.map((proj, idx) => {
            const isMobileApp = proj.imageUrl?.includes("car-maintenance") || proj.imageUrl?.includes("fitness-challenge");

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => handleOpenProject(idx)}
                className="group relative rounded-3xl bg-[#1E1518]/90 border border-[#504234]/70 hover:border-[#E6C88A]/80 shadow-xl hover:shadow-[0_0_35px_rgba(230,200,138,0.25)] backdrop-blur-xl overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Top Badge & Header */}
                  <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#504234]/40 bg-[#24151C]/60">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#E6C88A] animate-pulse" />
                      <span className="text-[11px] font-mono font-bold text-[#F3E7D3] uppercase tracking-wider">
                        {proj.category || "Project"}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E6C88A] group-hover:text-white transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Expand</span>
                    </span>
                  </div>

                  {/* Screenshot Image Preview Container */}
                  {proj.imageUrl && (
                    <div className="relative aspect-16/10 bg-[#150913] overflow-hidden border-b border-[#504234]/40 group/img">
                      <Image
                        src={proj.imageUrl}
                        alt={proj.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className={`transition-transform duration-500 group-hover:scale-105 ${
                          isMobileApp ? "object-contain p-4 bg-[#150913]" : "object-cover object-top"
                        }`}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[#1E1518] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                    </div>
                  )}

                  {/* Concise Card Body ("A Little Information") */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div>
                      <h3 className="text-xl font-extrabold text-white tracking-tight leading-snug group-hover:text-[#F0D9A5] transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#E6C88A] mt-0.5">
                        {proj.subtitle || `${proj.category || "Full-Stack"} Application`}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#CFC1B5] line-clamp-2 leading-relaxed font-normal">
                      {proj.description}
                    </p>
                  </div>
                </div>

                {/* Footer: Tech Stack Badges & Click Prompt */}
                <div className="p-5 sm:p-6 pt-0 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full bg-[#24151C] border border-[#504234] text-[#F3E7D3] text-[11px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.technologies.length > 4 && (
                      <span className="px-2 py-1 rounded-full bg-[#24151C] border border-[#504234] text-[#E6C88A] text-[11px] font-mono font-bold">
                        +{proj.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#504234]/50 flex items-center justify-between text-xs font-bold text-[#E6C88A] group-hover:text-white transition-colors">
                    <span>Click for full details & large preview</span>
                    <SquareArrowOutUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: 3D Spatial Cover Flow Stage */}
      {viewMode === "coverflow" && (
        <div className="relative w-full py-4">
          <div className="mb-4 flex items-center justify-center gap-3">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-[#24151C] hover:bg-[#504234] text-[#E6C88A] hover:text-white transition-all border border-[#504234] shadow-md"
              title="Previous Project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs font-bold text-[#F0D9A5] px-3">
              {activeIndex + 1} / {total}
            </span>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-[#24151C] hover:bg-[#504234] text-[#E6C88A] hover:text-white transition-all border border-[#504234] shadow-md"
              title="Next Project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div
            className="relative w-full h-135 sm:h-145 flex items-center justify-center overflow-hidden py-4 perspective-1000"
            style={{ perspective: "1200px" }}
          >
            <div className="relative w-full max-w-xl sm:max-w-2xl h-full flex items-center justify-center">
              {projects.map((proj, index) => {
                const offset = index - activeIndex;
                const isActive = offset === 0;

                let rotateY = 0;
                let translateX = 0;
                let scale = 1;
                let opacity = 1;
                let zIndex = 10;

                if (offset < 0) {
                  rotateY = Math.min(30, 22 * Math.abs(offset));
                  translateX = offset * 300;
                  scale = Math.max(0.75, 1 - 0.12 * Math.abs(offset));
                  opacity = Math.max(0.25, 1 - 0.35 * Math.abs(offset));
                  zIndex = 30 - Math.abs(offset) * 5;
                } else if (offset > 0) {
                  rotateY = -Math.min(30, 22 * Math.abs(offset));
                  translateX = offset * 300;
                  scale = Math.max(0.75, 1 - 0.12 * Math.abs(offset));
                  opacity = Math.max(0.25, 1 - 0.35 * Math.abs(offset));
                  zIndex = 30 - Math.abs(offset) * 5;
                } else {
                  rotateY = 0;
                  translateX = 0;
                  scale = 1.02;
                  opacity = 1;
                  zIndex = 40;
                }

                const isMobileApp = proj.imageUrl?.includes("car-maintenance") || proj.imageUrl?.includes("fitness-challenge");

                return (
                  <motion.div
                    key={proj.id}
                    onClick={() => handleOpenProject(index)}
                    animate={{
                      rotateY: rotateY,
                      x: translateX,
                      scale: scale,
                      opacity: opacity,
                      zIndex: zIndex,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 30,
                      mass: 0.5,
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    className={`absolute inset-0 w-full rounded-3xl cursor-pointer select-none transition-shadow duration-200 ${
                      isActive
                        ? "bg-linear-to-b from-[#24151C]/95 via-[#1E1518]/95 to-[#1E1518]/95 border-2 border-[#E6C88A]/70 shadow-[0_25px_70px_rgba(230,200,138,0.35)] backdrop-blur-2xl"
                        : "bg-[#1E1518]/85 border border-[#504234]/50 shadow-xl backdrop-blur-md"
                    } overflow-hidden flex flex-col justify-between`}
                  >
                    {/* Header */}
                    <div className="p-4 flex items-center justify-between border-b border-[#504234]/40 bg-[#1E1518]/60">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E6C88A] animate-pulse" />
                        <span className="text-xs font-mono font-bold text-[#F3E7D3] uppercase tracking-wider">
                          {proj.category || "Project"}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#24151C] border border-[#504234] text-[#F0D9A5] text-xs font-bold">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Expand Details</span>
                      </span>
                    </div>

                    {/* Screenshot Preview */}
                    {proj.imageUrl && (
                      <div className="relative aspect-16/10 bg-[#150913] overflow-hidden border-b border-[#504234]/40 shrink-0">
                        <Image
                          src={proj.imageUrl}
                          alt={proj.title}
                          fill
                          sizes="600px"
                          className={`object-cover ${isMobileApp ? "object-contain p-4 bg-[#150913]" : "object-cover object-top"}`}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#1E1518] via-transparent to-transparent" />
                      </div>
                    )}

                    {/* Main Info */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
                          {proj.title}
                        </h3>
                        <p className="text-xs font-semibold text-[#E6C88A] mt-0.5">
                          {proj.subtitle || `${proj.category || "Full-Stack"} Application`}
                        </p>
                        <p className="text-xs sm:text-sm text-[#CFC1B5] mt-2 line-clamp-2 leading-relaxed">
                          {proj.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#504234]/50">
                        <div className="flex flex-wrap gap-1.5">
                          {proj.technologies.slice(0, 4).map((tech) => (
                            <span key={tech} className="px-2.5 py-1 rounded-full bg-[#24151C] border border-[#504234] text-[#F3E7D3] text-[11px] font-mono">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs font-bold text-[#E6C88A] shrink-0">Click to enlarge</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Dots Pagination */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-200 ${
                  i === activeIndex ? "w-8 bg-[#E6C88A]" : "w-2.5 bg-[#504234] hover:bg-[#C99555]"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* EXPANDED PROJECT SHOWCASE MODAL (Clicking card opens this spacious, large detail view) */}
      <AnimatePresence>
        {modalOpen && currentModalProject && (
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="sm:max-w-4xl lg:max-w-5xl w-full p-6 sm:p-8 bg-[#1E1518] border-2 border-[#E6C88A]/50 text-white rounded-3xl shadow-[0_0_60px_rgba(230,200,138,0.25)]">
              {/* Modal Top Bar Navigation & Actions */}
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

                {/* Previous / Next Navigation Arrows */}
                <div className="flex items-center gap-2 pr-8">
                  <button
                    onClick={handleModalPrev}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#24151C] hover:bg-[#504234] text-[#E6C88A] hover:text-white transition-all border border-[#504234] text-xs font-bold"
                    title="Previous Project"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>
                  <button
                    onClick={handleModalNext}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#24151C] hover:bg-[#504234] text-[#E6C88A] hover:text-white transition-all border border-[#504234] text-xs font-bold"
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

              {/* VERY LARGE IMAGE DISPLAY CONTAINER (Solves the issue of images being too small) */}
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
                      currentModalProject.imageUrl.includes("car-maintenance") || currentModalProject.imageUrl.includes("fitness-challenge")
                        ? "object-contain p-4 bg-[#150913]"
                        : "object-cover object-top"
                    }`}
                  />

                  {/* Image Hover Prompt Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-bold text-xs backdrop-blur-[2px]">
                    <Maximize2 className="w-4 h-4 text-[#E6C88A]" />
                    <span>Click for full-screen image zoom</span>
                  </div>
                </div>
              )}

              {/* Project Description & Key Highlights */}
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

                <p className="text-xs font-mono text-[#E6C88A]">
                  Use mouse cursor to scroll details inside card
                </p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* FULL-SCREEN LIGHTBOX IMAGE MODAL (When clicking the image inside the modal) */}
      {lightboxUrl && (
        <Dialog open={!!lightboxUrl} onOpenChange={() => setLightboxUrl(null)}>
          <DialogContent className="sm:max-w-6xl w-full bg-[#150913] border border-[#504234] text-white p-4 rounded-3xl">
            <DialogTitle className="text-base font-bold text-[#E6C88A] mb-3 flex items-center justify-between">
              <span>{currentModalProject?.title} — High-Resolution Screenshot</span>
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

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SiGithub } from "@icons-pack/react-simple-icons";
import {
  SquareArrowOutUpRight,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Check,
  SlidersHorizontal,
  Mic,
  Plus,
  Share2,
  Copy,
  Lock,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { ProjectExtra } from "./Projects";

export function Projects3DCoverFlow({ projects }: { projects: ProjectExtra[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectExtra | null>(null);

  const total = projects.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const handleSelectCard = (index: number) => {
    setActiveIndex(index);
  };

  const activeProject = projects[activeIndex];

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
    <div className="relative w-full max-w-6xl mx-auto py-4">
      {/* 1. Header Bar with Explicit Arrow Controls */}
      <div className="mb-6 flex items-center justify-between gap-3 px-4 py-2.5 rounded-full bg-[#1E1518]/80 border border-[#504234]/60 backdrop-blur-xl shadow-xl max-w-3xl mx-auto text-xs text-[#CFC1B5]">
        {/* Left Control Buttons */}
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-full hover:bg-[#504234] text-[#E6C88A] transition-colors" title="Controls">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
          <button onClick={handlePrev} className="p-1.5 rounded-full bg-[#24151C] hover:bg-[#504234] text-[#E6C88A] hover:text-white transition-all border border-[#504234]" title="Previous Project">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={handleNext} className="p-1.5 rounded-full bg-[#24151C] hover:bg-[#504234] text-[#E6C88A] hover:text-white transition-all border border-[#504234]" title="Next Project">
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="font-mono text-[11px] font-bold text-[#F0D9A5] px-1">AA</span>
        </div>

        {/* Center Title Explorer */}
        <div className="flex-1 flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#1E1518]/90 border border-[#504234]/60 text-[#F3E7D3] font-mono text-xs shadow-inner max-w-md">
          <Lock className="w-3 h-3 text-[#E6C88A]" />
          <span className="truncate font-semibold tracking-wide">portfolio.explorer / {activeProject.title}</span>
          <Mic className="w-3 h-3 text-[#E6C88A]/70 ml-auto shrink-0" />
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-full hover:bg-[#504234] text-[#E6C88A] transition-colors" title="Add">
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded-full hover:bg-[#504234] text-[#E6C88A] transition-colors" title="Share">
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded-full hover:bg-[#504234] text-[#E6C88A] transition-colors" title="Copy">
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. 3D Spatial Cover Flow Stage Container (Strict Manual Scroll + Fast Crisp Transition) */}
      <div
        className="relative w-full h-152.5 sm:h-162.5 flex items-center justify-center overflow-hidden py-4 perspective-1000"
        style={{ perspective: "1200px" }}
      >
        <div className="relative w-full max-w-lg sm:max-w-xl h-full flex items-center justify-center">
          {projects.map((proj, index) => {
            const offset = index - activeIndex;
            const isActive = offset === 0;

            let rotateY = 0;
            let translateX = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 10;

            if (offset < 0) {
              rotateY = Math.min(32, 24 * Math.abs(offset));
              translateX = offset * 280;
              scale = Math.max(0.72, 1 - 0.15 * Math.abs(offset));
              opacity = Math.max(0.2, 1 - 0.4 * Math.abs(offset));
              zIndex = 30 - Math.abs(offset) * 5;
            } else if (offset > 0) {
              rotateY = -Math.min(32, 24 * Math.abs(offset));
              translateX = offset * 280;
              scale = Math.max(0.72, 1 - 0.15 * Math.abs(offset));
              opacity = Math.max(0.2, 1 - 0.4 * Math.abs(offset));
              zIndex = 30 - Math.abs(offset) * 5;
            } else {
              rotateY = 0;
              translateX = 0;
              scale = 1.02;
              opacity = 1;
              zIndex = 40;
            }

            const featuresList = proj.features && proj.features.length > 0
              ? proj.features
              : defaultFeaturesMap[proj.title] || [
                  `Full-stack ${proj.title} implementation`,
                  "Responsive, modern user interface design",
                  "Secure backend API logic & database integrations",
                ];

            const isMobileApp = proj.imageUrl?.includes("car-maintenance") || proj.imageUrl?.includes("fitness-challenge");

            return (
              <motion.div
                key={proj.id}
                onClick={() => handleSelectCard(index)}
                animate={{
                  rotateY: rotateY,
                  x: translateX,
                  scale: scale,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 480,
                  damping: 32,
                  mass: 0.5,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                className={`absolute inset-0 w-full rounded-3xl cursor-pointer select-none transition-shadow duration-200 ${
                  isActive
                    ? "bg-linear-to-b from-[#24151C]/95 via-[#1E1518]/95 to-[#1E1518]/95 border-2 border-[#E6C88A]/60 shadow-[0_25px_70px_rgba(230,200,138,0.3)] backdrop-blur-2xl"
                    : "bg-[#1E1518]/85 border border-[#504234]/50 shadow-xl backdrop-blur-md"
                } overflow-hidden flex flex-col justify-between`}
              >
                {/* Top Header Bar inside Card */}
                <div className="p-4 flex items-center justify-between border-b border-[#504234]/40 bg-[#1E1518]/50">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E6C88A] animate-pulse" />
                    <span className="text-xs font-mono font-bold text-[#F3E7D3] uppercase tracking-wider">
                      {proj.category || "Project"}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(proj);
                      setModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#24151C] border border-[#504234] text-[#F0D9A5] hover:text-white hover:border-[#E6C88A] text-xs font-bold transition-all shadow-sm"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Expand Details</span>
                  </button>
                </div>

                {/* Card Media Preview */}
                {proj.imageUrl && (
                  <div className="relative aspect-video bg-[#1E1518] overflow-hidden border-b border-[#504234]/40 shrink-0">
                    <Image
                      src={proj.imageUrl}
                      alt={proj.title}
                      fill
                      sizes="520px"
                      className={`object-cover ${isMobileApp ? "object-contain p-4 bg-[#1E1518]" : "object-cover object-top"}`}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#1E1518] via-transparent to-transparent" />
                  </div>
                )}

                {/* Card Main Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#E6C88A] mt-0.5">
                      {proj.subtitle || `${proj.category || "Full-Stack"} Application`}
                    </p>
                    <p className="text-xs sm:text-sm text-[#CFC1B5] mt-2 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Features checklist (Active card view) */}
                    {isActive && (
                      <div className="mt-4 space-y-2">
                        {featuresList.slice(0, 3).map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#CFC1B5]">
                            <Check className="w-4 h-4 text-[#E6C88A] shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Buttons & Tech Stack Tags */}
                  <div>
                    <div className="flex items-center gap-3 pt-2">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2.5 rounded-full bg-[#24151C] border border-[#504234] text-[#F3E7D3] hover:text-white hover:border-[#E6C88A] transition-all text-xs"
                          title="GitHub Repository"
                        >
                          <SiGithub size={16} />
                        </a>
                      )}
                      {(proj.liveUrl || proj.githubUrl) && (
                        <a
                          href={(proj.liveUrl || proj.githubUrl) ?? undefined}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#C99555] to-[#E6C88A] text-[#24191A] text-xs font-extrabold shadow-md hover:scale-102 transition-all"
                        >
                          <span>Live Demo</span>
                          <SquareArrowOutUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {proj.technologies.slice(0, 5).map((tech) => (
                        <span key={tech} className="px-3 py-1 rounded-full bg-[#24151C] border border-[#504234] text-[#F3E7D3] text-[11px] font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. Explicit Dots Pagination */}
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

      {/* 4. Full Detailed Lightbox Modal */}
      {selectedProject && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="sm:max-w-2xl bg-[#1E1518] border border-[#504234] text-white p-6 rounded-3xl">
            <DialogTitle className="text-2xl font-extrabold text-white mb-1">
              {selectedProject.title}
            </DialogTitle>
            <p className="text-xs text-[#E6C88A] font-mono font-bold uppercase mb-4">
              {selectedProject.subtitle || `${selectedProject.category || "Full-Stack"} Application`}
            </p>

            {selectedProject.imageUrl && (
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#1E1518] border border-[#504234] mb-4">
                <Image src={selectedProject.imageUrl} alt={selectedProject.title} fill className="object-contain p-2" />
              </div>
            )}

            <p className="text-sm text-[#CFC1B5] leading-relaxed mb-4">
              {selectedProject.description}
            </p>

            <div className="space-y-2 mb-5">
              <p className="text-xs font-bold text-[#F0D9A5] uppercase tracking-wider font-mono">Key Highlights</p>
              {(selectedProject.features || defaultFeaturesMap[selectedProject.title] || []).map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#CFC1B5]">
                  <Check className="w-4 h-4 text-[#E6C88A] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.technologies.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-[#24151C] border border-[#504234] text-[#F3E7D3] text-xs font-semibold">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-[#504234]/60">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#504234] bg-[#24151C] text-xs font-bold text-[#F3E7D3] hover:text-white hover:border-[#E6C88A]"
                >
                  <SiGithub size={15} />
                  <span>GitHub Code</span>
                </a>
              )}
              {(selectedProject.liveUrl || selectedProject.githubUrl) && (
                <a
                  href={(selectedProject.liveUrl || selectedProject.githubUrl) ?? undefined}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-linear-to-r from-[#C99555] to-[#E6C88A] text-xs font-extrabold text-[#24191A] shadow-lg"
                >
                  <span>Launch Application</span>
                  <SquareArrowOutUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

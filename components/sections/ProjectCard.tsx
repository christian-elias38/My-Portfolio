"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { SquareArrowOutUpRight, ChevronDown, ArrowUpRight, Sparkles } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@prisma/client";

type ProjectWithExtras = Project & { category?: string | null; year?: number | null };

export function ProjectCard({ project, featured = false }: { project: ProjectWithExtras; featured?: boolean }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Perspective Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isMobileApp = project.imageUrl?.includes("car-maintenance") || project.imageUrl?.includes("fitness-challenge");
  const previewTechs = project.technologies.slice(0, 4);
  const remainingCount = project.technologies.length - previewTechs.length;

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <Collapsible open={open} onOpenChange={setOpen} className="h-full flex flex-col">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="group relative overflow-hidden rounded-3xl bg-[#221321] border border-[#3b233a] shadow-xl hover:shadow-[0_0_35px_rgba(226,120,159,0.35)] hover:border-pink-500/50 transition-all duration-300 flex flex-col h-full"
        >
          {/* Dynamic Hover Spotlight Glow */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
            style={{
              background: `radial-gradient(400px circle at ${glowX} ${glowY}, rgba(244, 169, 198, 0.15), transparent 80%)`,
            }}
          />

          {/* Top Image & Particles Header */}
          <div className="relative overflow-hidden aspect-[16/10] bg-[#180c17] flex items-center justify-center shrink-0 border-b border-[#3b233a]/60">
            {/* Ambient Particle Texture overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#e2789f_1px,transparent_1px)] [background-size:16px_16px] opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700 pointer-events-none" />

            {/* Glowing Date Box (Image 1 Signature Element) */}
            <div className="absolute top-3 left-3 z-20 flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-[#110810]/90 border border-purple-500/40 backdrop-blur-md shadow-lg group-hover:border-pink-400 transition-colors">
              <span className="text-[9px] font-black tracking-widest text-pink-300/80 uppercase">JUNE</span>
              <span className="text-base font-black text-white leading-none tracking-tight">29</span>
            </div>

            {/* Top Right Category Pill */}
            {project.category && (
              <div className="absolute top-3 right-3 z-20">
                <span className="bg-[#2d182b]/90 border border-pink-400/40 text-pink-200 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-md">
                  {project.category}
                </span>
              </div>
            )}

            {/* Project Image */}
            {project.imageUrl ? (
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className={`transition-transform duration-700 group-hover:scale-105 ${
                  isMobileApp ? "object-contain p-4 bg-gradient-to-b from-[#180c17] to-[#261525]" : "object-cover object-top"
                }`}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#2f182e] via-[#221321] to-[#180c17] flex items-center justify-center p-6 text-center">
                <span className="text-lg font-extrabold text-white">{project.title}</span>
              </div>
            )}

            {/* Overlay Gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#170b16] via-[#170b16]/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

            {/* Live Demo / Source Code Buttons */}
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold px-4 py-1.5 shadow-lg shadow-purple-900/50 hover:scale-105 transition-transform"
                >
                  Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#180c17] border border-pink-400/40 text-white text-xs font-bold px-3.5 py-1.5 hover:border-pink-300 transition-colors shadow-md"
                >
                  <SiGithub size={13} /> Source Code
                </a>
              )}
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 flex flex-col flex-1 justify-between gap-4">
            <div>
              <div className="flex justify-between items-start gap-3 mb-2">
                <h3 className="font-extrabold text-xl text-white tracking-tight leading-snug group-hover:text-pink-200 transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 shrink-0 pt-0.5">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" onClick={(e) => e.stopPropagation()} className="text-pink-200/70 hover:text-accent transition-colors p-1" title="Source Code">
                      <SiGithub size={16} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" onClick={(e) => e.stopPropagation()} className="text-pink-200/70 hover:text-accent transition-colors p-1" title="Live Preview">
                      <SquareArrowOutUpRight className="w-4 h-4" />
                    </a>
                  )}
                  <CollapsibleTrigger aria-label="Toggle details" className="p-1 rounded-lg hover:bg-[#2e192c] text-pink-200/70 hover:text-accent" type="button">
                    <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </CollapsibleTrigger>
                </div>
              </div>
              <p className="text-sm text-[#e6d0de] leading-relaxed font-medium line-clamp-3">{project.description}</p>
            </div>

            <div className="pt-2">
              <div className="flex flex-wrap gap-2 mb-4">
                {previewTechs.map((tech) => (
                  <span key={tech} className="text-xs font-bold px-3 py-1 rounded-lg bg-[#170b16] text-pink-200 border border-[#3d243a]">
                    {tech}
                  </span>
                ))}
                {remainingCount > 0 && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#2b182a] text-pink-300/80 border border-[#422740]">
                    +{remainingCount} more
                  </span>
                )}
              </div>

              <CollapsibleContent className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                {remainingCount > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4 pt-3 border-t border-[#3b233a]">
                    {project.technologies.slice(4).map((tech: string) => (
                      <span key={tech} className="text-xs font-bold px-3 py-1 rounded-lg bg-[#170b16] text-pink-200 border border-[#3d243a]">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </CollapsibleContent>

              {/* SEE MORE / Action Link (Image 1 Element) */}
              <div className="pt-2 border-t border-[#3b233a]/50 flex items-center justify-between">
                <span className="text-xs font-black tracking-widest text-pink-400 group-hover:text-pink-300 uppercase flex items-center gap-1.5 transition-colors">
                  SEE MORE <Sparkles className="w-3.5 h-3.5" />
                </span>
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping opacity-75" />
              </div>
            </div>
          </div>
        </motion.div>
      </Collapsible>
    </div>
  );
}

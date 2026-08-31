"use client";

import { useState } from "react";
import Image from "next/image";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { SquareArrowOutUpRight, ChevronDown, Globe, ArrowUpRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion } from "framer-motion";
import type { Project } from "@prisma/client";
import { GradientBorder } from "@/components/ui/primitives/GradientBorder";
import { TechBadge } from "@/components/ui/primitives/TechBadge";
import { Badge } from "@/components/ui/badge";

type ProjectWithExtras = Project & { category?: string | null; year?: number | null };

export function ProjectCard({ project, featured = false }: { project: ProjectWithExtras; featured?: boolean }) {
  const [open, setOpen] = useState(false);
  const isMobileApp = project.imageUrl?.includes("car-maintenance") || project.imageUrl?.includes("fitness-challenge");
  const previewTechs = project.technologies.slice(0, 4);
  const remainingCount = project.technologies.length - previewTechs.length;

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="h-full flex flex-col">
      <GradientBorder className="h-full">
        <div data-cursor="project" className="group overflow-hidden rounded-3xl bg-[#221321] border border-[#3b233a] shadow-xl hover:shadow-2xl hover:border-primary/50 transition-all duration-300 flex flex-col h-full opacity-100">
          {/* Header Bar */}
          <div className="bg-[#170b16] px-4 py-3 flex items-center justify-between gap-2 border-b border-[#3b233a] shrink-0">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="flex gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <div className="bg-[#261525] rounded-full text-[11px] font-semibold text-pink-200/80 px-3 py-1 flex items-center gap-1.5 truncate border border-[#422740]">
                <Globe className="w-3 h-3 text-pink-400 shrink-0" />
                <span className="truncate">{project.liveUrl ? new URL(project.liveUrl).hostname : "preview"}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {project.category && (
                <span className="bg-[#2d182b] border border-pink-400/30 text-pink-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {project.category}
                </span>
              )}
              {project.year && <span className="text-[10px] font-bold text-pink-300/60">{project.year}</span>}
            </div>
          </div>

          {/* Image Container */}
          <div className="relative overflow-hidden aspect-[16/10] bg-[#180c17] flex items-center justify-center shrink-0 border-b border-[#3b233a]/50">
            {project.imageUrl ? (
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className={`transition-transform duration-500 group-hover:scale-105 ${
                  isMobileApp ? "object-contain p-3 bg-gradient-to-b from-[#180c17] to-[#261525]" : "object-cover object-top"
                }`}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#2f182e] via-[#221321] to-[#180c17] flex items-center justify-center p-6 text-center">
                <span className="text-lg font-extrabold text-white">{project.title}</span>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#170b16]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground text-xs font-bold px-3.5 py-1.5 shadow-lg shadow-accent/20 hover:scale-105 transition-transform"
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
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#180c17] border border-pink-400/40 text-white text-xs font-bold px-3.5 py-1.5 hover:border-accent transition-colors shadow-md"
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
                <h3 className="font-extrabold text-xl text-white tracking-tight leading-snug">{project.title}</h3>
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
              <p className="text-sm text-[#e6d0de] leading-relaxed font-medium">{project.description}</p>
            </div>

            <div className="pt-2">
              <div className="flex flex-wrap gap-2">
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
                  <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-[#3b233a]">
                    {project.technologies.slice(4).map((tech: string) => (
                      <span key={tech} className="text-xs font-bold px-3 py-1 rounded-lg bg-[#170b16] text-pink-200 border border-[#3d243a]">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </CollapsibleContent>
            </div>
          </div>
        </div>
      </GradientBorder>
    </Collapsible>
  );
}

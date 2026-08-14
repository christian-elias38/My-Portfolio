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
  const previewTechs = project.technologies.slice(0, 3);
  const remainingCount = project.technologies.length - previewTechs.length;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <GradientBorder>
        <div data-cursor="project" className="group overflow-hidden rounded-3xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
          <div className="bg-card px-4 py-2.5 flex items-center gap-2 border-b border-border">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-destructive" />
              <span className="w-2.5 h-2.5 rounded-full bg-muted" />
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            </div>
            <div className="flex-1 bg-background/60 rounded text-xs text-foreground/70 px-3 py-1 flex items-center gap-1.5 ml-2">
              <Globe className="w-3 h-3" />
              {project.liveUrl ? new URL(project.liveUrl).hostname : "preview"}
            </div>
            {(project.category || project.year) && (
              <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                {project.category && (
                  <Badge variant="outline" className="border-border text-[10px] text-foreground/60 rounded-full">
                    {project.category}
                  </Badge>
                )}
                {project.year && <span className="text-[10px] text-muted-foreground">{project.year}</span>}
              </div>
            )}
          </div>

          <div className={`relative overflow-hidden ${featured ? "aspect-[16/10]" : "aspect-video"}`}>
            {project.imageUrl ? (
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                <span className="text-lg font-bold text-foreground">{project.title}</span>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background text-xs font-semibold px-3 py-1.5"
                >
                  Live Demo <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground text-xs font-semibold px-3 py-1.5"
                >
                  <SiGithub size={12} /> Code
                </a>
              )}
            </div>
          </div>

          <CardHeader>
            <CardTitle className="flex justify-between items-start gap-3 text-foreground">
              <span className={featured ? "text-xl" : ""}>{project.title}</span>
              <div className="flex items-center gap-3 shrink-0">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" onClick={(e) => e.stopPropagation()} className="text-foreground/80 hover:text-primary transition-colors">
                    <SiGithub size={16} />
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" onClick={(e) => e.stopPropagation()} className="text-foreground/80 hover:text-primary transition-colors">
                    <SquareArrowOutUpRight className="w-4 h-4" />
                  </a>
                )}
                <CollapsibleTrigger aria-label="Toggle details" className="p-1 rounded hover:bg-muted text-foreground/80" type="button">
                  <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </CollapsibleTrigger>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-foreground/70 line-clamp-2">{project.description}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {previewTechs.map((tech) => (
                <TechBadge key={tech} label={tech} />
              ))}
              {remainingCount > 0 && (
                <span className="text-xs text-muted-foreground self-center">+{remainingCount} more</span>
              )}
            </div>

            <CollapsibleContent className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
              <p className="text-sm text-foreground/70 mt-4">{project.description}</p>
              {remainingCount > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.slice(3).map((tech: string) => (
                    <TechBadge key={tech} label={tech} />
                  ))}
                </div>
              )}
            </CollapsibleContent>
          </CardContent>
        </div>
      </GradientBorder>
    </Collapsible>
  );
}

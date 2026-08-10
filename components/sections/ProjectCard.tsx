"use client";

import { useState } from "react";
import Image from "next/image";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { SquareArrowOutUpRight, ChevronDown, Globe } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion } from "framer-motion";
import type { Project } from "@prisma/client";
import { GradientBorder } from "@/components/ui/primitives/GradientBorder";
import { TechBadge } from "@/components/ui/primitives/TechBadge";

export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <GradientBorder>
        <div data-cursor="project" className="overflow-hidden rounded-3xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
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
          </div>

          {project.imageUrl ? (
            <div className="relative aspect-video overflow-hidden group">
              <Image src={project.imageUrl} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          ) : (
            <div className="aspect-video bg-primary/20 flex items-center justify-center">
              <span className="text-lg font-bold text-foreground">{project.title}</span>
            </div>
          )}

          <CardHeader>
            <CardTitle className="flex justify-between items-start gap-3 text-foreground">
              <span>{project.title}</span>
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
            <CollapsibleContent className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
              <p className="text-sm text-foreground/70 mt-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((tech: string) => <TechBadge key={tech} label={tech} />)}
              </div>
            </CollapsibleContent>
          </CardContent>
        </div>
      </GradientBorder>
    </Collapsible>
  );
}
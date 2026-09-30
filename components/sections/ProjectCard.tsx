"use client";

import { useState } from "react";
import Image from "next/image";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { SquareArrowOutUpRight, ChevronDown, Users, User, Code2, Check, Maximize2 } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { ProjectExtra } from "./Projects";

export function ProjectCard({ project }: { project: ProjectExtra; featured?: boolean }) {
  const [openDetails, setOpenDetails] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isMobileApp = project.imageUrl?.includes("car-maintenance") || project.imageUrl?.includes("fitness-challenge");

  const projectType = project.projectType || (project.title.toLowerCase().includes("tour") || project.title.toLowerCase().includes("birrflow") ? "TEAM PROJECT" : "PERSONAL PROJECT");
  const role = project.role || (project.category?.toUpperCase().includes("MOBILE") ? "MOBILE DEVELOPER" : project.category?.toUpperCase().includes("ALGORITHM") ? "ALGORITHM DEVELOPER" : "FULL-STACK DEVELOPER");
  const subtitle = project.subtitle || (project.category ? `${project.category} Project` : "Software Application");

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

  const featuresList = project.features && project.features.length > 0
    ? project.features
    : defaultFeaturesMap[project.title] || [
        `Full-stack ${project.title} implementation`,
        "Responsive, modern user interface design",
        "Secure backend API logic & database integrations",
        "Deployed for optimal reliability and performance",
      ];

  const handleLiveRedirect = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = project.liveUrl || project.githubUrl;
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <div className="h-full flex flex-col">
        <Collapsible open={openDetails} onOpenChange={setOpenDetails} className="h-full flex flex-col">
          <div className="group relative rounded-2xl bg-[#1E1518]/85 border border-[#504234]/70 hover:border-[#C99555]/90 shadow-[0_0_25px_rgba(201,149,85,0.15)] hover:shadow-[0_0_35px_rgba(201,149,85,0.3)] backdrop-blur-md overflow-hidden flex flex-col h-full transition-all duration-300">
            
            {/* Viewable Project Image Container */}
            {project.imageUrl && (
              <div 
                onClick={() => setImageModalOpen(true)}
                className="relative aspect-16/10 bg-[#1E1518] overflow-hidden border-b border-[#504234]/60 cursor-pointer group/img shrink-0"
              >
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={`transition-transform duration-500 group-hover/img:scale-105 ${
                    isMobileApp ? "object-contain p-4 bg-[#1E1518]" : "object-cover object-top"
                  }`}
                />
                
                {/* View Image Hover Overlay */}
                <div className="absolute inset-0 bg-[#1E1518]/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-medium text-xs backdrop-blur-[2px]">
                  <Maximize2 className="w-4 h-4 text-[#E6C88A]" />
                  <span>Click to expand image</span>
                </div>
              </div>
            )}

            {/* Card Body */}
            <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
              <div>
                {/* Top Badges Row (Warm Rose Style) */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-[#24151C] border border-[#504234] text-[#F3E7D3] font-mono">
                    {projectType.includes("TEAM") ? <Users className="w-3 h-3 text-[#E6C88A]" /> : <User className="w-3 h-3 text-[#F0D9A5]" />}
                    {projectType}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-[#24151C] border border-[#504234] text-[#F3E7D3] font-mono">
                    <Code2 className="w-3 h-3 text-[#F0D9A5]" />
                    {role}
                  </span>
                </div>

                {/* Title + Subtitle & Action Buttons Row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-xl font-extrabold text-white tracking-tight leading-snug group-hover:text-[#F0D9A5] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#CFC1B5] mt-0.5">{subtitle}</p>
                  </div>

                  {/* Action Buttons: Live & GitHub */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleLiveRedirect}
                      title="Open Live App"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#E6C88A]/60 text-[#F0D9A5] bg-[#24151C] hover:bg-[#C99555]/30 hover:border-[#F0D9A5] text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                    >
                      <span>Live</span>
                      <SquareArrowOutUpRight className="w-3.5 h-3.5" />
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="View GitHub Repository"
                        className="inline-flex items-center justify-center p-2 rounded-full border border-[#504234] text-[#CFC1B5] hover:text-white hover:border-[#E6C88A] bg-[#24151C] text-xs font-semibold transition-all"
                      >
                        <SiGithub size={15} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description Paragraph */}
                <p className="text-sm text-[#CFC1B5] leading-relaxed my-3 font-normal">
                  {project.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 my-4">
                  {featuresList.slice(0, openDetails ? featuresList.length : 2).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#CFC1B5] font-medium">
                      <Check className="w-4 h-4 text-[#E6C88A] shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Expandable Details Content */}
                <CollapsibleContent className="overflow-hidden space-y-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                  {featuresList.slice(2).map((feat, idx) => (
                    <div key={idx + 2} className="flex items-start gap-2.5 text-xs text-[#CFC1B5] font-medium pt-1">
                      <Check className="w-4 h-4 text-[#E6C88A] shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </CollapsibleContent>
              </div>

              <div>
                {/* Expand / Collapse Button */}
                {featuresList.length > 2 && (
                  <div className="pt-2 pb-3 border-t border-[#504234]/60 flex items-center justify-between">
                    <CollapsibleTrigger 
                      type="button" 
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E6C88A] hover:text-[#F0D9A5] transition-colors cursor-pointer"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDetails ? "rotate-180" : ""}`} />
                      <span>{openDetails ? "Hide details" : "Expand details"}</span>
                    </CollapsibleTrigger>
                  </div>
                )}

                {/* Technology Badges at Bottom */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-[#504234]/70">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-[#24151C] border border-[#504234] text-[#F3E7D3] text-xs font-semibold shadow-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Collapsible>
      </div>

      {/* Lightbox Image View Modal */}
      {project.imageUrl && (
        <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
          <DialogContent className="sm:max-w-4xl bg-[#1E1518] border border-[#504234] text-white p-4">
            <DialogTitle className="text-lg font-bold text-white mb-2 flex items-center justify-between">
              <span>{project.title} — Screenshot</span>
            </DialogTitle>
            <div className="relative aspect-16/10 w-full rounded-xl overflow-hidden bg-[#1E1518] border border-[#504234]">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-contain p-2"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

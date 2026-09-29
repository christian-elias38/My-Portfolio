import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Container } from "@/components/ui/primitives/Container";
import type { Project } from "@prisma/client";

export type ProjectExtra = Project & {
  subtitle?: string;
  projectType?: string;
  role?: string;
  features?: string[];
  category?: string | null;
  year?: number | null;
};

const defaultProjects: ProjectExtra[] = [
  {
    id: "proj-portfolio",
    title: "Dreamy Portfolio & Web Platform",
    subtitle: "Modern Interactive Showcase",
    projectType: "PERSONAL PROJECT",
    role: "FULL-STACK DEVELOPER",
    description: "My personal portfolio crafted with a warm rose-gold wave theme, expandable project cards, interactive 3D elements, and smooth section transitions.",
    imageUrl: "/projects/portfolio-app.png",
    githubUrl: "https://github.com/christian-elias38/My-Portfolio",
    liveUrl: "https://christian-elias.vercel.app",
    featured: true,
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Prisma"],
    category: "Full-Stack",
    year: 2026,
    features: [
      "Liquid wave ambient canvas background",
      "Interactive 3D Three.js graphics canvas",
      "Expandable project card details & lightbox image viewer",
      "Full stack Next.js & Prisma backend API"
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "proj-car-maintenance",
    title: "Car Maintenance Tracker",
    subtitle: "Vehicle Service & Expense Manager",
    projectType: "PERSONAL PROJECT",
    role: "MOBILE DEVELOPER",
    description: "A cross-platform mobile application for tracking vehicle service schedules, maintenance records, cost analysis, and custom notes with custom form validation.",
    imageUrl: "/projects/car-maintenance.png",
    githubUrl: "https://github.com/christian-elias38/Car-MaIntenance-Tracker-",
    liveUrl: "https://github.com/christian-elias38/Car-MaIntenance-Tracker-",
    featured: true,
    technologies: ["Flutter", "Dart", "Mobile UI", "SQLite"],
    category: "Mobile",
    year: 2026,
    features: [
      "Cross-platform Flutter & Dart mobile application",
      "Service schedule & maintenance log tracking",
      "Cost tracking & mileage analytics",
      "Offline-first SQLite local database storage"
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "proj-maze",
    title: "Maze Pathfinding & Generation",
    subtitle: "Algorithmic Path Visualizer",
    projectType: "ACADEMIC PROJECT",
    role: "ALGORITHM DEVELOPER",
    description: "An algorithmic project in Python demonstrating maze generation, pathfinding logic, state visualization, and interactive node grid exploration with visual step tracking.",
    imageUrl: "/projects/maze-algorithm.png",
    githubUrl: "https://github.com/christian-elias38/maze_project",
    liveUrl: "https://github.com/christian-elias38/maze_project",
    featured: true,
    technologies: ["Python", "Algorithms", "Pathfinding", "Visualization"],
    category: "Algorithms",
    year: 2026,
    features: [
      "Maze generation via Depth-First Search & Prim's algorithm",
      "A* and Dijkstra shortest path solver routines",
      "Real-time grid state visualization",
      "Visual step execution tracking metrics"
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "proj-student-reg",
    title: "Student Registration Platform",
    subtitle: "Academic Management Portal",
    projectType: "TEAM PROJECT",
    role: "FULL-STACK DEVELOPER",
    description: "A full-stack Student Registration System built with React, Node.js, Express, and SQLite. Provides CRUD operations for managing student records with a clean interface.",
    imageUrl: "https://res.cloudinary.com/p3v67tvk/image/upload/v1783655960/photo_2026-07-10_06-47-42_sd7ac0.jpg",
    githubUrl: "https://github.com/christian-elias38/student-registration-platform",
    liveUrl: "https://github.com/christian-elias38/student-registration-platform",
    featured: false,
    technologies: ["React", "Node.js", "Express", "SQLite"],
    category: "Full-Stack",
    year: 2026,
    features: [
      "Student enrollment & record management",
      "RESTful Express backend server",
      "Relational database storage & queries",
      "Clean responsive administration interface"
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "proj-fitness-challenge",
    title: "Fitness Challenge App",
    subtitle: "Workout & Goal Progress Tracker",
    projectType: "PERSONAL PROJECT",
    role: "MOBILE DEVELOPER",
    description: "A Flutter application that allows users to create and track fitness challenges, monitor workout progress, update status, and analyze goal completion.",
    imageUrl: "/projects/fitness-challenge.png",
    githubUrl: "https://github.com/christian-elias38/Fitness-Challenge-App",
    liveUrl: "https://github.com/christian-elias38/Fitness-Challenge-App",
    featured: false,
    technologies: ["Flutter", "Dart", "Mobile UI", "Fitness Tracker"],
    category: "Mobile",
    year: 2026,
    features: [
      "Custom workout challenge creation",
      "Daily fitness progress monitoring",
      "Goal completion analytics & charts",
      "Interactive Flutter mobile UI"
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "proj-gojo-realestate",
    title: "Gojo Real Estate",
    subtitle: "Property Browsing & Listings Portal",
    projectType: "PERSONAL PROJECT",
    role: "FRONTEND DEVELOPER",
    description: "A modern real estate platform built for browsing, searching, and managing property listings with clean UI, filtering, and responsive design.",
    imageUrl: "/projects/gojo-realestate.png",
    githubUrl: "https://github.com/christian-elias38/Gojo-Real-Estate",
    liveUrl: "https://github.com/christian-elias38/Gojo-Real-Estate",
    featured: false,
    technologies: ["React", "Next.js", "Tailwind CSS", "JavaScript", "Real Estate UI"],
    category: "Frontend",
    year: 2026,
    features: [
      "Property search & filtering system",
      "Detailed property view cards",
      "Responsive real estate showcase",
      "Modern Next.js frontend architecture"
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

import { Projects3DCoverFlow } from "@/components/sections/Projects3DCoverFlow";

export async function Projects() {
  let projects: Project[] = [];
  try {
    projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  } catch {}

  const rawProjects = projects.length > 0 ? (projects as ProjectExtra[]) : defaultProjects;
  // Filter out any MiniGit, Calculator, Campus Tour, or BirrFlow project
  const displayProjects = rawProjects.filter(
    (p) =>
      !p.title.toLowerCase().includes("minigit") &&
      !p.title.toLowerCase().includes("calculator") &&
      !p.title.toLowerCase().includes("campus tour") &&
      !p.title.toLowerCase().includes("birrflow")
  );

  return (
    <section id="projects" className="relative py-20 bg-transparent overflow-hidden">
      <Container>
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-[#d8769c] uppercase font-bold tracking-widest text-xs font-mono mb-3 flex items-center justify-center gap-2">
              <span className="w-6 h-px bg-[#d8769c]/60" />
              SPATIAL SHOWCASE
              <span className="w-6 h-px bg-[#d8769c]/60" />
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Featured <span className="text-[#e875a3]">Projects</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Projects3DCoverFlow projects={displayProjects} />
        </FadeIn>
      </Container>
    </section>
  );
}
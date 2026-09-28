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
    id: "proj-campus-tour",
    title: "Campus Tour Assistant",
    subtitle: "Campus Navigation Platform",
    projectType: "TEAM PROJECT",
    role: "FULL-STACK DEVELOPER",
    description: "A responsive team-built application that helps students explore campus buildings through an interactive Leaflet map, an admin content panel, and a visitor feedback system.",
    imageUrl: "/projects/campus-tour.png",
    githubUrl: "https://github.com/christian-elias38/Campus-Tour-Assistant",
    liveUrl: "https://campus-tour-assistant.vercel.app",
    featured: true,
    technologies: ["React", "TypeScript", "Node.js", "Express", "Supabase", "Leaflet"],
    category: "Full-Stack",
    year: 2026,
    features: [
      "Interactive Leaflet map with building search",
      "JWT-secured admin content panel",
      "Image uploads via Supabase Storage",
      "Visitor feedback collection"
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "proj-birrflow",
    title: "BirrFlow",
    subtitle: "Personal Finance Dashboard",
    projectType: "TEAM PROJECT",
    role: "FULL-STACK DEVELOPER",
    description: "A personal finance web app for tracking income and expenses with a clean dashboard and transaction history, designed for Ethiopian users and deployed on Vercel.",
    imageUrl: "/projects/birrflow.png",
    githubUrl: "https://github.com/christian-elias38/BirrFlow",
    liveUrl: "https://birrflow.vercel.app",
    featured: true,
    technologies: ["HTML", "CSS", "JavaScript", "Vercel"],
    category: "Full-Stack",
    year: 2026,
    features: [
      "Income & expense tracking with categories",
      "Financial dashboard with balance summary",
      "Full transaction history & filtering",
      "Responsive UI deployed on Vercel"
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "proj-portfolio",
    title: "Dreamy Portfolio & Web Platform",
    subtitle: "Modern Interactive Portfolio",
    projectType: "PERSONAL PROJECT",
    role: "FULL-STACK DEVELOPER",
    description: "My personal portfolio crafted with a golden wave theme, expandable project cards, interactive 3D elements, and smooth section transitions.",
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
];

export async function Projects() {
  let projects: Project[] = [];
  try {
    projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  } catch {}

  const rawProjects = projects.length > 0 ? (projects as ProjectExtra[]) : defaultProjects;
  // Filter out any MiniGit or Calculator project as explicitly requested by user
  const displayProjects = rawProjects.filter(
    (p) => !p.title.toLowerCase().includes("minigit") && !p.title.toLowerCase().includes("calculator")
  );

  return (
    <section id="projects" className="relative py-20 bg-transparent">
      <Container>
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              My Projects
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              A collection of projects I&apos;ve built, ranging from full-stack web platforms to mobile applications and algorithm visualizers.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {displayProjects.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.08}>
              <ProjectCard project={project} featured={project.featured} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
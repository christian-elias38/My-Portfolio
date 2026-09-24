import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Container } from "@/components/ui/primitives/Container";
import type { Project } from "@prisma/client";

const defaultProjects = [
  {
    id: "proj-1",
    title: "Dreamy Portfolio & Web Platform",
    description: "My personal portfolio crafted with a soft dark plum gradient theme, animated card components, interactive 3D elements, and smooth section transitions.",
    imageUrl: "/profile.jpg",
    githubUrl: "https://github.com/christian-elias38/My-Portfolio",
    liveUrl: "https://christian-elias.vercel.app",
    featured: true,
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Prisma"],
    category: "Full-Stack",
    year: 2026,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "proj-2",
    title: "Car Maintenance Tracker",
    description: "A cross-platform mobile application for tracking vehicle service schedules, maintenance records, cost analysis, and custom notes with custom form validation.",
    imageUrl: "/projects/car-maintenance.png",
    githubUrl: "https://github.com/christian-elias38/Car-MaIntenance-Tracker-",
    liveUrl: null,
    featured: true,
    technologies: ["Flutter", "Dart", "Mobile UI", "SQLite"],
    category: "Mobile",
    year: 2026,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "proj-3",
    title: "Maze Pathfinding & Generation",
    description: "An algorithmic project in Python demonstrating maze generation, pathfinding logic, state visualization, and interactive node grid exploration with visual step tracking.",
    imageUrl: "/projects/maze-algorithm.png",
    githubUrl: "https://github.com/christian-elias38/maze_project",
    liveUrl: null,
    featured: true,
    technologies: ["Python", "Algorithms", "Pathfinding", "Visualization"],
    category: "Algorithms",
    year: 2026,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "proj-4",
    title: "Student Registration Platform",
    description: "A full-stack Student Registration System built with React, Node.js, Express, and SQLite. Provides CRUD operations for managing student records with a clean interface.",
    imageUrl: "https://res.cloudinary.com/p3v67tvk/image/upload/v1783655960/photo_2026-07-10_06-47-42_sd7ac0.jpg",
    githubUrl: "https://github.com/christian-elias38/student-registration-platform",
    liveUrl: null,
    featured: false,
    technologies: ["React", "Node.js", "Express", "SQLite"],
    category: "Full-Stack",
    year: 2026,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "proj-5",
    title: "Fitness Challenge App",
    description: "A Flutter application that allows users to create and track fitness challenges, monitor workout progress, update status, and analyze goal completion.",
    imageUrl: "/projects/fitness-challenge.png",
    githubUrl: "https://github.com/christian-elias38/Fitness-Challenge-App",
    liveUrl: null,
    featured: false,
    technologies: ["Flutter", "Dart", "Mobile UI", "Fitness Tracker"],
    category: "Mobile",
    year: 2026,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "proj-6",
    title: "Gojo Real Estate",
    description: "A modern real estate platform built for browsing, searching, and managing property listings with clean UI, filtering, and responsive design.",
    imageUrl: "/projects/gojo-realestate.png",
    githubUrl: "https://github.com/christian-elias38/Gojo-Real-Estate",
    liveUrl: null,
    featured: false,
    technologies: ["React", "Next.js", "Tailwind CSS", "JavaScript", "Real Estate UI"],
    category: "Frontend",
    year: 2026,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function Projects() {
  let projects: Project[] = [];
  try {
    projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  } catch {}

  const rawProjects = projects.length > 0 ? projects : (defaultProjects as unknown as Project[]);
  // Filter out any MiniGit or Calculator project as explicitly requested by user
  const displayProjects = rawProjects.filter(
    (p) => !p.title.toLowerCase().includes("minigit") && !p.title.toLowerCase().includes("calculator")
  );

  return (
    <section id="projects" className="relative py-20 bg-[#170d16]/90">
      <Container>
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              My Projects
            </h2>
            <p className="text-sm sm:text-base text-pink-100/70 leading-relaxed font-medium">
              A collection of projects I&apos;ve worked on, ranging from web applications to mobile apps and everything in between.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
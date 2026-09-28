import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Container } from "@/components/ui/primitives/Container";
import type { Experience as ExperienceModel } from "@prisma/client";

const defaultExperience = [
  {
    id: "exp-1",
    company: "Monotype Designers / AAIT Projects",
    role: "Web Developer & Frontend Engineer",
    description: "Created responsive user interfaces using HTML, CSS, JavaScript, React, and Next.js. Improved UI flow and built user-friendly web applications with smooth animations.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    achievements: [
      "Created multi-page responsive website layouts with modern CSS and motion transitions.",
      "Implemented structured APIs and database models using Prisma and PostgreSQL.",
      "Optimized client-side web performance and user experience accessibility."
    ],
    startDate: new Date("2024-01-01"),
    endDate: null,
  },
  {
    id: "exp-2",
    company: "Personal Projects & Mobile Engineering",
    role: "Software & Mobile App Developer",
    description: "Designed and built cross-platform mobile apps and algorithms. Focused on Flutter UI consistency, local SQLite data persistence, and Python algorithm visualizers.",
    technologies: ["Flutter", "Dart", "Python", "C++", "Git", "Figma"],
    achievements: [
      "Built Flutter cross-platform apps for vehicle maintenance tracking and fitness challenges.",
      "Developed Python pathfinding algorithms and interactive maze solvers.",
      "Engineered systems-level software tools with Git version control."
    ],
    startDate: new Date("2023-09-01"),
    endDate: null,
  }
];

export async function Experience() {
  let experience: ExperienceModel[] = [];
  try {
    experience = await prisma.experience.findMany({ orderBy: { startDate: "desc" } });
  } catch {}

  const displayExperience = experience.length > 0 ? experience : (defaultExperience as unknown as ExperienceModel[]);

  return (
    <section id="experience" className="relative py-20 bg-transparent text-white">
      <Container className="max-w-4xl">
        <FadeIn>
          <div className="mb-12">
            <p className="text-[#d8769c] uppercase font-bold tracking-widest text-xs font-mono mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-[#d8769c]/60" />
              MY EXPERIENCE
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Work & <span className="text-[#e875a3]">Education</span>
            </h2>
          </div>
        </FadeIn>
        <ExperienceTimeline experience={displayExperience} />
      </Container>
    </section>
  );
}
import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Section } from "@/components/ui/primitives/Section";
import { Container } from "@/components/ui/primitives/Container";
import type { Experience as ExperienceModel } from "@prisma/client";

const defaultExperience = [
  {
    id: "exp-1",
    company: "Monotype Designers / AAIT Projects",
    role: "Web Designing & Full-Stack Engineer",
    description: "Created responsive user layouts using HTML, CSS, JavaScript, React, and Next.js. Improved UI flow and built user-friendly features to enhance readability.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    achievements: [
      "Created multi-page responsive website layouts with subtle CSS and motion transitions.",
      "Implemented structured APIs and database models using Prisma and PostgreSQL.",
      "Optimized client-side web performance and UX accessibility."
    ],
    startDate: new Date("2024-01-01"),
    endDate: null,
  },
  {
    id: "exp-2",
    company: "Personal Projects & Mobile Engineering",
    role: "Software & Mobile App Developer",
    description: "Designed and built multi-themed web applications and mobile apps. Focused on clean animations, UI consistency, Flutter cross-platform development, and algorithm visualization.",
    technologies: ["Flutter", "Dart", "Python", "C++", "Git", "Figma"],
    achievements: [
      "Built Flutter cross-platform apps for vehicle maintenance tracking and fitness challenges.",
      "Developed Python pathfinding algorithms and interactive maze solvers.",
      "Engineered systems-level Git version control tools in C++."
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
    <section id="experience" className="relative py-20 bg-[#170d16] text-white">
      <Container className="max-w-4xl">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-12">
            Experience
          </h2>
        </FadeIn>
        <ExperienceTimeline experience={displayExperience} />
      </Container>
    </section>
  );
}
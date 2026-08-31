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
    <section id="experience" className="relative py-24 bg-gradient-to-br from-[#c87087] via-[#b65e76] to-[#9d4a61] text-[#22101e]">
      <Container className="max-w-4xl">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#3a1827] mb-3">Work & Practice</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#1a0812]">
              Experience
            </h2>
          </div>
        </FadeIn>
        <ExperienceTimeline experience={displayExperience} />
      </Container>
    </section>
  );
}
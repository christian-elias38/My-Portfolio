import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
import { Section } from "@/components/ui/primitives/Section";
import { Container } from "@/components/ui/primitives/Container";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import type { Skill } from "@prisma/client";

const defaultSkills = [
  { id: "s1", name: "HTML5", category: "Frontend", level: 4 },
  { id: "s2", name: "CSS3", category: "Frontend", level: 4 },
  { id: "s3", name: "JavaScript", category: "Frontend", level: 4 },
  { id: "s4", name: "TypeScript", category: "Frontend", level: 4 },
  { id: "s5", name: "React", category: "Frontend", level: 4 },
  { id: "s6", name: "Next.js", category: "Frontend", level: 4 },
  { id: "s7", name: "Tailwind CSS", category: "Frontend", level: 4 },
  { id: "s8", name: "shadcn/ui", category: "Frontend", level: 4 },
  { id: "s9", name: "Node.js", category: "Backend", level: 3 },
  { id: "s10", name: "Express.js", category: "Backend", level: 3 },
  { id: "s11", name: "REST API", category: "Backend", level: 3 },
  { id: "s12", name: "Prisma ORM", category: "Backend", level: 3 },
  { id: "s13", name: "Python", category: "Backend", level: 3 },
  { id: "s14", name: "C++", category: "Backend", level: 3 },
  { id: "s15", name: "PostgreSQL", category: "Database", level: 3 },
  { id: "s16", name: "SQLite", category: "Database", level: 3 },
  { id: "s17", name: "Neon Database", category: "Database", level: 3 },
  { id: "s18", name: "Flutter", category: "Mobile", level: 4 },
  { id: "s19", name: "Dart", category: "Mobile", level: 4 },
  { id: "s20", name: "Vercel", category: "Cloud", level: 3 },
  { id: "s21", name: "Cloudinary", category: "Cloud", level: 3 },
  { id: "s22", name: "Git", category: "Tools", level: 4 },
  { id: "s23", name: "GitHub", category: "Tools", level: 4 },
  { id: "s24", name: "VS Code", category: "Tools", level: 4 },
  { id: "s25", name: "Figma", category: "Tools", level: 3 },
];

export async function Skills() {
  let skills: Skill[] = [];
  try {
    skills = await prisma.skill.findMany({ orderBy: { category: "asc" } });
  } catch {}

  const list = skills.length > 0 ? skills : (defaultSkills as unknown as Skill[]);

  const grouped = list.reduce<Record<string, Skill[]>>((acc, skill) => {
    acc[skill.category] = acc[skill.category] ?? [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <Section id="skills" className="py-20 bg-transparent">
      <Container>
        <FadeIn>
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <p className="text-[#E6C88A] uppercase font-bold tracking-widest text-xs font-mono mb-3 flex items-center justify-center gap-2">
              <span className="w-6 h-px bg-[#E6C88A]/60" />
              MY SKILLS
              <span className="w-6 h-px bg-[#E6C88A]/60" />
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
              Tools I Work <span className="text-[#E6C88A]">With</span>
            </h2>
            <p className="text-sm sm:text-base text-[#CFC1B5] leading-relaxed font-medium">
              My toolkit for crafting calm, thoughtful, and beautifully detailed digital experiences.
            </p>
          </div>
        </FadeIn>
        <SkillsGrid grouped={grouped} />
      </Container>
    </Section>
  );
}

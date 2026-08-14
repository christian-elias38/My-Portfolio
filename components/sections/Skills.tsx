import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
import { Section } from "@/components/ui/primitives/Section";
import { Container } from "@/components/ui/primitives/Container";
import { SectionHeading } from "@/components/ui/primitives/SectionHeading";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import type { Skill } from "@prisma/client";

export async function Skills() {
  let skills: Skill[] = [];
  try {
    skills = await prisma.skill.findMany({ orderBy: { category: "asc" } });
  } catch {}

  if (skills.length === 0) return null;

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    acc[skill.category] = acc[skill.category] ?? [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <Section id="skills">
      <Container>
        <FadeIn>
          <SectionHeading eyebrow="Technical Proficiency" title="Skills & Technologies" />
        </FadeIn>
        <SkillsGrid grouped={grouped} />
      </Container>
    </Section>
  );
}

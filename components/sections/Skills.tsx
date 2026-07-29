import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { Section } from "@/components/ui/primitives/Section";
import { Container } from "@/components/ui/primitives/Container";
import { SectionHeading } from "@/components/ui/primitives/SectionHeading";
import type { Skill } from "@prisma/client";

export async function Skills() {
  const skills = await prisma.skill.findMany({ orderBy: { category: "asc" } });

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    acc[skill.category] = acc[skill.category] ?? [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <Section id="skills" className="py-24">
      <Container className="max-w-3xl">
        <FadeIn>
          <SectionHeading title="Skills" size="sm" className="mb-8" />
        </FadeIn>
        <SkillsGrid grouped={grouped} />
      </Container>
    </Section>
  );
}
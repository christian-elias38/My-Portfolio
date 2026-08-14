import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Section } from "@/components/ui/primitives/Section";
import { Container } from "@/components/ui/primitives/Container";
import type { Experience as ExperienceModel } from "@prisma/client";

export async function Experience() {
  let experience: ExperienceModel[] = [];
  try {
    experience = await prisma.experience.findMany({ orderBy: { startDate: "desc" } });
  } catch {}

  if (experience.length === 0) return null;

  return (
    <Section id="experience">
      <Container className="max-w-3xl">
        <FadeIn>
          <p className="text-accent text-xs uppercase tracking-widest font-bold mb-3">Career Journey</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            Experience that <span className="italic text-gradient">speaks volumes.</span>
          </h2>
        </FadeIn>
        <ExperienceTimeline experience={experience} />
      </Container>
    </Section>
  );
}
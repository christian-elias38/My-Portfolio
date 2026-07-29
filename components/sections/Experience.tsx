import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Section } from "@/components/ui/primitives/Section";
import { Container } from "@/components/ui/primitives/Container";
import { SectionHeading } from "@/components/ui/primitives/SectionHeading";

export async function Experience() {
  const experience = await prisma.experience.findMany({ orderBy: { startDate: "desc" } });

  if (experience.length === 0) return null;

  return (
    <Section id="experience" className="py-24">
      <Container className="max-w-3xl">
        <FadeIn>
          <SectionHeading
            eyebrow="Career Journey"
            size="md"
            className="mb-10"
            title={
              <>
                Experience that <span className="italic text-accent">speaks volumes.</span>
              </>
            }
          />
        </FadeIn>
        <ExperienceTimeline experience={experience} />
      </Container>
    </Section>
  );
}
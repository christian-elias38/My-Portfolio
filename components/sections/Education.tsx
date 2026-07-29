import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
import { Section } from "@/components/ui/primitives/Section";
import { Container } from "@/components/ui/primitives/Container";
import { SectionHeading } from "@/components/ui/primitives/SectionHeading";
import { formatYearRange } from "@/lib/format";

export async function Education() {
  const education = await prisma.education.findMany({ orderBy: { startYear: "desc" } });

  if (education.length === 0) return null;

  return (
    <Section id="education" className="py-24">
      <Container className="max-w-3xl">
        <FadeIn>
          <SectionHeading title="Education" size="sm" className="mb-8" />
        </FadeIn>
        <div className="space-y-6">
          {education.map((edu, i) => (
            <FadeIn key={edu.id} delay={i * 0.1}>
              <div>
                <h3 className="font-medium">{edu.degree}</h3>
                <p className="text-sm text-muted-foreground">
                  {edu.institution}
                  {edu.college && ` · ${edu.college}`}
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  {formatYearRange(edu.startYear, edu.endYear)}
                </p>
                {edu.description && <p className="text-sm text-muted-foreground">{edu.description}</p>}
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}

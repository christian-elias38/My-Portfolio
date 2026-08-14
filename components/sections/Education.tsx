import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
import { Section } from "@/components/ui/primitives/Section";
import { Container } from "@/components/ui/primitives/Container";
import { SectionHeading } from "@/components/ui/primitives/SectionHeading";
import { GraduationCap } from "lucide-react";
import type { Education as EducationModel } from "@prisma/client";

export async function Education() {
  let education: EducationModel[] = [];
  try {
    education = await prisma.education.findMany({ orderBy: { startYear: "desc" } });
  } catch {}
  const educationWithExtras = education as Array<
    EducationModel & { college?: string | null; description?: string | null }
  >;

  if (educationWithExtras.length === 0) return null;

  return (
    <Section id="education">
      <Container className="max-w-3xl">
        <FadeIn>
          <SectionHeading eyebrow="Academic Background" title="Education" />
        </FadeIn>
        <div className="space-y-6">
          {educationWithExtras.map((edu, i) => (
            <FadeIn key={edu.id} delay={i * 0.1}>
              <div className="relative rounded-3xl border border-border bg-card/40 p-6 md:p-8 hover:border-accent/40 transition-colors overflow-hidden">
                <div className="absolute -right-6 -top-6 opacity-[0.06]">
                  <GraduationCap className="w-32 h-32" />
                </div>
                <div className="relative flex items-start gap-4">
                  <div className="hidden sm:flex shrink-0 w-11 h-11 rounded-2xl bg-accent/10 border border-accent/20 items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-1">
                      {edu.startYear} — {edu.endYear ?? "Present"}
                    </p>
                    <h3 className="font-semibold text-lg text-foreground">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {edu.institution}
                      {edu.college && ` · ${edu.college}`}
                    </p>
                    {edu.field && (
                      <p className="text-xs text-foreground/60 mt-1 uppercase tracking-wide">{edu.field}</p>
                    )}
                    {edu.description && (
                      <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
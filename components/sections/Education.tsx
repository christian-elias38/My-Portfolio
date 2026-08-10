import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
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
    <section id="education" className="max-w-3xl mx-auto px-6 py-24">
      <FadeIn>
        <div className="mb-12">
          <p className="text-accent text-xs uppercase tracking-[0.2em] font-bold mb-3">Academic Background</p>
          <h2 className="text-section-title text-foreground">Education</h2>
        </div>
      </FadeIn>
      <div className="space-y-6">
        {educationWithExtras.map((edu, i) => (
          <FadeIn key={edu.id} delay={i * 0.1}>
            <div className="rounded-3xl border border-border bg-card/40 p-6 hover:border-accent/40 transition-colors">
              <h3 className="font-semibold text-lg text-foreground">{edu.degree}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {edu.institution}
                {edu.college && ` · ${edu.college}`}
              </p>
              <p className="text-xs text-accent font-semibold mt-2">
                {edu.startYear} — {edu.endYear ?? "Present"}
              </p>
              {edu.description && <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{edu.description}</p>}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
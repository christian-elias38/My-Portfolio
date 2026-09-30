import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
import { Section } from "@/components/ui/primitives/Section";
import { Container } from "@/components/ui/primitives/Container";
import { GraduationCap } from "lucide-react";
import type { Education as EducationModel } from "@prisma/client";

const defaultEducation = [
  {
    id: "edu-default-1",
    institution: "Addis Ababa University",
    college: "Addis Ababa Institute of Technology (AAIT)",
    degree: "BSc in Software Engineering",
    field: "Software Engineering",
    startYear: 2023,
    endYear: null,
    description:
      "Currently pursuing a Bachelor's degree in Software Engineering with a curriculum spanning Data Structures and Algorithms, Database Systems, Software Engineering principles, Computer Networking, Operating Systems, Human-Computer Interaction, and Full-Stack Development. Coursework blends theoretical foundations with hands-on project work, including collaborative team-based software builds, technical documentation, and iterative development practices. Actively engaged in extracurricular technical projects alongside coursework, applying classroom concepts to real, deployed applications.",
  },
];

export async function Education() {
  let education: EducationModel[] = [];
  try {
    education = await prisma.education.findMany({ orderBy: { startYear: "desc" } });
  } catch {}

  const educationWithExtras = education as Array<
    EducationModel & { college?: string | null; description?: string | null }
  >;

  const displayEducation = educationWithExtras.length > 0 ? educationWithExtras : defaultEducation;

  return (
    <Section id="education" className="py-24 bg-linear-to-b from-[#1a0918]/90 via-[#250e23]/85 to-[#1a0918]/90 border-y border-[#4e1c42]/50 backdrop-blur-md shadow-2xl relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#d8769c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#8d3b6a]/15 rounded-full blur-3xl pointer-events-none" />
      
      <Container className="max-w-4xl relative z-10">
        <FadeIn>
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <p className="text-[#d8769c] uppercase font-bold tracking-widest text-xs font-mono mb-3 flex items-center justify-center gap-2">
              <span className="w-6 h-px bg-[#d8769c]/60" />
              ACADEMIC BACKGROUND
              <span className="w-6 h-px bg-[#d8769c]/60" />
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Education & <span className="text-[#e875a3]">Qualifications</span>
            </h2>
          </div>
        </FadeIn>
        
        <div className="space-y-6">
          {displayEducation.map((edu, i) => (
            <FadeIn key={edu.id} delay={i * 0.1}>
              <div className="relative rounded-3xl border border-[#4e203f]/60 bg-[#220f1e]/80 p-6 md:p-8 hover:border-[#8d3b6a] transition-all overflow-hidden shadow-xl">
                <div className="absolute -right-6 -top-6 opacity-[0.08]">
                  <GraduationCap className="w-36 h-36 text-[#e875a3]" />
                </div>
                <div className="relative flex items-start gap-4">
                  <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-2xl bg-[#32122b] border border-[#5d234b] items-center justify-center text-[#e875a3]">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[#e875a3] font-bold uppercase tracking-widest mb-1 font-mono">
                      {edu.startYear} — {edu.endYear ?? "Present"}
                    </p>
                    <h3 className="font-extrabold text-xl text-white">{edu.degree}</h3>
                    <p className="text-sm font-semibold text-[#d8769c] mt-1">
                      {edu.institution}
                      {edu.college && ` · ${edu.college}`}
                    </p>
                    {edu.field && (
                      <p className="text-xs text-[#e0c8d4]/70 mt-1 uppercase tracking-wider font-mono">{edu.field}</p>
                    )}
                    {edu.description && (
                      <p className="text-sm text-[#e0c8d4] mt-4 leading-relaxed font-medium">{edu.description}</p>
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
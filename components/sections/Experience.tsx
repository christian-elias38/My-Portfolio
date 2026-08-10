import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import type { Experience as ExperienceModel } from "@prisma/client";

export async function Experience() {
  let experience: ExperienceModel[] = [];
  try {
    experience = await prisma.experience.findMany({ orderBy: { startDate: "desc" } });
  } catch {}

  if (experience.length === 0) return null;

  return (
    <section id="experience" className="max-w-3xl mx-auto px-6 py-24">
      <FadeIn>
        <p className="text-accent text-xs uppercase tracking-widest font-bold mb-3">Career Journey</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Experience that <span className="italic text-accent">speaks volumes.</span>
        </h2>
      </FadeIn>
      <ExperienceTimeline experience={experience} />
    </section>
  );
}
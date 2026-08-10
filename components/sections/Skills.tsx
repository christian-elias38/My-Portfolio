import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
import type { Skill } from "@prisma/client";

export async function Skills() {
  let skills: Skill[] = [];
  try {
    skills = await prisma.skill.findMany({ orderBy: { category: "asc" } });
  } catch {}

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    acc[skill.category] = acc[skill.category] ?? [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const order = ["Frontend", "Backend", "Database", "Mobile", "Cloud", "Tools"];
  const sorted = Object.entries(grouped).sort(
    ([a], [b]) => order.indexOf(a) - order.indexOf(b)
  );

  return (
    <section id="skills" className="max-w-5xl mx-auto px-6 py-24">
      <FadeIn>
        <div className="mb-12">
          <p className="text-accent text-xs uppercase tracking-[0.2em] font-bold mb-3">Technical Proficiency</p>
          <h2 className="text-section-title text-foreground">Skills & Technologies</h2>
        </div>
      </FadeIn>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map(([category, items], i) => (
          <FadeIn key={category} delay={i * 0.05}>
            <div className="h-full rounded-3xl border border-border bg-card/40 p-6 hover:border-accent/40 transition-colors">
              <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-4">{category}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill.id}
                    className="skill-badge inline-flex items-center rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-foreground/80 hover:text-accent hover:border-accent/40 transition-colors"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
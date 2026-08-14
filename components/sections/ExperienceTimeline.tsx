"use client";

import { motion } from "framer-motion";
import { Briefcase, CheckCircle2 } from "lucide-react";
import { TechBadge } from "@/components/ui/primitives/TechBadge";
import type { Experience as ExperienceModel } from "@prisma/client";

type ExperienceWithExtras = ExperienceModel & {
  technologies?: string[];
  achievements?: string[];
};

export function ExperienceTimeline({ experience }: { experience: ExperienceWithExtras[] }) {
  return (
    <div className="relative pl-10">
      <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-border to-transparent" />
      <div className="space-y-10">
        {experience.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative"
          >
            <span className="absolute -left-[30px] top-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-accent/15 ring-4 ring-background border border-accent/40">
              <Briefcase className="w-2.5 h-2.5 text-accent" />
            </span>
            <div className="border-gradient-glow rounded-2xl">
              <div className="bg-card/50 border border-border rounded-2xl p-6 md:p-7 hover:border-accent/40 transition-colors">
                <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-1">
                  {new Date(exp.startDate).getFullYear()} — {exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"}
                </p>
                <h3 className="font-bold text-lg text-foreground">{exp.role}</h3>
                <p className="text-sm text-muted-foreground mb-4">{exp.company}</p>
                <p className="text-sm text-foreground/70 leading-relaxed">{exp.description}</p>

                {!!exp.achievements?.length && (
                  <ul className="mt-4 space-y-2">
                    {exp.achievements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/70 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-accent/70 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {!!exp.technologies?.length && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {exp.technologies.map((tech) => (
                      <TechBadge key={tech} label={tech} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

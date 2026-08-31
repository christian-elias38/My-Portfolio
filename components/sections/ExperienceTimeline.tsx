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
    <div className="relative pl-8 sm:pl-10">
      <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-[#4a1c30]/40" />
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
            <span className="absolute -left-[28px] sm:-left-[30px] top-2 flex items-center justify-center w-6 h-6 rounded-full bg-[#1b0914] ring-4 ring-[#b65e76] border border-pink-300/40">
              <Briefcase className="w-3 h-3 text-pink-300" />
            </span>
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-[#1d0e19]/90 backdrop-blur-md border border-pink-300/20 p-6 md:p-8 hover:border-pink-300/50 transition-colors">
              <p className="text-xs text-pink-300 font-extrabold uppercase tracking-widest mb-1.5">
                {new Date(exp.startDate).getFullYear()} — {exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"}
              </p>
              <h3 className="font-black text-xl text-white tracking-tight">{exp.role}</h3>
              <p className="text-sm text-pink-200/80 font-bold mb-4">{exp.company}</p>
              <p className="text-sm text-pink-100/90 leading-relaxed font-medium">{exp.description}</p>

              {!!exp.achievements?.length && (
                <ul className="mt-5 space-y-2.5">
                  {exp.achievements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-pink-100/85 leading-relaxed font-medium">
                      <CheckCircle2 className="w-4 h-4 text-pink-300 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {!!exp.technologies?.length && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-950/80 text-pink-200 border border-pink-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

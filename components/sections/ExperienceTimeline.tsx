"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { Experience as ExperienceModel } from "@prisma/client";

type ExperienceWithExtras = ExperienceModel & {
  technologies?: string[];
  achievements?: string[];
};

export function ExperienceTimeline({ experience }: { experience: ExperienceWithExtras[] }) {
  return (
    <div className="relative pl-10 sm:pl-12">
      <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-[#504234]" />
      <div className="space-y-10">
        {experience.map((exp, i) => {
          const year = new Date(exp.startDate).getFullYear();
          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Year badge node on vertical line */}
              <span className="absolute -left-11 sm:-left-11.5 top-1.5 flex items-center justify-center w-9 h-9 rounded-full bg-linear-to-r from-[#C99555] to-[#E6C88A] text-[11px] font-black text-[#24191A] shadow-md border border-[#F3E7D3]/40">
                {year}
              </span>

              <div className="rounded-2xl border border-[#504234]/70 bg-[#24151C]/80 p-6 md:p-8 hover:border-[#C99555] transition-all duration-300 shadow-[0_0_20px_rgba(201,149,85,0.1)]">
                <h3 className="font-extrabold text-xl text-white tracking-tight">{exp.role}</h3>
                <p className="text-sm text-[#E6C88A] font-bold mb-3">at {exp.company}</p>
                <p className="text-sm text-[#CFC1B5] leading-relaxed font-medium mb-4">{exp.description}</p>

                {!!exp.achievements?.length && (
                  <ul className="mt-4 space-y-2">
                    {exp.achievements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CFC1B5] font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#E6C88A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {!!exp.technologies?.length && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="text-xs font-bold px-3.5 py-1 rounded-full bg-[#24151C] text-[#F3E7D3] border border-[#504234]">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

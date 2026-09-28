"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useGsapStagger } from "@/hooks/useGsapReveal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Skill } from "@prisma/client";

const CATEGORY_ORDER = ["Frontend", "Backend", "Database", "Mobile", "Cloud", "Tools"];

export function SkillsGrid({ grouped }: { grouped: Record<string, Skill[]> }) {
  const categories = useMemo(
    () => Object.keys(grouped).sort((a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b)),
    [grouped]
  );
  const [active, setActive] = useState<string>("All");
  const containerRef = useGsapStagger(".skill-badge");

  const visibleCategories = active === "All" ? categories : [active];

  return (
    <div>
      <Tabs value={active} onValueChange={(v) => v && setActive(v)} className="mb-10 flex justify-center">
        <TabsList variant="line" className="flex-wrap h-auto bg-[#200d1b]/80 border border-[#4e203f]/60 p-1.5 rounded-full">
          <TabsTrigger value="All" className="data-[state=active]:bg-[#b54673] data-[state=active]:text-white rounded-full text-xs font-bold px-4 py-1.5 transition-all text-[#e0b4cb]">All</TabsTrigger>
          {categories.map((c) => (
            <TabsTrigger key={c} value={c} className="data-[state=active]:bg-[#b54673] data-[state=active]:text-white rounded-full text-xs font-bold px-4 py-1.5 transition-all text-[#e0b4cb]">
              {c}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div ref={containerRef} key={active} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleCategories.map((category) => (
          <div
            key={category}
            className="h-full rounded-2xl border border-[#4e203f]/70 bg-[#220f1e]/80 p-6 hover:border-[#a04674] transition-all duration-300 shadow-xl opacity-100 shadow-[0_0_20px_rgba(180,75,120,0.1)]"
          >
            <p className="text-xs text-[#e875a3] font-bold font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e875a3]" />
              {category}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {grouped[category].map((skill) => (
                <motion.span
                  key={skill.id}
                  whileHover={{ scale: 1.06, y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="skill-badge inline-flex items-center rounded-full border border-[#522144] bg-[#261021] px-4 py-1.5 text-xs font-bold text-[#f4b3cf] hover:text-white hover:border-[#d66a94] transition-all duration-200 shadow-sm cursor-default"
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

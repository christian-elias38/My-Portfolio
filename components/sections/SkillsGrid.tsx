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
      <Tabs value={active} onValueChange={(v) => v && setActive(v)} className="mb-10">
        <TabsList variant="line" className="flex-wrap h-auto">
          <TabsTrigger value="All">All</TabsTrigger>
          {categories.map((c) => (
            <TabsTrigger key={c} value={c}>
              {c}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div ref={containerRef} key={active} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleCategories.map((category) => (
          <div
            key={category}
            className="h-full rounded-3xl border border-border bg-card/40 p-6 hover:border-accent/40 transition-colors"
          >
            <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-4">{category}</p>
            <div className="flex flex-wrap gap-2">
              {grouped[category].map((skill) => (
                <motion.span
                  key={skill.id}
                  whileHover={{ scale: 1.08, rotate: -2, y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="skill-badge inline-flex items-center rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-foreground/80 hover:text-accent hover:border-accent/40 transition-colors cursor-default"
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

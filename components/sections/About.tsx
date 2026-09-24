import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
import { StatCounter } from "@/components/motion/StatCounter";
import type { Profile } from "@prisma/client";
import { Section } from "@/components/ui/primitives/Section";
import { Container } from "@/components/ui/primitives/Container";
import { GlassCard } from "@/components/ui/primitives/GlassCard";
import { PixelCat } from "@/components/sections/PixelCat";

export async function About() {
  let profile: Profile | null = null;
  let projectCount = 0;
  let skillCount = 0;
  let categoryCount = 0;
  let yearsCoding = 0;

  try {
    const [profileResult, projectCountResult, skills, earliestExperience] = await Promise.all([
      prisma.profile.findFirst(),
      prisma.project.count(),
      prisma.skill.findMany({ select: { category: true } }),
      prisma.experience.findFirst({ orderBy: { startDate: "asc" } }),
    ]);
    profile = profileResult;
    projectCount = projectCountResult;
    skillCount = skills.length;
    categoryCount = new Set(skills.map((s) => s.category)).size;
    const startYear = earliestExperience?.startDate.getFullYear();
    yearsCoding = startYear ? Math.max(2, new Date().getFullYear() - startYear) : 2;
  } catch {
    yearsCoding = 2;
  }

  const stats = [
    { label: "Years Coding", value: yearsCoding || 2, suffix: "+" },
    { label: "Projects Shipped", value: projectCount || 6, suffix: "" },
    { label: "Technologies", value: skillCount || 25, suffix: "" },
    { label: "Skill Categories", value: categoryCount || 6, suffix: "" },
  ];

  const bioText = profile?.bio || `I'm a passionate creative developer and designer with over 3 years of experience building digital products that users love. I believe in the power of good design and clean code to solve real problems.

When I'm not coding, you'll find me exploring new design trends, contributing to open-source projects, or sharing my knowledge through writing and speaking at conferences.

I'm always excited to work on projects that challenge me to grow and learn something new.`;

  return (
    <Section id="about" className="py-20">
      <Container>
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-8">
            About Me
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-center mb-12">
          <FadeIn delay={0.1}>
            <div className="space-y-4 text-pink-100/80 text-sm sm:text-base leading-relaxed font-medium">
              <p className="whitespace-pre-line">{bioText}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex justify-center">
              <PixelCat />
            </div>
          </FadeIn>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={0.1 + i * 0.08}>
              <GlassCard className="p-6 text-center border-purple-500/20 bg-[#1e0f1d]/80">
                <p className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-pink-300 to-purple-300 tabular-nums">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs text-pink-200/70 mt-2 uppercase tracking-wider font-extrabold">{stat.label}</p>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}


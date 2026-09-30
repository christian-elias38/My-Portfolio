import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
import { StatCounter } from "@/components/motion/StatCounter";
import type { Profile } from "@prisma/client";
import { Section } from "@/components/ui/primitives/Section";
import { Container } from "@/components/ui/primitives/Container";
import { GlassCard } from "@/components/ui/primitives/GlassCard";
import { Butterfly } from "@/components/sections/Butterfly";

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

  return (
    <Section id="about" className="py-24 bg-linear-to-b from-[#1d0a1b]/90 via-[#270e24]/85 to-[#1d0a1b]/90 border-y border-[#4e1c42]/50 backdrop-blur-md shadow-2xl relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#d8769c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#8d3b6a]/15 rounded-full blur-3xl pointer-events-none" />
      <Container className="relative z-10">
        <FadeIn>
          <div className="mb-12">
            <p className="text-[#d8769c] uppercase font-bold tracking-widest text-xs font-mono mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-[#d8769c]/60" />
              ABOUT ME
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              A little about <span className="text-[#e875a3]">me</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center mb-14">
          <FadeIn delay={0.1}>
            <div className="space-y-4 text-[#e0c8d4] text-base leading-relaxed font-medium">
              <p>
                I&apos;m a passionate full-stack developer and software engineering student who loves turning complex ideas into clean, beautiful, and intuitive web and mobile applications. I enjoy clean code, thoughtful architecture, and creating digital products that solve real-world problems.
              </p>
              <p>
                Whether crafting responsive React & Next.js user interfaces, engineering RESTful backends, or developing Flutter mobile applications, I focus on performance, accessibility, and delightful user experiences.
              </p>
              <p className="text-xl font-bold text-[#f48cb5] pt-2 font-serif italic">
                Christian Elias ♡
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex items-center justify-center">
              <Butterfly />
            </div>
          </FadeIn>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={0.1 + i * 0.08}>
              <GlassCard className="p-6 text-center border-[#4e203f]/60 bg-[#220f1e]/80 hover:border-[#8d3b6a] transition-all">
                <p className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-[#f7a8c9] to-[#e875a3] tabular-nums">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs text-[#d8769c] mt-2 uppercase tracking-wider font-bold font-mono">{stat.label}</p>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}

import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
import { StatCounter } from "@/components/motion/StatCounter";
import type { Profile } from "@prisma/client";
import { Code2, Rocket, Users, Lightbulb } from "lucide-react";
import { Section } from "@/components/ui/primitives/Section";
import { Container } from "@/components/ui/primitives/Container";
import { SectionHeading } from "@/components/ui/primitives/SectionHeading";
import { GlassCard } from "@/components/ui/primitives/GlassCard";

const highlights = [
  { icon: Code2, title: "Clean Code", desc: "Writing maintainable, well-structured code across the stack." },
  { icon: Rocket, title: "Performance", desc: "Optimizing for speed and smooth, responsive experiences." },
  { icon: Users, title: "Collaboration", desc: "Working in teams to turn ideas into shipped features." },
  { icon: Lightbulb, title: "Curiosity", desc: "Constantly learning new tools, patterns, and architectures." },
];

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
    yearsCoding = startYear ? Math.max(1, new Date().getFullYear() - startYear) : 0;
  } catch {}

  const stats = [
    { label: "Years Coding", value: yearsCoding, suffix: "+" },
    { label: "Projects Shipped", value: projectCount, suffix: "" },
    { label: "Technologies", value: skillCount, suffix: "" },
    { label: "Skill Categories", value: categoryCount, suffix: "" },
  ];

  const bioText = profile?.bio || `I'm Christian Elias, a Software Engineering student at Addis Ababa University with a passion for building modern, scalable, and user-friendly web and mobile applications.

I specialize in full-stack engineering using Next.js, React, TypeScript, Node.js, PostgreSQL, and Prisma, alongside cross-platform mobile development with Flutter. My goal is to build impactful digital products with clean architecture and beautiful design.`;
  const location = profile?.location || "Addis Ababa, Ethiopia";

  return (
    <Section id="about">
      <Container>
        <FadeIn>
          <SectionHeading eyebrow="About Me" title="Building thoughtful products, one feature at a time." />
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
          <FadeIn delay={0.1}>
            <p className="text-foreground/85 text-base md:text-lg leading-relaxed whitespace-pre-line mb-6 font-medium">{bioText}</p>
            <p className="text-sm text-accent font-bold">📍 {location}</p>
          </FadeIn>
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <FadeIn key={item.title} delay={0.15 + i * 0.1}>
                <GlassCard className="p-5">
                  <item.icon className="w-5 h-5 text-accent mb-3" />
                  <h3 className="font-semibold mb-1 text-sm text-foreground">{item.title}</h3>
                  <p className="text-xs text-foreground/60 leading-relaxed">{item.desc}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={0.1 + i * 0.08}>
              <GlassCard className="p-6 text-center">
                <p className="text-3xl md:text-4xl font-bold text-accent tabular-nums">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs text-foreground/60 mt-2 uppercase tracking-wider">{stat.label}</p>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}

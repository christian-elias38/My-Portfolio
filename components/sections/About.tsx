import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
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
  try {
    profile = await prisma.profile.findFirst();
  } catch {}

  return (
    <Section id="about">
      <Container>
        <FadeIn>
          <SectionHeading eyebrow="About Me" title="Building thoughtful products, one feature at a time." />
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <FadeIn delay={0.1}>
            <p className="text-foreground/70 leading-relaxed whitespace-pre-line mb-6">{profile?.bio}</p>
            {profile?.location && <p className="text-sm text-muted-foreground">📍 {profile.location}</p>}
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
      </Container>
    </Section>
  );
}
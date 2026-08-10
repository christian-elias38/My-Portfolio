import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { Mail, ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";
import { TextReveal } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { LanguageSlider } from "@/components/motion/LanguageSlider";
import { Hero3DWrapper } from "@/components/three/Hero3DWrapper";
import { Container } from "@/components/ui/primitives/Container";
import { Glow } from "@/components/ui/primitives/Glow";
import { BlurCircle } from "@/components/ui/primitives/BlurCircle";
import type { Profile } from "@prisma/client";

export async function Hero() {
  let profile: Profile | null = null;
  try {
    profile = await prisma.profile.findFirst();
  } catch {}

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-50">
        <Hero3DWrapper />
      </div>
      <div className="absolute inset-0 -z-20 bg-background" />
      <Glow className="w-72 h-72 top-1/4 left-1/4" />
      <BlurCircle size={400} className="bottom-0 right-0" />

      <Container>
        <div className="grid md:grid-cols-[280px_1fr] gap-16 items-center w-full">
          <FadeIn direction="right">
            <div className="relative w-40 h-40 md:w-56 md:h-56">
              {profile?.profileImage ? (
                <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-primary/40 shadow-lg">
                  <Image src={profile.profileImage} alt={profile.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-full h-full rounded-full border-2 border-dashed border-muted-foreground/40 flex items-center justify-center text-xs text-muted-foreground text-center px-4">
                  Add your photo via admin dashboard
                </div>
              )}
            </div>
          </FadeIn>

          <div className="text-left">
            <FadeIn>
              <p className="text-accent text-xs uppercase tracking-[0.2em] font-bold mb-4">Software Engineer</p>
            </FadeIn>
            <TextReveal
              text={profile?.name ?? "Christian Elias"}
              className="text-hero text-foreground mb-6"
            />
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-6 leading-relaxed">
                {profile?.headline ?? "Software Engineer building full-stack products."}
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-sm text-muted-foreground max-w-md mb-8 leading-relaxed">
                I build modern, scalable, and user-focused digital experiences with clean code and thoughtful design.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-4 mb-10">
                <Magnetic>
                  <Link href="#projects" className={cn(buttonVariants({ size: "lg" }), "rounded-full shadow-lg hover:scale-105 transition-transform duration-300")}>
                    View Projects
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link href="#contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")}>
                    Contact Me
                  </Link>
                </Magnetic>
              </div>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="flex items-center gap-6 text-muted-foreground mb-10">
                {profile?.github && (
                  <Magnetic>
                    <a href={profile.github} target="_blank" aria-label="GitHub">
                      <SiGithub size={20} />
                    </a>
                  </Magnetic>
                )}
                {profile?.linkedin && (
                  <Magnetic>
                    <a href={profile.linkedin} target="_blank" aria-label="LinkedIn">
                      <LinkedinIcon size={20} />
                    </a>
                  </Magnetic>
                )}
                {profile?.email && (
                  <Magnetic>
                    <a href={`mailto:${profile.email}`} aria-label="Email">
                      <Mail className="w-5 h-5" />
                    </a>
                  </Magnetic>
                )}
                {profile?.resumeUrl && (
                  <Magnetic>
                    <Link href={profile.resumeUrl} target="_blank" aria-label="Resume" className="inline-flex items-center gap-2 text-sm hover:text-accent transition-colors">
                      Resume <ArrowDownRight className="w-4 h-4" />
                    </Link>
                  </Magnetic>
                )}
              </div>
            </FadeIn>
            <FadeIn delay={0.6}>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                  Open to opportunities
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1">
                  Languages I code in:
                  <span className="text-accent font-semibold"><LanguageSlider /></span>
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
        <FadeIn delay={0.7}>
          <div className="mt-16 flex justify-center">
            <Link href="#about" aria-label="Scroll down" className="group inline-flex items-center justify-center w-10 h-10 rounded-full border border-border hover:border-accent/60 transition-colors">
              <ArrowDownRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
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
import { Container } from "@/components/ui/primitives/Container";
import { Glow } from "@/components/ui/primitives/Glow";
import { BlurCircle } from "@/components/ui/primitives/BlurCircle";
import type { Profile } from "@prisma/client";

export async function Hero() {
  let profile: Profile | null = null;
  try {
    profile = await prisma.profile.findFirst();
  } catch {}

  const profileSrc = profile?.profileImage || "/profile.jpg";
  const name = profile?.name || "Christian Elias";
  const github = profile?.github || "https://github.com/christian-elias38";
  const linkedin = profile?.linkedin || "https://www.linkedin.com/in/christiane-006073382/";
  const email = profile?.email || "christianelias102@gmail.com";

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden py-12">
      <Glow className="w-96 h-96 -top-12 -left-12 opacity-80" />
      <BlurCircle size={400} className="bottom-0 right-0 opacity-60" />

      <Container>
        <div className="grid md:grid-cols-[300px_1fr] gap-12 lg:gap-16 items-center w-full">
          <FadeIn direction="right">
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 mx-auto md:mx-0">
              <div className="p-1.5 rounded-[2.4rem] bg-gradient-to-br from-pink-400/70 via-purple-400/50 to-rose-300/70 shadow-[0_0_50px_rgba(225,115,155,0.4)] relative w-full h-full">
                <div className="relative w-full h-full rounded-[2.1rem] overflow-hidden bg-card border border-white/10">
                  <Image
                    src={profileSrc}
                    alt={name}
                    fill
                    priority
                    sizes="(min-width: 768px) 300px, 240px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="text-left">
            <FadeIn>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#3b233a] bg-[#221321] px-3.5 py-1.5 text-accent text-xs uppercase tracking-[0.2em] font-extrabold mb-4 shadow-md opacity-100">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                </span>
                Software Engineer
              </span>
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
                  <Link href="#projects" className={cn(buttonVariants({ variant: "gradient", size: "xl" }), "hover:scale-[1.03] transition-transform duration-300")}>
                    View Projects
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link href="#contact" className={cn(buttonVariants({ variant: "outline", size: "xl" }), "border-gradient-glow hover:border-transparent")}>
                    Contact Me
                  </Link>
                </Magnetic>
              </div>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="flex items-center gap-6 text-muted-foreground mb-10">
                {github && (
                  <Magnetic>
                    <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <SiGithub size={20} />
                    </a>
                  </Magnetic>
                )}
                {linkedin && (
                  <Magnetic>
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <LinkedinIcon size={20} />
                    </a>
                  </Magnetic>
                )}
                {email && (
                  <Magnetic>
                    <a href={`mailto:${email}`} aria-label="Email">
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
                <span className="inline-flex items-center gap-2 rounded-full border border-[#3b233a] bg-[#221321] px-3.5 py-1.5 opacity-100 shadow-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                  Open to opportunities
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#3b233a] bg-[#221321] px-3.5 py-1.5 opacity-100 shadow-md">
                  Languages I code in:
                  <span className="text-accent font-bold"><LanguageSlider /></span>
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
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { Mail, ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { ensureAbsoluteUrl } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";
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
  const github = ensureAbsoluteUrl(profile?.github || "https://github.com/christian-elias38");
  const linkedin = ensureAbsoluteUrl(profile?.linkedin || "https://www.linkedin.com/in/christiane-006073382");
  const email = profile?.email || "christianelias102@gmail.com";

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden py-12">
      <Glow className="w-96 h-96 -top-12 -left-12 opacity-80" />
      <BlurCircle size={400} className="bottom-0 right-0 opacity-60" />

      <Container>
        <div className="grid md:grid-cols-[300px_1fr] gap-12 lg:gap-16 items-center w-full">
          <FadeIn direction="right">
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 mx-auto md:mx-0">
              <div className="p-1.5 rounded-[2.4rem] bg-linear-to-br from-pink-400/70 via-purple-400/50 to-rose-300/70 shadow-[0_0_50px_rgba(225,115,155,0.4)] relative w-full h-full">
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
              <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-[#251324] px-4 py-1.5 text-accent text-xs font-bold mb-6 shadow-lg shadow-purple-900/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                Available for new projects
              </span>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-3 leading-[0.95]">
                Hey!, I am <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-300 via-purple-300 to-pink-400 font-black">{profile?.name ?? "Christian Elias"}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-200/90 mb-6 tracking-tight">
                {profile?.headline ?? "Full-Stack Developer"}
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-base sm:text-lg text-pink-100/70 max-w-xl mb-8 leading-relaxed font-medium">
                I craft beautiful, functional digital experiences that bring ideas to life. Specializing in modern web development and user-centered design.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Magnetic>
                  <Link
                    href="#projects"
                    className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-purple-600 via-pink-500 to-purple-600 px-7 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-purple-600/30 hover:scale-105 hover:shadow-purple-500/40 transition-all duration-300"
                  >
                    View My Work
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full border border-purple-500/40 bg-[#1f101e] px-7 py-3.5 text-sm font-extrabold text-pink-200 hover:border-accent hover:bg-purple-950/40 transition-all duration-300 shadow-md"
                  >
                    Get in Touch
                  </Link>
                </Magnetic>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="flex items-center gap-6 text-pink-200/80 mb-6">
                {github && (
                  <Magnetic>
                    <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-accent transition-colors">
                      <SiGithub size={20} />
                    </a>
                  </Magnetic>
                )}
                {linkedin && (
                  <Magnetic>
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-accent transition-colors">
                      <LinkedinIcon size={20} />
                    </a>
                  </Magnetic>
                )}
                {email && (
                  <Magnetic>
                    <a href={`mailto:${email}`} aria-label="Email" className="hover:text-accent transition-colors">
                      <Mail className="w-5 h-5" />
                    </a>
                  </Magnetic>
                )}
                {profile?.resumeUrl && (
                  <Magnetic>
                    <Link href={profile.resumeUrl} target="_blank" aria-label="Resume" className="inline-flex items-center gap-2 text-sm font-bold text-pink-200 hover:text-accent transition-colors">
                      Resume <ArrowDownRight className="w-4 h-4" />
                    </Link>
                  </Magnetic>
                )}
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
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
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { Mail } from "lucide-react";
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
import { getProfileLinks, type ProfileLinkKey } from "@/lib/profile-links";

const socialIcons: Record<ProfileLinkKey, React.ReactNode> = {
  github: <SiGithub size={20} />,
  linkedin: <LinkedinIcon size={20} />,
  email: <Mail className="w-5 h-5" />,
};

export async function Hero() {
  const profile = await prisma.profile.findFirst();

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
            <p className="text-muted-foreground mb-3 tracking-widest uppercase text-sm font-bold">Hi, I&apos;m</p>
            <TextReveal
              text={profile?.name ?? "Christian Elias"}
              className="text-hero text-foreground mb-4"
            />
            <div className="mb-5 text-sm text-muted-foreground flex items-center gap-2">
              <span>Languages I code in:</span>
              <LanguageSlider />
            </div>
            <FadeIn delay={0.4}>
              <p className="text-lg text-muted-foreground max-w-lg mb-8">
                {profile?.headline ?? "Software Engineer building full-stack products."}
              </p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="flex gap-4 mb-8">
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
            <FadeIn delay={0.6}>
              <div className="flex gap-6 text-muted-foreground">
                {getProfileLinks(profile).map((link) => (
                  <Magnetic key={link.key}>
                    <a href={link.href} aria-label={link.label} target={link.external ? "_blank" : undefined}>
                      {socialIcons[link.key]}
                    </a>
                  </Magnetic>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
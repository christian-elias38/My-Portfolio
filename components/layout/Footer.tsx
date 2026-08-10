import { prisma } from "@/lib/prisma";
import { FooterIcon } from "@/components/footer/FooterIcon";
import { Container } from "@/components/ui/primitives/Container";


export async function Footer() {
  const profile = await prisma.profile.findFirst();

  return (
    <footer className="bg-card/30 border-t border-border mt-20">
      <Container className="py-16 flex flex-col items-center text-center gap-6">
        <FooterIcon />
        <h3 className="text-lg font-semibold text-foreground">{profile?.name ?? "Christian Elias"}</h3>
        <div className="flex gap-4 text-sm">
          {profile?.github && <a href={profile.github} target="_blank" className="text-foreground/70 hover:text-accent transition-colors">GitHub</a>}
          {profile?.linkedin && <a href={profile.linkedin} target="_blank" className="text-foreground/70 hover:text-accent transition-colors">LinkedIn</a>}
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} {profile?.name ?? "Christian Elias"}. Made with Next.js.</p>
      </Container>
    </footer>
  );
}
import { prisma } from "@/lib/prisma";
import { FooterIcon } from "@/components/footer/FooterIcon";
import { Container } from "@/components/ui/primitives/Container";
import { getProfileLinks } from "@/lib/profile-links";

export async function Footer() {
  const profile = await prisma.profile.findFirst();
  const name = profile?.name ?? "Christian Elias";

  return (
    <footer className="bg-card/30 border-t border-border mt-20">
      <Container className="py-16 flex flex-col items-center text-center gap-6">
        <FooterIcon />
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        <div className="flex gap-4 text-sm">
          {getProfileLinks(profile, ["github", "linkedin"]).map((link) => (
            <a
              key={link.key}
              href={link.href}
              target="_blank"
              className="text-foreground/70 hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} {name}. Made with Next.js.</p>
      </Container>
    </footer>
  );
}

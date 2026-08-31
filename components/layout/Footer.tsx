"use client";

import { useEffect, useState } from "react";
import { FooterIcon } from "@/components/footer/FooterIcon";
import { Container } from "@/components/ui/primitives/Container";

type Profile = {
  name?: string;
  github?: string;
  linkedin?: string;
};

export function Footer() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then(setProfile)
      .catch(() => {});
  }, []);

  const githubUrl = profile?.github || "https://github.com/christian-elias38";
  const linkedinUrl = profile?.linkedin || "https://www.linkedin.com/in/christiane-006073382/";

  return (
    <footer className="bg-card/30 border-t border-border mt-20">
      <Container className="py-16 flex flex-col items-center text-center gap-6">
        <FooterIcon />
        <h3 className="text-lg font-semibold text-foreground">{profile?.name ?? "Christian Elias"}</h3>
        <div className="flex gap-4 text-sm">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-accent transition-colors">GitHub</a>
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-accent transition-colors">LinkedIn</a>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} {profile?.name ?? "Christian Elias"}. Made with Next.js.</p>
      </Container>
    </footer>
  );
}
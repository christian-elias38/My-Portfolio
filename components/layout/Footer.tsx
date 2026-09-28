"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/primitives/Container";
import { ensureAbsoluteUrl } from "@/lib/utils";
import { Mail } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";

type Profile = {
  name?: string;
  github?: string;
  linkedin?: string;
  email?: string;
};

export function Footer() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then(setProfile)
      .catch(() => {});
  }, []);

  const githubUrl = ensureAbsoluteUrl(profile?.github || "https://github.com/christian-elias38");
  const linkedinUrl = ensureAbsoluteUrl(profile?.linkedin || "https://www.linkedin.com/in/christiane-006073382");
  const email = profile?.email || "christianelias102@gmail.com";

  return (
    <footer className="py-12 bg-transparent">
      <Container className="flex flex-col items-center justify-center">
        <div className="rounded-2xl bg-[#271022]/80 border border-[#522144] px-8 py-5 text-center flex flex-col items-center gap-3 shadow-xl max-w-md w-full">
          <p className="text-xs font-semibold text-[#e0c8d4]">
            Made with passion by <span className="text-[#e875a3] font-bold">{profile?.name ?? "Christian Elias"}</span> | © {new Date().getFullYear()} All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[#f4b3cf]">
            <a href={`mailto:${email}`} aria-label="Email" className="hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
            </a>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-white transition-colors">
              <SiGithub size={15} />
            </a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors">
              <LinkedinIcon size={15} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
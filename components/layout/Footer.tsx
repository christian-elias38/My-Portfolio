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
    <footer className="w-full mt-20 py-10 bg-[#1E1518]/80 border-t border-[#504234]/60 backdrop-blur-md">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-medium text-[#CFC1B5] text-center sm:text-left">
          © {new Date().getFullYear()} <span className="text-white font-bold">{profile?.name ?? "Christian Elias"}</span>. All rights reserved.
        </p>

        <div className="flex items-center gap-4 text-[#F3E7D3]">
          <a
            href={`mailto:${email}`}
            aria-label="Email"
            className="p-2.5 rounded-full bg-[#24151C] border border-[#504234] hover:text-white hover:border-[#E6C88A] transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2.5 rounded-full bg-[#24151C] border border-[#504234] hover:text-white hover:border-[#E6C88A] transition-colors"
          >
            <SiGithub size={15} />
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2.5 rounded-full bg-[#24151C] border border-[#504234] hover:text-white hover:border-[#E6C88A] transition-colors"
          >
            <LinkedinIcon size={15} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  User,
  Wrench,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Newspaper,
  FileText,
  Command as CommandIcon,
} from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";

const sections = [
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
];

type Profile = { github?: string; linkedin?: string; resumeUrl?: string };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open || profile) return;
    fetch("/api/profile")
      .then((r) => r.json())
      .then(setProfile)
      .catch(() => {});
  }, [open, profile]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function goToSection(id: string) {
    setOpen(false);
    if (window.location.pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    history.pushState(null, "", `#${id}`);
  }

  function openExternal(url?: string) {
    if (!url) return;
    setOpen(false);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1.5 text-xs text-muted-foreground hover:border-accent/40 hover:text-foreground transition-colors"
        aria-label="Open command menu"
      >
        <CommandIcon className="w-3.5 h-3.5" />
        <span>Search</span>
        <kbd className="ml-1 rounded border border-border bg-background/60 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-[15vh] px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-[#3b233a] bg-[#1d0e1c] text-foreground shadow-2xl overflow-hidden opacity-100">
            <Command loop shouldFilter className="bg-[#1d0e1c]">
              <CommandInput placeholder="Jump to a section, or open a link..." autoFocus />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Navigate">
                  {sections.map((s) => (
                    <CommandItem key={s.id} value={s.label} onSelect={() => goToSection(s.id)}>
                      <s.icon />
                      {s.label}
                    </CommandItem>
                  ))}
                  <CommandItem value="Blog" onSelect={() => { setOpen(false); router.push("/blog"); }}>
                    <Newspaper />
                    Blog
                  </CommandItem>
                </CommandGroup>
                {(profile?.github || profile?.linkedin || profile?.resumeUrl) && (
                  <CommandGroup heading="Links">
                    {profile?.github && (
                      <CommandItem value="GitHub" onSelect={() => openExternal(profile.github)}>
                        <SiGithub className="size-4" />
                        GitHub
                      </CommandItem>
                    )}
                    {profile?.linkedin && (
                      <CommandItem value="LinkedIn" onSelect={() => openExternal(profile.linkedin)}>
                        <LinkedinIcon size={16} />
                        LinkedIn
                      </CommandItem>
                    )}
                    {profile?.resumeUrl && (
                      <CommandItem value="Resume" onSelect={() => openExternal(profile.resumeUrl)}>
                        <FileText />
                        Resume
                      </CommandItem>
                    )}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}

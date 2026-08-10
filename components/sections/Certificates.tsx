"use client";

import { useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/primitives/SectionHeading";
import { Container } from "@/components/ui/primitives/Container";
import { Section } from "@/components/ui/primitives/Section";
import { Award } from "lucide-react";

const certificates = [
  {
    title: "Full-Stack Web Development",
    organization: "Coursera / Meta",
    date: "2025",
    imageUrl: "https://res.cloudinary.com/p3v67tvk/image/upload/v1783655960/photo_2026-07-10_06-38-42_el1h8f.jpg",
    credentialUrl: "https://coursera.org",
  },
  {
    title: "Cybersecurity Fundamentals",
    organization: "Cisco Networking Academy",
    date: "2025",
    imageUrl: "https://res.cloudinary.com/p3v67tvk/image/upload/v1783655960/photo_2026-07-10_06-38-42_el1h8f.jpg",
    credentialUrl: "https://www.netacad.com",
  },
];

export function Certificates() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Section id="certificates">
      <Container>
        <FadeIn>
          <div className="mb-12">
            <p className="text-accent text-xs uppercase tracking-[0.2em] font-bold mb-3">Credentials</p>
            <SectionHeading eyebrow="" title="Certificates" />
          </div>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, i) => (
            <FadeIn key={cert.title} delay={i * 0.1}>
              <Dialog open={openId === cert.title} onOpenChange={(v) => setOpenId(v ? cert.title : null)}>
                <DialogTrigger asChild>
                  <button className="text-left h-full rounded-3xl border border-border bg-card/40 p-6 hover:border-accent/40 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <Award className="w-5 h-5 text-accent" />
                      <p className="text-xs text-accent font-semibold uppercase tracking-widest">Certificate</p>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground">{cert.organization}</p>
                    <p className="text-xs text-muted-foreground mt-2">{cert.date}</p>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>{cert.title}</DialogTitle>
                    <DialogDescription>{cert.organization}</DialogDescription>
                  </DialogHeader>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-border">
                    <Image src={cert.imageUrl} alt={cert.title} fill className="object-cover" />
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
                    >
                      View credential
                    </a>
                  )}
                </DialogContent>
              </Dialog>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}

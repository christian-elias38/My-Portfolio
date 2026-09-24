"use client";

import { useEffect, useState } from "react";
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
import type { Certificate } from "@prisma/client";

export function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setCertificates(Array.isArray(data) ? data : []))
      .catch(() => setCertificates([]));
  }, []);

  if (certificates.length === 0) return null;

  return (
    <Section id="certificates">
      <Container>
        <FadeIn>
          <SectionHeading eyebrow="Credentials" title="Certificates" />
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, i) => (
            <FadeIn key={cert.id} delay={i * 0.1}>
              <Dialog open={openId === cert.id} onOpenChange={(v) => setOpenId(v ? cert.id : null)}>
                <DialogTrigger asChild>
                  <button className="group text-left h-full w-full rounded-3xl border border-border bg-card/40 overflow-hidden hover:border-accent/40 transition-colors">
                    {cert.imageUrl ? (
                      <div className="relative aspect-16/10 overflow-hidden border-b border-border">
                        <Image
                          src={cert.imageUrl}
                          alt={cert.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
                      </div>
                    ) : null}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Award className="w-5 h-5 text-accent" />
                        <p className="text-xs text-accent font-semibold uppercase tracking-widest">Certificate</p>
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(cert.date).getFullYear()}
                      </p>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>{cert.title}</DialogTitle>
                    <DialogDescription>{cert.issuer}</DialogDescription>
                  </DialogHeader>
                  {cert.imageUrl && (
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-border">
                      <Image src={cert.imageUrl} alt={cert.title} fill className="object-cover" />
                    </div>
                  )}
                  {cert.certificateUrl && (
                    <a
                      href={cert.certificateUrl}
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

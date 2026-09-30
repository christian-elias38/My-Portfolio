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
import { Container } from "@/components/ui/primitives/Container";
import { Section } from "@/components/ui/primitives/Section";
import { Award, ExternalLink, Maximize2 } from "lucide-react";
import type { Certificate } from "@prisma/client";

const defaultCertificates: Certificate[] = [
  {
    id: "cert-udacity-android",
    title: "Global Chapters - Ethiopia - Android Fundamentals",
    issuer: "Udacity",
    date: new Date("2026-09-28"),
    imageUrl: "/certificates/udacity-android-fundamentals.png",
    certificateUrl: "https://www.udacity.com/certificate/lp/01269edb-4613-419a-8af5-fa5fdf00a51c",
  },
];

export function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setCertificates(Array.isArray(data) ? data : []))
      .catch(() => setCertificates([]));
  }, []);

  const displayCertificates = certificates.length > 0 ? certificates : defaultCertificates;

  return (
    <Section id="certificates" className="py-20 bg-transparent">
      <Container>
        <FadeIn>
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <p className="text-[#d8769c] uppercase font-bold tracking-widest text-xs font-mono mb-3 flex items-center justify-center gap-2">
              <span className="w-6 h-px bg-[#d8769c]/60" />
              CREDENTIALS
              <span className="w-6 h-px bg-[#d8769c]/60" />
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
              Certificates & <span className="text-[#e875a3]">Honors</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCertificates.map((cert, i) => (
            <FadeIn key={cert.id} delay={i * 0.1}>
              <Dialog open={openId === cert.id} onOpenChange={(v) => setOpenId(v ? cert.id : null)}>
                <div className="group text-left h-full w-full rounded-2xl border border-[#4e203f]/70 bg-[#220f1e]/80 overflow-hidden hover:border-[#a04674] transition-all duration-300 shadow-xl shadow-[0_0_20px_rgba(180,75,120,0.1)] flex flex-col justify-between">
                  <div>
                    {cert.imageUrl && (
                      <DialogTrigger asChild>
                        <div className="relative aspect-16/10 overflow-hidden border-b border-[#4e203f]/60 bg-[#120710] cursor-pointer group/img">
                          <Image
                            src={cert.imageUrl}
                            alt={cert.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                          />
                          <div className="absolute inset-0 bg-[#150712]/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-medium text-xs backdrop-blur-[2px]">
                            <Maximize2 className="w-4 h-4 text-[#e875a3]" />
                            <span>Preview Full Certificate</span>
                          </div>
                        </div>
                      </DialogTrigger>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2.5 mb-3">
                        <Award className="w-4 h-4 text-[#e875a3]" />
                        <p className="text-xs text-[#e875a3] font-bold uppercase tracking-widest font-mono">Certificate</p>
                      </div>
                      <h3 className="font-extrabold text-white mb-1.5 leading-snug group-hover:text-[#f8b4d0] transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#d8769c]">{cert.issuer}</p>
                      <p className="text-xs text-[#e0c8d4]/70 mt-2 font-mono">
                        {new Date(cert.date).getFullYear()}
                      </p>
                    </div>
                  </div>

                  {/* Direct Link Button */}
                  <div className="p-6 pt-0 flex items-center gap-3">
                    {cert.certificateUrl && (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d66a94]/60 text-[#f6abd0] bg-[#2d1226] hover:bg-[#b54673]/30 hover:border-[#f6abd0] text-xs font-bold transition-all cursor-pointer"
                      >
                        <span>Verify Link</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    
                    <DialogTrigger asChild>
                      <button className="text-xs font-semibold text-[#d8769c] hover:text-white transition-colors underline underline-offset-4 cursor-pointer">
                        Expand
                      </button>
                    </DialogTrigger>
                  </div>
                </div>

                <DialogContent className="sm:max-w-xl bg-[#190a16] border border-[#522144] text-white p-6 rounded-3xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-white">{cert.title}</DialogTitle>
                    <DialogDescription className="text-sm font-semibold text-[#e875a3]">{cert.issuer}</DialogDescription>
                  </DialogHeader>

                  {cert.imageUrl && (
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#4e203f] bg-[#120710] my-3">
                      <Image src={cert.imageUrl} alt={cert.title} fill className="object-contain p-2" />
                    </div>
                  )}

                  {cert.certificateUrl && (
                    <div className="pt-2 flex justify-end">
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-[#b34972] to-[#d66a94] text-xs font-extrabold text-white shadow-lg hover:scale-102 transition-transform"
                      >
                        <span>Verify Credential on Udacity</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
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

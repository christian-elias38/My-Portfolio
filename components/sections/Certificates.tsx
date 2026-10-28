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
import { Award, ExternalLink, Maximize2, CheckCircle2 } from "lucide-react";
import type { Certificate } from "@prisma/client";

export type CertificateExtra = Certificate & {
  category?: string;
  skills?: string[];
  description?: string;
};

const defaultCertificates: CertificateExtra[] = [
  {
    id: "cert-udacity-data",
    title: "Global Chapters - Ethiopia - Data Fundamentals",
    issuer: "Udacity",
    date: new Date("2026-10-01"),
    imageUrl: "/certificates/udacity-data-fundamentals-full.png",
    certificateUrl: "https://confirm.udacity.com/lp/7ba8ac4b-30fd-4315-8922-8cde13f0aad3",
    category: "DATA SCIENCE",
    description: "Verified certificate confirming successful completion of the Global Chapters Ethiopia Data Fundamentals Program with Udacity.",
    skills: ["Data Analysis", "Python", "SQL", "Statistics", "Data Visualization"],
  },
  {
    id: "cert-udacity-android",
    title: "Global Chapters - Ethiopia - Android Fundamentals",
    issuer: "Udacity",
    date: new Date("2026-09-28"),
    imageUrl: "/certificates/udacity-android-fundamentals.png",
    certificateUrl: "https://www.udacity.com/certificate/lp/01269edb-4613-419a-8af5-fa5fdf00a51c",
    category: "MOBILE DEVELOPMENT",
    description: "Verified certificate of achievement covering Android fundamentals, app architecture, lifecycle management, and modern Kotlin development.",
    skills: ["Android SDK", "Kotlin", "Mobile UI", "Architecture", "REST APIs"],
  },
  {
    id: "cert-cisco-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: new Date("2026-09-28"),
    imageUrl: "/certificates/cisco-cybersecurity.png",
    certificateUrl: "https://www.netacad.com/launch?id=4b30f819-4173-480d-a9e8-4d07e02d7d59&tab=curriculum&view=13ca36f2-a92d-5c78-a344-5c54183065b5",
    category: "CYBERSECURITY",
    description: "Certified knowledge assessment and credential for cybersecurity fundamentals, network defense strategies, threat mitigation, and data privacy.",
    skills: ["Threat Analysis", "Network Security", "Data Privacy", "Defense Strategies"],
  },
];

export function Certificates() {
  const [certificates, setCertificates] = useState<CertificateExtra[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Merge with extra metadata if available
          const merged = data.map((d) => {
            const match = defaultCertificates.find((def) => def.id === d.id || def.title === d.title);
            return {
              ...d,
              category: match?.category || "CREDENTIAL",
              skills: match?.skills || [],
              description: match?.description,
            };
          });
          setCertificates(merged);
        } else {
          setCertificates([]);
        }
      })
      .catch(() => setCertificates([]));
  }, []);

  const displayCertificates = certificates.length > 0 ? certificates : defaultCertificates;

  return (
    <Section id="certificates" className="py-24 bg-transparent relative overflow-hidden">
      <Container>
        <FadeIn>
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <p className="text-[#E6C88A] uppercase font-bold tracking-widest text-xs font-mono mb-3 flex items-center justify-center gap-2">
              <span className="w-6 h-px bg-[#E6C88A]/60" />
              VERIFIED CREDENTIALS
              <span className="w-6 h-px bg-[#E6C88A]/60" />
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Certificates & <span className="text-[#E6C88A]">Achievements</span>
            </h2>
            <p className="text-sm sm:text-base text-[#CFC1B5]/80 font-medium max-w-xl mx-auto">
              Professional credentials, verified certifications, and technical program achievements.
            </p>
          </div>
        </FadeIn>

        {/* Certificate Cards Showcase Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCertificates.map((cert, i) => (
            <FadeIn key={cert.id} delay={i * 0.1}>
              <Dialog open={openId === cert.id} onOpenChange={(v) => setOpenId(v ? cert.id : null)}>
                <div className="group text-left h-full w-full rounded-3xl border border-[#504234]/70 bg-linear-to-b from-[#24151C]/95 via-[#1E1518]/95 to-[#1E1518]/95 overflow-hidden hover:border-[#E6C88A] transition-all duration-300 shadow-[0_15px_50px_rgba(20,10,18,0.6)] hover:shadow-[0_20px_60px_rgba(230,200,138,0.22)] flex flex-col justify-between">
                  <div>
                    {/* Top Header Bar (Matching Project Cards style) */}
                    <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#504234]/50 bg-[#1E1518]/80 backdrop-blur-md">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E6C88A] animate-pulse shadow-[0_0_8px_#E6C88A]" />
                        <span className="text-xs font-mono font-bold text-[#F3E7D3] uppercase tracking-wider">
                          {cert.category || "CERTIFICATE"}
                        </span>
                      </div>

                      <DialogTrigger asChild>
                        <button className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#24151C] border border-[#504234] text-[#F0D9A5] text-[11px] font-bold shadow-xs hover:border-[#E6C88A] hover:bg-[#504234]/40 transition-colors cursor-pointer">
                          <Maximize2 className="w-3.5 h-3.5 text-[#E6C88A]" />
                          <span>Preview</span>
                        </button>
                      </DialogTrigger>
                    </div>

                    {/* Screenshot Preview Showcase Box (Large display box) */}
                    {cert.imageUrl && (
                      <DialogTrigger asChild>
                        <div className="relative h-64 sm:h-72 w-full bg-[#150913] overflow-hidden border-b border-[#504234]/40 shrink-0 cursor-pointer group/img">
                          <Image
                            src={cert.imageUrl}
                            alt={cert.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            priority={i === 0}
                            className="object-contain p-3.5 transition-transform duration-500 group-hover/img:scale-105"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-[#1E1518] via-transparent to-transparent opacity-60 pointer-events-none" />

                          {/* Hover Overlay with Preview prompt */}
                          <div className="absolute inset-0 bg-[#1E1518]/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px]">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#24151C]/95 border border-[#E6C88A] text-[#F0D9A5] text-xs font-bold shadow-xl">
                              <Maximize2 className="w-4 h-4 text-[#E6C88A]" />
                              <span>View Full Certificate</span>
                            </span>
                          </div>
                        </div>
                      </DialogTrigger>
                    )}

                    {/* Main Card Content */}
                    <div className="p-5 sm:p-6 space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-[#E6C88A]" />
                          <span className="text-xs font-mono font-bold text-[#E6C88A] uppercase tracking-wider">
                            {cert.issuer}
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#150913]/90 border border-[#504234]/60 text-[#CFC1B5] font-mono text-[11px] font-medium">
                          {new Date(cert.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug group-hover:text-[#F0D9A5] transition-colors">
                        {cert.title}
                      </h3>

                      {cert.description && (
                        <p className="text-xs sm:text-sm text-[#CFC1B5]/80 line-clamp-2 leading-relaxed">
                          {cert.description}
                        </p>
                      )}

                      {/* Technical Skills Pills */}
                      {cert.skills && cert.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#504234]/40">
                          {cert.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-1 rounded-full bg-[#150913]/90 border border-[#504234]/60 text-[#F3E7D3] text-[11px] font-mono font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-5 sm:p-6 pt-0 flex items-center justify-between gap-3 border-t border-[#504234]/30 mt-4">
                    {cert.certificateUrl ? (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-[#C99555] to-[#E6C88A] text-[#1E1518] hover:from-[#E6C88A] hover:to-[#F3E7D3] text-xs font-extrabold shadow-lg hover:shadow-[0_0_20px_rgba(230,200,138,0.4)] transition-all transform hover:scale-102 active:scale-98 cursor-pointer"
                      >
                        <span>Verify Credential</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <div />
                    )}

                    <DialogTrigger asChild>
                      <button className="text-xs font-bold text-[#E6C88A] hover:text-white transition-colors underline underline-offset-4 cursor-pointer py-1">
                        Full View
                      </button>
                    </DialogTrigger>
                  </div>
                </div>

                {/* High-Resolution Certificate Lightbox Dialog */}
                <DialogContent className="sm:max-w-3xl bg-[#1E1518] border border-[#504234] text-white p-6 sm:p-8 rounded-3xl max-h-[92vh] overflow-y-auto">
                  <DialogHeader className="space-y-1.5 text-left">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E6C88A] animate-pulse" />
                      <span className="text-xs font-mono font-bold text-[#E6C88A] uppercase tracking-wider">
                        {cert.issuer} Verified Credential
                      </span>
                    </div>
                    <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                      {cert.title}
                    </DialogTitle>
                    <DialogDescription className="text-xs sm:text-sm font-medium text-[#CFC1B5]/80">
                      Completed {new Date(cert.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </DialogDescription>
                  </DialogHeader>

                  {/* Certificate Full Visual Frame */}
                  {cert.imageUrl && (
                    <div className="relative w-full h-[55vh] sm:h-[65vh] rounded-2xl overflow-hidden border border-[#504234] bg-[#12070F] my-4 shadow-2xl">
                      <Image
                        src={cert.imageUrl}
                        alt={cert.title}
                        fill
                        className="object-contain p-2 sm:p-4"
                        sizes="(min-width: 1024px) 800px, 100vw"
                      />
                    </div>
                  )}

                  {/* Skills in Dialog */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-mono text-[#E6C88A] font-bold uppercase tracking-wider mb-2">
                        Key Competencies & Modules
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#24151C] border border-[#504234] text-[#F3E7D3] text-xs font-medium"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#E6C88A]" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dialog Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#504234]/40">
                    <span className="text-xs font-mono text-[#CFC1B5]/70">
                      Official digital verification available via issuer registry
                    </span>

                    {cert.certificateUrl && (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-linear-to-r from-[#C99555] to-[#E6C88A] text-xs font-extrabold text-[#1E1518] shadow-lg hover:shadow-[0_0_20px_rgba(230,200,138,0.4)] hover:scale-102 active:scale-98 transition-all"
                      >
                        <span>Open Official Verification</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CursorFollower } from "@/components/motion/CursorFollower";
import { Hero3DWrapper } from "@/components/three/Hero3DWrapper";
import { ParticleField } from "@/components/motion/ParticleField";
import { AmbientBackground } from "@/components/motion/AmbientBackground";
import { PointerProvider } from "@/hooks/usePointer";

import { InteractiveParticles } from "@/components/motion/InteractiveParticles";

export const metadata: Metadata = {
  title: "Christian Elias | Software Engineer",
  description: "Portfolio of Christian Elias — Software Engineering student specializing in full-stack and mobile development.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="font-sans" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <PointerProvider>
            <SmoothScroll>
              <CursorFollower />
              <InteractiveParticles />
              <div className="fixed inset-0 -z-50 bg-ambient pointer-events-none" aria-hidden="true" />
              <div className="fixed inset-0 -z-45 pointer-events-none">
                <AmbientBackground />
              </div>
              <div className="fixed inset-0 -z-40 pointer-events-none">
                <Hero3DWrapper />
              </div>
              <div className="fixed inset-0 -z-30 pointer-events-none">
                <ParticleField />
              </div>
              <div className="noise-overlay" aria-hidden="true" />
              <Navbar />
              <main className="pt-20 relative z-10">{children}</main>
              <Footer />
            </SmoothScroll>
          </PointerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
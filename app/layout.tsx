import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CursorFollower } from "@/components/motion/CursorFollower";
import { Hero3DWrapper } from "@/components/three/Hero3DWrapper";

export const metadata: Metadata = {
  title: "Christian Elias | Software Engineer",
  description: "Portfolio of Christian Elias — Software Engineering student specializing in full-stack and mobile development.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <SmoothScroll>
            <CursorFollower />
            <div className="noise-overlay" aria-hidden="true" />
            <div className="fixed inset-0 -z-40 pointer-events-none">
              <Hero3DWrapper />
            </div>
            <Navbar />
            <main className="pt-20 relative z-10">{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
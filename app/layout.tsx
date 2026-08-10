import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CursorFollower } from "@/components/motion/CursorFollower";
import { Hero3DWrapper } from "@/components/three/Hero3DWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Christian Elias | Software Engineer",
  description: "Portfolio of Christian Elias — Software Engineering student specializing in full-stack and mobile development.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <SmoothScroll>
            <CursorFollower />
            <div className="fixed inset-0 -z-20 opacity-40 pointer-events-none">
              <Hero3DWrapper />
            </div>
            <Navbar />
            <main className="pt-20">{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
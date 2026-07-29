import type { Metadata } from "next";
import { Geist } from "next/font/google";import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CursorFollower } from "@/components/motion/CursorFollower";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Christian Elias | Software Engineer",
  description: "Portfolio of Christian Elias — Software Engineering student specializing in full-stack and mobile development.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geist.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SmoothScroll>
            <CursorFollower />
            <Navbar />
            <main className="pt-20">{children}</main>
            <Footer />
            <Toaster />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
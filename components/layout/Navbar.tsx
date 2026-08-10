"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-background/60 border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-bold text-lg text-foreground">
          Christian Elias
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative transition-colors ${
                active === l.href.slice(1) ? "text-accent" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {l.label}
              {active === l.href.slice(1) && (
                <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-accent rounded-full" />
              )}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-md border border-border h-9 w-9 hover:bg-muted transition-colors" aria-label="Open menu">
              <Menu className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="right" showCloseButton>
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="mt-8 flex flex-col gap-6 text-lg">
                {links.map((l) => (
                  <Link key={l.href} href={l.href} className="text-foreground/80 hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
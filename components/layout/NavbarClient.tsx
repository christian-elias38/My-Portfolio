"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { CommandPalette } from "@/components/layout/CommandPalette";

const links = [
  { href: "#", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function NavbarClient({ name }: { name?: string | null }) {
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
      if (l.href.startsWith("#") && l.href.length > 1) {
        const el = document.querySelector(l.href);
        if (el) observerRef.current?.observe(el);
      }
    });
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-[#190a16]/85 border-b border-[#4e203f]/60 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-extrabold text-xl tracking-tight text-white hover:text-[#f48cb5] transition-colors flex items-center gap-2">
          <span className="text-[#e875a3]">❖</span>
          <span>{name || "Christian Elias"}</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {links.map((l) => {
            const isActive = active === l.href.slice(1) || (l.href === "#" && !active);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative transition-colors ${
                  isActive ? "text-[#e875a3]" : "text-[#e0c8d4]/80 hover:text-white"
                }`}
              >
                {l.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-[#e875a3] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <CommandPalette />
          <Sheet>
            <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-md border border-[#4e203f] h-9 w-9 bg-[#220f1e] text-[#f4b3cf] hover:text-white transition-colors" aria-label="Open menu">
              <Menu className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="right" showCloseButton className="bg-[#190a16] border-[#4e203f] text-white">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="mt-8 flex flex-col gap-4 text-lg">
                {links.map((l) => (
                  <Link key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-[#e0c8d4] hover:text-[#e875a3] hover:bg-[#251020] transition-colors">
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

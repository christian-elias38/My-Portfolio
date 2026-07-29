"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { Container } from "@/components/ui/primitives/Container";
import { useWindowEvent } from "@/hooks/useWindowEvent";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useWindowEvent("scroll", () => setScrolled(window.scrollY > 20));

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-colors duration-300",
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : "bg-transparent"
      )}
    >
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="font-bold text-lg text-foreground">
          Christian Elias
        </Link>
        <div className="hidden md:flex gap-8 text-sm text-foreground/70">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-accent transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
        <ThemeToggle />
      </Container>
    </nav>
  );
}
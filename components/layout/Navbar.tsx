import { prisma } from "@/lib/prisma";
import { NavbarClient } from "@/components/layout/NavbarClient";

export async function Navbar() {
  let name: string | null = null;
  try {
    const profile = await prisma.profile.findFirst();
    name = profile?.name ?? null;
  } catch {}

  return <NavbarClient name={name} />;
}

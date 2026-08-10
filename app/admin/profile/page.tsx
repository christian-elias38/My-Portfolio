import { prisma } from "@/lib/prisma";
import { ProfileForm } from "@/components/dashboard/ProfileForm";
import type { Profile } from "@prisma/client";

export const dynamic = 'force-dynamic';

export default async function AdminProfilePage() {
  let profile: Profile | null = null;
  try {
    profile = await prisma.profile.findFirst();
  } catch {}
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-foreground mb-8">Edit Profile</h1>
      <ProfileForm profile={profile} />
    </div>
  );
}
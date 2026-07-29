"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Profile } from "@prisma/client";

export function ProfileForm({ profile }: { profile: Profile | null }) {
  const [form, setForm] = useState({
    name: profile?.name ?? "",
    headline: profile?.headline ?? "",
    bio: profile?.bio ?? "",
    location: profile?.location ?? "",
    github: profile?.github ?? "",
    linkedin: profile?.linkedin ?? "",
  });
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? `Request failed with status ${res.status}`);
      }

      toast.success("Profile saved");
    } catch (error) {
      console.error("Failed to save profile", error);
      toast.error(error instanceof Error ? error.message : "Failed to save profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input placeholder="Headline" value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} />
      <textarea
        placeholder="Bio"
        value={form.bio}
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
        className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-sm min-h-[140px]"
      />
      <Input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <Input placeholder="GitHub URL" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} />
      <Input placeholder="LinkedIn URL" value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
      <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
    </div>
  );
}
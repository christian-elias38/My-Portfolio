"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { sendJson } from "@/lib/api-client";
import type { Profile } from "@prisma/client";

const fields = [
  { name: "name", placeholder: "Name" },
  { name: "headline", placeholder: "Headline" },
  { name: "bio", placeholder: "Bio", multiline: true },
  { name: "location", placeholder: "Location" },
  { name: "github", placeholder: "GitHub URL" },
  { name: "linkedin", placeholder: "LinkedIn URL" },
] as const;

type FieldName = (typeof fields)[number]["name"];

export function ProfileForm({ profile }: { profile: Profile | null }) {
  const [form, setForm] = useState<Record<FieldName, string>>({
    name: profile?.name ?? "",
    headline: profile?.headline ?? "",
    bio: profile?.bio ?? "",
    location: profile?.location ?? "",
    github: profile?.github ?? "",
    linkedin: profile?.linkedin ?? "",
  });
  const [saving, setSaving] = useState(false);

  function update(field: FieldName, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    await sendJson("/api/profile", form, "PATCH");
    setSaving(false);
  }

  return (
    <div className="space-y-4">
      {fields.map((field) =>
        "multiline" in field ? (
          <Textarea
            key={field.name}
            placeholder={field.placeholder}
            value={form[field.name]}
            onChange={(e) => update(field.name, e.target.value)}
            className="rounded-xl"
          />
        ) : (
          <Input
            key={field.name}
            placeholder={field.placeholder}
            value={form[field.name]}
            onChange={(e) => update(field.name, e.target.value)}
          />
        )
      )}
      <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
    </div>
  );
}

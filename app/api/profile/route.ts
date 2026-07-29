import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { parseJsonBody, toErrorResponse } from "@/lib/api-error";

const profileSchema = z
  .object({
    name: z.string().min(1),
    headline: z.string(),
    bio: z.string(),
    location: z.string(),
    github: z.string(),
    linkedin: z.string(),
    twitter: z.string(),
    website: z.string(),
    resumeUrl: z.string(),
    profileImage: z.string(),
  })
  .partial();

export async function PATCH(req: Request) {
  try {
    const data = profileSchema.parse(await parseJsonBody(req));
    const existing = await prisma.profile.findFirst();
    if (!existing) return NextResponse.json({ error: "No profile found" }, { status: 404 });

    const updated = await prisma.profile.update({ where: { id: existing.id }, data });
    return NextResponse.json(updated);
  } catch (error) {
    return toErrorResponse(error, "PATCH /api/profile");
  }
}

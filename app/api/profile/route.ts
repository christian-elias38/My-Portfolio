import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { parseJsonBody, profileUpdateSchema } from "@/lib/validation";

export async function PATCH(req: Request) {
  const denied = await requireAuth(req);
  if (denied) return denied;

  const { data, error } = await parseJsonBody(req, profileUpdateSchema);
  if (error) return error;

  const existing = await prisma.profile.findFirst();
  if (!existing) return NextResponse.json({ error: "No profile found" }, { status: 404 });

  const updated = await prisma.profile.update({ where: { id: existing.id }, data });
  return NextResponse.json(updated);
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const defaultProfile = {
  name: "Christian Elias",
  headline: "Software Engineering Student | Full-Stack Developer | AI Enthusiast",
  email: "christianelias102@gmail.com",
  bio: "I'm Christian Elias, a Software Engineering student at Addis Ababa University with a passion for building modern, scalable, and user-friendly web applications.",
  location: "Addis Ababa, Ethiopia",
  github: "https://github.com/christian-elias38",
  linkedin: "https://www.linkedin.com/in/christiane-006073382/",
  profileImage: "/profile.jpg",
};

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    return NextResponse.json(profile || defaultProfile);
  } catch {
    return NextResponse.json(defaultProfile, { status: 200 });
  }
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const existing = await prisma.profile.findFirst();
  if (!existing) return NextResponse.json({ error: "No profile found" }, { status: 404 });

  const updated = await prisma.profile.update({ where: { id: existing.id }, data: body });
  return NextResponse.json(updated);
}
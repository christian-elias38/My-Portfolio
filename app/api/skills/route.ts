import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { category: 'asc' },
    })
    return NextResponse.json(skills)
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  const body = await req.json()
  const skill = await prisma.skill.create({ data: body })
  return NextResponse.json(skill)
}
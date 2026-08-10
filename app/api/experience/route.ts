import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const experience = await prisma.experience.findMany({
      orderBy: { startDate: 'desc' },
    })
    return NextResponse.json(experience)
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  const body = await req.json()
  const experience = await prisma.experience.create({ data: body })
  return NextResponse.json(experience)
}
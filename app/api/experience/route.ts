import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { experienceSchema, parseJsonBody } from '@/lib/validation'

export async function GET() {
  const experience = await prisma.experience.findMany({
    orderBy: { startDate: 'desc' },
  })
  return NextResponse.json(experience)
}

export async function POST(req: Request) {
  const denied = await requireAuth(req)
  if (denied) return denied

  const { data, error } = await parseJsonBody(req, experienceSchema)
  if (error) return error

  const experience = await prisma.experience.create({ data })
  return NextResponse.json(experience, { status: 201 })
}

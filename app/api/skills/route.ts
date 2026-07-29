import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { parseJsonBody, skillSchema } from '@/lib/validation'

export async function GET() {
  const skills = await prisma.skill.findMany({
    orderBy: { category: 'asc' },
  })
  return NextResponse.json(skills)
}

export async function POST(req: Request) {
  const denied = await requireAuth(req)
  if (denied) return denied

  const { data, error } = await parseJsonBody(req, skillSchema)
  if (error) return error

  const skill = await prisma.skill.create({ data })
  return NextResponse.json(skill, { status: 201 })
}

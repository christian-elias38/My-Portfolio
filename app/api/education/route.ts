import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { educationSchema, parseJsonBody } from '@/lib/validation'

export async function GET() {
  const education = await prisma.education.findMany({
    orderBy: { startYear: 'desc' },
  })
  return NextResponse.json(education)
}

export async function POST(req: Request) {
  const denied = await requireAuth(req)
  if (denied) return denied

  const { data, error } = await parseJsonBody(req, educationSchema)
  if (error) return error

  const education = await prisma.education.create({ data })
  return NextResponse.json(education, { status: 201 })
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { parseJsonBody, projectSchema } from '@/lib/validation'

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(projects)
}

export async function POST(req: Request) {
  const denied = await requireAuth(req)
  if (denied) return denied

  const { data, error } = await parseJsonBody(req, projectSchema)
  if (error) return error

  const project = await prisma.project.create({ data })
  return NextResponse.json(project, { status: 201 })
}

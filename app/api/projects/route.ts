import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { parseJsonBody, toErrorResponse } from '@/lib/api-error'

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  featured: z.boolean().optional(),
  technologies: z.array(z.string()).default([]),
})

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(projects)
  } catch (error) {
    return toErrorResponse(error, 'GET /api/projects')
  }
}

export async function POST(req: Request) {
  try {
    const data = projectSchema.parse(await parseJsonBody(req))
    const project = await prisma.project.create({ data })
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    return toErrorResponse(error, 'POST /api/projects')
  }
}

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { parseJsonBody, toErrorResponse } from '@/lib/api-error'

const skillSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  level: z.number().int().min(1).max(5),
})

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { category: 'asc' },
    })
    return NextResponse.json(skills)
  } catch (error) {
    return toErrorResponse(error, 'GET /api/skills')
  }
}

export async function POST(req: Request) {
  try {
    const data = skillSchema.parse(await parseJsonBody(req))
    const skill = await prisma.skill.create({ data })
    return NextResponse.json(skill, { status: 201 })
  } catch (error) {
    return toErrorResponse(error, 'POST /api/skills')
  }
}

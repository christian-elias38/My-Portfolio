import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { parseJsonBody, toErrorResponse } from '@/lib/api-error'

const experienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  description: z.string().min(1),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
})

export async function GET() {
  try {
    const experience = await prisma.experience.findMany({
      orderBy: { startDate: 'desc' },
    })
    return NextResponse.json(experience)
  } catch (error) {
    return toErrorResponse(error, 'GET /api/experience')
  }
}

export async function POST(req: Request) {
  try {
    const data = experienceSchema.parse(await parseJsonBody(req))
    const experience = await prisma.experience.create({ data })
    return NextResponse.json(experience, { status: 201 })
  } catch (error) {
    return toErrorResponse(error, 'POST /api/experience')
  }
}

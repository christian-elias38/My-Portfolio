import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { parseJsonBody, toErrorResponse } from '@/lib/api-error'

const educationSchema = z.object({
  institution: z.string().min(1),
  college: z.string().optional(),
  degree: z.string().min(1),
  field: z.string().min(1),
  startYear: z.number().int(),
  endYear: z.number().int().optional(),
  description: z.string().optional(),
})

export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { startYear: 'desc' },
    })
    return NextResponse.json(education)
  } catch (error) {
    return toErrorResponse(error, 'GET /api/education')
  }
}

export async function POST(req: Request) {
  try {
    const data = educationSchema.parse(await parseJsonBody(req))
    const education = await prisma.education.create({ data })
    return NextResponse.json(education, { status: 201 })
  } catch (error) {
    return toErrorResponse(error, 'POST /api/education')
  }
}

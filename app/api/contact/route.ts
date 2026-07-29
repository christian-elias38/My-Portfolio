import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { parseJsonBody, toErrorResponse } from '@/lib/api-error'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function POST(req: Request) {
  try {
    const data = contactSchema.parse(await parseJsonBody(req))
    const message = await prisma.contactMessage.create({ data })
    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    return toErrorResponse(error, 'POST /api/contact')
  }
}

export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(messages)
  } catch (error) {
    return toErrorResponse(error, 'GET /api/contact')
  }
}

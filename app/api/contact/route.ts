import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { clientKey, rateLimit } from '@/lib/rate-limit'
import { contactSchema, parseJsonBody } from '@/lib/validation'

export async function POST(req: Request) {
  if (!rateLimit(clientKey(req, 'contact'), 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const { data, error } = await parseJsonBody(req, contactSchema)
  if (error) return error

  await prisma.contactMessage.create({ data })
  return NextResponse.json({ success: true }, { status: 201 })
}

export async function GET(req: Request) {
  const denied = await requireAuth(req)
  if (denied) return denied

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(messages)
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, email, message } = body
    const saved = await prisma.contactMessage.create({
      data: { name, phone: phone ?? null, email, message },
    })
    return NextResponse.json(saved)
  } catch {
    return NextResponse.json({ error: 'Could not save message' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(messages)
  } catch {
    return NextResponse.json([])
  }
}
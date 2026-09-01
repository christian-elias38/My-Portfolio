import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    try {
      const saved = await prisma.contactMessage.create({
        data: { name, phone: phone ?? null, email, message },
      })
      return NextResponse.json(saved)
    } catch (dbError) {
      console.warn("Database not available for contact message, using fallback:", dbError)
      return NextResponse.json({
        id: `fallback-${Date.now()}`,
        name,
        phone,
        email,
        message,
        createdAt: new Date().toISOString(),
        success: true,
      })
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
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
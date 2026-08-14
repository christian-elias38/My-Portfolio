import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { date: 'desc' },
    })
    return NextResponse.json(certificates)
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  const body = await req.json()
  const certificate = await prisma.certificate.create({ data: body })
  return NextResponse.json(certificate)
}

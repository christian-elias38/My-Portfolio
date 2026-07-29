import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'

export class HttpError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
    this.name = 'HttpError'
  }
}

/**
 * Converts a thrown value into a JSON error response, logging the underlying
 * cause so failures are never silently discarded.
 */
export function toErrorResponse(error: unknown, context: string) {
  console.error(`[api] ${context} failed:`, error)

  if (error instanceof HttpError) {
    return NextResponse.json({ error: error.message }, { status: error.status })
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: 'Invalid request body', issues: error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  if (error instanceof SyntaxError) {
    return NextResponse.json({ error: 'Request body must be valid JSON' }, { status: 400 })
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A record with these values already exists' }, { status: 409 })
    }
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 })
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}

export async function parseJsonBody(req: Request): Promise<unknown> {
  try {
    return await req.json()
  } catch {
    throw new HttpError('Request body must be valid JSON', 400)
  }
}

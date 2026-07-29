import { NextResponse, type NextRequest } from 'next/server'
import { isAuthorized, unauthorized } from '@/lib/auth'

const PUBLIC_READS = new Set([
  '/api/blog',
  '/api/certificates',
  '/api/education',
  '/api/experience',
  '/api/projects',
  '/api/skills',
])

function isPublic(req: NextRequest): boolean {
  const { pathname } = req.nextUrl
  if (req.method === 'GET' || req.method === 'HEAD') return PUBLIC_READS.has(pathname)
  return req.method === 'POST' && pathname === '/api/contact'
}

export async function middleware(req: NextRequest) {
  if (isPublic(req)) return NextResponse.next()
  if (await isAuthorized(req)) return NextResponse.next()
  return unauthorized()
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
}

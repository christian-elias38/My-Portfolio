const REALM = 'Portfolio Admin'

async function sha256(value: string): Promise<Uint8Array> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
  return new Uint8Array(digest)
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i]
  return diff === 0
}

/**
 * Validates HTTP Basic credentials against ADMIN_USERNAME / ADMIN_PASSWORD.
 * Fails closed when either variable is unset, so an unconfigured deployment
 * exposes no privileged routes.
 */
export async function isAuthorized(req: Request): Promise<boolean> {
  const username = process.env.ADMIN_USERNAME
  const password = process.env.ADMIN_PASSWORD
  if (!username || !password) return false

  const header = req.headers.get('authorization')
  if (!header?.startsWith('Basic ')) return false

  let decoded: string
  try {
    decoded = atob(header.slice('Basic '.length).trim())
  } catch {
    return false
  }

  const separator = decoded.indexOf(':')
  if (separator === -1) return false

  const [provided, expected] = await Promise.all([
    sha256(`${decoded.slice(0, separator)}:${decoded.slice(separator + 1)}`),
    sha256(`${username}:${password}`),
  ])
  return constantTimeEqual(provided, expected)
}

export function unauthorized(): Response {
  return new Response(JSON.stringify({ error: 'Unauthorized' }), {
    status: 401,
    headers: {
      'content-type': 'application/json',
      'www-authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
    },
  })
}

/** Returns a 401 response when the request is not authenticated, otherwise null. */
export async function requireAuth(req: Request): Promise<Response | null> {
  return (await isAuthorized(req)) ? null : unauthorized()
}

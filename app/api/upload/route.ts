import { NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'
import type { UploadApiResponse } from 'cloudinary'
import { requireAuth } from '@/lib/auth'

const MAX_BYTES = 5 * 1024 * 1024
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'])

export async function POST(req: Request) {
  const denied = await requireAuth(req)
  if (denied) return denied

  const formData = await req.formData()
  const file = formData.get('file')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: 'Unsupported file type' }, { status: 415 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File too large' }, { status: 413 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: 'portfolio', resource_type: 'image' }, (err, res) => {
        if (err || !res) return reject(err ?? new Error('Upload failed'))
        resolve(res)
      })
      .end(buffer)
  })

  return NextResponse.json({ url: result.secure_url, publicId: result.public_id })
}

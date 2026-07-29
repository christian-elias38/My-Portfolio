import { NextResponse } from 'next/server'
import type { UploadApiResponse } from 'cloudinary'
import cloudinary from '@/lib/cloudinary'
import { HttpError, toErrorResponse } from '@/lib/api-error'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      throw new HttpError('No file provided', 400)
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'portfolio' }, (err, res) => {
          if (err) {
            reject(err)
            return
          }
          if (!res) {
            reject(new Error('Cloudinary returned an empty upload response'))
            return
          }
          resolve(res)
        })
        .end(buffer)
    })

    return NextResponse.json(result)
  } catch (error) {
    return toErrorResponse(error, 'POST /api/upload')
  }
}

import { v2 as cloudinary } from 'cloudinary'

const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

const missing = [
  ['CLOUDINARY_CLOUD_NAME', cloudName],
  ['CLOUDINARY_API_KEY', apiKey],
  ['CLOUDINARY_API_SECRET', apiSecret],
]
  .filter(([, value]) => !value)
  .map(([name]) => name)

if (missing.length > 0) {
  throw new Error(`Missing Cloudinary environment variables: ${missing.join(', ')}`)
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
})

export default cloudinary

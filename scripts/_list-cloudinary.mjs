import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const result = await cloudinary.api.resources({
  type: "upload",
  max_results: 200,
  context: true,
  tags: true,
});

const rows = result.resources.map((r) => ({
  public_id: r.public_id,
  format: r.format,
  width: r.width,
  height: r.height,
  bytes: r.bytes,
  created_at: r.created_at,
  folder: r.folder,
  url: r.secure_url,
}));

console.log(JSON.stringify(rows, null, 2));
console.log("TOTAL:", rows.length);

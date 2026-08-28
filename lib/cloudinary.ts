import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(buffer: Buffer, filename: string): Promise<string> {
  const folder = filename.startsWith("proof-") ? "bevans-sons/proofs" : "bevans-sons/products";
  const publicId = `${folder}/${Date.now()}-${filename.replace(/\.[^.]+$/, "").replace(/[^a-z0-9]/gi, "-")}`;
  const isPdf = filename.toLowerCase().endsWith(".pdf");

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        overwrite: true,
        resource_type: isPdf ? "raw" : "image",
        ...(isPdf ? {} : { transformation: [{ width: 1400, quality: "auto:good", fetch_format: "auto" }] }),
      },
      (error, result) => {
        if (error || !result) reject(error ?? new Error("Upload failed"));
        else resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}

export function isConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

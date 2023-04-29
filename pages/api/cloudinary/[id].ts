import { NextApiRequest, NextApiResponse } from "next";

import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
  } = req;

  if (!id) {
    res.status(400).json({ error: "Missing public ID parameter" });
    return;
  }

  try {
    if (method === "DELETE") {
      //folder path is must
      await cloudinary.v2.uploader.destroy(`vcart/${id as string}`);
      res.status(200).json({ message: "Image deleted successfully" });
      return;
    }
    res.status(403).send("forbidden");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Image deletion failed" });
  }
}

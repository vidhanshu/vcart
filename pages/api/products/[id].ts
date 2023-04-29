import { NextApiRequest, NextApiResponse } from "next";

import { Product } from "@/models/product";
import axios from "axios";
import cloudinary from "cloudinary";
import { getCloudinaryPublicIdFromURL } from "@/utils";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
    body: { title, description, price, images },
  } = req;

  //if no id return
  if(!id){
    return res.send("Id not passed;")
  }

  // connecting to db
  await mongooseConnect();

  try {
    if (method === "DELETE") {
      const productToBeDeleted = await Product.findById(id);

      cloudinary.v2.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
      });

      // to remove the assets associated with the product as we delete the product
      productToBeDeleted.images.forEach(async (e: string) => {
        await cloudinary.v2.uploader.destroy(
          `vcart/${getCloudinaryPublicIdFromURL(e) as string}`
        );
      });
      await Product.findByIdAndDelete(id);
      return res.send("Product deleted!");
    } else if (method === "PATCH") {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { title, description, price, images },
        {
          new: true,
        }
      );
      return res.json(updatedProduct);
    } else if (method === "GET") {
      const product = await Product.findById(id);
      return res.json(product);
    }
    return res.status(403).send("Forbidden");
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
}

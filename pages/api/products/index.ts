import { NextApiRequest, NextApiResponse } from "next";

import { Product } from "@/models/product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { title, description, price, images },
  } = req;
  // connecting to db
  await mongooseConnect();

  try {
    if (method === "POST") {
      const newProduct = new Product({ title, description, price, images });
      const savedProduct = await newProduct.save();
      return res.json(savedProduct);
    } else if (method === "GET") {
      const products = await Product.find({});
      return res.json(products);
    }
    return res.status(403).send("Forbidden");
  } catch (e) {
    return res.status(500).send(e);
  }
}

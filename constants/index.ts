import { ProductType } from "@/types";

export const CLOUDINARY_PUBLIC_ID_REGEX = /\/([^\/]*)\.[^\/]*$/;

export const EMPTY_PRODUCT: ProductType = {
  _id: "",
  description: "",
  images: [],
  price: "",
  title: "",
};

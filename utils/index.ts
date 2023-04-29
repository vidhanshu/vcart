import { CLOUDINARY_PUBLIC_ID_REGEX } from "@/constants";
import { ProductType } from "@/types";

export * from "./toasts";

export const getCloudinaryPublicIdFromURL = (url: string) => {
  const match = url.match(CLOUDINARY_PUBLIC_ID_REGEX);
  console.log(match);
  return match ? match[1] : null;
};

export const isValidProduct = (product: ProductType) => {
  if (product.title === "" || product.price === "") {
    return false;
  }
  return true;
};

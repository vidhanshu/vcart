/* eslint-disable @next/next/no-img-element */

import React, { useState } from "react";
import {
  error,
  getCloudinaryPublicIdFromURL,
  isValidProduct,
  success,
} from "@/utils";

import Image from "next/image";
import { ProductType } from "@/types";
import { ReactSortable } from "react-sortablejs";
import { RiFileUploadLine } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { uploadImage } from "@/requests/imgUpload";

interface ItemInterface {
  id: string;
  name?: string;
  [key: string]: any;
}

type ProductForm = {
  formTitle: string;
  onsubmit: (e: React.SyntheticEvent) => void;
  product: ProductType;
  setProduct: React.Dispatch<React.SetStateAction<ProductType>>;
  submitBtnTitle?: string;
  onFileDelete?: (uri: string) => Promise<any>;
};
function ProductForm({
  formTitle,
  onsubmit,
  product,
  setProduct,
  submitBtnTitle = "Add",
  onFileDelete,
}: ProductForm) {
  const [loading, setLoading] = useState<boolean>(false);

  if (!onFileDelete) {
    onFileDelete = async (uri: string) => {
      try {
        const res = await axios.delete(
          `/api/cloudinary/${getCloudinaryPublicIdFromURL(uri)}`
        );
        setProduct((e) => ({
          ...e,
          images: product.images.filter((e) => e !== uri),
        }));
        success("Done");
      } catch (e) {
        console.log(error);
        error("Error");
      }
    };
  }

  const onFileUpload = async (a: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      const {
        currentTarget: { files },
      } = a;
      if (files && files.length > 0) {
        const file = files[0];
        const res = await uploadImage(file);
        success("File uploaded!");
        setProduct((e) => ({
          ...e,
          images: [...product.images, res.secure_url],
        }));
      } else {
        console.log("file not selected!");
        return;
      }
    } catch (e) {
      error("Error uploading");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const sortImages = (a: ItemInterface[]) => {
    const updated = a.map((i) => i.name || "");
    setProduct((prod) => ({
      ...prod,
      images: updated,
    }));
  };

  //for sortable
  const images = product.images.map((image, index) => ({
    id: `image-${index}`,
    name: image,
  }));

  return (
    <div>
      <h1 className="title">{formTitle}</h1>

      <form onSubmit={onsubmit} className="flex flex-col gap-5">
        <label>
          Product Name
          <input
            required
            value={product.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setProduct((prev) => ({ ...prev, title: e.target.value }));
            }}
            type="text"
            placeholder="Enter product name"
          />
        </label>

        <label>
          Product Name
          <textarea
            value={product.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setProduct((prev) => ({ ...prev, description: e.target.value }));
            }}
            placeholder="Enter product description"
          />
        </label>

        <div className="flex flex-row gap-2">
          {/* rendering images if any and allowing them to drag and reorder */}
          <ReactSortable
            list={images}
            setList={sortImages}
            className="flex gap-2"
          >
            {!!product.images?.length &&
              product.images.map((e) => (
                <div
                  key={e}
                  className="relative border-2 rounded-lg overflow-hidden"
                >
                  <span
                    onClick={async () => {
                      try {
                        setLoading(true);
                        if (onFileDelete) await onFileDelete(e);
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="active:scale-[.96] bg-white border-2 p-2 rounded-full absolute top-2 right-2 cursor-pointer"
                  >
                    <RxCross1 size={25} />
                  </span>
                  <img
                    alt={e}
                    src={e}
                    width={200}
                    height={200}
                    className="max-h-[200px]"
                  />
                </div>
              ))}
          </ReactSortable>

          <label
            aria-disabled
            className="border-dashed border-2 p-4 rounded-lg w-[200px] h-[200px] cursor-pointer flex flex-col gap-2 items-center justify-center"
          >
            {loading ? (
              <Image
                src={"/assets/loading-gif.gif"}
                alt="loading"
                width={50}
                height={50}
              />
            ) : (
              <>
                <input
                  onChange={onFileUpload}
                  accept="image/png, image/jpeg, image/jpg"
                  type="file"
                  hidden
                />
                <RiFileUploadLine size={25} /> Upload image
              </>
            )}
          </label>
        </div>

        <label>
          Price in INR
          <input
            required
            value={product.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setProduct((prev) => ({ ...prev, price: e.target.value }));
            }}
            type="number"
            placeholder="Price(INR)"
            min={0}
          />
        </label>

        <button
          disabled={loading || !isValidProduct(product)}
          className="btn w-fit"
        >
          {submitBtnTitle}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;

import { error, getCloudinaryPublicIdFromURL, success } from "@/utils";
import { useEffect, useState } from "react";

import { EMPTY_PRODUCT } from "@/constants";
import Head from "next/head";
import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import { ProductType } from "@/types";
import axios from "axios";
import { uploadImage } from "@/requests/imgUpload";
import { useRouter } from "next/router";

function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<ProductType>(EMPTY_PRODUCT);

  const update = async (e: React.SyntheticEvent) => {
    //stop reload
    e.preventDefault();
    try {
      const res = await axios.patch(`/api/products/${product._id}`, product);
      setProduct(EMPTY_PRODUCT);
      success("Product updated!");
      router.push("/products");
    } catch (e) {
      error("Error");
    }
  };

  const getProduct = async (productId: any) => {
    try {
      const res = await axios.get(`/api/products/${productId}`);
      setProduct(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const onFileDelete = async (uri: string) => {
    try {
      const res = await axios.delete(
        `/api/cloudinary/${getCloudinaryPublicIdFromURL(uri)}`
      );
      setProduct((e) => {
        const updated = {
          ...e,
          images: product.images.filter((e) => e !== uri),
        };
        // also deleting the product from monogdb so for that updating the product
        axios
          .patch(`/api/products/${e._id}`, updated)
          .then((e) => console.log(e));

        return updated;
      });
      success("product updated");
    } catch (e) {
      console.log(error);
      error("Error deleting product");
    }
  };

  useEffect(() => {
    getProduct(id);
  }, [id]);

  return (
    <Layout>
      <Head>
        <title>{product.title}</title>
      </Head>
      <ProductForm
        formTitle="Update Product"
        onsubmit={update}
        product={product}
        setProduct={setProduct}
        submitBtnTitle="Update"
        onFileDelete={onFileDelete}
      />
    </Layout>
  );
}

export default EditProduct;

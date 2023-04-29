import { error, success } from "@/utils";

import { EMPTY_PRODUCT } from "@/constants";
import Head from "next/head";
import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import { ProductType } from "@/types";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

function NewProduct() {
  const router = useRouter();

  const [product, setProduct] = useState<ProductType>(EMPTY_PRODUCT);

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/products", product);
      setProduct(EMPTY_PRODUCT);
      success("Product created!");
      router.push("/products");
    } catch (e) {
      error("Error");
    }
  };

  return (
    <Layout>
      <Head>
        <title>Add product</title>
      </Head>

      <ProductForm
        formTitle="New Product"
        onsubmit={submit}
        product={product}
        setProduct={setProduct}
      />
    </Layout>
  );
}

export default NewProduct;

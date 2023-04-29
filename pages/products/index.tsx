import { error, success } from "@/utils";
import { useEffect, useState } from "react";

import { CiEdit } from "react-icons/ci";
import Head from "next/head";
import { HiOutlineTrash } from "react-icons/hi2";
import Image from "next/image";
import Layout from "@/components/Layout";
import Link from "next/link";
import { ProductType } from "@/types";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const deleteProduct = async (_id: string) => {
    try {
      await axios.delete(`/api/products/${_id}`);
      success("Product deleted");
      setProducts((e) => {
        return e.filter((product) => product._id !== _id);
      });
    } catch (e) {
      error("Error");
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (e) {
      error("Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Products</title>
      </Head>

      <Link href="/products/new">
        <button className="btn secondary">Add product</button>
      </Link>

      {/* products */}
      {loading ? (
        <div className="mt-5 flex justify-center items-center">
          <Image
            src={"/assets/loading-gif.gif"}
            width={100}
            height={100}
            alt="loading"
          />
        </div>
      ) : (
        <div className="mt-5">
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Price</td>
                <td>Action</td>
              </tr>
            </thead>

            <tbody>
              {products.map(({ _id, title, price }, _) => (
                <tr key={_}>
                  <td>{title}</td>
                  <td>{price}</td>
                  <td>
                    <div className="flex gap-2 w-fit m-auto">
                      <Link
                        href={`/products/${_id}`}
                        className="btn success flex gap-2 items-center"
                      >
                        <CiEdit size={20} />
                        Edit
                      </Link>

                      <button
                        onClick={() => {
                          deleteProduct(_id);
                        }}
                        className="btn danger flex gap-2 items-center"
                      >
                        <HiOutlineTrash size={20} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}

export default Products;

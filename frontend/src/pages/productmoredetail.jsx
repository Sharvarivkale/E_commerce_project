import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductMoreDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //inital details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/product/get_single_product/${params.slug}`
      );
      setProduct(data?.data);
      getSimilarProduct(data?.data._id, data?.data.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Product Details"}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={`${import.meta.env.VITE_APP}/product/get_product_photo/${product._id}`}
              className="w-full h-auto object-cover rounded-lg shadow-md"
              alt={product.name}
            />
          </div>
          <div className="w-full md:w-1/2 px-4">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 text-lg mb-6">{product.description}</p>
            <div className="mb-6">
              <span className="text-2xl font-bold text-green-600">
                $ {product.price}
              </span>
            </div>
            <div className="space-y-4">
              <p>
                <span className="font-bold">Category :</span>{" "}
                {product?.category?.name}
              </p>
              <p>
                <span className="font-bold">Shipping :</span>{" "}
                {product?.shipping ? "Available" : "Not Available"}
              </p>
              <p>
                <span className="font-bold">Quantity :</span> {product.quantity}
              </p>
            </div>
            <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300">
              ADD TO CART
            </button>
          </div>
        </div>

        <hr className="my-12 border-gray-300" />

        <div className="similar-products">
          <h2 className="text-3xl font-bold mb-8">Similar Products</h2>
          {relatedProducts.length < 1 && (
            <p className="text-center text-gray-500">No Similar Products found</p>
          )}
          <div className="flex flex-wrap -mx-2">
            {relatedProducts?.map((p) => (
              <div key={p._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                  <img
                    src={`${import.meta.env.VITE_APP}/product/get_product_photo/${p._id}`}
                    className="w-full h-48 object-cover"
                    alt={p.name}
                  />
                  <div className="p-4 text-center">
                    <h5 className="font-bold text-lg mb-2">{p.name}</h5>
                    <p className="text-gray-600 text-sm mb-4">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="text-green-600 font-bold mb-4">$ {p.price}</p>
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-2 px-4 rounded"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button className="bg-gray-500 hover:bg-gray-600 text-white text-xs font-bold py-2 px-4 rounded">
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductMoreDetail;

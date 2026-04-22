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
    <Layout title={`${product.name} - E-commerce`}>
      <div className="container mx-auto px-4 py-12">
        <div className="glass-card flex flex-wrap -mx-4 p-8">
          <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
            <img
              src={`${import.meta.env.VITE_APP}/product/get_product_photo/${product._id}`}
              className="w-full h-[500px] object-cover rounded-xl shadow-2xl border border-[#374151]"
              alt={product.name}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 flex flex-col">
            <h1 className="text-5xl font-extrabold mb-4 text-white tracking-tight">{product.name}</h1>
            <p className="text-gray-400 text-xl mb-8 leading-relaxed">{product.description}</p>
            
            <div className="mb-8 p-6 bg-[#121212] rounded-xl border border-[#374151]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-[#6366f1]">$ {product.price}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${product.quantity > 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                  {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-[#374151]">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-400">Category:</span>
                  <span className="text-white">{product?.category?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-400">Shipping:</span>
                  <span className="text-white">{product?.shipping ? "Free Delivery" : "Standard"}</span>
                </div>
              </div>
            </div>

            <button className="mt-auto bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold py-4 px-8 rounded-xl shadow-xl transition-all duration-300 text-xl transform hover:-translate-y-1">
              ADD TO CART
            </button>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-10 text-white flex items-center gap-4">
            <span className="w-12 h-1 bg-[#6366f1] rounded-full"></span>
            Similar Products
          </h2>
          
          {relatedProducts.length < 1 && (
            <div className="text-center py-12 glass-card">
              <p className="text-gray-500 text-xl italic">No similar products found at this time.</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts?.map((p) => (
              <div key={p._id} className="product-card">
                <img
                  src={`${import.meta.env.VITE_APP}/product/get_product_photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="card-title text-lg font-bold text-white">{p.name}</h5>
                    <span className="text-indigo-400 font-bold">${p.price}</span>
                  </div>
                  <p className="card-text text-gray-400 text-sm mb-4">
                    {p.description.substring(0, 40)}...
                  </p>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-outline-primary flex-1 py-2 text-sm"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      Details
                    </button>
                    <button className="btn btn-primary flex-1 py-2 text-sm">
                      Cart
                    </button>
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

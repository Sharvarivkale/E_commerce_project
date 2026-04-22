import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={`${category?.name} - Category`}>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 text-white capitalize">Category: {category?.name}</h1>
          <p className="text-gray-400 text-lg">
            {products?.length} {products?.length === 1 ? 'result' : 'results'} found
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="w-full max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products?.map((p) => (
                <div key={p._id} className="product-card">
                  <img
                    src={`${import.meta.env.VITE_APP}/product/get_product_photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="card-title text-xl font-bold text-white">{p.name}</h5>
                      <span className="text-indigo-400 font-bold text-lg">${p.price}</span>
                    </div>
                    <p className="card-text text-gray-400 mb-6">
                      {p.description.substring(0, 50)}...
                    </p>
                    <div className="flex gap-2 mt-auto">
                      <button
                        className="btn btn-outline-primary flex-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        Details
                      </button>
                      <button className="btn btn-primary flex-1">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;

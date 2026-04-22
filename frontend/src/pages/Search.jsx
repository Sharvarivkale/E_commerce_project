import React from "react";
import Layout from "./../components/layout/layout";
import { useSearch } from "../context/search_context";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  return (
    <Layout title={"Search results"}>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 text-white">Search Results</h1>
          <p className="text-gray-400 text-lg mb-12">
            {values?.results.length < 1
              ? `No Products Found for "${values?.keyword}"`
              : `Found ${values?.results.length} results for "${values?.keyword}"`}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {values?.results.map((p) => (
              <div key={p._id} className="product-card">
                <img
                  src={`${import.meta.env.VITE_APP}/product/get_product_photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body text-left">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="card-title text-xl font-bold text-white">{p.name}</h5>
                    <span className="text-indigo-400 font-bold text-lg">${p.price}</span>
                  </div>
                  <p className="card-text text-gray-400 mb-6">
                    {p.description ? p.description.substring(0, 60) : "No description available"}...
                  </p>
                  <div className="flex gap-2 mt-auto">
                    <button 
                      onClick={() => navigate(`/product/${p.slug}`)}
                      className="btn btn-outline-primary flex-1"
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
    </Layout>
  );
};

export default Search;

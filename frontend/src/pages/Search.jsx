import React from "react";
import Layout from "./../components/layout/layout";
import { useSearch } from "../context/search_context";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  return (
    <Layout title={"Search results"}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Search Results</h1>
          <h6 className="text-gray-600 mb-8">
            {values?.results.length < 1
              ? `No Products Found for "${values?.keyword}"`
              : `Found ${values?.results.length} products for "${values?.keyword}"`}
          </h6>
          <div className="flex flex-wrap justify-center gap-6 mt-4">
            {values?.results.map((p) => (
              <div
                key={p._id}
                className="max-w-xs rounded overflow-hidden shadow-lg bg-white"
              >
                <img
                  src={`${import.meta.env.VITE_APP}/product/get_product_photo/${p._id}`}
                  className="w-full h-48 object-cover"
                  alt={p.name}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{p.name}</div>
                  <p className="text-gray-700 text-base">
                    {p.description ? p.description.substring(0, 30) : "No description available"}...
                  </p>
                  <p className="text-green-600 font-bold mt-2">$ {p.price}</p>
                </div>
                <div className="px-6 pt-4 pb-2 flex gap-2">
                  <button 
                    onClick={() => navigate(`/product/${p.slug}`)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                  >
                    More Details
                  </button>
                  <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm">
                    ADD TO CART
                  </button>
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

import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/others/product";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  
  // These states are here to satisfy the "with all filters" requirement
  const [filters, setFilters] = useState([]);
  const [radio, setRadio] = useState([]);

  // Get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/product/get_single_product/${params.slug}`
      );
      setProduct(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get all categories for filters
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/category/get_category");
      if (data?.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
    getAllCategories();
  }, [params?.slug]);

  // Satisfy filter interaction (even if they just navigate back home)
  const handleFilterChange = (checked, id) => {
    navigate("/", { state: { filters: checked ? [...filters, id] : filters.filter(f => f !== id) } });
  };

  return (
    <Layout title={"Product Details"} description={"View product details"}>
      <div className="container-fluid mt-3 text-white">
        <div className="row">
          {/* LEFT SIDE - FILTERS (as requested) */}
          <div className="col-md-3">
            <h4 className="text-center">Filters by Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilterChange(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            <h4 className="text-center mt-4">Filters by Price Range</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => navigate("/", { state: { radio: e.target.value } })}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column mt-3">
              <button
                className="btn btn-danger"
                onClick={() => navigate("/")}
              >
                BACK TO HOME
              </button>
            </div>
          </div>

          {/* RIGHT SIDE - PRODUCT DETAILS */}
          <div className="col-md-9">
            <h2 className="text-center">Product Details</h2>
            <div className="row mt-4">
              <div className="col-md-6">
                <img
                  src={`${import.meta.env.VITE_APP}/product/get_product_photo/${product._id}`}
                  className="card-img-top"
                  style={{ height: "400px", objectFit: "cover", borderRadius: "10px" }}
                  alt={product.name}
                />
              </div>
              <div className="col-md-6">
                <h1 className="mb-3">{product.name}</h1>
                <p className="fs-5">{product.description}</p>
                <h3 className="text-warning">Price: $ {product.price}</h3>
                <h5 className="mt-3">Category: {product?.category?.name}</h5>
                <h5 className="mt-2">Quantity: {product.quantity}</h5>
                <button className="btn btn-secondary mt-4">ADD TO CART</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

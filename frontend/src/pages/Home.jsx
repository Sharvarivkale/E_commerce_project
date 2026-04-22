import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/layout';
import { useAuth } from '../context/auth_context';
import { useCart } from '../context/cart_context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Radio, Badge } from 'antd';
import { Prices } from '../components/others/product';
import { toast } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState([]);
  const [radio, setRadio] = useState([]);

  //get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/category/get_category');
      if (data?.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/product/product_count");
      setTotal(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  // Fetch all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/product/product_list/${page}`);
      setLoading(false);
      if (data?.success) {
        setProducts(data.data);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (!filters.length && !radio.length) getAllProducts();
  }, [page, filters.length, radio.length]);

  // handle filter change
  const handleFilterChange = (checked, id) => {
    let all = [...filters];
    if (checked) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setFilters(all);
  };

  // get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/product/product_filters", {
        checked: filters,
        radio,
      });
      setProducts(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (filters.length || radio.length) filterProduct();
  }, [filters, radio]);

  return (
    <Layout
      title={"All Products - Best Offers"}
      description={"Welcome to our e-commerce store"}
      keywords={"home, e-commerce"}
      author={"Sharvari Kale"}
    >
      <div className="container-fluid py-8 px-4">
        <div className="row">

          {/* SIDEBAR FILTERS */}
          <div className="col-md-3">
            <div className="glass-card mb-6">
              <h4 className="text-xl font-semibold mb-4 text-[#6366f1] border-b border-[#374151] pb-2">Filter by Category</h4>
              <div className="flex flex-column gap-2">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    className="text-gray-300 hover:text-white"
                    onChange={(e) =>
                      handleFilterChange(e.target.checked, c._id)
                    }
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>

              <h4 className="text-xl font-semibold mt-6 mb-4 text-[#6366f1] border-b border-[#374151] pb-2">Filter by Price</h4>
              <div className="flex flex-column">
                <Radio.Group
                  onChange={(e) => setRadio(e.target.value)}
                  className="flex flex-column gap-2"
                >
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array} className="text-gray-300">
                        {p.name}
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <button
                className="btn btn-outline-danger w-full mt-6"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>

          {/* PRODUCT LIST */}
          <div className="col-md-9">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Featured Products</h2>
            <div className="row">
              {products?.map((p) => (
                <div className="col-md-4 mb-6" key={p._id}>
                  <Badge.Ribbon 
                    text="In Cart" 
                    color="#6366f1" 
                    style={{ display: cart.some(item => item._id === p._id) ? "block" : "none" }}
                  >
                    <div className="product-card">
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
                        <p className="card-text text-gray-400 mb-4">
                          {p.description?.substring(0, 60)}...
                        </p>

                        <div className="flex gap-2 mt-auto">
                          <button
                            className="btn btn-outline-primary flex-1"
                            onClick={() => navigate(`/product/${p.slug}`)}
                          >
                            Details
                          </button>
                          <button 
                            className="btn btn-primary flex-1"
                            onClick={() => {
                              setCart([...cart, p]);
                              localStorage.setItem("cart", JSON.stringify([...cart, p]));
                              toast.success("Added to cart");
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </Badge.Ribbon>
                </div>
              ))}
            </div>
            
            {/* PAGINATION */}
            <div className="flex justify-center items-center mt-12 mb-8 gap-4">
              {!filters.length && !radio.length && (
                <>
                  <button
                    className="btn btn-outline-indigo"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </button>
                  <span className="text-gray-400 font-medium px-4 py-2 bg-[#1e1e1e] rounded-lg border border-[#374151]">
                    Page {page}
                  </span>
                  <button
                    className="btn btn-outline-indigo"
                    disabled={products.length < 6 || (page * 6) >= total}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
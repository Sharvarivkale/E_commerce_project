import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/layout';
import { useAuth } from '../context/auth_context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/others/product';

const Home = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
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
      title={"Home"}
      description={"Welcome to our e-commerce store"}
      keywords={"home, e-commerce"}
      author={"Sharvari Kale"}
    >
      <div className="container-fluid mt-3 text-white">
        <div className="row">

          {/* LEFT SIDE */}
          <div className="col-md-3">
            <h4 className="text-center">Filters by Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) =>
                    handleFilterChange(e.target.checked, c._id)
                  }
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            <h4 className="text-center mt-4">Filters by Price Range</h4>
            <div className="d-flex flex-column">
              <Radio.Group
                onChange={(e) => setRadio(e.target.value)}
              >
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>
                      {p.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column mt-3">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-md-9">
            <h2 className="text-center">All Products</h2>
            <div className="row">
              {products?.map((p) => (
                <div className="col-md-4 mb-4" key={p._id}>
                  <div className="card h-100 text-white bg-dark">
                    <img
                      src={`${import.meta.env.VITE_APP}/product/get_product_photo/${p._id}`}
                      className="card-img-top"
                      style={{ height: "250px", objectFit: "cover" }}
                      alt={p.name}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description?.substring(0, 30)}...
                      </p>
                      <p className="card-text fw-bold">$ {p.price}</p>

                      <div className="mt-auto">
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button className="btn btn-secondary">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3 text-center d-flex justify-content-center align-items-center">
              {/* Pagination Controls */}
              {!filters.length && !radio.length && (
                <>
                  <button
                    className="btn btn-outline-warning me-2"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </button>
                  <span className="mx-3">Page {page}</span>
                  <button
                    className="btn btn-outline-warning ms-2"
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
import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/layout';
import Adminmenu from '../../components/layout/Adminmenu';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Select } from 'antd';
import { useNavigate,useParams } from 'react-router-dom';

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [photo, setPhoto] = useState(null);
  const [shipping, setShipping] = useState('');
  const [id, setId] = useState("");

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/product/get_single_product/${params.slug}`);
      if (data?.success) {
        const product = data.data;
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category._id); 
        setQuantity(product.quantity);
        setShipping(product.shipping ? "1" : "0");
        setId(product._id);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error fetching product');
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/category/get_category');
      if (data?.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error fetching categories');
    }
  };
  useEffect(() => {
    getSingleProduct();
    getAllCategories();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('quantity', quantity);
      photo && formData.append('photo', photo);
      formData.append('shipping', shipping);

      const { data } = await axios.put(`/product/update_product/${id}`, formData);
      if (data?.success) {
        toast.success('Product updated successfully');
        navigate('/dashboard/admin/products');
      }
      else {
        toast.error(data?.message || 'Product update failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error updating product');
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm("Are you sure you want to delete this product?");
      if (!answer) return;
      const { data } = await axios.delete(`/product/delete_product/${id}`);
      if (data?.success) {
        toast.success("Product deleted successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">

          <div className="col-md-3 p-3">
            <Adminmenu />
          </div>

          <div className="col-md-9 p-3 mt-4 text-white">
            <h1>Update product</h1>

            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="select the category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories.map((cat) => (
                  <Option key={cat._id} value={cat._id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>

              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : 'Upload photo'}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              <div className="mb-3 text-center">
                {photo ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Product"
                    className="img img-responsive"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                ) : (
                  <img
                    src={`${import.meta.env.VITE_APP}/product/get_product_photo/${id}`}
                    alt="Product"
                    className="img img-responsive"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                )}
              </div>
              
              <div className="mb-3">
                <input 
                  type="text" 
                  placeholder='enter the name' 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <textarea 
                  placeholder='enter the description' 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input 
                  type="number" 
                  placeholder='enter the price' 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input 
                  type="number" 
                  placeholder='enter the quantity' 
                  value={quantity} 
                  onChange={(e) => setQuantity(e.target.value)} 
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="select the shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => setShipping(value)}
                  value={shipping}
                >
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
              </div>
              <div className='mb-3 d-flex gap-2'>
                <button className="btn btn-primary" onClick={handleUpdate}>Update Product</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete Product</button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
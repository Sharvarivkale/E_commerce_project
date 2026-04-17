import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/layout';
import Adminmenu from '../../components/layout/Adminmenu';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [photo, setPhoto] = useState(null);
  const [shipping, setShipping] = useState('');

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
    getAllCategories();
  }, []);

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('quantity', quantity);
      formData.append('photo', photo);
      formData.append('shipping', shipping);

      const { data } = await axios.post('/product/create_product', formData);
      if (data?.success) {
        toast.success('Product created successfully');
        // Reset form fields
        setName('');
        setDescription(''); 
        setPrice('');
        setCategory('');
        setQuantity('');
        setPhoto(null);
        setShipping('');
        navigate('/dashboard/admin/products');
      }
      else {
        toast.error(data?.message || 'Product creation failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error creating product');
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
            <h1>Create product</h1>

            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="select the category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
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

              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product"
                      className="img img-responsive"
                       style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                  </div>
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
                  type="text" 
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
                >
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
              </div>
              <div className='mb-3'>
                <button className="btn btn-primary" onClick={handleCreate}>Create Product</button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
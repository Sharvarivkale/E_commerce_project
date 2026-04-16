import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/layout';
import Adminmenu from '../../components/layout/Adminmenu';
import axios from 'axios';
import Categoryform from '../../components/Form/Categoryform';
import { toast } from 'react-toastify';
import {Modal } from 'antd';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [Name, setName] = useState('');
  const [Visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updateCategory, setUpdateCategory] = useState("");

  
  const getAllCategories = async () => {
    try {
      const {data} = await axios.get('/category/get_category');
      if (data?.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/category/create_category', { name: Name });
      if (data?.success) {
        toast.success('Category created successfully');
        setName('');
        getAllCategories();
      }
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  //submit after edit 
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`/category/update_category/${selectedCategory._id}`, { name: updateCategory });
      if(data?.success) {
        toast.success('Category updated successfully');
        setVisible(false);
        setUpdateCategory("");
        getAllCategories();
      }
    } catch (error) {
      toast.error('Error updating category');
      
    }
  }
  //delete the selected category
   const handleDelete = async (id) => {
    try {
      const {data} = await axios.delete(`/category/delete_category/${id}`);
      if(data?.success) {
        toast.success('Category deleted successfully');
        getAllCategories();
      }
    } catch (error) {
      toast.error('Error deleting category');
    }
  }

     
      
    
  
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
   
      <Layout>
         <div className="container-fluid">
    <div className="row">

      <div className="col-md-3 p-3">
        <Adminmenu />
      </div>

     
      <div className="col-md-9 p-3 mt-4 text-white ">
        <h2>Manage category</h2>
        <Categoryform handleSubmit={handleSubmit} Name={Name} setName={setName} />
       <div>
        <table className="table">
  <thead>
    <tr>
      <th scope="Name">Name</th>
      <th scope="Action">Action</th>
    </tr>
  </thead>
  <tbody>
    {categories.map((c) => (
      <tr key={c._id}>
        <td>{c.name}</td>
        <td className='d-flex gap-3'>
          <button className="btn btn-primary " onClick={()=>{setVisible(true); setUpdateCategory(c.name); setSelectedCategory(c)}}>Edit</button>
          <button className="btn btn-danger" onClick={() => handleDelete(c._id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

       </div>
      </div>
      <Modal
  title="Edit Category"
  open={Visible}
  onCancel={() => setVisible(false)}
  footer={null}
>
 <Categoryform handleSubmit={handleUpdateSubmit} Name={updateCategory} setName={setUpdateCategory} />
</Modal>

    </div>
  </div>
      </Layout> 
  )
}

export default CreateCategory;
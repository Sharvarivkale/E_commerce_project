import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/layout'
import Adminmenu from '../../components/layout/Adminmenu'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Select } from 'antd';
const { Options } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [photo, setPhoto] = useState(null);
  const [shipping, setShipping] = useState(''); 

  // get the all products 
  const getAllCategories = async () => {
    try {
      const {data} = await axios.get('/category/get_category');
      if (data?.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Error fetching categories');
    }
  };

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
       <h1>Create product</h1>
       <div className="m-1">
        <Select bordered={false}
        placeholder="select the category"
        size='large'
        showSearch
        className='form-select mb-3'
        onChange={(value) => setCategory(value)}
        >
          {categories.map((cat) => (
            <Option key={cat._id} value={cat.name}>
              {cat.name}
            </Option>
          ))}
        </Select>
       </div>
      </div>

    </div>
  </div>
      </Layout> 
  )
}

export default CreateProduct
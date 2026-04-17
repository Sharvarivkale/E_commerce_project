import Layout from '../../components/layout/layout'
import React,{useState,useEffect} from 'react'
import Adminmenu from '../../components/layout/Adminmenu'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Products = () => {
  const [products, setProducts] = useState([])

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/product/get_products')
      if (data?.success) {
        setProducts(data.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <Layout>
     <div className="container-fluid m-3 p-3">
     <div className="row">
      <div className="col-md-3">
        <Adminmenu />
      </div>
      <div className="col-md-9">
        <h1 className="text-center">All Products List</h1>
       
        <div className="row ">
  {products?.map((p) => (
    <div className="col-md-4" key={p._id}>
      <Link to={`/dashboard/admin/products/${p.slug}`} style={{ textDecoration: "none" }}>
        <div className="card mb-3 text-white">
          <img
            src={`${import.meta.env.VITE_APP}/product/get_product_photo/${p._id}`}
            className="card-img-top "
            alt={p.name}
          />
          <div className="card-body">
            <h5 className="card-title">{p.name}</h5>
            <p className="card-text">{p.description}</p>
            <button className="btn btn-primary">Edit</button>
          </div>
        </div>
      </Link>
    </div>
  ))}
</div>
      </div>
     </div>
     </div>
    </Layout>
  )
}

     

export default Products
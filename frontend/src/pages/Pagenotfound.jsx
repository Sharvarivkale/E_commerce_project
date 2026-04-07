import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/layout/layout'

const Pagenotfound = () => {
  return (
    <>
    <Layout title={"Page Not Found"} description={"The page you are looking for does not exist"} keywords={"404, page not found, e-commerce"} author={"Sharvari Kale"}>
    <div className='pnf'>
      <h1 className='pnf-title'>404</h1>
      <h2 className='pnf-subtitle'>Oops! Page Not Found</h2>
      <Link to="/" className='pnf-link'>Go back !</Link>
    </div>
    </Layout>
    
    </>
  )
}

export default Pagenotfound
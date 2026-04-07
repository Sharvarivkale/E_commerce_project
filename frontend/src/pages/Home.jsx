import React from 'react'
import Layout from '../components/layout/layout'
import { useAuth } from '../context/auth_context'

const Home = () => {
  const {Auth,setAuth}=useAuth();
  return (
    <Layout title={"Home"} description={"Welcome to our e-commerce store"} keywords={"home, e-commerce"} author={"Sharvari Kale"}>
      <h1>Home page</h1>
      <pre className='text-white'>
        {JSON.stringify(Auth,null,4)}
      </pre>
    </Layout>
  )
}

export default Home
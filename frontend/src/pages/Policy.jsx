import React from 'react'
import policyimage from '../images/policyy.jpeg'
import Layout from '../components/layout/layout'

const Policy = () => {
  return (
    <>  
    <Layout title={"Privacy Policy"} description={"Learn more about our privacy practices"} keywords={"privacy, policy, e-commerce"} author={"Sharvari Kale"}>
          <div className='gap-4 mt-4'>
          <h1 className='contact-title fw-solid text-white d-flex justify-content-center align-items-center '>Privacy Policy</h1>
          <div className='d-flex flex-row'>
          <div className='w-50'>
          <img src={policyimage} alt="About" className='w-160 h-85 ml-8 mt-15'/>
          </div>
          <div className='text-white mt-25 ml-18 '>
          <ul className='gap-5'>
            <li>Add privacy policy</li>
             <li>Add privacy policy</li>
              <li>Add privacy policy</li>
               <li>Add privacy policy</li>
                <li>Add privacy policy</li>
          </ul>
          </div>
          </div>
          </div>
          </Layout>
          </>
  )
}

export default Policy
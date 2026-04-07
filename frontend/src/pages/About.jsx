import React from 'react'
import Aboutimage from '../images/About.jpeg'
import Layout from '../components/layout/layout'

const About = () => {
  return (
   <> 
       <Layout title={"About Us"} description={"Learn more about our company"} keywords={"about, company, e-commerce"} author={"Sharvari Kale"}>
       <div className='gap-4 mt-4'>
       <h1 className='contact-title fw-solid text-white d-flex justify-content-center align-items-center '>About Us</h1>
       <div className='d-flex flex-row'>
       <div className='w-50'>
       <img src={Aboutimage} alt="About" className='w-160 h-90 ml-8 mt-15'/>
       </div>
       <div className='text-white mt-25 ml-18 '>
       <p className='ml-7 max-w-md mx-auto'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ea accusantium ullam, neque soluta dolorum eaque dolore? Qui ab magnam eveniet ex delectus quasi necessitatibus eaque temporibus voluptas! Neque, odit!</p>
       </div>
       </div>
       </div>
       </Layout>
       </>
  )
}

export default About
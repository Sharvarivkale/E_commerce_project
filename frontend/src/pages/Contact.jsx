import React from 'react'
import Layout from '../components/layout/layout';
import ContactImage from '../images/contactt.jpeg'
import { MdOutlineMail } from "react-icons/md";
import { MdPhoneInTalk } from "react-icons/md";
import { FaHeadphonesSimple } from "react-icons/fa6";


const Contact = () => {
  return (
    <>
    <Layout title={"Contact Us"} description={"Get in touch with us"} keywords={"contact, e-commerce"} author={"Sharvari Kale"}>
    <div className='gap-4 mt-4'>
    <h1 className='contact-title fw-solid text-white d-flex justify-content-center align-items-center '>Contact Us</h1>
    <div className='d-flex flex-row'>
    <div className='w-50'>
    <img src={ContactImage} alt="Contact" className='w-180 ml-4 mt-10'/>
    </div>
    <div className='text-white mt-25 ml-18'>
    <p className='ml-7'>If you have any questions, feel free to reach out!</p>
    <h5 className='ml-7'>Contact Information</h5>
    <ol className='text-lg gap-5'>
      <li className='d-flex flex-row'><MdOutlineMail  className='mt-1'/> <span className='ml-2 '></span> Email:  sharvarii@ecommerce_brand.com</li>
      <li className='d-flex flex-row'><MdPhoneInTalk className='mt-1'/> <span className='ml-2'></span> Phone:  (123) 456-7890</li>
      <li className='d-flex flex-row'><FaHeadphonesSimple className='mt-1'/> <span className='ml-2'></span> Toll_free:  (123) 456-7890</li>
    </ol>
    </div>
    </div>
    </div>
    </Layout>
    </>
  )
}

export default Contact
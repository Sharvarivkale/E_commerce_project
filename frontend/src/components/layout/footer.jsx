import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <div className='footer text-xl bg-[#372C2E] text-light h-[20vh] flex items-center justify-center d-flex flex-col'>
      <div className='z-index-1'>
        <h5>All Right Reserved &copy; Sharvrarii💫</h5>
      </div>
      <div>
        <p>
          <Link to="/about">About</Link>
          <span> | </span>
          <Link to="/contact">Contact</Link>
          <span> | </span>    
          <Link to="/policy">Privacy Policy</Link>
        </p>
      </div>
    </div>
    </>
  )
}

export default Footer
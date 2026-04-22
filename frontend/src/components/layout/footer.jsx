import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container mx-auto px-6'>
        <h5 className='text-lg mb-4'>All Rights Reserved &copy; Sharvari💫</h5>
        <div className='flex justify-center items-center gap-4 text-sm'>
          <Link to="/about">About</Link>
          <span className="text-gray-600">|</span>
          <Link to="/contact">Contact</Link>
          <span className="text-gray-600">|</span>    
          <Link to="/policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
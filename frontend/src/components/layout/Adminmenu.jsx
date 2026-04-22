import React from 'react'
import { NavLink } from 'react-router-dom'

const Adminmenu = () => {
  return (
    <div className='glass-card p-4'>
      <div className="list-group">
        <h4 className="text-xl font-bold mb-4 text-[#6366f1] border-b border-[#374151] pb-2">Admin Panel</h4>
        <NavLink 
          to="/dashboard/admin/create-category" 
          className={({ isActive }) => `block px-4 py-3 rounded-lg mb-2 transition-colors ${isActive ? 'bg-[#6366f1] text-white' : 'text-gray-300 hover:bg-[#374151]'}`}
        >
          Create Category
        </NavLink>

        <NavLink 
          to="/dashboard/admin/create-product" 
          className={({ isActive }) => `block px-4 py-3 rounded-lg mb-2 transition-colors ${isActive ? 'bg-[#6366f1] text-white' : 'text-gray-300 hover:bg-[#374151]'}`}
        >
          Create Product
        </NavLink>
        
        <NavLink 
          to="/dashboard/admin/products" 
          className={({ isActive }) => `block px-4 py-3 rounded-lg mb-2 transition-colors ${isActive ? 'bg-[#6366f1] text-white' : 'text-gray-300 hover:bg-[#374151]'}`}
        >
          Products
        </NavLink>

        <NavLink 
          to="/dashboard/admin/users" 
          className={({ isActive }) => `block px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-[#6366f1] text-white' : 'text-gray-300 hover:bg-[#374151]'}`}
        >
          Users
        </NavLink>
      </div>
    </div>
  )
}

export default Adminmenu
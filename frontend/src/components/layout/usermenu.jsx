import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <div className='glass-card p-4'>
      <div className="list-group">
        <h4 className="text-xl font-bold mb-4 text-[#6366f1] border-b border-[#374151] pb-2">User Dashboard</h4>
        <NavLink 
          to="/dashboard/user/profile" 
          className={({ isActive }) => `block px-4 py-3 rounded-lg mb-2 transition-colors ${isActive ? 'bg-[#6366f1] text-white' : 'text-gray-300 hover:bg-[#374151]'}`}
        >
          Profile
        </NavLink>

        <NavLink 
          to="/dashboard/user/order" 
          className={({ isActive }) => `block px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-[#6366f1] text-white' : 'text-gray-300 hover:bg-[#374151]'}`}
        >
          Orders
        </NavLink>
      </div>
    </div>
  )
}

export default UserMenu
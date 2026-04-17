import React from 'react'
import { NavLink } from 'react-router-dom'

const Adminmenu = () => {
  return (
    <>
    <div className='text-center'>
   <div className="list-group bg-[#372C2E] text-white">
    <h4>Admin Menu</h4>
 <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action !bg-[#372C2E] !text-white">
  Create Category
</NavLink>

<NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action !bg-[#372C2E] !text-white">
  Create Product
</NavLink>
<NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action !bg-[#372C2E] !text-white">
  Products
</NavLink>

<NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action !bg-[#372C2E] !text-white">
  Users
</NavLink>
</div>
</div>

    </>
  )
}

export default Adminmenu
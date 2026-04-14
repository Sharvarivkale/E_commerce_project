import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
     <>
    <div className='text-center'>
   <div className="list-group bg-[#372C2E] text-white">
    <h4>User Menu</h4>
 <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action !bg-[#372C2E] !text-white">
  User Profile
</NavLink>

<NavLink to="/dashboard/user/order" className="list-group-item list-group-item-action !bg-[#372C2E] !text-white">
  User Orders
</NavLink>


</div>
</div>

    </>
  )
}

export default UserMenu
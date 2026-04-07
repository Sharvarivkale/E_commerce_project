import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiShoppingCart } from "react-icons/fi";

const Header = () => {
  return (
    <nav className="navbar navbar-dark bg-[#372C2E] border-bottom border-body h-[9vh]" data-bs-theme="dark">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <NavLink to="/" className="navbar-brand text-white d-flex flex-row">
         <FiShoppingCart className='me-2 ms-1 mt-1' />  E-commerce brand
        </NavLink>

        <ul className="nav">
          <li className="nav-item">
            <NavLink to="/" className="nav-link text-white custom-nav-link">
              Home
            </NavLink>
          </li>
            <li className="nav-item">
            <NavLink to="/" className="nav-link text-white custom-nav-link">
              Category
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/register" className="nav-link text-white custom-nav-link">
              Register
            </NavLink>
          </li>
           <li className="nav-item">
            <NavLink to="/login" className="nav-link text-white custom-nav-link">
              Login
            </NavLink>
          </li>
           <li className="nav-item">
            <NavLink to="/login" className="nav-link text-white custom-nav-link">
              Cart(0)
            </NavLink>
          </li>
         
        </ul>


      </div>
    </nav>
  );
};

export default Header;
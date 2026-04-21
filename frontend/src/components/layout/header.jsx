import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { FiShoppingCart } from "react-icons/fi";
import { useAuth } from '../../context/auth_context';
import { useCart } from '../../context/cart_context';
import { toast } from 'react-toastify';
import SearchInput from '../form/Search';
import useCategory from '../../hooks/useCategory';
import { Badge } from 'antd';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [open, setOpen] = useState(false); 
  const [catOpen, setCatOpen] = useState(false);
  const categories = useCategory();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      user: null,
      token: ""
    });
    localStorage.removeItem("auth");
    toast.success("Logout successful");
    navigate("/login");
  };

  return (
    <nav className="navbar h-[9vh] flex items-center px-6 justify-between text-white">

      {/* Logo */}
      <NavLink to="/" className="navbar-brand text-white flex items-center">
        <FiShoppingCart className="me-2" /> E-commerce
      </NavLink>
      
        <SearchInput />
      {/* Menu */}
      <div className="flex items-center gap-6 z-1">

        <NavLink to="/" className="custom-nav-link">Home</NavLink>
        
        {/* Categories Dropdown */}
        <div className="relative">
          <button
            onClick={() => setCatOpen(!catOpen)}
            className="custom-nav-link bg-transparent border-none"
          >
            Category
          </button>
          {catOpen && (
            <div className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg w-48 z-50">
              <Link
                to="/categories"
                className="block px-4 py-2 hover:bg-gray-200 border-b"
                onClick={() => setCatOpen(false)}
              >
                All Categories
              </Link>
              {categories?.map((c) => (
                <Link
                  key={c._id}
                  to={`/category/${c.slug}`}
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setCatOpen(false)}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      

        {!auth?.user ? (
          <>
            <NavLink to="/register" className="custom-nav-link">Register</NavLink>
            <NavLink to="/login" className="custom-nav-link">Login</NavLink>
          </>
        ) : (
          <div className="relative">

            {/* Button */}
            <button
              onClick={() => setOpen(!open)}
              className="bg-gray-700 px-3 py-1 rounded"
            >
              {auth?.user?.name}
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-40 z-50">

                <NavLink
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>

              </div>
            )}
          </div>
        )}

        <NavLink to="/cart" className="custom-nav-link">
          <Badge count={cart?.length} showZero offset={[10, -5]}>
            <span className="text-white">Cart</span>
          </Badge>
        </NavLink>

      </div>
    </nav>
  );
};

export default Header;
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
    <nav className="navbar min-h-[9vh] flex items-center px-6 justify-between">

      {/* Logo */}
      <NavLink to="/" className="navbar-brand flex items-center">
        <FiShoppingCart className="me-2" /> E-COMMERCE
      </NavLink>
      
      <div className="flex-1 max-w-md mx-4">
        <SearchInput />
      </div>

      {/* Menu */}
      <div className="flex items-center gap-6">

        <NavLink to="/" className="custom-nav-link">Home</NavLink>
        
        {/* Categories Dropdown */}
        <div className="relative">
          <button
            onClick={() => setCatOpen(!catOpen)}
            className="custom-nav-link bg-transparent border-none cursor-pointer"
          >
            Categories
          </button>
          {catOpen && (
            <div className="absolute left-0 mt-3 bg-[#1e1e1e] border border-[#374151] text-white rounded-lg shadow-xl w-56 z-50 overflow-hidden">
              <Link
                to="/categories"
                className="block px-4 py-3 hover:bg-[#374151] transition-colors border-b border-[#374151]"
                onClick={() => setCatOpen(false)}
              >
                All Categories
              </Link>
              <div className="max-h-60 overflow-y-auto">
                {categories?.map((c) => (
                  <Link
                    key={c._id}
                    to={`/category/${c.slug}`}
                    className="block px-4 py-3 hover:bg-[#374151] transition-colors"
                    onClick={() => setCatOpen(false)}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
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

            {/* User Dropdown Button */}
            <button
              onClick={() => setOpen(!open)}
              className="bg-[#374151] hover:bg-[#4b5563] text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              {auth?.user?.name}
              <span className="text-xs">▼</span>
            </button>

            {/* Dropdown Menu */}
            {open && (
              <div className="absolute right-0 mt-3 bg-[#1e1e1e] border border-[#374151] text-white rounded-lg shadow-xl w-48 z-50 overflow-hidden">
                <NavLink
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  className="block px-4 py-3 hover:bg-[#374151] transition-colors border-b border-[#374151]"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-[#374151] transition-colors text-red-400"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        <NavLink to="/cart" className="custom-nav-link">
          <Badge count={cart?.length} showZero offset={[10, -5]}>
            <span className="text-white hover:text-[#6366f1] transition-colors">Cart</span>
          </Badge>
        </NavLink>

      </div>
    </nav>
  );
};

export default Header;
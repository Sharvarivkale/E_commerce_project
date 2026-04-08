import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiShoppingCart } from "react-icons/fi";
import { useAuth } from '../../context/auth_context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      user: null,
      token: ""
    });
    localStorage.removeItem("auth");
    toast.success("Logout successful");
  };

  return (
    <>
      <ToastContainer />
      <nav className="navbar navbar-dark bg-[#372C2E] border-bottom border-body h-[9vh]" data-bs-theme="dark">
        <div className="container-fluid d-flex align-items-center justify-content-between">

        <NavLink to="/" className="navbar-brand text-white d-flex flex-row">
          <FiShoppingCart className='me-2 ms-1 mt-1' /> E-commerce brand
        </NavLink>

        <ul className="nav">
          <li className="nav-item">
            <NavLink to="/" className="nav-link text-white">Home</NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/" className="nav-link text-white">Category</NavLink>
          </li>

          {!auth.user ? (
            <>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link text-white">
                  Register
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/login" className="nav-link text-white">
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            
              <li className="nav-item">
                <NavLink to="/login" onClick={handleLogout} className="nav-link text-white">
                  Logout
                </NavLink>
              </li>
          )}
          <li className="nav-item">
                <NavLink to="/home" className="nav-link text-white">
                  Cart(0)
                </NavLink>
              </li>
            
        </ul>

      </div>
    </nav>
    </>
  );
};

export default Header;
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'antd/dist/reset.css';
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Pagenotfound from './pages/Pagenotfound'
import Policy from './pages/Policy'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import Dashboard from './pages/user/Dashboard';
import  {PrivateRoute} from './routes/PrivateRoute';
import { AdminPrivateRoute } from './routes/adminprivateroute';
import Forgotpassword from './pages/auth/Forgotpassword';
import Admindashboard from './pages/admin/admindashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Users from './pages/admin/Users';
import UserOrder from './pages/user/userorder';
import UserProfile from './pages/user/UserProfile';
const App = () => {
  return (
    <>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />

  {/* USER ROUTES */}
  <Route path="/dashboard/user" element={<PrivateRoute />}>
    <Route index element={<Dashboard />} />
    <Route path="profile" element={<UserProfile />} />
    <Route path="order" element={<UserOrder />} />
  </Route>


  {/* ADMIN ROUTES */}
  <Route path="/dashboard/admin" element={<AdminPrivateRoute />}>
    <Route index element={<Admindashboard />} />
    <Route path="create-category" element={<CreateCategory />} />
    <Route path="create-product" element={<CreateProduct />} />
    <Route path="users" element={<Users />} />
  </Route>

  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forgot_password" element={<Forgotpassword />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/policy" element={<Policy />} />
  <Route path="*" element={<Pagenotfound />} />
</Routes>

    </>
  )
}

export default App
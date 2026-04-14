import React from 'react'
import Layout from '../../components/layout/layout'
import Adminmenu from '../../components/layout/Adminmenu'
import { useAuth } from '../../context/auth_context'

const Admindashboard = () => {
  const [auth] = useAuth()
  return (
  <Layout>
  <div className="container-fluid">
    <div className="row">

      {/* Left Side - Admin Menu */}
      <div className="col-md-3 p-3">
        <Adminmenu />
      </div>

      {/* Right Side - Content */}
      <div className="col-md-9 p-3 mt-4 text-white ">
        <div className="card  text-white">
          <h3>Admin Name: {auth?.user?.name}</h3>
          <h3>Admin Email: {auth?.user?.email}</h3>
          <h3>Admin Phone: {auth?.user?.phone}</h3>
        </div>
      </div>

    </div>
  </div>
</Layout>
  )
}

export default Admindashboard
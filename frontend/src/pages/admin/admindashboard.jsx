import React from 'react'
import Layout from '../../components/layout/layout'
import Adminmenu from '../../components/layout/Adminmenu'
import { useAuth } from '../../context/auth_context'

const Admindashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout title={"Admin Dashboard - E-commerce"}>
      <div className="container-fluid py-8 px-4">
        <div className="row">

          {/* Left Side - Admin Menu */}
          <div className="col-md-3">
            <Adminmenu />
          </div>

          {/* Right Side - Content */}
          <div className="col-md-9">
            <div className="glass-card">
              <h2 className="text-3xl font-bold mb-6 text-[#6366f1] border-b border-[#374151] pb-2">Admin Profile</h2>
              <div className="space-y-4">
                <div className="flex border-b border-[#374151] pb-2">
                  <span className="w-32 font-semibold text-gray-400">Name:</span>
                  <span className="text-white text-lg">{auth?.user?.name}</span>
                </div>
                <div className="flex border-b border-[#374151] pb-2">
                  <span className="w-32 font-semibold text-gray-400">Email:</span>
                  <span className="text-white text-lg">{auth?.user?.email}</span>
                </div>
                <div className="flex border-b border-[#374151] pb-2">
                  <span className="w-32 font-semibold text-gray-400">Phone:</span>
                  <span className="text-white text-lg">{auth?.user?.phone}</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-semibold text-gray-400">Role:</span>
                  <span className="text-indigo-400 font-bold">Admin</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default Admindashboard
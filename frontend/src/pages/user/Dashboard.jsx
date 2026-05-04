import React from 'react'
import Layout from '../../components/layout/layout'
import { useAuth } from '../../context/auth_context'
import UserMenu from '../../components/layout/usermenu'

const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout title={"Dashboard - E-commerce"}>
      <div className="container-fluid py-8 px-4">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="glass-card">
              <h2 className="text-3xl font-bold mb-6 text-white border-b border-[#374151] pb-2">User Profile</h2>
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
                  <span className="w-32 font-semibold text-gray-400">Address:</span>
                  <span className="text-white text-lg">{auth?.user?.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
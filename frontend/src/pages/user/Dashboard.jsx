import React from 'react'
import Layout from '../../components/layout/layout'
import { useAuth } from '../../context/auth_context'
import UserMenu from '../../components/layout/usermenu'

const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout>
      <h1>Dashboard</h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 p-3">
            <UserMenu />
          </div>
          <div className="col-md-9 p-3 mt-4 text-white ">
            <h3>User Name: {auth?.user?.name}</h3>
            <h3>User Email: {auth?.user?.email}</h3>
            <h3>User Phone: {auth?.user?.phone}</h3>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
import React from 'react'
import Layout from '../../components/layout/layout'
import UserMenu from '../../components/layout/usermenu'
import { useAuth } from '../../context/auth_context'

const UserProfile = () => {
  const [Auth] = useAuth()
  return (
    <Layout>
      <div className="container-fluid">
    <div className="row">

      <div className="col-md-3 p-3">
        <UserMenu />
      </div>

     
      <div className="col-md-9 p-3 mt-4 text-white ">
       <h1>User Profile</h1>
       <p>Name: {Auth?.user?.name}</p>
       <p>Email: {Auth?.user?.email}</p>
      </div>

    </div>
  </div>
    </Layout>
  )
}

export default UserProfile
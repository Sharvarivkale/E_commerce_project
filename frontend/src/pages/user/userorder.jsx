import React from 'react'
import Layout from '../../components/layout/layout'
import UserMenu from '../../components/layout/usermenu'

const UserOrder = () => {
  return (
     <Layout>
      <div className="container-fluid">
    <div className="row">

      <div className="col-md-3 p-3">
        <UserMenu />
      </div>

     
      <div className="col-md-9 p-3 mt-4 text-white ">
       <h1>User Orders</h1>
      </div>

    </div>
  </div>
    </Layout>
  )
}

export default UserOrder
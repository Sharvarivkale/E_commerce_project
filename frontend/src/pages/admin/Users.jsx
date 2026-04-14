import React from 'react'
import Layout from '../../components/layout/layout'
import Adminmenu from '../../components/layout/Adminmenu'

const Users = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 p-3">
            <Adminmenu />
          </div>
          <div className="col-md-9 p-3 mt-4 text-white ">
            <h1>Users</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Users
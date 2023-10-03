import React from 'react'
import AdminIndex from '../pages/Admin/AdminIndex'
import AppSidebar from '../pages/Admin/AppSidebar'
import '../pages/Admin/admin.css'

const AdminLayout = (props) => {
  return (
    <div>
        <div className="d-flex">
            <div className="col-lg-3">
                <AppSidebar />
            </div>
            <div className="col-lg-9">
               {props.children}
            </div>
        </div>
    </div>
  )
}

export default AdminLayout
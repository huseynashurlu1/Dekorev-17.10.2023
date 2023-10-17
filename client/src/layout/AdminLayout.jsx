import React from 'react'
import AdminIndex from '../pages/Admin/AdminIndex'
import AppSidebar from '../pages/Admin/AppSidebar'
import '../pages/Admin/admin.css'

const AdminLayout = (props) => {
  return (
    <div className='admin-layout'> 
        <div className="d-flex justify-content-between">
            <div className="left">
                <AppSidebar />
            </div>
            <div className="admin-main right">
               {props.children}
            </div>
        </div>
    </div>
  )
}

export default AdminLayout
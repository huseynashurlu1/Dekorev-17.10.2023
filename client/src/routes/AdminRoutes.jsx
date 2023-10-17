import React from 'react'
import AdminLayout from '../layout/AdminLayout'
import { Route, Routes } from 'react-router-dom'
import AdminIndex from '../pages/Admin/AdminIndex';
import Products from '../pages/Admin/Product/Products';
import Categories from '../pages/Admin/Category/Categories';
import CreateCategory from '../pages/Admin/Category/CreateCategory';
import Stores from '../pages/Admin/Store/Stores'
import UserList from '../pages/Admin/User/UserList';
import CreateStore from '../pages/Admin/Store/CreateStore';
import CreateUser from '../pages/Admin/User/CreateUser';
import CreateProduct from '../pages/Admin/Product/CreateProduct';
import Branches from '../pages/Admin/Branch/Branches';
import EditBranch from '../pages/Admin/Branch/EditBranch';
import AddBranch from '../pages/Admin/Branch/AddBranch';
import EditStore from '../pages/Admin/Store/EditStore';

const AdminRoutes = () => {
  return (
    <AdminLayout>
                <Routes>
                    <Route path='/manage' element={<AdminIndex />}/>
                    <Route path='/manage/products/create' element={<CreateProduct />}/>
                    <Route path='/manage/products' element={<Products />}/>

                    <Route path='/manage/category/add' element={<CreateCategory />}/>
                    <Route path='/manage/categories' element={<Categories />}/>

                    <Route path='/manage/stores/create' element={<CreateStore />}/>
                    <Route path='/manage/stores' element={<Stores />}/>
                    <Route path='/manage/stores/:id' element={<EditStore />}/>

                    <Route path='/manage/users/create' element={<CreateUser />}/>
                    <Route path='/manage/users' element={<UserList />}/>

                    <Route path='/manage/branches/add' element={<AddBranch />}/>
                    <Route path='/manage/branches' element={<Branches />}/>
                    <Route path='/manage/branches/:id' element={<EditBranch />}/>

                </Routes>
    </AdminLayout>
  )
}

export default AdminRoutes
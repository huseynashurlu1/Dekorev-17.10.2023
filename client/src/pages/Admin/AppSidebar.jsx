import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineSetting, AiOutlineLogout, AiOutlineUser, AiOutlineAppstore } from 'react-icons/ai'
import { BiStore } from 'react-icons/bi'
import { CiCircleList } from 'react-icons/ci'
import jwtDecode from 'jwt-decode';


const AppSidebar = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token');
  let userRole = null;

    if (token) {
        const decodedToken = jwtDecode(token);
        userRole = decodedToken.userRole; 
    }

    const logoutHandler = () => {
        localStorage.removeItem('token');
        navigate('/')
        window.location.reload()
    }
  return (
    <div className='appSidebar'>
        <div className="container">
        <div className="appsidebar-content">
          <NavLink activeclassname="active" className='main-page-link' to='/manage'><AiOutlineSetting /> Ana Səhifə</NavLink>
          <NavLink className='main-page-link' to='/manage/products'><CiCircleList /> Məhsullar</NavLink>
          {userRole === 'superAdmin' && (
                  <>
                      <NavLink className='main-page-link' to='/manage/categories'><AiOutlineAppstore /> Kateqoriyalar</NavLink>
                      <NavLink className='main-page-link' to='/manage/stores'><BiStore /> Mağazalar</NavLink>
                      <NavLink className='main-page-link' to='/manage/branches'><BiStore /> Filiallar</NavLink>
                      <NavLink className='main-page-link' to='/manage/users'><AiOutlineUser /> İstifadəçilər</NavLink>
                  </>
              )}
          <button className='main-page-link' onClick={logoutHandler}><AiOutlineLogout /> Çıxış</button>
        </div>
        </div>
    </div>
  )
}

export default AppSidebar
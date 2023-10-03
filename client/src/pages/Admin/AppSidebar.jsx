import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { PiDotDuotone } from 'react-icons/pi'
import { BiLogOutCircle } from 'react-icons/bi'
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
        <Link className='main-page-link' to='/manage'><PiDotDuotone /> Ana Səhifə</Link>
        <Link className='main-page-link' to='/manage/products'><PiDotDuotone /> Məhsullar</Link>
        {userRole === 'superAdmin' && (
                <>
                    <Link className='main-page-link' to='/manage/categories'><PiDotDuotone /> Kateqoriyalar</Link>
                    <Link className='main-page-link' to='/manage/stores'><PiDotDuotone /> Mağazalar</Link>
                    <Link className='main-page-link' to='/manage/users'><PiDotDuotone /> İstifadəçilər</Link>
                </>
            )}
        <button onClick={logoutHandler}><BiLogOutCircle /> Çıxış</button>
        </div>
    </div>
  )
}

export default AppSidebar
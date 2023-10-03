import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import apiUrl from '../../utils/api'

const Login = () => {
  const navigate = useNavigate()
  const [token, setToken] = useState('');
  const [data, setData] = useState({
    username: '',
    password: ''
  })


  const handleLogin = async () => {
    try {
      const response = await axios.post(apiUrl.userApi.loginUser, data);
      const { token } = response.data; 
      setToken(token); 
      localStorage.setItem('token', token); 
      navigate('/admin')
      window.location.reload()
    } catch (error) {
      console.error('Giriş zamanı səhv baş verdi:', error);
    }
  }

  return (
    <div className='login py-5'>
      <div className="col-lg-4 mx-auto">
        <label htmlFor="username">İstifadəçi adı</label>
        <input onChange={(e) => setData({ ...data, username: e.target.value })} className='form-control mb-3' type="text" />
        <label htmlFor="password">Şifrə</label>
        <input onChange={(e) => setData({ ...data, password: e.target.value })} className='form-control' type="password" />
        <button onClick={handleLogin} className='btn btn-success mt-4'>Daxil ol</button>
      </div>
    </div>
  )
}

export default Login

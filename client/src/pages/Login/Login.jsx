import React, { useState } from 'react'
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../../utils/api';

const Login = () => {
    const navigate = useNavigate()
    const [token, setToken] = useState('');
    const [data, setData] = useState({
      email: '',
      password: ''
    })

    const handleLogin = async () => {
       if(window.innerWidth <=576) {
        alert('Telefon ilə daxil ola bilməzsiniz')
       }
       else{
        try {
          const response = await axios.post(`${apiUrl.authApi.authURL}/login`, data);
          const { token } = response.data; 
          setToken(token); 
          localStorage.setItem('token', token); 
          navigate('/manage')
        } catch (error) {
          console.error('Giriş zamanı səhv baş verdi:', error);
        }
       }
      }

  return (
    <div className="container-login100">
        <div className="wrap-login100">
                <span className="login100-form-title">
                Giriş
                </span>
                <div className="wrap-input100 validate-input mb-4">
                <span className="label-input100">E-mail</span>
                <input onChange={(e) => setData({ ...data, email: e.target.value })} className="input100" type="email" name="email"/>
                <span className="focus-input100"></span>
                </div>
                <div className="wrap-input100 validate-input">
                <span className="label-input100">Şifrə</span>
                <input onChange={(e) => setData({ ...data, password: e.target.value })} className="input100" type="password" name="pass" />
                <span className="focus-input100"></span>
                </div>
                <button onClick={handleLogin}  className="login100-form-btn">Daxil ol</button>
        </div>
</div>
  )
}

export default Login
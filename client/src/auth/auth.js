import axios from 'axios';
import apiUrl from '../utils/api';

const TOKEN_KEY = 'devlife85***';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${apiUrl.authApi.authURL}/login`, {
      username,
      password,
    });
    localStorage.setItem(TOKEN_KEY, response.data.token);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
}


export const getUserRole = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(`${apiUrl.authApi.authURL}/check-login`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });

        
        const userRole = response.data.user.role;
        const userId = response.data.user._id;
        return {role: userRole, userId:userId};

      } catch (error) {
        console.error('Giriş yoxlanışında səhv baş verdi:', error);
        return null;
      }
    }
  };


import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BsTrash3 } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import apiUrl from '../../../utils/api'

const UserList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
      const getUsers = async () => {
        await axios.get(`${apiUrl.userApi.userURL}/all-users`)
        .then(res => setUsers(res.data))
        .catch(err => console.log(err))
      }
  
      getUsers()
    }, [])
  return (
    <div className='container mt-3'>
        <Link to='/manage/users/create' className='btn btn-primary w-100'>Yeni İstifadəçi yarat</Link>
        <div className="admin-pr-top d-flex justify-content-between align-items-center">
            <h3 style={{fontFamily: "Regular", padding: "20px 0"}}>Bütün istifadəçilər</h3>
        </div>
        <table className='table table-bordered'>
            <thead>
                <tr>
                <th>Adı</th>
                <th>Email</th>
                <th>Rolu</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    users && users.map(user => {
                        return(
                            <tr style={{verticalAlign: "baseline"}} key={user._id}>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td className='d-flex justify-content-center'>
                                                <Link to={`/admin/product/${user._id}`} className='btn btn-warning me-1'><AiOutlineEdit /></Link>
                                                <button className='btn btn-danger ms-1'><BsTrash3 /></button>
                                            </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <ToastContainer />
    </div>
  )
}

export default UserList
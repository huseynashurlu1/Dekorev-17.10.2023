import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BsTrash3 } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiUrl from '../../../utils/api'
import { Link } from 'react-router-dom';


const Categories = () => {
    const [data, setData] = useState([])

    useEffect(() => {
      const getItems = async () => {
        await axios.get(`${apiUrl.categoryApi.categoryURL}/all`)
        .then(res => {
            setData(res.data)
            console.log(res.data);
        })
        .catch(err => console.log(err))
      }
  
      getItems()
    }, [])
  
    const DeleteHandler = async (id) => {
      try {
          const response = await axios.delete(`${apiUrl.categoryApi.categoryURL}/${id}`)
          setData(prevData => prevData.filter(item => item._id !== id));
          toast.error('Kateqoriya silindi', {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
          });
      } catch (error) {
          console.log(error)
      }
    }
    
  return (
    <div className='container'>
        <Link to='/manage/category/add' className='btn btn-primary w-100 mt-4'>Yeni Kateqoriya yarat</Link>
        <h3 style={{fontFamily: "Regular", padding: "20px 0", color: '#fff'}}>Bütün kateqoriyalar</h3>
        <div className="col-lg-5">
        <table className='table table-bordered table-dark'>
            <thead>
                <tr>
                <th>Adı</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    data && data.map(item => {
                        return(
                            <tr style={{verticalAlign: "middle"}} key={item._id}>
                                <td>{item.name}</td>   
                                <td>
                                    <Link to={`/manage/categories/${item._id}`} className='btn btn-warning ms-1'><AiOutlineEdit /></Link>
                                    <button onClick={() => DeleteHandler(item._id)} className='btn btn-danger ms-1'><BsTrash3 /></button>
                                </td>   
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Categories

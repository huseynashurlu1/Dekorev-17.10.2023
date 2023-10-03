import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BsTrash3 } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import apiUrl from '../../../utils/api'

const Stores = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
      const getItems = async () => {
        await axios.get(`${apiUrl.storeApi.storeURL}/all`)
        .then(res => setItems(res.data))
        .catch(err => console.log(err))
      }
  
      getItems()
    }, [])
  
    const DeleteHandler = async (id) => {
      try {
          const response = await axios.delete(`${apiUrl.storeApi.storeURL}/${id}`)
          setItems(prevData => prevData.filter(item => item._id !== id));
          toast.error('Mağaza silindi', {
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
    <div className='container mt-3'>
    <Link to='/manage/stores/create' className='btn btn-primary w-100'>Yeni Mağaza yarat</Link>
    <div className="admin-pr-top d-flex justify-content-between align-items-center">
        <h3 style={{fontFamily: "Regular", padding: "20px 0"}}>Bütün mağazalar</h3>
        <input type="text" placeholder='mağaza adı' />
    </div>
    <table className='table table-bordered'>
        <thead>
            <tr>
            <th>Şəkli</th>
            <th>Adı</th>
            <th>Ünvanı</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            {
                items && items.map(item => {
                    console.log(item);
                    return(
                        <tr style={{verticalAlign: "baseline"}} key={item._id}>
                                        <td style={{width:"30%"}}>
                                            <img style={{width:"100%",objectFit: 'contain',height: '150px'}} src={`http://localhost:5000/uploads/store/${item.image}`} alt="" />
                                        </td>
                                        <td style={{width: "20%"}}>{item.name}</td>
                                        <td style={{width: "30%"}}>{item.address}</td>
                                        <td className='d-flex justify-content-center'>
                                            <Link to={`/admin/product/${item._id}`} className='btn btn-warning me-1'><AiOutlineEdit /></Link>
                                            <button onClick={() => DeleteHandler(item._id)} className='btn btn-danger ms-1'><BsTrash3 /></button>
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

export default Stores
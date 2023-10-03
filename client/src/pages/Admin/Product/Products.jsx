import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BsTrash3 } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import apiUrl from '../../../utils/api'

const Products = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getItems = async () => {
      await axios.get(`${apiUrl.productApi.productURL}/all`)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
    }

    getItems()
  }, [])

  const DeleteHandler = async (id) => {
    try {
        const response = await axios.delete(`${apiUrl.productApi.productURL}/${id}`)
        setData(prevData => prevData.filter(item => item._id !== id));
        toast.error('Məhsul silindi', {
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
        <Link to='/manage/products/create' className='btn btn-primary w-100'>Yeni Məhsul yarat</Link>
        <div className="admin-pr-top d-flex justify-content-between align-items-center">
            <h3 style={{fontFamily: "Regular", padding: "20px 0"}}>Bütün məhsullar</h3>
            <input type="text" placeholder='Məhsulun kodu' />
        </div>
        <table className='table table-bordered'>
            <thead>
                <tr>
                <th>Məhsulun kodu</th>
                <th>Şəkli</th>
                <th>Adı</th>
                <th>Mağaza</th>
                <th>Qiyməti</th>
                <th>Endirimli qiyməti</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    data && data.map(item => {
                        console.log(item);
                        return(
                            <tr style={{verticalAlign: "baseline"}} key={item._id}>
                                            <td style={{width: "20%"}}>{item._id}</td>
                                            <td style={{width:"30%"}}>
                                                <img style={{width:"100%",objectFit: 'contain',height: '150px'}} src={`http://localhost:5000/uploads/product/${item.images[0].url}`} alt="" />
                                            </td>
                                            <td style={{width: "30%"}}>{item.name}</td>
                                            <td style={{width: "20%"}}>{item.storeId.name}</td>
                                            <td style={{width: "10%"}}>{item.price} ₼</td>
                                           {
                                            item.isDiscounted ?  <td style={{width: "10%"}}>{item.discountedPrice} ₼</td> : <td style={{width: "10%"}}>--</td>
                                           }
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

export default Products

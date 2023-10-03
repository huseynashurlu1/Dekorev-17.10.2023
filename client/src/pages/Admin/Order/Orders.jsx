import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BsTrash3 } from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiUrl from '../../../utils/api';

const Orders = () => {
    const [data, setData] = useState([])

  useEffect(() => {
    const getItems = async () => {
      await axios.get(apiUrl.orderApi.getOrders)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
    }

    getItems()
  }, [])


  const DeleteHandler = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/order/${id}`)
        setData(prevData => prevData.filter(item => item._id !== id));
        toast.error('Sifariş silindi', {
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
        <h3 style={{fontFamily: "Regular", padding: "20px 0"}}>Bütün sifarişlər</h3>
        <table className='table table-bordered'>
            <thead>
                <tr>
                <th>Adı</th>
                <th>Telefon</th>
                <th>Məzmunu</th>
                <th>Məhsul kodu</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    data && data.map(item => {
                        return(
                            <tr style={{verticalAlign: "baseline", fontSize: "13px"}} key={item._id}>
                                            <td style={{width:"20%"}}>{item.name}</td>
                                            <td style={{width: "10%"}}>{item.phone}</td>
                                            <td style={{width: "30%"}}>{item.description}</td>
                                            <td style={{width: "30%"}}>{item.productId}</td>
                                            <td className='d-flex justify-content-center'>
                                                <button onClick={() => DeleteHandler(item._id)} className='btn btn-danger ms-1'><BsTrash3 /></button>
                                            </td>
                                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default Orders

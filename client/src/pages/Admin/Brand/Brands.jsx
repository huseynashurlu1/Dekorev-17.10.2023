import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BsTrash3 } from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiUrl from '../../../utils/api';

const Brands = () => {
    const [data, setData] = useState([])

    useEffect(() => {
      const getItems = async () => {
        await axios.get(apiUrl.brandApi.getBrands)
        .then(res => setData(res.data))
        .catch(err => console.log(err))
      }
  
      getItems()
    }, [])

    const DeleteHandler = async (id) => {
        try {
            const response = await axios.delete(`${apiUrl.brandApi.deleteBrand}/${id}`)
            setData(prevData => prevData.filter(item => item._id !== id));
            toast.error('Brend silindi', {
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
    <h3 style={{fontFamily: "Regular", padding: "20px 0"}}>Bütün brendlər</h3>
    <div className="col-lg-5">
    <table className='table table-bordered'>
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
                        <tr key={item._id}>
                            <td>{item.name}</td>   
                            <td>
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

export default Brands

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import apiUrl from '../../../utils/api'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsTrash3 } from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify'

const Branches = () => {
    const [stores, setStores] = useState([])
    const [branches, setBranches] = useState([])

    useEffect(() => {
      const getItems = async () => {
        await axios.get(`${apiUrl.branchApi.branchURL}/all`)
        .then(res => {
            setStores(res.data.stores)
            setBranches(res.data.branches)
        })
        .catch(err => console.log(err))
      }
      getItems()
    }, [])

    

    const DeleteHandler = async (id) => {
        try {
            const response = await axios.delete(`${apiUrl.branchApi.branchURL}/${id}`)
            setBranches(prevData => prevData.filter(item => item._id !== id));
            toast.error('Filial silindi', {
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


    const changeHandler = async (e) => {
        if(e.target.value === '0') {
            const response = await axios.get(`${apiUrl.branchApi.branchURL}/all`);
            setBranches(response.data.branches);
        }
        else{
            const response = await axios.get(`${apiUrl.branchApi.branchURL}/${e.target.value}`)
            setBranches(response.data)
        }
    }


  return (
    <div className='container'>
    <Link to='/manage/branches/add' className='btn btn-primary w-100 mt-4'>Yeni Filial əlavə et</Link>
    
    <select onChange={changeHandler} className='branch-select' name="" id="">
        <option value="0">Bütün filiallar</option>
        {
            stores && stores.map(item => {
                return(
                    <option key={item._id} value={item._id}>{item.name}</option>
                )
            })
        }
    </select>
    <div className="col-lg-12">
    <table className='table table-bordered table-dark'>
        <thead>
            <tr>
            <th>Adı</th>
            <th>Ünvanı</th>
            <th>Əlaqə</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            {
                branches && branches.map(item => {
                    return(
                        <tr style={{verticalAlign: "middle"}} key={item._id}>
                            <td>{item.name}</td>   
                            <td>{item.address}</td>   
                            <td>{item.phone}</td>   
                            <td>
                                <Link to={`/manage/branches/${item._id}`} className='btn btn-warning ms-1'><AiOutlineEdit /></Link>
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

export default Branches
import axios from 'axios'
import React, { useState } from 'react'
import { GrClose } from 'react-icons/gr'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiUrl from '../utils/api';

const ModalBox = (props) => {
    const id = props.id;
    const [order, setOrder] = useState({
        name: '',
        phone: '',
        description: '',
        productId: id
    })

    const orderHandler = async () => {
        try {
            await axios.post(apiUrl.orderApi.addOrder, order)
            toast.success('Sifariş göndərildi', {
                position: "bottom-right",
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.log('Sifariş göndərilən zaman xəta baş verdi:' , error);
        }
    }
  return (
    <>
        {
            props.data ? <div className='modal-box'>
                <div className="modal-main">
                    <div className="modal-header">
                    <h4>Şəxsi məlumatlar</h4>
                    <GrClose onClick={() => window.location.reload()}/>
                    </div>
                    <div className="modal-body">
                            <div className='form-group mt-3'>
                                <label className='mb-2' htmlFor="username">Ad, Soyad</label>
                                <input onChange={(e) => setOrder({ ...order, name: e.target.value })} type="text" className='form-control' />
                            </div>
                            <div className='form-group mt-3'>
                                <label className='mb-2' htmlFor="username">Telefon nömrəsi</label>
                                <input onChange={(e) => setOrder({ ...order, phone: e.target.value })} type="tel" className='form-control' />
                            </div>
                            <div className='form-group mt-3'>
                                <label className='mb-2' htmlFor="description">Sifarişin məzmunu</label>
                                <input onChange={(e) => setOrder({ ...order, description: e.target.value })} type="textarea" className='form-control' />
                            </div>
                            <button onClick={orderHandler} className='btn btn-success mt-3'>Sifarişi göndər</button>
                    </div>
                    <ToastContainer />
                </div>
            </div> : null
        }
    </>
  )
}

export default ModalBox

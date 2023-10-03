import React, { useState ,useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiUrl from '../../../utils/api';


const CreateBrand = () => {
    const [item, setItem] = useState({
        name: ''
    })

    const handleSubmit = async () => {
        console.log(item);
        try {
            const response = await axios.post(`${apiUrl.brandApi.addBrand}`, item)
            toast.success('Brend əlavə olundu', {
                            position: "bottom-right",
                            autoClose: 2000,
                            closeOnClick: true,
                            pauseOnHover: true,
                            progress: undefined,
                            theme: "light",
                        });
        } catch (error) {
            console.log('Brend əlavə olunan zaman xəta baş verdi:' , error);
        }
    }
  return (
    <div className="container">
        <h3 style={{fontFamily: "Regular", padding: "20px 0"}}>Yeni brend</h3>
        <div className='col-lg-6 mx-auto'>
        <div className="add-box">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Brend adı</Form.Label>
                <Form.Control onChange={(e) => setItem({ ...item, name: e.target.value })} type="text"/>
            </Form.Group>
             <button onClick={handleSubmit} className='btn btn-success w-100 mt-4'>Əlavə et</button>
        </div>
          
    </div>
    <ToastContainer />
    </div>
  )
}

export default CreateBrand

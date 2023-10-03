import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const CreateSub = () => {
    const { id } = useParams();
    const [item, setItem] = useState({
        name: '',
        categoryId: id
    })

    const handleSubmit = async () => {
        console.log(item)
        try {
            const response = await axios.post(`http://localhost:5000/api/category/${id}/add-subcategory`, item)
            toast.success('Alt Kateqoriya əlavə olundu', {
                            position: "bottom-right",
                            autoClose: 2000,
                            closeOnClick: true,
                            pauseOnHover: true,
                            progress: undefined,
                            theme: "light",
                        });
        } catch (error) {
            console.log('Kateqoriya əlavə olunan zaman xəta baş verdi:' , error);
        }
    }
  return (
    <div className="container">
        <h3 style={{fontFamily: "Regular", padding: "20px 0"}}>Yeni Alt kateqoriya</h3>
        <div className='col-lg-6 mx-auto'>
        <div className="add-box">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Kateqoriya adı</Form.Label>
                <Form.Control onChange={(e) => setItem({ ...item, name: e.target.value })} type="text"/>
            </Form.Group>
             <button onClick={handleSubmit} className='btn btn-success w-100 mt-4'>Əlavə et</button>
        </div>
          
    </div>
    <ToastContainer />
    </div>
  )
}

export default CreateSub
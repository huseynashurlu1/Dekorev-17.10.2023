import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiUrl from '../../../utils/api';

const AddBranch = () => {
    const [stores, setStores] = useState([])
    const [item, setItem] = useState({
        storeId: '',
        name: '',
        address: '',
        phone: ''
    })

    useEffect(() => {
        const getItems = async () => {
          await axios.get(`${apiUrl.storeApi.storeURL}/all`)
          .then(res => {
              setStores(res.data)
          })
          .catch(err => console.log(err))
        }
        getItems()
      }, [])
  
    

    const changeHandler = async (e) => {
        setItem({
            ...item,
            storeId: e.target.value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post(`${apiUrl.branchApi.branchURL}/add`, item);
          alert('Filial əlavə edildi');
        } catch (error) {
          console.error('Xəta:', error);
        }
      };
    

    return (
    <div className="container">
        <h3 style={{fontFamily: "Regular", padding: "20px 0", color: "#fff"}}>Yeni Filial</h3>
        <div className='col-lg-6 mx-auto'>
        <div className="add-box">
            <select onChange={changeHandler} className='branch-select' name="" id="">
                <option value="">Mağaza seçin</option>
                {
                    stores && stores.map(item => {
                        return(
                            <option key={item._id} value={item._id}>{item.name}</option>
                        )
                    })
                }
            </select>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Filial adı</Form.Label>
                <Form.Control onChange={(e) => setItem({ ...item, name: e.target.value })} type="text"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Ünvanı</Form.Label>
                <Form.Control onChange={(e) => setItem({ ...item, address: e.target.value })} type="text"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Telefon</Form.Label>
                <Form.Control onChange={(e) => setItem({ ...item, phone: e.target.value })} type="text"/>
            </Form.Group>
             <button onClick={handleSubmit} className='btn btn-success w-100 mt-4'>Əlavə et</button>
        </div>
          
    </div>
    <ToastContainer />
    </div>
  )
}

export default AddBranch
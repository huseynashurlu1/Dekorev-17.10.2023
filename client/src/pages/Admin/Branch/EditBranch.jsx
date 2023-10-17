import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import apiUrl from '../../../utils/api';
import { ToastContainer } from 'react-toastify';


const EditBranch = () => {
    const { id } = useParams();
    const [data, setData] = useState();
    const [updatedData, setUpdatedData] = useState({});

    useEffect(() => {
        const getItem = async () => {
          try {
            const response = await axios.get(`${apiUrl.branchApi.branchURL}/all/${id}`);
            setData(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        getItem();
      }, [id]);

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({
        ...updatedData,
        [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.put(`${apiUrl.branchApi.branchURL}/${id}`, updatedData);
          alert('Filial redaktə olundu')
        } catch (error) {
          console.error(error);
        }
      };

      
  return (
    <>
        {
            
            data && <div className="container">
            <h3 style={{fontFamily: "Regular", padding: "20px 0",color: "#fff"}}>Filialı Redaktə et</h3>
            <div className='col-lg-6 mx-auto'>
            <div className="add-box">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Filial adı</Form.Label>
                    <Form.Control onChange={handleInputChange} type="text" name='name' defaultValue={data.name}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Ünvanı</Form.Label>
                    <Form.Control onChange={handleInputChange} type="text" name='address' defaultValue={data.address}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Telefon</Form.Label>
                    <Form.Control onChange={handleInputChange} type="text" name='phone' defaultValue={data.phone}/>
                </Form.Group>
                <button onClick={handleSubmit} className='btn btn-warning w-100 mt-4'>Redaktə et</button>
            </div>
            
        </div>
        <ToastContainer />
      </div>
        }
    </>
  )
}

export default EditBranch
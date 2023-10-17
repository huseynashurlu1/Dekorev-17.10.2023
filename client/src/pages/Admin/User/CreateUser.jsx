import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import apiUrl from '../../../utils/api';



const CreateStore = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl.authApi.authURL}/register`, user);

      alert('İstifadəçi əlavə edildi');
    } catch (error) {
      console.error('Xəta:', error);
    }
  };
  return (
    <div className="container">
    <h3 style={{fontFamily: "Regular", padding: "20px 0"}}>Yeni İstifadəçi</h3>
    <div className='col-lg-6 mx-auto'>
    <Form onSubmit={handleSubmit} encType="multipart/form-data" >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>İstifadəçi adı</Form.Label>
            <Form.Control type="text" onChange={(e) => setUser({ ...user, username: e.target.value })} defaultValue={user.username}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" onChange={(e) => setUser({ ...user, email: e.target.value })} defaultValue={user.email}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Şifrə</Form.Label>
            <Form.Control type='password' onChange={(e) => setUser({ ...user, password: e.target.value })} defaultValue={user.password}/>
        </Form.Group>
         <button type='submit' className='btn btn-success w-100 mt-4'>Əlavə et</button>
        
    </Form>
</div>
</div>
  )
}

export default CreateStore
import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import apiUrl from '../../../utils/api';



const CreateStore = () => {
  const [users, setUsers] = useState([])
  const [item, setItem] = useState({
    name: '',
    image: null,
    description: '',
    address: '',
    phone: '',
    workHours: '',
    ownerId: ''
  });

  useEffect(() => {
    const getUsers = async () => {
      await axios.get(`${apiUrl.userApi.userURL}/all-users`)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
    }

    getUsers()
  }, [])


  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setItem({ ...item, image: imageFile });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(item);
    try {
      const formData = new FormData();
      formData.append('name', item.name);
      formData.append('image', item.image);
      formData.append('description', item.description);
      formData.append('address', item.address);
      formData.append('phone', item.phone);
      formData.append('workHours', item.workHours);
      formData.append('ownerId', item.ownerId);
      

      await axios.post(`${apiUrl.storeApi.storeURL}/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Mağaza əlavə edildi');
    } catch (error) {
      console.error('Xəta:', error);
    }
  };
  return (
    <div className="container">
    <h3 style={{fontFamily: "Regular", padding: "20px 0"}}>Yeni mağaza</h3>
    <div className='col-lg-6 mx-auto'>
    <Form onSubmit={handleSubmit} encType="multipart/form-data" >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Mağaza adı</Form.Label>
            <Form.Control type="text" onChange={(e) => setItem({ ...item, name: e.target.value })} defaultValue={item.name}/>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Şəkli</Form.Label>
            <Form.Control onChange={handleImageChange} type="file" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Təsviri</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={(e) => setItem({ ...item, description: e.target.value })} defaultValue={item.description}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Ünvanı</Form.Label>
            <Form.Control type="text" onChange={(e) => setItem({ ...item, address: e.target.value })} defaultValue={item.name}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Telefon</Form.Label>
            <Form.Control type="text" onChange={(e) => setItem({ ...item, phone: e.target.value })} defaultValue={item.name}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>İş saatları</Form.Label>
            <Form.Control type="text" onChange={(e) => setItem({ ...item, workHours: e.target.value })} defaultValue={item.name}/>
        </Form.Group>
        <Form.Select value={item.ownerId} name="ownerId" className='mb-4' aria-label="Default select example" onChange={(e) => {
              setItem({ ...item, ownerId: e.target.value })
            }}>
                <option>İstifadəçi</option>
                {
                    users && users.map(item => {
                        return(
                           <option key={item._id} value={item._id}>{item.username}</option>
                        )
                    })
                }
            </Form.Select>
         <button type='submit' className='btn btn-success w-100 mt-4'>Əlavə et</button>
        
    </Form>
</div>
</div>
  )
}

export default CreateStore
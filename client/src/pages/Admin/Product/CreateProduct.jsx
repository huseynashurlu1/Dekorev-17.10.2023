import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import apiUrl from '../../../utils/api';



const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [colors, setColors] = useState([]);
    const [item, setItem] = useState({
        name: '',
        description: '',
        price: '',
        phone: '',
        images: null,
        isDiscounted: false,
        discountedPrice: '',
        isNew: false,
        isVIP: false,
        hasShipping: false,
        city: '',
        categoryId: '',
        storeId: '',
        colorId: ''
      });

      useEffect(() => {
        async function getCategories() {
          const response = await axios.get(`${apiUrl.categoryApi.categoryURL}/all`);
          setCategories(response.data);
        }
    
        async function getStores() {
          const response = await axios.get(`${apiUrl.storeApi.storeURL}/all`);
          setStores(response.data);
        }

        async function getColors() {
          const response = await axios.get(`${apiUrl.colorApi.colorURL}/all`);
          setColors(response.data);
        }
    
        getCategories();
        getStores();
        getColors();
      }, []);

      const handleImageChange = (e) => {
        const imageFile = e.target.files;
        setItem({ ...item, images: imageFile });
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(item);
        try {
          const formData = new FormData();
          formData.append('name', item.name);
          formData.append('description', item.description);
          formData.append('price', item.price);
          formData.append('phone', item.phone);
          for (let i = 0; i < item.images.length; i++) {
            formData.append('images', item.images[i]);
          }
          formData.append('isDiscounted', item.isDiscounted);
          formData.append('discountedPrice', item.discountedPrice);
          formData.append('isNew', item.isNew);
          formData.append('isVIP', item.isVIP);
          formData.append('hasShipping', item.hasShipping);
          formData.append('city', item.city);
          formData.append('categoryId', item.categoryId);
          formData.append('storeId', item.storeId);
          formData.append('colorId', item.colorId);
    
    
          await axios.post(`${apiUrl.productApi.productURL}/add`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data', 
            },
          });
    
          alert('Məhsul əlavə edildi');
        } catch (error) {
          console.error('Xəta:', error);
        }
      };

  return (
    <div className="container">
        <h3 style={{fontFamily: "Regular", padding: "20px 0", color: '#fff'}}>Yeni məhsul</h3>
        <div className='col-lg-6 mx-auto'>
        <Form onSubmit={handleSubmit} encType="multipart/form-data" >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Məhsulun adı</Form.Label>
                <Form.Control type="text" onChange={(e) => setItem({ ...item, name: e.target.value })} defaultValue={item.name}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Təsviri</Form.Label>
                <Form.Control as='textarea' onChange={(e) => setItem({ ...item, description: e.target.value })} defaultValue={item.description}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Qiyməti</Form.Label>
                <Form.Control type="text" onChange={(e) => setItem({ ...item, price: e.target.value })} defaultValue={item.price}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Telefon</Form.Label>
                <Form.Control type="text" onChange={(e) => setItem({ ...item, phone: e.target.value })} defaultValue={item.phone}/>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Şəkli</Form.Label>
                <Form.Control onChange={handleImageChange} type="file"  multiple/>
            </Form.Group>
            <Form.Check inline label="Endirimli" name="isDiscounted" type="checkbox" checked={item.isDiscounted} onChange={(e) => setItem({ ...item, isDiscounted: e.target.checked })} />
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Endirimli qiyməti</Form.Label>
                <Form.Control type="text" onChange={(e) => setItem({ ...item, discountedPrice: e.target.value })} defaultValue={item.discountedPrice}/>
            </Form.Group>
            <Form.Check inline label="Yenidir" name="isNew" type="checkbox" checked={item.isNew} onChange={(e) => setItem({ ...item, isNew: e.target.checked })} />
            <Form.Check inline label="VIP" name="isVIP" type="checkbox" checked={item.isVIP} onChange={(e) => setItem({ ...item, isVIP: e.target.checked })} />
            <Form.Check inline label="Çatdırılma" name="hasShipping" type="checkbox" checked={item.hasShipping} onChange={(e) => setItem({ ...item, hasShipping: e.target.checked })} />
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Şəhər</Form.Label>
                <Form.Control type="text" onChange={(e) => setItem({ ...item, city: e.target.value })} defaultValue={item.city}/>
            </Form.Group>
            <Form.Select value={item.categoryId} name="categoryId" className='mb-4' aria-label="Default select example" onChange={(e) => {
                    setItem({ ...item, categoryId: e.target.value })
                    }}>
                        <option>Kateqoriya</option>
                        {
                            categories && categories.map(item => {
                                return(
                                <option key={item._id} value={item._id}>{item.name}</option>
                                )
                            })
                        }
                </Form.Select>
                <Form.Select value={item.storeId} name="storeId" className='mb-4' aria-label="Default select example" onChange={(e) => {
                    setItem({ ...item, storeId: e.target.value })
                    }}>
                        <option>Mağaza</option>
                        {
                            stores && stores.map(item => {
                                return(
                                <option key={item._id} value={item._id}>{item.name}</option>
                                )
                            })
                        }
                </Form.Select>
                <Form.Select value={item.colorId} name="colorId" className='mb-4' aria-label="Default select example" onChange={(e) => {
                    setItem({ ...item, colorId: e.target.value })
                    }}>
                        <option>Rəng</option>
                        {
                            colors && colors.map(item => {
                                return(
                                <option key={item._id} value={item._id}>{item.name}</option>
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

export default CreateProduct
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import apiUrl from '../../../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsTrash3 } from 'react-icons/bs';

const EditStore = () => {
  const { id } = useParams();
    const [data, setData] = useState();
    const [updatedData, setUpdatedData] = useState({});

    useEffect(() => {
        const getItem = async () => {
          try {
            const response = await axios.get(`${apiUrl.storeApi.storeURL}/details/${id}`);
            setData(response.data);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        getItem()
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
          const formData = new FormData();
          
          if (updatedData.image instanceof File) {
              formData.append('image', updatedData.image);
          } else {
              updatedData.image = null;
          }
  
          await axios.put(`${apiUrl.storeApi.storeURL}/${id}`, updatedData);
          alert('Mağaza redaktə olundu');
      } catch (error) {
          console.error(error);
      }
  };


      const DeleteHandler = async (id) => {
        try {
            const response = await axios.delete(`${apiUrl.productApi.productURL}/${id}`)
            setData(prevData => prevData.filter(item => item._id !== id));
            toast.error('Məhsul silindi', {
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
    <>
        {
            
            data && <div className="container">
            <h3 style={{fontFamily: "Regular", padding: "20px 0",color: "#fff"}}>Mağaza Redaktə et</h3>
            <div className="row">
            <div className='col-lg-6'>
            <div className="add-box">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Mağaza adı</Form.Label>
                    <Form.Control onChange={handleInputChange} type="text" name='name' defaultValue={data.name}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Telefon</Form.Label>
                    <Form.Control onChange={handleInputChange} type="text" name='phone' defaultValue={data.phone}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label>Şəkli</Form.Label>
                  <input type="file" name="image" accept="image/*" onChange={handleInputChange} />
                </Form.Group>
                <img src={`http://localhost:5000/uploads/store/${data.image}`} alt="" />
            </div>
          </div>
          <div className="col-lg-6">
          <div className="add-box">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                    <Form.Label>Təsviri</Form.Label>
                    <Form.Control onChange={handleInputChange} type="text" name='description' defaultValue={data.description}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                    <Form.Label>Ünvanı</Form.Label>
                    <Form.Control onChange={handleInputChange} type="text" name='address' defaultValue={data.address}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                    <Form.Label>İş saatları</Form.Label>
                    <Form.Control onChange={handleInputChange} type="text" name='phone' defaultValue={data.workHours}/>
                </Form.Group>
                <button onClick={handleSubmit} className='btn btn-warning w-100 mt-4'>Redaktə et</button>
            </div>
          </div>
            </div>
        <table className='mt-5 table table-bordered table-dark'>
            <thead>
                <tr>
                <th>Məhsulun kodu</th>
                <th>Şəkli</th>
                <th>Adı</th>
                <th>Statusu</th>
                <th>Qiyməti</th>
                <th>Endirimli qiyməti</th>
                <th>Əməliyyatlar</th>
                </tr>
            </thead>
            <tbody>
               {
                data.products.map(item => {
                  return(
                    <tr style={{verticalAlign: "middle"}} key={item._id}>
                                    <td style={{width: "20%"}}>{item._id}</td>
                                    <td style={{width:"20%"}}>
                                        <img style={{width:"100%",objectFit: 'contain',height: '150px'}} src={`http://localhost:5000/uploads/product/${item.images[0].url}`} alt="" />
                                    </td>
                                    <td style={{width: "25%"}}>{item.name}</td>
                                    <td style={{width: "10%"}}>{item.isVIP ? 'VIP' : '---'}</td>
                                    <td style={{width: "10%"}}>{item.price} ₼</td>
                                   {
                                    item.isDiscounted ?  <td style={{width: "10%"}}>{item.discountedPrice} ₼</td> : <td style={{width: "10%"}}>--</td>
                                   }
                                    <td>
                                        <Link to={`/admin/product/${item._id}`} className='btn btn-warning mb-1'><AiOutlineEdit /></Link>
                                        <button onClick={() => DeleteHandler(item._id)} className='btn btn-danger mt-1'><BsTrash3 /></button>
                                    </td>
                    </tr>
                )
                })
               }
            </tbody>
        </table>
        <ToastContainer />
      </div>
        }
    </>
  )
}

export default EditStore
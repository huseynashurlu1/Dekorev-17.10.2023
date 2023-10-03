import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import apiUrl from '../../../utils/api';

const ProductDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await axios.get(`${apiUrl.productApi.getProducts}/${id}`);
        setData(response.data);
        setUpdatedData(response.data); 
      } catch (error) {
        console.error(error);
      }
    };
    getItem();
  }, [id]);

  const checkHandler = () => {
    setIsChecked(!isChecked);
  };

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
      await axios.put(`${apiUrl.productApi.getProducts}/${id}`, updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {data && (
        <div className="container">
          <h3 style={{ fontFamily: "Regular", padding: "20px 0" }}>Yeni məhsul</h3>
          <div className='col-lg-6 mx-auto'>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Məhsulun adı</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  defaultValue={data.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="price">
                <Form.Label>Qiyməti</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  defaultValue={data.price}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Check
                className='my-4'
                inline
                label="Endirimli məhsul"
                name="discount"
                type='checkbox'
                id=''
                checked={isChecked}
                onChange={checkHandler}
              />
              {isChecked ? (
                <Form.Group className="mb-3" controlId="discountedPrice">
                  <Form.Label>Endirimli qiyməti</Form.Label>
                  <Form.Control
                    type="number"
                    name="discountedPrice"
                    value={updatedData.discountedPrice || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              ) : null}
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Təsviri</Form.Label>
                <Form.Control
                  defaultValue={data.description}
                  as="textarea"
                  rows={3}
                  name="description"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Check
                inline
                label="Çatdırılma"
                name="shipping"
                type='checkbox'
                id=''
                defaultChecked={data.shipping}
                onChange={handleInputChange}
              />
              <button className='btn btn-warning text-white w-100 mt-4' type="submit">Redaktə et</button>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;

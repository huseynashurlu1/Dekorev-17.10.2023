import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiUrl from '../../utils/api';
import { AiOutlineClose } from 'react-icons/ai'

const CategoryModal = ({ active, modalHandler }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getAllCategories = async () => {
      await axios.get(`${apiUrl.categoryApi.categoryURL}/all`)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
    }
  
    getAllCategories();
  }, [])
  return (
    <div className={`category-mobile-modal ${active ? 'modal-active' : ''}`}>
      <div className="container">
        <div className="category-box">
            <ul>
              {
                data && data.map(item => {
                  return(
                    <li key={item._id}>
                      <img src={`http://localhost:5000/uploads/category/${item.image}`} alt={`${item.name} şəkli`} />
                      <button onClick={modalHandler}>
                        <Link to={`/category/${item._id}`}>{item.name}</Link>
                      </button>
                    </li>
                  )
                })
              }
            </ul>
        </div>
          </div>
      <button className='close-modal-btn' onClick={modalHandler}><AiOutlineClose /></button>
    </div>
  );
};

export default CategoryModal;
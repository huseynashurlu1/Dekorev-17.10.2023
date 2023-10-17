import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './category.css'
import axios from 'axios'
import apiUrl from '../../utils/api'
import CategoryModal from './CategoryModal'

const Category = () => {
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
    <>
        <div className="category-list category-box">
          <div className="container">
            <ul>
              {
                data && data.map(item => {
                  return(
                    <li key={item._id}>
                      <img src={`http://localhost:5000/uploads/category/${item.image}`} alt={`${item.name} şəkli`} />
                      <Link to={`/category/${item._id}`}>{item.name}</Link>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        {data && <CategoryModal data={data}/>}
    </>
  )
}
export default Category

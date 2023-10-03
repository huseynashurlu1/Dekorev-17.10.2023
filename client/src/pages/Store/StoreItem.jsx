import React from 'react'
import { BsTelephone } from 'react-icons/bs'
import {  Link } from 'react-router-dom'


const StoreItem = (props) => {
  console.log(props);
    const {_id, image, name, description, phone} = props.data
  return (
    <div className="col-lg-6">
                      <Link to={`/store/details/${_id}`}>
                        <div className="store-box">
                            <div className="store-image">
                            <img src={`http://localhost:5000/uploads/store/${image}`} alt="" />
                            </div>
                            <div className="store-info">
                            <h4>{name}</h4>
                            <p>{description.length > 250 ? description.slice(0,250) + "..." : description}</p>
                            <a href=""><BsTelephone /> {phone}</a>
                            <p>{props.data.products.length} məhsul</p>
                            </div>
                        </div>
                      </Link>
                    </div>
  )
}

export default StoreItem
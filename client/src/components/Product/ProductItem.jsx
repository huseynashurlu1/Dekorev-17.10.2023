import React from 'react'
import { Link } from 'react-router-dom'
import './product.css'

const ProductItem = (props) => {
  const { _id, name,price, isVIP,images } = props.data;
//   const { category } = props.data.categoryId.name

  return (
    <div className="col-lg-3 col-6">
                        <Link to={`/details/${_id}`}>
                            <div className="item-box">
                                <div className="box-top">
                                    {isVIP && <span>VIP</span>}
                                    <img src={`http://localhost:5000/uploads/product/${images[0].url}`} alt="" />
                                </div>
                                <div className="box-bottom">
                                    <span></span>
                                    <h6>{name}</h6>
                                    <div className="bb-price-cart d-flex justify-content-between align-items-center">
                                        <span className="price">{price} <span className="manat">₼</span></span>
                                        <button className="add-basket-btn">
                                            <i className="fa-solid fa-cart-shopping"></i>
                                            <span>Səbətə at</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
  )
}

export default ProductItem

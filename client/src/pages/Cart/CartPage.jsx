import React from 'react'
import './cart.css'
import { BsTrash3 } from 'react-icons/bs'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { removeItem } from '../../store/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import AlertBox from '../../components/AlertBox';

const CartPage = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
        const basket = JSON.parse(localStorage.getItem('cart'));
        setProducts(basket);
      }, [])
      

    let totalAmount = 0
    const calculateTotalPrice = (product) => {
        return product.price * product.count;
    };
    calculateTotalPrice(products)

    for (const product of products) {
        totalAmount += calculateTotalPrice(product);
    }


     const handleRemoveFromCart = (id) => {
        dispatch(removeItem(id));
        setProducts(products.filter((item) => item._id !== id));
        navigate('/cart');
      };

      const plusHandler = (item) => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let existProd = cart.find(x => x._id === item.item._id);
    
        if(existProd === undefined) {
          cart.push(existProd)
        }
        else{
          existProd.count += 1
        }
        
        localStorage.setItem('cart', JSON.stringify(cart))
        setProducts(cart)
        navigate('/cart');
      }
    
    
      const minusHandler = (item) => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let existProd = cart.find(x => x._id === item.item._id);
    
        if(existProd === undefined) {
          cart.push(existProd)
        }
        else{
          existProd.count > 1 ? existProd.count -= 1 : existProd.count = 1
        }
        
        localStorage.setItem('cart', JSON.stringify(cart))
        setProducts(cart)
        navigate('/cart');
      }


      if(products.length == 0) {
        return <AlertBox text='Səbətdə məhsul yoxdur.'/>
      }

    let count = 0
    let sum = 0
    
    const totalSum = () => {
        products.forEach(x => {
            sum += x.price
        })
        return sum
    }

  return (
    <section id="Cart">
        <div className="container">
            <div className="row mt-5 align-items-baseline justify-content-between">
                <div className="card-box col-lg-9">

                    <div className="cart-top">
                        <h1 className="cart-head">Səbət</h1>
                        <div className="d-flex justify-content-between">
                            <h6 className="text-body">Səbətdə <span id="Total_Counts" className="text-count">{products.length}</span> məhsul var</h6>
                        </div>
                    </div>
                    <div className="cart-main">
                            <div style={{overflowX:"auto"}} className="cart-header-left">
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>*</th>
                                            <th>Şəkli</th>
                                            <th>Məhsulun adı</th>
                                            <th>Qiyməti</th>
                                            <th>Ədəd</th>
                                            <th>Ümumi məbləğ</th>
                                            <th>Sil</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products && products.map(item => {
                                                count++
                                                return(
                                                    <tr>
                                                        <td>{count}</td>
                                                        <td>
                                                            <img src={`http://localhost:5000/uploads/product/${item.images[0].url}`} alt="" />
                                                        </td>
                                                        <td>{item.name}</td>
                                                        <td>{item.price} ₼</td>
                                                        <td>{item.count}</td>
                                                        <td>{(item.price) * (item.count)} ₼</td>
                                                        <td>
                                                            <button onClick={() => handleRemoveFromCart(item._id)}>
                                                                <BsTrash3 />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        <div id="Cart_Main" className="pro-boxs"></div>
                    </div>
                </div>
                <div id="Product_Sub" className="products-subtotal col-lg-3">
                    <div className="subtotal-table">
                        <div className="subtotal">
                            <h6>Ümumi məbləğ</h6>
                           {
                             <h1 id="TotalPriceSub" className="totalPrice">{totalSum()} ₼</h1>
                           }
                        </div>
                        <div className="total">
                            <h6>Məhsul sayı</h6>
                            <h1 id="Total_Count" className="totalPrice">{products.length}</h1>
                        </div>
                    </div>
                    <a href="#">Alış verişə davam et</a>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CartPage

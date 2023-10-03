import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../assets/css/details.css'
import apiUrl from '../utils/api'
import Spinner from '../components/Spinner'
import { useDispatch } from 'react-redux'
import { addItem } from '../store/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DetailPage = () => {
  const { id } = useParams()
  const [item, setItem] = useState()
  const dispatch = useDispatch();



  useEffect(() => {
    const getItem = async () => {
        try {
            const res = await axios.get(`${apiUrl.productApi.productURL}/details/${id}`)
            setItem(res.data)
            await axios.put(`${apiUrl.productApi.productURL}/increase/${id}`)
        } catch (error) {
            console.log(error)
        }
    }
      getItem()
  }, [])

  const handleAddToCart = () => {
    dispatch(addItem({ ...item,count: 1 }));
    toast.success('Məhsul səbətə əlavə olundu', {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
  };

  return (
      <section id="Product-details">
        {
          item ? <div className="container">
          <div className="pr-box">
              <div className="row">
                  <div className="col-lg-3">
                      <div className="pr-img">
                          <img id="prod_img" src={`http://localhost:5000/uploads/product/${item.images[0].url}`} alt="" />
                      </div>
                  </div>
                  <div className="col-lg-6">
                      <div className="pr-details">
                          <span className="pr-cat">{item.categoryId.name}</span>
                          <h4 id="prod_name" className="pr-name">{item.name}</h4>
                          <hr />
                          <p className="shipping">Çatdırılma: <span>{item.isShipping ? 'Var' : 'Yoxdur'}</span></p>
                          <p className="new-old">Yeni: <span>{item.isNew ? 'Bəli' : 'Xeyr'}</span></p>
                          <p className="city">Şəhər: <span>{item.city}</span></p>

                          <form action="">
                              <button type="submit" style={{backgroundColor: "#04913a"}}>
                                  İrəli çək
                              </button>
                              <button type="submit" style={{backgroundColor: "#eeb90d"}}>
                                  VIP et
                              </button>
                              <button type="submit" style={{backgroundColor: "#ee5833"}}>
                                  Premium et
                              </button>
                          </form>
                      </div>
                  </div>
                  <div className="col-lg-3">
                      <div className="cust-details">
                          <div className="price-sec">
                              <span className="pr-price"><span id="prod_price">{item.price}</span> <span>₼</span></span>
                          </div>
                          <ul>
                              <li>
                                  <span>Elanın nömrəsi: <span id="prod_id">481290</span></span>
                              </li>
                              <li>
                                  <span>Yüklənmə tarixi: <span>{item.createDate}</span></span>
                              </li>
                              <li>
                                  <span>Baxış sayı: <span>{item.viewCount}</span></span>
                              </li>
                              <li>
                                  <span>Əlaqə: <span style={{color: "#333e48"}}>{item.phone}</span></span>
                              </li>
                              <li>
                                  <span>Mağaza: <a href="store-details.html" style={{color: "#333e48",fontWeight: "bold"}}>Collezine Italiano</a></span>
                              </li>
                          </ul>
                          <div className="shop-cart-btn">
                              <button onClick={handleAddToCart} className="add-to-cart-button">Səbətə at</button>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="tab-details">
                  <p>{item.description}</p>
              </div>
              <ToastContainer />
          </div>
      </div> : <Spinner />
        }
    </section>
    )
}

export default DetailPage

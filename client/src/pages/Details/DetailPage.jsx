import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import './details.css'
import apiUrl from '../../utils/api'
import Spinner from '../../components/Spinner'
import { useDispatch } from 'react-redux'
import { addItem } from '../../store/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormattedMessage } from 'react-intl'
import ProductSlider from '../../components/Slider/ProductSlider'


const DetailPage = () => {
  const { id } = useParams()
  const [item, setItem] = useState()
  const [btn, setBtn] = useState(false)
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

      const basket = JSON.parse(localStorage.getItem('cart'))

        const exist = basket.find(item => item._id === id)
        if(exist !== undefined) {
            setBtn(true)
        }
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
    setBtn(true)
  };

  return (
      <section id="Product-details">
        {
          item ? <div className="container">
          <div className="pr-box">
              <div className="row">
                  <div className="col-lg-4">
                      <div className="pr-img">
                        <ProductSlider images={item.images}/>
                      </div>
                  </div>
                  <div className="col-lg-5">
                      <div className="pr-details">
                          <span className="pr-cat">{item.categoryId.name}</span>
                          <h4 id="prod_name" className="pr-name">{item.name}</h4>
                          <hr />
                          <p className="shipping"><FormattedMessage id='Çatdırılma' defaultMessage='Çatdırılma'/>: <span>{item.isShipping ? <FormattedMessage id='Mövcuddur' defaultMessage='Mövcuddur'/> :  <FormattedMessage id='Xeyr' defaultMessage='Yoxdur'/> }</span></p>
                          <p className="new-old"><FormattedMessage id='Yeni' defaultMessage='Yeni'/>: <span>{item.isNew ? <FormattedMessage id='Bəli' defaultMessage='Bəli'/> : <FormattedMessage id='Xeyr' defaultMessage='Xeyr'/>}</span></p>
                          <p className="city"><FormattedMessage id='Şəhər' defaultMessage='Şəhər'/>: <span>{item.city}</span></p>

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
                              {
                                item.isDiscounted ? <span className="pr-price"><del>{item.price} ₼</del> <span id="prod_price">{item.discountedPrice} <span>₼</span></span></span> :
                                <span className="pr-price"><span id="prod_price">{item.price} <span>₼</span></span></span>
                              }
                          </div>
                          <ul>
                              <li>
                                  <span><FormattedMessage id='Elanın nömrəsi' defaultMessage='Elanın nömrəsi'/>: <span id="prod_id">481290</span></span>
                              </li>
                              <li>
                                  <span><FormattedMessage id='Yüklənmə tarixi' defaultMessage='Yüklənmə tarixi'/>: <span>{item.createDate}</span></span>
                              </li>
                              <li>
                                  <span><FormattedMessage id='Baxış sayı' defaultMessage='Baxış sayı'/>: <span>{item.viewCount}</span></span>
                              </li>
                              <li>
                                  <span><FormattedMessage id='Əlaqə' defaultMessage='Əlaqə'/>: <span style={{color: "#333e48"}}>{item.phone}</span></span>
                              </li>
                              <li>
                                  <span><FormattedMessage id='Mağaza' defaultMessage='Mağaza'/>: <Link to={`/store/details/${item.storeId._id}`} style={{color: "#333e48",fontWeight: "bold"}}>{item.storeId.name}</Link></span>
                              </li>
                          </ul>
                          <div className="shop-cart-btn">
                            {
                                btn ? <button disabled className="add-to-cart-button bg-warning text-white">Səbətdədir</button> :
                                <button onClick={handleAddToCart} className="add-to-cart-button"><FormattedMessage id='Səbətə at' defaultMessage='Səbətə at'/></button>
                                
                            }
                              
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

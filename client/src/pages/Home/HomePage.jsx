import { Link } from 'react-router-dom'
import './home.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../utils/api'
import ProductItem from '../../components/Product/ProductItem'

const HomePage = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        const getItems = async () => {
            await axios.get(`${apiUrl.productApi.productURL}/home-products`)
            .then(res => setItems(res.data))
            .catch(err => console.log(err))
        }
        getItems()
    })

    if(!items) {
        return '...'
    }

  return (
    <>
        <div className="container">
          <section id="Slider">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-3 col-6 d-phone-none">
                          <div className="sl-box">
                              <img src="https://konsept.qodeinteractive.com/wp-content/uploads/2020/04/Home4_section4-3.jpg" alt="" />
                          </div>
                          <div className="sl-box">
                              <img src="https://konsept.qodeinteractive.com/wp-content/uploads/2020/04/Home4_section4-2.jpg" alt="" />
                          </div>
                      </div>
                      <div className="col-lg-9">
                          <div className="slide-box">
                              <img src="https://konsept.qodeinteractive.com/wp-content/uploads/2020/07/background_c1.jpg" alt="" />
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          <section id='VIP'>
            <div className="conti">
                <div className="vip-top d-flex justify-content-between align-items-center">
                    <h3>VIP ELANLAR</h3>
                    <Link>Hamısını göstər</Link>
                </div>
                <div className="vip-items">
                    <div className="row">
                        {
                            items.filter(item => item.isVIP === true).map(item => {
                                return(
                                    <ProductItem data={item}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
          </section>
          <section id='VIP'>
            <div className="conti">
                <div className="vip-top d-flex justify-content-between align-items-center">
                    <h3>ƏN ÇOX BAXILANLAR</h3>
                    <Link>Hamısını göstər</Link>
                </div>
                <div className="vip-items">
                    <div className="row">
                        {
                            items.filter(item => item.viewCount > 100).map(item => {
                                return(
                                    <ProductItem data={item}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
          </section>
        </div>
    </>
  )
}
export default HomePage

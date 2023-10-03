import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import './store.css'
import axios from 'axios'
import apiUrl from '../../utils/api'
import Spinner from '../../components/Spinner'
import { CiLocationOn, CiPhone, CiTimer } from 'react-icons/ci'
import { BsEye } from 'react-icons/bs'
import ProductItem from '../../components/Product/ProductItem'
import AlertBox from '../../components/AlertBox'

const StoreDetails = () => {
    const { id } = useParams()
    const [store, setStore] = useState()


  useEffect(() => {
    const getStore = async () => {
        try {
            const res = await axios.get(`${apiUrl.storeApi.storeURL}/details/${id}`)
            setStore(res.data)
            await axios.put(`${apiUrl.storeApi.storeURL}/increase/${id}`)
        } catch (error) {
            console.log(error)
        }
    }
    getStore()
  }, [])
  
  return (
    <section id="Store-details">
       {
        store ?  <div className="container">
        <div className="sd-info d-flex justify-content-between align-items-center">
            <div className="col-lg-5 col-12">
                <div className="sd-left">
                    <img src={`http://localhost:5000/uploads/store/${store.image}`} alt="" />
                </div>
            </div>
            <div className="col-lg-7 p-4 col-12">
                <div className="sd-right">
                    <h2>{store.name}</h2>
                    <p>{store.description}</p>
                    <span className="mt-3 store-looking">
                        <BsEye /> <span className='ps-2'>{store.viewCount}</span>
                    </span>
                    <div className="store-icons">
                           <CiLocationOn /> <span>{store.address}</span>
                    </div>
                    <div className="store-icons">
                           <CiPhone /> <span>{store.phone}</span>
                    </div>
                    <div className="store-icons">
                           <CiTimer /> <span>{store.workHours}</span>
                    </div>
                </div>
            </div>
        </div>
       <div className="store-products">
           <h3 className="mb-3">MAĞAZANIN MƏHSULLARI</h3>
           <div className="row">
            {
                store.products.length > 0 ? store.products.map(item => {
                    return(
                        <ProductItem data={item}/>
                    )
                }) : <AlertBox text='Bu mağazanın məhsulu yoxdur'/>
            }
           </div>
       </div>
    </div> : <Spinner />
       }
    </section>
  )
}

export default StoreDetails
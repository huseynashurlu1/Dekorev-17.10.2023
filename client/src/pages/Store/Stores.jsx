import React, { useEffect, useState } from 'react'
import './store.css'
import axios from 'axios'
import apiUrl from '../../utils/api'
import Spinner from '../../components/Spinner'
import StoreItem from './StoreItem'

const Stores = () => {
  const [stores, setStores] = useState([])

  useEffect(() => {
    const getStores = async () => {
      axios.get(`${apiUrl.storeApi.storeURL}/all`)
      .then(res => setStores(res.data))
      .catch(err => console.log(err))
    }
    getStores()
  }, [])


  const OptionHandler = (e) => {
    switch (e.target.value) {
      case "1":
        setStores([...stores].filter(item => item.statusId.name === 'VIP'));
        break;
      case "2":
        setStores([...stores].filter(item => item.statusId.name === 'Premium'));
        break;
      default:
        setStores([...stores]);
        break;
    }
  };

  return (
    <section id='Stores'>
        {
          stores ? <div className="container">
          <div className="store-page-top">
              <h3>Mağazalar <span>({stores.length} mağaza)</span></h3>
              <select onChange={OptionHandler} name="" id="">
                  <option value="">Hamısı</option>
                  <option value="1">VIP</option>
                  <option value="2">Premium</option>
              </select>
          </div>
          <div className="row gy-4">
              {
                stores.map(item => {
                  return(
                    <StoreItem key={item._id} data={item}/>
                  )
                })
              }
          </div>
      </div> : <Spinner />
        }
    </section>
  )
}

export default Stores
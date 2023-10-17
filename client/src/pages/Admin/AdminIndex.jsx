import axios from 'axios'
import React, { useState, useEffect } from 'react'
import apiUrl from '../../utils/api'
import { getUserRole } from '../../auth/auth'
import ApexChart from '../../components/Chart/ApexChart'
import PieChart from '../../components/Chart/PieChart'


const AdminIndex = () => {
  const [data, setData] = useState()

  
  useEffect(() => {
    const getStatistics = async () => {
      try {
        const user = await getUserRole()
        switch(user.role){
          case 'user': 
            const response = await axios.get(`${apiUrl.storeApi.storeURL}/statistics/${user.userId}`)
            setData(response.data) 
            break;
          case 'superAdmin': 
            const res = await axios.get(`${apiUrl.storeApi.storeURL}/statistics`)
            setData(res.data) 
            break;
        }
      } catch (error) {
        console.log('Error: ' + error.message);
      }
    }

    getStatistics()
  }, [])
  return (
    <div>
      {
        data && <div className="container">
        <div className="statistics-items">
          <div className="row">
          <div className="col-lg-3">
              <div style={{borderBottom: "7px solid #3399FF"}} className="st-item">
                <h3>{data.stores}</h3>
                <p>Mağaza sayı</p>
              </div>
            </div>
            <div className="col-lg-3">
              <div style={{borderBottom: "7px solid #F9B115"}} className="st-item">
                <h3>{data.branches}</h3>
                <p>Filial sayı</p>
              </div>
            </div>
            <div className="col-lg-3">
              <div style={{borderBottom: "7px solid rgb(194 20 20)"}} className="st-item">
                <h3>{data.products}</h3>
                <p>Məhsul sayı</p>
              </div>
            </div>
            <div className="col-lg-3">
              <div style={{borderBottom: "7px solid rgb(15 87 19)"}} className="st-item">
                <h3>{data.categories}</h3>
                <p>Kateqoriya sayı</p>
              </div>
            </div>
           
          </div>
        </div>
        <ApexChart />
        <PieChart />
    </div>
      }
    </div>
  )
}

export default AdminIndex

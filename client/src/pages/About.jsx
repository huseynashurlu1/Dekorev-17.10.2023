import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../utils/api'
import Spinner from '../components/Spinner'

const About = () => {
  const [data, setData] = useState()

  useEffect(() => {
    const getSettings = async () => {
      const response = await axios.get(`${apiUrl.settingsApi.settingsURL}/all`)
      .then(res => {
        setData(res.data[0])
      })
      .catch(err => console.log(err))
    }

    getSettings()
  })
  return (
    <section id="About">
        {
          data ? <div className="container">
          <h3>Dekorev.az nədir?</h3>
          <p>{data.aboutText}</p>
          <div className="text-center">
              <img src={`http://localhost:5000/uploads/settings/${data.aboutImage}`} alt="" />
          </div>
      </div> : <Spinner />
        }
    </section>
  )
}

export default About
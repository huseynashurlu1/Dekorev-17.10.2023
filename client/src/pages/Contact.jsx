import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import axios from 'axios'
import apiUrl from '../utils/api'
import {AiOutlinePhone, AiOutlineMail, AiOutlineEnvironment} from 'react-icons/ai'

const Contact = () => {
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
    <section id="Contact">
        {
            data ? <div className="container">
            <div className="row mb-5">
                <div className="col-lg-4">
                    <div className="box">
                        <AiOutlinePhone />
                        <a href={`tel:${data.phone}`}>{data.phone}</a>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="box">
                        <AiOutlineMail />
                        <a href={`mailto: ${data.email}`}>{data.email}</a>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="box">
                        <AiOutlineEnvironment />
                        <span>{data.location}</span>
                    </div>
                </div>
            </div>

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.428490145618!2d49.85175681468929!3d40.37719496596823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d079efb5163%3A0xc20aa51a5f0b5e01!2sCode%20Academy!5e0!3m2!1sen!2s!4v1651053725073!5m2!1sen!2s" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div> : <Spinner />
        }
    </section>
  )
}

export default Contact
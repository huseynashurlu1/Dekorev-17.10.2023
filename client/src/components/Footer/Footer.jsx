import { Link } from 'react-router-dom'
import './footer.css'
import { FormattedMessage } from 'react-intl'

const Footer = () => {
  return (
    <footer>
        <div className="container">
            <div className="row g-4">
                <div className="col-lg-3 col-12">
                    <div className="logo">
                        <Link to='/'>Dekorev</Link>
                      </div>
                    <a href="tel:0502656463">
                        <i className="fa-solid fa-phone"></i>
                        <span>050 265 64 63</span>
                    </a>
                    <a href="mailto:info@dekorev.az">
                        <i className="fa-solid fa-at"></i>
                        <span>info@dekorev.az</span>
                    </a>
                </div>
                <div className="col-lg-3 col-12">
                    <h5>
                    <FormattedMessage id='Xidmətlərimiz' defaultMessage='Xidmətlərimiz'/>
                    </h5>
                    <ul>
                        <li>
                            <a href="">Daxil olmaq</a>
                        </li>
                        <li>
                            <a href="">Mağaza açmaq</a>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-3 col-12">
                    <h5>
                        <FormattedMessage id='Kateqoriyalar' defaultMessage='Kateqoriyalar'/>
                    </h5>
                    <ul>
                        <li>
                            <a href="">Pərdə</a>
                        </li>
                        <li>
                            <a href="">Pəncərə</a>
                        </li>
                        <li>
                            <a href="">İşıqlandırma</a>
                        </li>
                        <li>
                            <a href="">Parket</a>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-3 col-12">
                    <h5>
                        <FormattedMessage id='Profil' defaultMessage='Profil'/>
                    </h5>
                    <ul>
                        <li>
                            <a href="">Daxil olmaq</a>
                        </li>
                        <li>
                            <a href="">Qeydiyyat</a>
                        </li>
                        <li>
                            <a href="">Səbət</a>
                        </li>
                        <li>
                            <a href="">Sifarişlərim</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
  )
}
export default Footer
import { Link } from 'react-router-dom';
import './header.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { AiOutlineSearch } from 'react-icons/ai'
import { TfiExchangeVertical } from 'react-icons/tfi'
import { BsBasket3 } from 'react-icons/bs'
import { VscAccount } from 'react-icons/vsc'
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

const Navbar = (props) => {
    const [selectedLocale, setSelectedLocale] = useState('az');

    const handleLocaleChange = (locale) => {
        props.onChange(locale)
        setSelectedLocale(locale);
    }
  return (
    <header>
            <div className="header-top">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 left col-7">
                            <Link to='/about'>
                                <FormattedMessage id='Haqqımızda' defaultMessage='Haqqımızda'/>
                            </Link>
                            <Link to='/contact'>
                                <FormattedMessage id='Əlaqə' defaultMessage='Əlaqə'/>
                            </Link>
                        </div>
                        <div className="col-lg-6 col-5 d-flex justify-content-end align-items-center">
                            <Link to='/stores'>
                                <FormattedMessage id='Mağaza' defaultMessage='Mağazalar'/>
                            </Link>
                            <div className="lang">
                            <Dropdown>
                                <Dropdown.Toggle variant="light" id="dropdown-basic">
                                    <FormattedMessage id='Dil seçimi' defaultMessage='Dil seçimi'/>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleLocaleChange('az')} selected={selectedLocale === 'az'}>Az</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLocaleChange('en')} selected={selectedLocale === 'en'}>En</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLocaleChange('ru')} selected={selectedLocale === 'ru'}>Ru</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-bottom">
                <div className="container">
                    <div className="hb-all">
                        <div className="logo">
                            <Link to='/'>Dekorev</Link>
                        </div>
                        <div className="search">
                            <form action="">
                                <input type="text" placeholder="Axtar"   />
                                <button type="submit">
                                    <AiOutlineSearch />
                                </button>
                            </form>
                        </div>
                        <div className="basket-login">
                            <ul>
                                <li>
                                    <TfiExchangeVertical />
                                    <Link>
                                        <FormattedMessage id='Müqayisə' defaultMessage='MÜQAYISƏ'/>
                                    </Link>
                                </li>
                                <li>
                                    <BsBasket3 />
                                    <Link to='/cart'>
                                        <FormattedMessage id='Səbətim' defaultMessage='SƏBƏTIM'/>
                                    </Link>
                                </li>
                                <li>
                                    <VscAccount />
                                    <Link>
                                        <FormattedMessage id='Profilim' defaultMessage='PROFILIM'/>
                                    </Link>
                                </li>
                            </ul>
                            
                        </div>
                    </div>
                </div>
            </div>
    </header>
  )
}
export default Navbar
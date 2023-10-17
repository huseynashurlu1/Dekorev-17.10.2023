import { Link } from 'react-router-dom';
import './header.css';
import { TfiExchangeVertical } from 'react-icons/tfi'
import { BsBasket3 } from 'react-icons/bs'
import { VscAccount } from 'react-icons/vsc'
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../../store/searchSlice';
import apiUrl from '../../utils/api';
import axios from 'axios';
import { RiMenu3Fill } from 'react-icons/ri'
import SideNav from '../SideNav';



const Navbar = (props) => {
    const dispatch = useDispatch();
    const searchQuery = useSelector(state => state.search.query);
    const itemCount = useSelector((state) => state.cart.items);
    const [items, setItems] = useState([])
    const [active, setActive] = useState(false)

    const handleSearchChange = async (e) => {
        dispatch(setQuery(e.target.value));
        try {
            const response = await axios.get(`${apiUrl.productApi.productURL}/search?q=${searchQuery}`);
            const products = response.data;

            setItems(products)
        } catch (error) {
            console.error("Error fetching products", error);
        }
    }

    const [selectedLocale, setSelectedLocale] = useState('az');

    const handleLocaleChange = (locale) => {
        props.onChange(locale)
        setSelectedLocale(locale);
    }

    const handleSidenav = () => {
        setActive(!active)
    }

  return (
    <header>
        <div className="mobile-header">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-4">
                        <Link to='/'>Dekorev</Link>
                    </div>
                    <div className="col-8 text-end">
                        <RiMenu3Fill onClick={handleSidenav} />
                    </div>
                </div>
            </div>
            <SideNav data={active}/>
        </div>
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
                            <Link className='store-link' to='/stores'>
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
            <div style={{maxWidth: '1140px',margin: 'auto'}} className="header-bottom">
                    <div className="hb-all">
                        <div className="logo">
                            <Link to='/'>Dekorev</Link>
                        </div>
                        <div className="search">
                            <form action="">
                                <input  value={searchQuery} onChange={handleSearchChange}  type="text" placeholder="Axtar"   />
                            </form>
                            {
                                items.length > 0 && <ul>
                                {
                                    items && items.map(item => {
                                        return(
                                            <li>
                                                <img src={`http://localhost:5000/uploads/product/${item.images[0].url}`} alt="" />
                                                <Link to={`/details/${item._id}`}>{item.name}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            }
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
                                    <Link to='/cart' className='item-count-link'>
                                        <FormattedMessage id='Səbətim' defaultMessage='SƏBƏTIM'/>
                                            {itemCount.length > 0 && (
                                                <span className='item-count'>{itemCount.length}</span>
                                            )}
                                    </Link>
                                </li>
                                <li>
                                    <VscAccount />
                                    <Link to='/login'>
                                        <FormattedMessage id='Profilim' defaultMessage='PROFILIM'/>
                                    </Link>
                                </li>
                            </ul>
                            
                        </div>
                    </div>
                </div>
    </header>
  )
}
export default Navbar
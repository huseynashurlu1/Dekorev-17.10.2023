import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './navigation.css'
import { BiHomeAlt, BiCategory, BiStore, BiShoppingBag, BiUser } from 'react-icons/bi'
import CategoryModal from '../Category/CategoryModal';


const BottomNavigation = () => {
  const [active, setActive] = useState(false)

  const modalHandler = () => {
    setActive(!active)
  }
  return (
    <div className="bottom-nav">
        <Link to='/'>
          <BiHomeAlt />
          <span>Ana səhifə</span>
        </Link>
        <span onClick={modalHandler} className='cat-link-bottom-nav'>
          <BiCategory />
          <span>Kateqoriyalar</span>
        </span>
        <Link to='/login'>
          <BiUser style={{fontSize: "32px"}}/>
        </Link>
        <Link to='/stores'>
          <BiStore />
          <span>Mağazalar</span>
        </Link>
        <Link to='/cart'>
          <BiShoppingBag />
          <span>Səbət</span>
        </Link>
        <CategoryModal active={active} modalHandler={modalHandler} />
    </div>
  )
}

export default BottomNavigation
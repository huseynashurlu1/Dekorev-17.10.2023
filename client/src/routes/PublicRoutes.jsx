import React from 'react'
import Layout from '../layout/Layout'
import { Route, Routes } from 'react-router-dom'
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import DetailPage from '../pages/Details/DetailPage';
import CategoryPage from '../pages/Category/CategoryPage';
import StorePage from '../pages/Store/Stores';
import CartPage from '../pages/Cart/CartPage';
import StoreDetails from '../pages/Store/StoreDetails';
import Login from '../pages/Login/Login';
import HomePage from '../pages/Home/HomePage';

const PublicRoutes = () => {
  return (
    <Layout>
        <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/contact' element={<Contact />}/>
            <Route path='/stores' element={<StorePage />}/>
            <Route path='/cart' element={<CartPage />}/>
            <Route path='/details/:id' element={<DetailPage />}/>
            <Route path='/store/details/:id' element={<StoreDetails />}/>
            <Route path='/category/:id' element={<CategoryPage />}/>
        </Routes>
    </Layout>
  )
}

export default PublicRoutes
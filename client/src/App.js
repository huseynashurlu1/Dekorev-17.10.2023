import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout'
import HomePage from './pages/Home/HomePage'
import './assets/css/reset.css'
import About from './pages/About';
import Contact from './pages/Contact';
import DetailPage from './pages/DetailPage';
import CategoryPage from './pages/CategoryPage';
import StorePage from './pages/Store/Stores';
import CartPage from './pages/Cart/CartPage';
import StoreDetails from './pages/Store/StoreDetails';
import AdminLayout from './layout/AdminLayout';
import AdminIndex from './pages/Admin/AdminIndex';
import Products from './pages/Admin/Product/Products';
import CreateItem from './pages/Admin/Product/CreateItem';
import Categories from './pages/Admin/Category/Categories';
import CreateCategory from './pages/Admin/Category/CreateCategory';
import Stores from './pages/Admin/Store/Stores'
import Login from './pages/Login/Login';
import UserList from './pages/Admin/User/UserList';
import CreateStore from './pages/Admin/Store/CreateStore';
import CreateUser from './pages/Admin/User/CreateUser';
import CreateProduct from './pages/Admin/Product/CreateProduct';

if(localStorage.getItem('cart') === null) {
  localStorage.setItem('cart', JSON.stringify([]))
}

function App() {
  const token = localStorage.getItem('token');

  return (
    <div className="App">
          <BrowserRouter>
            {
              !token ? <Layout>
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
            </Layout> : <AdminLayout>
                <Routes>
                    <Route path='/manage' element={<AdminIndex />}/>
                    <Route path='/manage/products' element={<Products />}/>
                    <Route path='/manage/products/create' element={<CreateProduct />}/>
                    <Route path='/manage/categories' element={<Categories />}/>
                    <Route path='/manage/category/add' element={<CreateCategory />}/>
                    <Route path='/manage/stores' element={<Stores />}/>
                    <Route path='/manage/stores/create' element={<CreateStore />}/>
                    <Route path='/manage/users' element={<UserList />}/>
                    <Route path='/manage/users/create' element={<CreateUser />}/>
                </Routes>
            </AdminLayout>
            }
          </BrowserRouter>
    </div>
  );
}

export default App;

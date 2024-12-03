import { createContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import Dashboard from './pages/dashboard';
import Products from './pages/products';
import Categories from './pages/categories';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import SelectedProduct from './pages/selectedProduct';
import Footer from './components/Footer';
import AddToCart from './components/AddToCart';
import MessageModal from './components/MessageModal';
import Login from './pages/login';
import Registration from './pages/registration';
import WishList from './pages/wishlist';

import './styles/style.css'
import './styles/responsive.css';

export const UserContext = createContext<any>(null);

const App = () => {
  const location = useLocation();
  const [searchProduct, setSearchProduct] = useState<string>('');
  const [showOffcanvas, setShowOffcanvas] = useState<boolean>(false);
  const [showModal, setModal] = useState<boolean>(false);

  const contextValue = {
    searchProduct,
    setSearchProduct,
    showOffcanvas,
    setShowOffcanvas,
    showModal,
    setModal
  };
  const isAuthPage: boolean = location.pathname === '/login' || location.pathname === '/registration';

  return (
    <UserContext.Provider value={contextValue}>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/products' element={<Products />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/selectedproduct' element={<SelectedProduct />} />
        <Route path='/wishlist' element={<WishList />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      {!isAuthPage && <Footer />}

      <AddToCart />
      <MessageModal />
    </UserContext.Provider>
  );
}

export default App;

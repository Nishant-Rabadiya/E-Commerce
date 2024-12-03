import React, { useContext } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';

import { UserContext } from '../App';
import { useProduct } from './CommonFunction';
import { addToCartData, getRegistrationData } from '../api/api';
import { Product, RegistrationFormInputs } from '../@core/interfaces/Interface';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate: NavigateFunction = useNavigate();
  const contextValue = useContext(UserContext);
  const getAddToCartData = useProduct('AddToCart', addToCartData) as Product[];
  const getUserData = useProduct('registration', getRegistrationData) as RegistrationFormInputs[];
  const loginData: {email: string} = JSON.parse(localStorage?.getItem('loginData') as string);
  const cuurentUser: RegistrationFormInputs | undefined = getUserData?.find((user: RegistrationFormInputs) => user?.email === loginData?.email);

  const handleLogoutButton = () => {
    localStorage.setItem('loginData', JSON.stringify({ email: '' }));
    toast.success('Logout successfully');
    navigate('/login');
  }

  const handleAddCartButton = () => {
    if (loginData?.email) {
      contextValue?.setShowOffcanvas(true);
    } else {
      contextValue?.setModal(true);
    }
  }

  return (
    <div className='d-flex justify-content-between navbar py-3'>
      <button className='px-4 border-0 bg-white fs-2 fw-bolder' onClick={() => navigate('/')}>Shopify</button>

      <div className='d-flex'>
        <input type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => contextValue.setSearchProduct(e?.target?.value)} className='search-input px-4 py-2 border border-2 border-primary' placeholder='Search for a product...' />
        <p className='search-icon m-0 py-2 px-3 bg-primary text-light fs-5'><i className='fa-solid fa-magnifying-glass'></i></p>
      </div>

      <div className='d-flex navbar-buttons'>
        <button className='px-3 fs-5 border-0 bg-white' onClick={() => navigate('/products')}>Products</button>
        <button className='px-3 fs-5 border-0 bg-white' onClick={() => navigate('/categories')}>Categories</button>
        <button className='border-0 bg-white fs-5 position-relative' onClick={handleAddCartButton}><i className='fa-solid fa-cart-shopping'></i>
          <span className='cart-product-bedge top-0 start-100 translate-middle badge rounded-pill bg-danger'>
            {getAddToCartData ? getAddToCartData?.filter(product => product?.userId === cuurentUser?.id)?.length : 0}
          </span></button>
        {loginData?.email ?
          <DropdownButton title={'Logout'} id='bg-nested-dropdown' bsPrefix='user-profile border border-0 rounded p-2 mx-4'>
            <Dropdown.Item eventKey='1' onClick={() => navigate('/wishlist')}><span><i className='fa-regular fa-heart'></i></span> WishList</Dropdown.Item>
            <Dropdown.Item eventKey='2' onClick={handleLogoutButton}><span><i className='fa-solid fa-right-from-bracket'></i></span> Logout</Dropdown.Item>
          </DropdownButton> :
          <button className=' mx-3 px-3 fs-5 border-0 bg-white text-secondary' onClick={() => navigate('/login')}>Login</button>
        }
      </div>

    </div>
  )
}

export default Navbar;

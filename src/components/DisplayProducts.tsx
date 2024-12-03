import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { Product, RegistrationFormInputs } from '../@core/interfaces/Interface';
import { useProduct, useProductMutation } from './CommonFunction';
import { addToCartData, getRegistrationData, sendAddToCartData, updateCartProductData } from '../api/api';
import { UserContext } from '../App';

const DisplayProducts = ({ products }: { products: Product[] }) => {
    const navigate: NavigateFunction = useNavigate();
    const contextValue = useContext(UserContext);
    const getUserData = useProduct('registration', getRegistrationData) as RegistrationFormInputs[];
    const getAddToCartData = useProduct('AddToCart', addToCartData) as Product[];
    const mutation = useProductMutation('AddToCart', sendAddToCartData);
    const updateCartDataMutation = useProductMutation('AddToCart', updateCartProductData);
    const loginData: {email: string} = JSON.parse(localStorage?.getItem('loginData') as string);
    const currentUser: RegistrationFormInputs | undefined = getUserData?.find((user: RegistrationFormInputs) => user?.email === loginData?.email);

    const handleProductButton = (product?: Product): void => {
        navigate(`/selectedproduct?productId=${product?.productId}`);
    }

    const handleAddtoCartButton = (item: Product) => {
        if (loginData?.email) {
            const userCartItems: Product[] = getAddToCartData?.filter((cartItem: Product) => cartItem?.userId === currentUser?.id);

            const existingCartItem: Product | undefined = userCartItems?.find((cartItem: Product) => cartItem?.productId === item?.productId);

            const updatedData: Product = existingCartItem
                ? { ...existingCartItem, quantity: (existingCartItem?.quantity || 1) + 1 }
                : { ...item, quantity: 1, userId: currentUser?.id, id: Date?.now().toString() };
            setTimeout(() => {
                if (existingCartItem) {
                    toast.success('Item added to cart successfully');
                    updateCartDataMutation?.mutate(updatedData as any);
                } else {
                    toast.success('Item added to cart successfully');
                    mutation?.mutate(updatedData as any);
                }
            }, 10);

        } else {
            contextValue?.setModal(true);
        }
    }

    return (
        <div className='display-product'>
            {
                products?.length ?
                    products?.map((item: Product) => (
                        <div className='card card-section' key={item?.productId}>
                            <div className='p-5'>
                                <img className='product-image' src={item?.image} alt={item?.name} onClick={() => handleProductButton(item)} />
                            </div>
                            <div className='border-top p-4'>
                                <p className='fs-6 text-secondary m-0'>{item?.brand}</p>
                                <p className='fw-bolder m-0 card-product-name' onClick={() => handleProductButton(item)}>{item?.name}</p>
                                <p className='text-warning m-0'><i className='fa-solid fa-star'></i><i className='fa-solid fa-star'></i><i className='fa-solid fa-star'></i><i className='fa-solid fa-star-half-stroke'></i><i className='fa-regular fa-star'></i> <span className='text-dark fw-bolder'>4.5</span></p>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        <p className='m-0 fs-5 text-primary'>₹{item?.price}</p>
                                        <p className='m-0 text-secondary fs-6 text-decoration-line-through'>₹{item?.old_price}</p>
                                    </div>
                                    <button className='border-0 add-cart-button rounded text-light' onClick={() => handleAddtoCartButton(item)}><i className='fa-solid fa-cart-shopping p-2'></i>ADD TO CART</button>
                                </div>
                            </div>
                        </div>
                    )) : <div className='w-100 text-center'>
                        <img className='w-25' src='https://shopify-xrh7.onrender.com/emptyCart.jpg' alt='No products found' />
                        <p className='fs-5 text-secondary'>No products found</p>
                    </div>
            }
        </div>
    )
}

export default DisplayProducts;

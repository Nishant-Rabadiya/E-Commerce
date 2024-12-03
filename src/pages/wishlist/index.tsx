import React from 'react';
import DisplayProducts from '../../components/DisplayProducts';
import { useProduct } from '../../components/CommonFunction';
import { getRegistrationData, wishListData } from '../../api/api';
import { Product, RegistrationFormInputs } from '../../@core/interfaces/Interface';

const WishList = () => {
    const loginData: {email: string} = JSON.parse(localStorage?.getItem('loginData') as string);
    const getWishData = useProduct('WishList', wishListData) as Product[];
    const getUserData = useProduct('registration', getRegistrationData) as RegistrationFormInputs[];
    const cuurentUser: RegistrationFormInputs | undefined = getUserData?.find((user: RegistrationFormInputs) => user?.email === loginData?.email);

    return (
        <>
            {getWishData?.length ?
                <div className='p-3 main-section'>
                    <div className='p-2'>
                        <h1 className='m-0'>Your Wishlist</h1>
                    </div>
                    <div className='p-2'>
                        <DisplayProducts products={getWishData?.filter(product => product?.userId === cuurentUser?.id)} />
                    </div>
                </div> : <div className='text-center main-section'>
                    <img className='w-25' src='https://shopify-xrh7.onrender.com/emptyCart.jpg' alt='no wishlist data' />
                    <p className='font-monospace fs-5'>Your wishlist is empty</p>
                </div>
            }
        </>
    )
}

export default WishList;

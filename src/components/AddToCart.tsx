import { useContext, useEffect, useMemo, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useProduct, useProductMutation } from './CommonFunction';
import { addToCartData, deleteCartProduct, getRegistrationData, updateCartProductData } from '../api/api';
import { Product, RegistrationFormInputs } from '../@core/interfaces/Interface';
import { UserContext } from '../App';

const AddToCart = () => {
    const contextValue = useContext(UserContext);
    const getAddToCartData = useProduct('AddToCart', addToCartData) as Product[];
    const deleteMutation = useProductMutation('AddToCart', deleteCartProduct);
    const updateCartDataMutation = useProductMutation('AddToCart', updateCartProductData);

    const loginData: {email: string} = JSON.parse(localStorage?.getItem('loginData') as string);
    const getUserData = useProduct('registration', getRegistrationData) as RegistrationFormInputs[];
    const currentUser: RegistrationFormInputs | undefined = getUserData?.find((user: RegistrationFormInputs) => user?.email === loginData?.email);

    const handleClose = () => contextValue?.setShowOffcanvas(false);
    const [cartProduct, setCartProduct] = useState<Product[]>([]);

    const handleDeleteCartProduct = (product: Product) => {
        deleteMutation?.mutate(product?.id as void);
    }

    const handleCartQuantityButton = (product: Product, name: string) => {
        const newQuantity: number = (name === 'plus') ? (product?.quantity || 1) + 1 : (product?.quantity || 1) - 1;
        if (newQuantity <= 0) {
            deleteMutation?.mutate(product?.id as void);
        } else {
            updateCartDataMutation?.mutate({ ...product as any, quantity: newQuantity });
        }
    }

    useEffect(() => {
        setCartProduct(getAddToCartData?.filter((product: Product) => product?.userId === currentUser?.id) as Product[]);
    }, [getAddToCartData, getUserData, currentUser?.id]);

    const totalPrice: string = useMemo(() => 
        cartProduct?.reduce((accumulator: number, product: Product) => accumulator + product?.price * (product?.quantity || 1), 0)?.toFixed(2), 
        [cartProduct]
    );

    return (
        <Offcanvas show={contextValue?.showOffcanvas} onHide={handleClose} placement='end' backdrop='static'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Your Cart</Offcanvas.Title>
            </Offcanvas.Header>
            {cartProduct?.length ?
                <Offcanvas.Body>
                    {
                        cartProduct?.map((product: Product, index: number) => (
                            <div key={index} className='w-100 d-flex border border-1 align-items-center fw-bolder mb-2'>
                                <div className='w-25 p-1'>
                                    <img src={product?.image} className='w-100' alt={product?.name} />
                                </div>
                                <div className='w-50 p-1'>
                                    <p className='m-0 lh-1'>{product?.name}</p>
                                    <p className='m-0'>₹{product?.price}</p>
                                    <div className='d-flex w-100 text-center fw-bold'>
                                        <p className='cart-quantity-button border border-1 rounded-circle fs-6' onClick={() => handleCartQuantityButton(product, 'minus')}>-</p>
                                        <p className='m-0 w-25'>{product?.quantity}</p>
                                        <p className='cart-quantity-button border border-1 rounded-circle fs-6' onClick={() => handleCartQuantityButton(product, 'plus')}>+</p>
                                    </div>
                                </div>
                                <div className='w-25 p-1'>
                                    <p className='m-0'>₹{product?.quantity ? (product?.price * product?.quantity).toFixed(2) : 0}</p>
                                    <p className='cart-delete-button m-0 text-danger fs-4' onClick={() => handleDeleteCartProduct(product)}><i className='fa-regular fa-trash-can'></i></p>
                                </div>
                            </div>
                        ))
                    }
                    <div className='d-flex justify-content-between fs-3 p-2'>
                        <h2>Total</h2>
                        <h2>₹{totalPrice}</h2>
                    </div>
                    <button className='w-100 bg-primary text-white p-2 rounded border border-0'>CHECKOUT</button>
                </Offcanvas.Body>
                : <div className='text-center py-5'>
                    <img className='w-50' src='https://shopify-xrh7.onrender.com/emptyCart.jpg' alt='no cart product' />
                    <p className='font-monospace fs-5'>Your cart is empty</p>
                </div>}
        </Offcanvas>
    );
}

export default AddToCart;







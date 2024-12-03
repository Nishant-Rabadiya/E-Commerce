import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import DisplayProducts from '../../components/DisplayProducts';
import { useProduct, useProductMutation } from '../../components/CommonFunction';
import { addToCartData, deleteWishlistProduct, getProductData, getRegistrationData, sendAddToCartData, sendWishListData, updateCartProductData, wishListData } from '../../api/api';
import { Product, RegistrationFormInputs } from '../../@core/interfaces/Interface';
import { UserContext } from '../../App';

const SelectedProduct = () => {
    const contextValue = useContext(UserContext);
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('productId');
    const loginData: { email: string } = JSON.parse(localStorage?.getItem('loginData') as string);

    const getUserData = useProduct('registration', getRegistrationData) as RegistrationFormInputs[];

    const getAddToCartData = useProduct('AddToCart', addToCartData) as Product[];
    const mutation = useProductMutation('AddToCart', sendAddToCartData);
    const updateCartDataMutation = useProductMutation('AddToCart', updateCartProductData);

    const getWishData = useProduct('WishList', wishListData) as Product[];
    const wishListmutation = useProductMutation('WishList', sendWishListData);
    const deleteWishList = useProductMutation('WishList', deleteWishlistProduct);

    const productData = useProduct('product', getProductData) as Product[];
    const product: Product | undefined = productData?.find((product: Product) => product?.productId.toString() === productId);
    const similerProduct: Product[] = productData?.filter((item: Product) => item?.category === product?.category && item?.productId.toString() !== productId);
    const currentUser: RegistrationFormInputs | undefined = getUserData?.find((user: RegistrationFormInputs) => user?.email === loginData?.email);

    const handleSelectedProductAddtoCart = () => {
        if (!loginData?.email) {
            contextValue?.setModal(true);
            return;
        }

        const userCartItems: Product[] = getAddToCartData?.filter((item: Product) => item?.userId === currentUser?.id);
        const existingCartItem: Product | undefined = userCartItems?.find((item: Product) => item?.productId === product?.productId);

        const updatedData = existingCartItem
            ? { ...existingCartItem, quantity: (existingCartItem?.quantity || 1) + 1 }
            : { ...product, quantity: 1, userId: currentUser?.id, id: Date?.now().toString() };

        toast.success('Product added to cart successfully');
        if (existingCartItem) {
            updateCartDataMutation?.mutate(updatedData as any);
        } else {
            mutation?.mutate(updatedData as any);
        }
    }

    const handleWishListButton = () => {
        if (!loginData?.email) {
            contextValue?.setModal(true);
            return;
        }

        const userWishlistItems: Product[] = getWishData?.filter((item: Product) => item?.userId === currentUser?.id);
        const existingWishItem: Product | undefined = userWishlistItems?.find((item: Product) => item?.productId === product?.productId);

        if (existingWishItem) {
            toast.error('Product removed from your wishlist');
            deleteWishList?.mutate(existingWishItem?.id as any);
        } else {
            toast.success('Product added to your wishlist');
            const payloadData = {
                ...product as Product,
                userId: currentUser?.id as string,
                id: Date.now().toString(),
            };
            wishListmutation?.mutate(payloadData as any);
        }
    }


    // const handleWishListButton = () => {
    //     if (!loginData?.email) {
    //         contextValue?.setModal(true);
    //         return;
    //     }

    //     const userWishlistItems: Product[] = getWishData?.filter((item: Product) => item?.userId === currentUser?.id);
    //     const existingWishItem: Product | undefined = userWishlistItems?.find((item: Product) => item?.id === product?.id);

    //     if (!existingWishItem) {
    //         toast.success('Item added to your wishlist');
    //         const payloadData = {
    //             ...product as Product,
    //             userId: currentUser?.id as string,
    //         }
    //         wishListmutation?.mutate(payloadData as any);
    //     }
    // }

    return (
        <div>
            <div className='d-flex justify-content-between w-100 py-4 mb-3 border-bottom border-danger main-section'>
                <div className='selected-product-image-section'>
                    <img className='w-100 selected-product-image' src={product?.image} alt={product?.name} />
                </div>
                <div className='selected-product-details-section'>
                    <h3 className='fw-normal fs-4 m-0'>{product?.name}</h3>
                    <p className='text-warning m-0'><i className='fa-solid fa-star'></i><i className='fa-solid fa-star'></i><i className='fa-solid fa-star'></i><i className='fa-solid fa-star-half-stroke'></i><i className='fa-regular fa-star'></i> <span className='text-dark fw-bolder'>4.5</span></p>
                    <div className='mt-1'>
                        <p className='m-0 text-primary fs-5'>₹{product?.price}</p>
                        <p className='m-0 fs-6 text-decoration-line-through text-secondary'>₹{product?.old_price}</p>
                    </div>
                    <div className='mt-1'>
                        <table>
                            <tbody>
                                <tr>
                                    <td className='fw-bolder p-1'>Brand</td>
                                    <td>{product?.brand}</td>
                                </tr>
                                <tr>
                                    <td className='fw-bolder p-1'>Category</td>
                                    <td>{product?.category}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='mt-1'>
                        <p className='m-0 fw-bolder'>About the product</p>
                        <p className='product-details' >{product?.description}</p>
                    </div>
                    <div className='selected-addtocart-wishlist-button'>
                        <button className='add-cart-button border-0 rounded text-light p-2' onClick={handleSelectedProductAddtoCart}><span><i className='fa-solid fa-cart-shopping'></i></span> ADD TO CART</button>
                        <button className='wishlist-button border-0 rounded text-light p-2 bg-warning mx-2' onClick={handleWishListButton}><span><i className='fa-regular fa-heart'></i></span> ADD TO WISHLIST</button>
                    </div>
                </div>
                <div className='selected-product-review-section'>
                    <h3>Reviews</h3>
                    <div>
                        <p className='fw-bolder m-0'>rshawe2</p>
                        <p className='product-details text-warning m-0'><i className='fa-solid fa-star'></i><i className='fa-solid fa-star'></i><i className='fa-solid fa-star'></i><i className='fa-regular fa-star'></i><i className='fa-regular fa-star'></i> <span className='text-dark'>3</span></p>
                        <p className='product-details m-0 fs-6'>I found the product not long lasting. The quality also seemed a bit downgraded. I don't think its value for money.</p>
                    </div>

                    <div>
                        <p className='fw-bolder m-0'>yraigatt3</p>
                        <p className='product-details text-warning m-0'><i className='fa-solid fa-star'></i><i className='fa-solid fa-star'></i><i className='fa-solid fa-star'></i><i className='fa-solid fa-star'></i><i className='fa-regular fa-star'></i> <span className='text-dark'>4</span></p>
                        <p className='product-details m-0 fs-6'>The product is nice. I got the delivery on time. I am using it for the last four months. My exprience with this product is very good.</p>
                    </div>

                    <div>
                        <p className='fw-bolder m-0'>kmeus4</p>
                        <p className='product-details text-warning m-0'><i className='fa-solid fa-star'></i><i className='fa-solid fa-star'></i><i className='fa-solid fa-star'></i><i className='fa-regular fa-star'></i><i className='fa-regular fa-star'></i> <span className='text-dark'>3</span></p>
                        <p className='product-details m-0 fs-6'>The product is nice. I got the delivery on time. I am using it for the last four months. My exprience with this product is very good.</p>
                    </div>

                    <div>
                        <p className='fw-bolder m-0'>dpettegre6</p>
                        <p className='product-details text-warning m-0'><i className='fa-solid fa-star'></i><i className='fa-solid fa-star'></i><i className='fa-solid fa-star'></i><i className='fa-solid fa-star'></i><i className='fa-solid fa-star'></i> <span className='text-dark'>5</span></p>
                        <p className='product-details m-0 fs-6'>The quality could have been better. I feel like wasting my money. I should have been more careful while buying it.</p>
                    </div>

                    <div>
                        <p className='fw-bolder m-0'>ggude7</p>
                        <p className='text-warning m-0'><i className='fa-solid fa-star'></i><i className='fa-solid fa-star'></i><i className='fa-solid fa-star'></i><i className='fa-solid fa-star'></i><i className='fa-regular fa-star'></i> <span className='text-dark'>4</span></p>
                        <p className='product-details m-0 fs-6'>I am satisfied with the value for money of the product. Everything seems nice but the delivery time seems a bit delayed</p>
                    </div>
                </div>
            </div>

            <div className='p-4'>
                <h2>Similar Products</h2>
                <div className='py-3'>
                    <DisplayProducts products={similerProduct} />
                </div>
            </div>
        </div>
    )
}

export default SelectedProduct;

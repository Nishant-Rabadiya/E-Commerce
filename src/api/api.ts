import { Product, RegistrationFormInputs } from '../@core/interfaces/Interface';
import { axiosIntance } from '../@core/utils/axiosInstance';

// Registration API
export const getRegistrationData = async () => {
    const response = await axiosIntance?.get(`/registraion`);
    return response.data as Product;
};

export const sendRegistrationData = async (data: RegistrationFormInputs) => {
    const response = await axiosIntance?.post(`/registraion`, data);
    return response?.data;
};

// Product API
export const getProductData = async () => {
    const response = await axiosIntance?.get(`/products`);
    return response.data as Product;
};

// AddToCart API
export const addToCartData = async () => {
    const response = await axiosIntance?.get(`/AddToCart`);
    return response.data as Product;
};

export const sendAddToCartData = async (data: Product): Promise<Product[]> => {
    const response = await axiosIntance?.post(`/AddToCart`, data);
    return response?.data;
};

export const updateCartProductData = async (data: Product) => {
    await axiosIntance?.put(`/AddToCart/${data?.id}`, data);
};

export const deleteCartProduct = async (id: string) => {
    const response = await axiosIntance?.delete(`/AddToCart/${id}`);
    return response?.data;
};

// WishList API
export const wishListData = async () => {
    const response = await axiosIntance?.get(`/WishList`);
    return response.data as Product;
};

export const sendWishListData = async (data: Product) => {
    const response = await axiosIntance?.post(`/WishList`, data);
    return response?.data as Product;
};

export const deleteWishlistProduct = async (id: string) => {
    const response = await axiosIntance?.delete(`/WishList/${id}`);
    return response?.data;
};






// import axios from 'axios';
// import { Product, RegistrationFormInputs } from '../@core/interfaces/Interface';

// // Registration API
// export const getRegistrationData = async () => {
//     const response = await axios?.get(`http://localhost:3031/registraion`);
//     return response.data as Product;
// };

// export const sendRegistrationData = async (data: RegistrationFormInputs) => {
//     const response = await axios?.post(`http://localhost:3031/registraion`, data);
//     return response?.data;
// };

// // Product API
// export const getProductData = async () => {
//     const response = await axios?.get(`http://localhost:3031/products`);
//     return response.data as Product;
// };

// // AddToCart API
// export const addToCartData = async () => {
//     const response = await axios?.get(`http://localhost:3031/AddToCart`);
//     return response.data as Product;
// };

// export const sendAddToCartData = async (data: Product): Promise<Product[]> => {
//     const response = await axios?.post(`http://localhost:3031/AddToCart`, data);
//     return response?.data;
// };

// export const updateCartProductData = async (data: Product): Promise<void> => {
//     await axios.put(`http://localhost:3031/AddToCart/${data?.id}`, data);
// };

// export const deleteCartProduct = async (id: string) => {
//     const response = await axios?.delete(`http://localhost:3031/AddToCart/${id}`);
//     return response?.data;
// };

// // WishList API
// export const wishListData = async () => {
//     const response = await axios?.get(`http://localhost:3031/WishList`);
//     return response.data as Product;
// };

// export const sendWishListData = async (data: Product) => {
//     const response = await axios?.post(`http://localhost:3031/WishList`, data);
//     return response?.data as Product;
// };






export interface Product {
    id?: string | undefined;
    name: string;
    price: number;
    old_price: number;
    category: string;
    brand: string;
    image: string;
    description: string;
    quantity?:number | undefined;
    userId?: string | undefined;
    productId:string;
}

export interface RegistrationFormInputs {
    id?: string;
    lastName: string;
    firstName: string;
    email: string;
    password: string;
}

export interface LoginFormInputs {
    email: string;
    password: string;
}
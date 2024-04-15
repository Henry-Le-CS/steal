import { axiosInstance } from ".";
import { ResponseData } from "./types";

export type OrderType = {
    id: number;
    product_id: number;
    voucher_id: number;
    user_id: number;
    city: string;
    address: string;
    phone: string;
    email: string;
    amount: number;
    total_price: number;
    note: string;
    status: string;
    created_at: string;
    updated_at?: any;
    first_name: string;
    last_name: string;
    product: Product;
}

export type  Product = {
    id: number;
    name: string;
    price: number;
    amount: number;
    description: string;
    additional_info: string;
    created_at: string;
    updated_at?: any;
    owner_id: number;
    images: string[];
    categories: string[];
}

export const getOrdersOfUser = async (userId: string): Promise<ResponseData<Array<OrderType>>> => {
    const {data } = await axiosInstance.get(`/order/${userId}`);
    return data;
}


export type MakeOrderDto = {
    id: number;
    firstName: string;
    lastName: string;
    city: string;
    address: string;
    phone: string;
    email: string;
    note: string;
    paymentType: 'cod';
    productId: number;
    quantity: number;
}

export const makeOrder = async (payload: MakeOrderDto) => {
    const {data} = await axiosInstance.post('/order', payload)

    return data
}

export const getOrdersOfSeller = async (sellerId: string): Promise<ResponseData<Array<OrderType>>> => {
    const {data} = await axiosInstance.get(`/order/owner/${sellerId}`);
    return data;
}
import { axiosInstance } from ".";
import { ResponseData } from "./types";

type GetMultiplePriceDto = {
    type: 'multiple';
    products: {
        id: number;
        amount: number;
    }[];
};

export type GetMultiplePriceResponse = {
    productId: number
    totalPrice: number
    price: number;
    title: string;
    quantity: number
}

export const calculatePriceForCartItems = async (payload: GetMultiplePriceDto): Promise<ResponseData<GetMultiplePriceResponse[]>> => {
    const {data} = await axiosInstance.post('/check-out/price', payload)

    return data
}

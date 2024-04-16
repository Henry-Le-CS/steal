import { axiosInstance } from "."
import { ResponseData, SearchProductQuery } from "./types"

export type ProductType = {
    id: number
    price: number
    amount: number
    additional_info: string;
    categories: string[];
    created_at: string;
    description: string;
    images: string[];
    name: string;
    owner_id: number;
    updated_at: string | undefined;
}

export const getAllProducts = async (query?: SearchProductQuery): Promise<ResponseData<{
    products: ProductType[],
    total: number
}>> => {
    const {data} = await axiosInstance.get('/product', { params: query })

    return data
}

export const getProductById = async (id: number): Promise<ResponseData<ProductType>> => {
    const {data} = await axiosInstance.get(`/product/${id}`)

    return data
}

export const getProductByIds = async (ids: number[]): Promise<ResponseData<ProductType[]>> => {
    const {data} = await axiosInstance.post('/product/multiple', {
        productIds: ids
    })

    return data
}

export const getProductsOfSellerById = async (id: string): Promise<ResponseData<ProductType[]>> => {
    const {data} = await axiosInstance.get(`/product/owner/${id}`)

    return data
}

export const postProduct = async (data: FormData): Promise<ResponseData<{
    productId: number
}>> => {
    const {data: res} = await axiosInstance.post('/product', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return res
}
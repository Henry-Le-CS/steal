import { PriceUnit } from "@/common/constants/products";

export type ProductBriefType = {
    id: string;
    imageUrl: string;
    title: string;
    price: number;
};

export type OrderByPriceType = 'none' | 'asc' | 'desc' | 'newest' | 'oldest';

export type ProductStateType = {
    products: ProductBriefType[];
    categories: string[];
    search: string;
    currentPage: number;
    pageSize: number;
    range: [number, number];
    unit: PriceUnit;
    order: OrderByPriceType;
}

export type ProductActionType = {
    type: string;
    payload: any;
}
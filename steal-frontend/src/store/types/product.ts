import { PriceUnit } from "@/common/constants/products";

export type ProductBriefType = {
    imageUrl: string;
    title: string;
    price: number;
};

export type OrderByPriceType = 'asc' | 'desc';

export type ProductStateType = {
    products: ProductBriefType[];
    categories: string[];
    search: string;
    currentPage: number;
    pageSize: number;
    range: [number, number];
    unit: PriceUnit;
}

export type ProductActionType = {
    type: string;
    payload: any;
}
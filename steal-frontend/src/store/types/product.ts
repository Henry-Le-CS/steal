import { PriceUnit } from "@/common/constants/products";

export type ProductBriefType = {
    id: string;
    imageUrl: string;
    title: string;
    price: number;
    count: number;
    postedAt: string;
};

export type OrderByPriceType = 'asc' | 'desc' | 'newest' | 'oldest' | '';

export type ProductStateType = {
    products: ProductBriefType[];
    categories: string[];
    search: string;
    currentPage: number;
    pageSize: number;
    range: [number, number];
    unit: PriceUnit;
    order: OrderByPriceType;
    total: number;
}

export type ProductActionType = {
    type: string;
    payload: any;
}
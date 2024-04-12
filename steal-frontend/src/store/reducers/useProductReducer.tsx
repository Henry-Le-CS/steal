import { useReducer } from "react";
import { ProductActionType, ProductStateType } from "../types";
import { PriceUnit } from "@/common/constants/products";

export enum ProductActionEnum {
    SET_RANGE = 'SET_RANGE',
    SET_CATEGORY = 'SET_CATEGORY',
}

const initialProductState: ProductStateType = {
    products: [],
    categories: [],
    search: '',
    currentPage: 1,
    pageSize: 9,
    range: [0, 100],
    unit: PriceUnit.VND,
}

export const productReducer = (state: ProductStateType, action: ProductActionType) => {
    const { type, payload } = action;

    switch (type) {
        case ProductActionEnum.SET_RANGE:
            return {
                ...state,
                range: payload
            }
        case ProductActionEnum.SET_CATEGORY:
            return {
                ...state,
                categories: payload
            }
        default:
            return state
    }
}

export const useProductReducer = () => {
    const [state, dispatch] = useReducer(productReducer, initialProductState);

    return { state, dispatch }
}
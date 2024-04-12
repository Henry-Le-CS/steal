import { useReducer } from "react";
import { ProductActionType, ProductStateType } from "../types";
import { PriceUnit } from "@/common/constants/products";

export enum ProductActionEnum {
    SET_RANGE = 'SET_RANGE',
    SET_CATEGORY = 'SET_CATEGORY',
    SET_SEARCH = 'SET_SEARCH',
    SET_PAGE = 'SET_PAGE',
    SET_ORDER = 'SET_ORDER',
    SET_PRODUCTS = 'SET_PRODUCTS',
}

const initialProductState: ProductStateType = {
    products: [],
    categories: [],
    search: '',
    currentPage: 1,
    pageSize: 9,
    range: [0, 100],
    unit: PriceUnit.VND,
    order: 'none',
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
        case ProductActionEnum.SET_SEARCH:
            return {
                ...state,
                search: payload
            }

        case ProductActionEnum.SET_PAGE:
            return {
                ...state,
                currentPage: payload
            }

        case ProductActionEnum.SET_ORDER:
            return {
                ...state,
                order: payload
            }
        case ProductActionEnum.SET_PRODUCTS:
            return {
                ...state,
                products: payload
            }
        default:
            return state
    }
}

export const useProductReducer = () => {
    const [state, dispatch] = useReducer(productReducer, initialProductState);

    return { state, dispatch }
}
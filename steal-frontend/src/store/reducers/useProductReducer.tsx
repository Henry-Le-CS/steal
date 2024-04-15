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
    SET_ALL = 'SET_ALL',
    SET_CURRENT_PAGE_COUNT = 'SET_CURRENT_PAGE_COUNT'
}

const initialProductState: ProductStateType = {
    products: [],
    categories: [],
    search: '',
    currentPage: 1,
    pageSize: 9,
    range: [0, 100],
    unit: PriceUnit.VND,
    order: '',
    total: 0,
    currentPageCount: 0
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
                search: payload,
                currentPage: 0
            }

        case ProductActionEnum.SET_PAGE:
            return {
                ...state,
                currentPage: payload
            }

        case ProductActionEnum.SET_ORDER:
            return {
                ...state,
                order: payload,
                currentPage: 0
            }
        case ProductActionEnum.SET_PRODUCTS:
            return {
                ...state,
                products: payload.products,
                total: payload.total ?? state.total
            }
        case ProductActionEnum.SET_ALL:
            return {
                ...state,
                ...payload
            }
        default:
            return state
    }
}

export const useProductReducer = () => {
    const [state, dispatch] = useReducer(productReducer, initialProductState);

    return { state, dispatch }
}
'use client'
import { CustomerFilter } from "@/components/filter/customer";
import { CustomerSearch } from "@/components/search/customer";
import { useProductContext } from "@/store/contexts";
import { ProductActionEnum } from "@/store/reducers";
import { OrderByPriceType } from "@/store/types";
import { useEffect } from "react";

export default function ProductPage() {
    const { productState, productDispatch } = useProductContext();

    const onSearch = (value: string) => {
        productDispatch({ type: ProductActionEnum.SET_SEARCH, payload: value });
    }

    const onOrderChange = (order: OrderByPriceType) => {
        productDispatch({ type: ProductActionEnum.SET_ORDER, payload: order });
    }

    useEffect(() => {
        // Fetch data from server
    }, [productState.search, productState.order, productState.currentPage, productState.range, productState.categories])

    return (
        <div className="flex my-[48px] h-screen items-center justify-center w-full bg-white">
            <CustomerFilter className="w-[30%] p-2" />
            <div className="w-[60%] flex flex-col items-center justify-center">
                <CustomerSearch
                    order={productState.order}
                    onOrderChange={onOrderChange}
                    search={productState.search}
                    onSearch={onSearch}
                />
                <span>BODY CONTENT 1</span>
                <span>BODY CONTENT</span>
                <span>BODY CONTENT</span>
                <span>BODY CONTENT</span>
                <span>BODY CONTENT</span>
                <span>BODY CONTENT</span>
                <span>BODY CONTENT</span>
                <span>BODY CONTENT END</span>
            </div>
        </div>
    );
}
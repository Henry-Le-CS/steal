'use client'
import { CustomerFilter } from "@/components/filter/customer";
import { CustomerProductList } from "@/components/products/customer";
import { CustomerSearch } from "@/components/search/customer";
import { Search } from "@/components/ui";
import { useProductContext } from "@/store/contexts";
import { ProductActionEnum } from "@/store/reducers";
import { OrderByPriceType } from "@/store/types";

export default function ProductPage() {
    const { productState, productDispatch } = useProductContext();

    const onSearch = (value: string) => {
        productDispatch({
            type: ProductActionEnum.SET_SEARCH, payload: value
        });
    }

    const onOrderChange = (order: OrderByPriceType) => {
        productDispatch({ type: ProductActionEnum.SET_ORDER, payload: order });
    }


    return (
        <div className="flex my-[48px] h-max items-start justify-center w-full bg-white">
            <CustomerFilter className="w-[30%] p-2" />

            <div className="w-[60%] mt-[12px] flex flex-col items-center justify-center gap-8">
                <CustomerSearch
                    order={productState.order}
                    onOrderChange={onOrderChange}
                    search={productState.search}
                    onSearch={onSearch}
                />
                <CustomerProductList />
            </div>
        </div>
    );
}
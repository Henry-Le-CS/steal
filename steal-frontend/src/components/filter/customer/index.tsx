'use client'
import { FC, HtmlHTMLAttributes, memo, useState } from "react";
import { PriceFilter } from "./price-filter";
import { CategoryFilter } from "./categories-filter";
import { Button } from 'primereact/button';
import clsx from "clsx";
import { useProductContext } from "@/store/contexts";
import { PriceUnit } from "@/common/constants/products";
import { ProductActionEnum } from "@/store/reducers";

interface CustomerFilterProps extends HtmlHTMLAttributes<HTMLDivElement> { }
const CustomerFilterComponent: FC<CustomerFilterProps> = (props) => {
    const { className, ...rest } = props;

    const { productState, productDispatch } = useProductContext();

    const [priceRange, setPriceRange] = useState<[number, number]>(productState.range || [0, 100])
    const [categories, setCategories] = useState<string[]>(productState.categories || [])


    const onClick = async () => {
        // Reset at page 0
        productDispatch({
            type: ProductActionEnum.SET_ALL,
            payload: {
                range: priceRange,
                categories,
                currentPage: 0
            }
        })
    }

    return <div className={
        clsx([
            "flex flex-col gap-8 items-center justify-center",
            className
        ])
    } {...rest}>
        <PriceFilter
            range={priceRange}
            setRange={setPriceRange}
            unit={PriceUnit.VND}
        />
        <CategoryFilter
            categories={categories}
            setCategories={setCategories}
        />
        <Button
            className="bg-[#036147] hover:opacity-70 text-white py-2 px-4 ring-0"
            label="Apply filter"
            onClick={onClick}
        />
    </div>
}

export const CustomerFilter = memo(CustomerFilterComponent);
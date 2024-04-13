import { CartItem } from "@/store/types/cart";
import { FC, memo, useEffect, useState } from "react";
import { CartProductListInfo } from "./product-info";
import { Button } from "primereact/button";
import Link from "next/link";
import { getItemsFromCart } from "@/common/helper/cart";
const _ = require('lodash');

interface ProductListProps {
    items: CartItem[];
    setCartItems: (items: CartItem[]) => void;
    onUpdateCart: () => void;
}

const ProductListComponent: FC<ProductListProps> = (props) => {
    const { items, setCartItems } = props;

    return <div className="w-[50%] flex flex-col items-center justify-center gap-4">
        <div className="w-full grid grid-cols-7 gap-2 border-b font-bold">
            <div className="col-span-3 text-center">
                Product
            </div>
            <div className="text-center">
                Price
            </div>
            <div className="col-span-2 text-center">
                Quantity
            </div>
            <div className="text-center">
                Temporary
            </div>
        </div>

        <CartProductListInfo items={items} setCartItems={setCartItems} />

        {
            items?.length ?
                <div className="grid grid-cols-2 gap-4 mt-2 font-light">
                    <Link href="/product">
                        <Button className="bg-white shadow-none hover:opacity-70 border border-1 border-[#036147] px-8 py-2 text-[#036147]" label="Continue Shopping" />
                    </Link>
                    {items?.length ? <Button className="bg-[#009D65] shadow-none hover:opacity-70 border border-1 border-[#036147] px-8 py-2 text-white" label="Update Cart" onClick={props.onUpdateCart} /> : <></>}
                </div> :
                <div className="grid grid-cols-1 gap-4 mt-2 font-light">
                    <Link href="/product">
                        <Button className="bg-white col-span-1 shadow-none hover:opacity-70 border border-1 border-[#036147] px-8 py-2 text-[#036147]" label="Continue Shopping" />
                    </Link>
                </div>
        }

    </div>
}

export const CartProductList = memo(ProductListComponent);
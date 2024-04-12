'use client'
import { Button } from "primereact/button";
import { FC, memo, useState } from "react";

// TODO: check if in cart => update cart
const AddToCartComponent: FC = () => {
    const [count, setCount] = useState(0);

    function increase() {
        setCount(prev => prev + 1);
    }

    function decrease() {
        if (count == 0) return;
        setCount(prev => prev - 1);
    }

    function addToCart() {
        // id, count
    }


    return <div className="w-full flex items-center justify-between gap-4 my-8">
        <div className="flex items-center justify-center gap-0 rounded-lg border-y">
            <Button className="hover:opacity-70 py-2 px-4 ring-0 text-black border-x" onClick={decrease}>-</Button>
            <Button className="hover:opacity-70 py-2 px-4 ring-0 text-black">{count}</Button>
            <Button className="hover:opacity-70 py-2 px-4 ring-0 text-black border-x" onClick={increase}>+</Button>
        </div>
        <Button className="w-[30%] flex items-center justify-center hover:opacity-70 py-2 px-4 ring-0 text-black border">Add to cart</Button>
    </div>
}

export const AddToCart = memo(AddToCartComponent);
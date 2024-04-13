'use client'
import { formatDate } from "@/common/helper";
import { getItemFromCart, updateCart } from "@/common/helper/cart";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import { Button } from "primereact/button";
import { FC, memo, useState } from "react";

// TODO: check if in cart => update cart
const AddToCartComponent: FC = () => {
    const { id } = useParams();
    const currentItemCount = getItemFromCart()[id as string];

    const [count, setCount] = useState(currentItemCount || 0);
    const { toast } = useToast()


    const shouldUpdate = currentItemCount !== count;

    function increase() {
        setCount(prev => prev + 1);
    }

    function decrease() {
        if (count == 0) return;
        setCount(prev => prev - 1);
    }

    function updateCartInfo() {
        updateCart(id as string, count);

        const multiple = count > 1 ? "s" : "";

        const title = shouldUpdate || currentItemCount == 0 ? "Cart is updated" : "Product is added to cart";
        const message = shouldUpdate ? `${count} item${multiple} are updated at ${formatDate(new Date().toISOString())}` : `${count} item${multiple} are added at ${formatDate(new Date().toISOString())}`;

        toast({
            title,
            description: message,
        })
    }



    return <div className="w-full flex items-center justify-between gap-4 my-8">
        <div className="flex items-center justify-center gap-0 rounded-lg border-y">
            <Button className="hover:opacity-70 py-2 px-4 ring-0 text-black border-x" onClick={decrease}>-</Button>
            <Button className="hover:opacity-70 py-2 px-4 ring-0 text-black">{count}</Button>
            <Button className="hover:opacity-70 py-2 px-4 ring-0 text-black border-x" onClick={increase}>+</Button>
        </div>
        <Button
            onClick={updateCartInfo}
            className="w-[30%] flex items-center justify-center hover:opacity-70 py-2 px-4 ring-0 text-black border"
        >
            {shouldUpdate || !(currentItemCount == 0) ? "Update Cart" : "Add to Cart"}
        </Button>
    </div>
}

export const AddToCart = memo(AddToCartComponent);
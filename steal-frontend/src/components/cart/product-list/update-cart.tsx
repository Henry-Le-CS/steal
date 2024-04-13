'use client'
import { formatDate } from "@/common/helper";
import { getItemsFromCart, updateCart } from "@/common/helper/cart";
import { useToast } from "@/components/ui/use-toast";
import { CartItem } from "@/store/types/cart";
import { useParams } from "next/navigation";
import { Button } from "primereact/button";
import { FC, memo, useState } from "react";


const UpdateCartComponent: FC<{
    id: string
    cartItems: CartItem[];
    setCartItems: (items: CartItem[]) => void;
}> = (props) => {
    const thisItem = props.cartItems.find(item => item.id == props.id);

    let { id, cartItems, setCartItems } = props;

    function increase() {
        const updatedItems = cartItems.map((item) => {
            const { cartQuantity } = item;

            if (id == item.id) {
                return {
                    ...item,
                    cartQuantity: cartQuantity + 1,
                }
            }

            return item;
        })

        setCartItems(updatedItems);
    }

    function decrease() {
        if (thisItem?.cartQuantity == 0) return;

        const { cartQuantity } = thisItem as CartItem;

        const updatedItems = cartItems.map((item) => {
            if (id == item.id) {
                return {
                    ...item,
                    cartQuantity: cartQuantity - 1,
                }
            }

            return item;
        })

        setCartItems(updatedItems);
    }


    return <div className="flex items-start justify-center gap-0 rounded-lg border-y">
        <Button className="hover:opacity-70 py-2 px-4 ring-0 text-black border-x" onClick={decrease}>-</Button>
        <Button className="hover:opacity-70 py-2 px-4 ring-0 text-black">{thisItem?.cartQuantity}</Button>
        <Button className="hover:opacity-70 py-2 px-4 ring-0 text-black border-x" onClick={increase}>+</Button>
    </div>
}

export const UpdateCart = memo(UpdateCartComponent);
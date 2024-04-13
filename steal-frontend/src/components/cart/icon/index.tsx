import { getItemsFromCart } from "@/common/helper/cart";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";

export const CartIcon = function CartIconComponent() {


    const [itemCounts, setItemCounts] = useState(0);

    useEffect(() => {
        if (!localStorage) return;

        const cartItems = getItemsFromCart();
        const initalItemCount = Object.keys(cartItems)
            .filter((key) => cartItems[key] > 0)
            .length;

        setItemCounts(initalItemCount);

        window.addEventListener('storage', async () => {
            // When local storage changes, dump the list to
            // the console.
            // if (!localStorage) return;

            await new Promise((resolve) => setTimeout(resolve, 50));

            const items = getItemsFromCart();
            const counts = Object.keys(items)
                .filter((key) => items[key] > 0)
                .length;

            setItemCounts(counts);
        });

        return () => {
            window.removeEventListener('storage', () => {
                console.log("remove listener");
            });
        }
    }, [])

    const shownNumber = itemCounts > 9 ? "9+" : itemCounts;

    return <div className="relative">
        <CiShoppingCart className="relative" size={32}>
        </CiShoppingCart>
        <div style={{
            zIndex: 21
        }} className={
            clsx([
                "bg-[#FF7125] flex items-center justify-center rounded-full w-[15px] h-[15px] absolute text-xs top-0 -right-[5px] text-[red]",
                itemCounts === 0 && "hidden"
            ])
        }>
            <span className="text-white font-bold">
                {shownNumber}
            </span>
        </div>
    </div>
}
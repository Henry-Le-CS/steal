import { PriceUnit } from "@/common/constants/products";
import { formartNumber } from "@/common/helper";
import { CartItem } from "@/store/types/cart";
import { Button } from "primereact/button";
import { memo } from "react";

interface ProceedCheckoutProps {
    items: CartItem[];
}

export const ProceedCheckout = memo(function ProceedCheckoutComponent(props: ProceedCheckoutProps) {
    const { items } = props;

    const plural = items.length > 1 ? 's' : '';

    function getTotalPrice() {
        const price = items.reduce((acc, item) => {
            return acc + item.price * item.cartQuantity;
        }, 0);

        return formartNumber(price);
    }

    return <div className="w-[50%] grid grid-rows-5 gap-8 p-4 rounded-sm bg-[#D9D9D9]">
        <div className="flex items-center justify-between p-2 border-b border-[#00000080]">
            <span className="font-bold">Products</span>
            <span className="text-sm font-light">{items.length} item{plural}</span>
        </div>

        <div className="flex items-center justify-between p-2 border-b border-[#00000080]">
            <span className="font-bold">Voucher</span>
            <span className="text-sm font-light">Applied: 0</span>
        </div>

        <div className="flex items-center justify-between p-2 border-b border-[#00000080]">
            <span className="font-bold">Delivery</span>

            <div className="text-sm font-light grid grid-rows-2 justify-end gap-2">
                <span className="text-end">
                    Free delivery
                </span>
                <span className="text-end">
                    Delivery option will be updated in checkout process
                </span>
            </div>
        </div>

        <div className="flex items-center justify-between p-2 border-b border-[#00000080]">
            <span className="font-bold">Total</span>
            <div className="flex items-center justify-center gap-2">
                <span className="text-[#FF7125] font-bold">{getTotalPrice()}</span>
                <span className="font-bold">{PriceUnit.VND}</span>
            </div>
        </div>

        <div className="w-full flex items-center justify-center">
            <Button className="w-[40%] border border-[#000] text-white shadow-none bg-[#FF7125] rounded-lg px-6 py-2" label="Proceed to checkout" />
        </div>
    </div>
})
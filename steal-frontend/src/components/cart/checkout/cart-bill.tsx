import { PriceUnit } from "@/common/constants/products";
import { formartNumber } from "@/common/helper";
import { CartItem } from "@/store/types/cart";
import { Button } from "primereact/button";
import { FC, memo } from "react";
import * as RadioGroup from '@radix-ui/react-radio-group';

interface CartBillProps {
    items: CartItem[];
}

const CartBillComponent: FC<CartBillProps> = (props) => {
    const { items } = props;

    if (!items.length) return <div className="w-full border border-[#000] border-[1px] rounded-sm p-4 flex flex-col gap-6 items-center justify-center">
        <div className="w-full text-2xl w-full flex items-center justify-start">
            <span>YOUR CART</span>
        </div>

        <div className="w-full grid grid-row-6 px-2 gap-2">
            <div className="w-full grid grid-cols-2 border-b">
                <span className="text-start text-lg text-[#ababab]">PRODUCT</span>
                <span className="text-end text-lg text-[#ababab]">TEMPORARY</span>
            </div>

            <div className="w-full pb-4 bl-4 pr-4 mt-2">
                <span className="text-start text-lg text-[#ababab]">Please select a product to checkout</span>
            </div>

        </div>

        <div className="w-full flex items-center justify-center">
            <Button disabled className="w-[40%] border border-[#000] text-white shadow-none bg-[#FF7125] rounded-lg px-6 py-2" label="Order" />
        </div>
    </div>

    const total = items.reduce((acc, item) => acc + item.price * item.cartQuantity, 0);

    // TODO: call backend to calculate the price;
    return <div className="w-full border border-[#000] border-[1px] rounded-sm p-4 flex flex-col gap-6 items-center justify-center">
        <div className="w-full text-2xl w-full flex items-center justify-start">
            <span>YOUR CART</span>
        </div>

        <div className="w-full grid grid-row-6 px-2 gap-2">
            <div className="w-full grid grid-cols-2 border-b">
                <span className="text-start text-lg text-[#ababab]">PRODUCT</span>
                <span className="text-end text-lg text-[#ababab]">TEMPORARY</span>
            </div>

            <div className="w-full grid border-b max-h-[300px] overflow-y-auto no-scrollbar">
                {
                    items.map((item) => {
                        const { id, price, cartQuantity, title } = item;

                        return <div key={id} className="w-full grid grid-cols-2 text-sm p-4">
                            <span className="font-bold">{title}</span>
                            <span className="flex items-center justify-end gap-2 text-center text-[#FF7125] font-bold">
                                {formartNumber(price * cartQuantity)}
                                <span className="text-black">{PriceUnit.VND}</span>
                            </span>
                        </div>
                    })
                }
            </div>

            <div className="w-full grid grid-cols-2 border-b pb-4 bl-4 pr-4 mt-2">
                <span className="text-start text-lg text-[#ababab]">DELIVERY</span>
                <span className="flex items-center justify-end gap-2 text-center text-[#FF7125] font-bold">
                    FREE DELIVERY
                </span>
            </div>

            <div className="w-full grid grid-cols-2 border-b pb-4 bl-4 pr-4 mt-2">
                <span className="text-start text-lg text-[#ababab]">TOTAL</span>
                <span className="flex items-center text-lg justify-end gap-2 text-center text-[#FF7125] font-bold">
                    {formartNumber(total)}
                    <span className="text-black">{PriceUnit.VND}</span>
                </span>
            </div>

            <div className="w-full grid grid-cols-2 border-b pb-4 bl-4 pr-4 mt-2">
                <span className="text-start text-lg text-[#ababab]">PAYMENT METHOD</span>
                <span className="flex items-center justify-end gap-2 text-center font-light">
                    Cash On Delivery
                </span>
            </div>

        </div>

        <div className="w-full flex items-center justify-center">
            <Button className="w-[40%] border border-[#000] text-white shadow-none bg-[#FF7125] rounded-lg px-6 py-2" label="Order" />
        </div>
    </div>
}

export const CartBill = memo(CartBillComponent);
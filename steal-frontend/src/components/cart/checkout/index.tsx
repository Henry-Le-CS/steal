import { memo } from "react";
import * as Form from '@radix-ui/react-form';
import { CheckoutInformation } from "./checkout-information";
import { CartBill } from "./cart-bill";
import { CartItem } from "@/store/types/cart";

interface CheckoutFormProps {
    items: CartItem[];
}

export const CheckoutForm = memo(function CheckoutFormComponent(props: CheckoutFormProps) {
    const { items } = props;
    function onSubmit() {

    }

    return <Form.Root className="w-full grid grid-cols-6 gap-12 mt-8 p-2">
        <div className="col-span-3 flex flex-col gap-6 items-start justify-center">
            <span className="text-2xl font-light">CHECKOUT INFORMATION</span>
            <CheckoutInformation />
        </div>

        <div className="col-span-3 flex items-start justify-center">
            <CartBill items={items} />
        </div>
    </Form.Root>
})
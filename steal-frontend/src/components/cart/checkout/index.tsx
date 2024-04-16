'use client'
import { memo, useState } from "react";
import * as Form from '@radix-ui/react-form';
import { CheckoutInformation } from "./checkout-information";
import { CartBill } from "./cart-bill";
import { CartItem } from "@/store/types/cart";
import { FORM_CONTROL_CLASSES, FORM_FIELD_CLASSES } from "./constants";
import clsx from "clsx";
import { CiUser } from "react-icons/ci";
import { MakeOrderDto, makeOrder } from "@/apis";
import { removeItemWithIdFromCart } from "@/common/helper";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

interface CheckoutFormProps {
    items: CartItem[];
    setTab: (tab: 'cart' | 'checkout') => void;
}

export const CheckoutForm = memo(function CheckoutFormComponent(props: CheckoutFormProps) {
    const { items, setTab } = props;
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const cookie = useCookies();

    function onSubmit(e: any) {
        if (!e) return;
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(document.getElementById('form-data') as HTMLFormElement));

        async function order() {
            try {
                setIsLoading(true);

                const userId = cookie.get('id');

                if (!userId) {
                    throw new Error('User not found');
                }

                const { data } = await makeOrder({
                    ...formData as Omit<MakeOrderDto, "id" | "paymentType" | "productId" | "quantity">,
                    id: Number(userId),
                    paymentType: 'cod',
                    productId: Number(items[0].id),
                    quantity: items[0].cartQuantity,
                })

                if (data?.orderId) {
                    window.alert(`Order success! Your order ID is ${data.orderId}`);
                }

                removeItemWithIdFromCart(items[0].id);
                setTab('cart');
                const userConfirm = window.confirm('Do you want to continue shopping?');

                if (userConfirm) {
                    router.push('/product')
                }
                else {
                    router.push('/cart')
                }
            }
            catch (err: any) {
                window.alert(err.response.data.message || JSON.stringify(err?.message))
            }
            finally {
                setIsLoading(false);
            }
        }

        order();
    }

    return <Form.Root id="form-data" onSubmit={onSubmit} className="w-full grid grid-cols-6 gap-12 p-2">
        <div className="col-span-3 flex flex-col gap-6 items-start justify-center">
            <span className="text-2xl font-light">CHECKOUT INFORMATION</span>
            <div className="w-full grid grid-rows-6 gap-2">
                <div className='grid grid-cols-2 gap-8'>
                    <Form.Field className={clsx(FORM_FIELD_CLASSES)} name="firstName" >
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            className={clsx([
                                ...FORM_CONTROL_CLASSES,
                            ])}
                            type="text"
                            required
                        ></Form.Control>
                        <Form.Message className="text-[13px] text-[red] opacity-[0.8]" match="valueMissing">
                            Please enter your first name
                        </Form.Message>
                    </Form.Field>

                    <Form.Field className={clsx(FORM_FIELD_CLASSES)} name="lastName" >
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            className={clsx([
                                ...FORM_CONTROL_CLASSES,
                            ])}
                            type="text"
                            required
                        />
                        <Form.Message className="text-[13px] text-[red]" match="valueMissing">
                            Please enter your last name
                        </Form.Message>
                    </Form.Field>
                </div>

                <Form.Field className={clsx(FORM_FIELD_CLASSES)} name="city" >
                    <Form.Label>Province / City</Form.Label>
                    <Form.Control
                        className={clsx([
                            ...FORM_CONTROL_CLASSES,
                        ])}
                        type="text"
                        required
                    />
                </Form.Field>

                <Form.Field className={clsx(FORM_FIELD_CLASSES)} name="address" >
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        className={clsx([
                            ...FORM_CONTROL_CLASSES,
                        ])}
                        type="text"
                        required
                    />
                </Form.Field>

                <Form.Field className={clsx(FORM_FIELD_CLASSES)} name="phone" >
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        className={clsx([
                            ...FORM_CONTROL_CLASSES,
                        ])}
                        type="text"
                        required
                    />
                </Form.Field>


                <Form.Field className={clsx(FORM_FIELD_CLASSES)} name="email" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        className={clsx([
                            ...FORM_CONTROL_CLASSES,
                        ])}
                        type="email"
                        required
                    />
                </Form.Field>

                <Form.Field className={clsx(FORM_FIELD_CLASSES)} name="note" >
                    <Form.Label>Note</Form.Label>
                    <Form.Control
                        className={clsx([
                            ...FORM_CONTROL_CLASSES,
                        ])}
                        type="text"
                        required
                    />
                </Form.Field>
            </div>
        </div>
        <div className="col-span-3 flex items-start justify-center">
            <CartBill isLoading={isLoading} onSubmit={onSubmit} items={items} />
        </div>
    </Form.Root>
})
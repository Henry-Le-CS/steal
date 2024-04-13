'use client';
import { MOCK_PRODUCTS } from "@/common/data";
import { getItemsFromCart, updateCart, updateMultipleCart } from "@/common/helper/cart"
import { CartProductList } from "@/components/cart/product-list";
import { ProceedCheckout } from "@/components/transaction/proceed-checkout";
import { useToast } from "@/components/ui/use-toast";
import { CartItem } from "@/store/types/cart";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui"


export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [tab, setTab] = useState<'cart' | 'checkout'>('cart');
    const { toast } = useToast();

    async function fetchCartItem() {
        const cart = getItemsFromCart();

        await new Promise((resolve) => setTimeout(resolve, 200));

        const cartItems = MOCK_PRODUCTS.filter(product => cart[product.id]);

        const items = cartItems
            // Get from localStorage
            .map(item => ({
                ...item,
                cartQuantity: cart[item.id]
            }
            ))
            // Filter out items with cartQuantity <= 0
            .filter(item => item.cartQuantity > 0)

        setCartItems(items);
    }

    useEffect(() => {

        fetchCartItem();
    }, [])

    function onUpdateCart() {
        const updatedItems = cartItems.reduce((acc, item) => {
            acc[item.id] = item.cartQuantity;
            return acc;
        }, {} as Record<string, number>);

        updateMultipleCart(updatedItems);

        toast({
            title: 'Cart is updated',
            description: `Cart is updated at ${new Date().toISOString()}`
        })

        fetchCartItem();
    }

    function onProceedCheckout() {
        setTab('checkout');
    }


    return <div className="flex my-[48px] h-max items-start justify-center w-full bg-white gap-12 px-[80px]">
        <Tabs defaultValue={tab} value={tab} className="w-full p-2">
            <TabsList onChange={(e) => console.log(e)} className="w-full text-[red] py-6 px-2">
                <TabsTrigger className="w-[50%]" onClick={() => setTab('cart')} value="cart">
                    <span className="font-bold text-[#036147]">Shopping Cart</span>
                </TabsTrigger>
                <TabsTrigger className="w-[50%]" onClick={() => setTab('checkout')} value="checkout">
                    <span className="font-bold text-[#036147]">Checkout</span>
                </TabsTrigger>
            </TabsList>
            <TabsContent className="text-sm" value="checkout">
                Items are straight from the album and do not have noticeable flaws  unless stated otherwise. However, if you are extremely sensitive to fine  scratches/production marks, if any, then please refrain from  purchasing!
                <br />
                <br />
                Availability will be adjusted as more arrive.
                <br />
                <br />
                📮  FREE SHIPPING is provided through Pitney Bowes and fulfilled by USPS  with limited tracking. If you would like USPS tracking please upgrade at  checkout.</TabsContent>
            <TabsContent className="flex my-[48px] h-max items-start justify-center w-full bg-white gap-12 px-[80px] " value="cart">
                <CartProductList items={cartItems} setCartItems={setCartItems} onUpdateCart={onUpdateCart} />
                <ProceedCheckout items={cartItems} onProceedCheckout={onProceedCheckout} />
            </TabsContent>
        </Tabs>
    </div>
}
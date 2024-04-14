'use client';
import { MOCK_PRODUCTS } from "@/common/data";
import { getItemsFromCart, updateCart, updateMultipleCart } from "@/common/helper/cart"
import { CartProductList } from "@/components/cart/product-list";
import { ProceedCheckout } from "@/components/transaction/proceed-checkout";
import { useToast } from "@/components/ui/use-toast";
import { CartItem } from "@/store/types/cart";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui"
import { CheckoutForm } from "@/components/cart/checkout";


export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [savedCartItems, setSavedCartItems] = useState<CartItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<string>('');

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
        setSavedCartItems(items);

        if (!selectedItem && items.length > 0) {
            setSelectedItem(items[0].id);
        }
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

    const checkoutedItem = savedCartItems.find(item => item.id === selectedItem);

    return <div className="flex mt-[48px] h-max items-start justify-center w-full bg-white gap-12 px-[5%]">
        <Tabs defaultValue={tab} value={tab} className="w-full p-2 mx-[32px]">
            <TabsList onChange={(e) => console.log(e)} className="w-full text-[red] pt-6 py-2 px-25">
                <TabsTrigger className="w-[50%]" onClick={() => setTab('cart')} value="cart">
                    <span className="font-bold text-[#036147]">Shopping Cart</span>
                </TabsTrigger>
                <TabsTrigger className="w-[50%]" onClick={() => setTab('checkout')} value="checkout">
                    <span className="font-bold text-[#036147]">Checkout</span>
                </TabsTrigger>
            </TabsList>
            <TabsContent className="flex my-[48px] h-max items-start justify-center w-full bg-white gap-12 p-2" value="cart">
                <CartProductList
                    selectedItemId={selectedItem}
                    items={cartItems}
                    setCartItems={setCartItems}
                    onUpdateCart={onUpdateCart}
                    setSelectedItem={setSelectedItem}
                />
                <ProceedCheckout
                    item={checkoutedItem}
                    onProceedCheckout={onProceedCheckout}
                />
            </TabsContent>
            <TabsContent className="-mt-16 mb-12" value="checkout">
                <CheckoutForm
                    items={checkoutedItem ? [checkoutedItem] : []}
                />
            </TabsContent>
        </Tabs>
    </div>
}
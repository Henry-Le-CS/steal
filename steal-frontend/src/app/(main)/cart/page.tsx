'use client';
import { MOCK_PRODUCTS } from "@/common/data";
import { getItemsFromCart, updateCart, updateMultipleCart } from "@/common/helper/cart"
import { CartProductList } from "@/components/cart/product-list";
import { useToast } from "@/components/ui/use-toast";
import { CartItem } from "@/store/types/cart";
import { useEffect, useState } from "react";

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
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

    // const cartItems = Object.keys(cart).map(key => )
    return <div className="flex my-[48px] h-max items-start justify-center w-full bg-white gap-12 px-[80px]">
        <CartProductList items={cartItems} setCartItems={setCartItems} onUpdateCart={onUpdateCart} />
        <CartProductList items={cartItems} setCartItems={setCartItems} onUpdateCart={onUpdateCart} />
    </div>
}
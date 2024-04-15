import { CartItem } from "@/store/types/cart";
import { FC, memo, useEffect, useState } from "react";
import { Image } from 'primereact/image'
import { formartNumber } from "@/common/helper";
import { PriceUnit } from "@/common/constants/products";
import Link from "next/link";
import clsx from "clsx";
import { UpdateCart } from "./update-cart";
import { calculatePriceForCartItems } from "@/apis";
interface ProductListProps {
    items: CartItem[];
    selectedItemId: string;
    setCartItems: (items: CartItem[]) => void;
    setSelectedItem: (id: string) => void;
}

const ProductListInfoComponent: FC<ProductListProps> = (props) => {
    const { items, setCartItems, setSelectedItem } = props;
    const [itemInfo, setItemInfo] = useState<Record<string, any>>({})
    console.log('items', items, itemInfo);
    useEffect(() => {
        async function calculatePrice() {
            const { data: products } = await calculatePriceForCartItems({
                type: 'multiple',
                products: items.map(item => ({
                    id: Number(item.id),
                    amount: item.cartQuantity
                }))
            })

            if (!products) return;

            products.forEach((product) => {
                setItemInfo((prev) => ({
                    ...prev,
                    [product.productId]: {
                        total: product.totalPrice,
                        quantity: product.quantity,
                        price: product.price
                    }
                }))
            })
        }

        calculatePrice();
    }, [items])

    return <div className="w-full flex flex-col items-start justify-start gap-4 mt-4 max-h-[600px] overflow-y-auto no-scrollbar">
        {
            items.map((item, index) => {
                const { id, title, imageUrl, price, cartQuantity } = item;
                const detail = itemInfo[id];

                if (!detail) return null;

                return <div
                    key={id}
                    onClick={() => setSelectedItem(id)}
                    className={
                        clsx([
                            "w-full p-1 flex items-center justify-center gap-2 hover:bg-[#d3d3d3] hover:bg-opacity-40 rounded-lg hover:cursor-pointer",
                            id === props.selectedItemId && "bg-[#d3d3d3] bg-opacity-40"
                        ])
                    }
                >
                    <div className={
                        clsx([
                            "w-full grid grid-cols-7 gap-2 text-sm p-2",
                            index !== items.length - 1 && "border-b"
                        ])
                    }>
                        <div className="col-span-3">
                            <Link href={`product/${id}`} rel="noopener noreferrer" target="_blank">
                                <div className="rounded-lg border">
                                    <Image width="auto" src={imageUrl} alt="Product image" />
                                </div>
                                <div className="text-center font-bold mt-2">
                                    {title}
                                </div>
                            </Link>
                        </div>
                        <div className="text-center font-bold p-1">
                            <span className="text-[#FF7125]">{formartNumber(price)}</span> <span>{PriceUnit.VND}</span>
                        </div>
                        <div className="col-span-2 text-center flex items-start justify-center">
                            <UpdateCart
                                id={id}
                                cartItems={items}
                                setCartItems={setCartItems}
                            />
                        </div>
                        <div className="text-center font-bold p-1">
                            <span className="text-[#FF7125]">{formartNumber(detail.total)}</span> {PriceUnit.VND}
                        </div>
                    </div>
                </div>

            })
        }
    </div >
}

export const CartProductListInfo = memo(ProductListInfoComponent);
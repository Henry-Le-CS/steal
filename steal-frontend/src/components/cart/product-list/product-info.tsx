import { CartItem } from "@/store/types/cart";
import { FC, memo } from "react";
import { Image } from 'primereact/image'
import { formartNumber } from "@/common/helper";
import { PriceUnit } from "@/common/constants/products";
import Link from "next/link";
import clsx from "clsx";
import { UpdateCart } from "./update-cart";
interface ProductListProps {
    items: CartItem[];
    setCartItems: (items: CartItem[]) => void;
}

const ProductListInfoComponent: FC<ProductListProps> = (props) => {
    const { items, setCartItems } = props;

    return <div className="w-full flex flex-col items-start justify-center gap-4 mt-4">
        {
            items.map((item, index) => {
                const { id, title, imageUrl, price, cartQuantity } = item;
                return <div key={id} className="w-full flex items-center justify-center gap-2">
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
                            <span className="text-[#FF7125]">{formartNumber(price * cartQuantity)}</span> {PriceUnit.VND}
                        </div>
                    </div>
                </div>

            })
        }
    </div >
}

export const CartProductListInfo = memo(ProductListInfoComponent);
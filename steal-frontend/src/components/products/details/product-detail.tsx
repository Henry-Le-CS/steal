import { FC, memo } from "react";
import { ProductInfoProps } from ".";
import { Star } from "./star";
import { formartNumber } from "@/common/helper";
import { AddToCart } from "./add-to-cart";
import { ProductDescription } from "./product-description";

export type ProductDetailProps = Omit<ProductInfoProps, 'imageUrl'>

const ProductDetailComponent: FC<ProductDetailProps> = (props) => {
    const { title, price, postedAt, status, brand, category, unit, remaining } = props;

    return <div className="w-[60%] flex flex-col items-start justify-center gap-1">
        <span className="text-2xl font-bold">{title}</span>
        <div className="flex items-center justify-start gap-2">
            <div className="flex items-center justify-center gap-1">
                {
                    Array.from({ length: 5 }).map((_, index) => {
                        return <Star key={index} />
                    })
                }
            </div>
            <span className="text-center text-sm text-[#000000] opacity-70">10 customers&apos; reviewed</span>
        </div>
        <div className="flex flex-col items-start justify-center gap-1 mt-4">
            <span className="flex items-center justify-center gap-2 text-base font-light">
                <span>Price:</span>
                <span className="font-bold text-[#FF7125]">{formartNumber(price)}</span>
                <span className="font-bold">{unit}</span>
            </span>
            <span className="text-base font-light">Status: <span>{status}</span></span>
            <span className="text-base font-light">Remaining: <span>{remaining}</span></span>
            <span className="text-base font-light">Brand: <span>{brand}</span></span>
            <span className="text-base font-light">Category: <span>{category}</span></span>
        </div>

        <AddToCart />
        <ProductDescription />
    </div>
}

export const ProductDetail = memo(ProductDetailComponent);
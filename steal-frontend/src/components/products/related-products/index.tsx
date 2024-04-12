import { memo, useState } from "react";
import RelatedProductTitle from '@/assets/Related prOducts.svg';
import Image from "next/image";
import { RelatedProductList } from "./related-products";

const RelatedProductsComponent = () => {
    return <div className="w-full flex flex-col items-center my-[80px] px-[20%] justify-center gap-4">
        <Image className="h-[60px]" src={RelatedProductTitle} alt="Title" />
        <RelatedProductList />
    </div>
}

export const RelatedProducts = memo(RelatedProductsComponent);
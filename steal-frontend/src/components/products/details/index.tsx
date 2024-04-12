'use client'
import { ProductBriefType } from "@/store/types";
import { Image } from "primereact/image";
import { FC, memo, useEffect, useState } from "react";
import { ProductDetail } from "./product-detail";
import { useParams } from "next/navigation";
import { PriceUnit } from "@/common/constants/products";

export type ProductInfoProps = Omit<ProductBriefType & {
    status: string;
    brand: string;
    category: string;
    unit: PriceUnit;
    // Hard coded information
    // description: string;
    // additionalInfo: string;
}, 'count'>

export type ProductInfoType = ProductInfoProps;

const ProductInfoComponent: FC = () => {
    const { id } = useParams()
    const [product, setProduct] = useState<ProductInfoType | null>(null)

    useEffect(() => {
        if (!id) return;

        const fetchData = async (id: string) => {
            await new Promise(resolve => setTimeout(resolve, 200))

            setProduct({
                id,
                imageUrl: 'https://primefaces.org/cdn/primereact/images/usercard.png',
                title: 'Canon Kiss X5 (Canon EOS 600D) + Lens 28-80mm (80% New)',
                price: 336528,
                postedAt: '2021-12-12',
                status: 'Available',
                brand: 'Cannon',
                category: 'Category',
                unit: PriceUnit.VND,
            })
        }

        fetchData(id as string)
    }, [id])

    if (!product) return (<p>Cannot find the product you are looking for</p>);

    const { imageUrl, ...rest } = product;

    return <div className="flex items-center justify-center gap-4 my-8">
        <Image width='100%' alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
        <ProductDetail
            {...rest}
        />
    </div>
}

export const ProductInfo = memo(ProductInfoComponent);
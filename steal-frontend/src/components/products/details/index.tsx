'use client'
import { ProductBriefType } from "@/store/types";
import { Image } from "primereact/image";
import { FC, memo, useEffect, useState } from "react";
import { ProductDetail } from "./product-detail";
import { useParams } from "next/navigation";
import { PriceUnit } from "@/common/constants/products";
import { ProgressSpinner } from "primereact/progressspinner";

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
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = useState<ProductInfoType | null>(null)

    useEffect(() => {
        if (!id) return;

        const fetchData = async (id: string) => {
            try {
                setIsLoading(true)
                await new Promise(resolve => setTimeout(resolve, 200))

                setProduct({
                    id,
                    imageUrl: 'https://primefaces.org/cdn/primereact/images/usercard.png',
                    title: 'Canon Kiss X5 (Canon EOS 600D) + Lens 28-80mm (80% New)',
                    price: 336528,
                    postedAt: '2021-12-12',
                    status: 'Available',
                    brand: 'Cannon',
                    category: 'Electronics',
                    unit: PriceUnit.VND,
                })
            }
            catch (err) {
                console.error(err)
            }
            finally {
                setIsLoading(false)
            }
        }

        fetchData(id as string)
    }, [id])

    if (isLoading) return <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="#036147" animationDuration=".5s" />

    if (!product) return (<p>Cannot find the product you are looking for</p>);

    const { imageUrl, ...rest } = product;

    return <div className="w-full flex items-start my-[80px] px-[15%] justify-center gap-4">
        <Image className="w-[30%] border rounded-lg" width='auto' height="auto" alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
        <ProductDetail
            {...rest}
        />
    </div>
}

export const ProductInfo = memo(ProductInfoComponent);
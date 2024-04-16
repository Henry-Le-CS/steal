'use client'
import { ProductBriefType } from "@/store/types";
import { Image } from "primereact/image";
import { FC, memo, useEffect, useState } from "react";
import { ProductDetail } from "./product-detail";
import { useParams } from "next/navigation";
import { PriceUnit } from "@/common/constants/products";
import { ProgressSpinner } from "primereact/progressspinner";
import { getProductById } from "@/apis";
import { formatDate } from "@/common/helper";

export type ProductInfoProps = Omit<ProductBriefType & {
    status: string;
    brand: string;
    category: string;
    unit: PriceUnit;
    remaining: number;
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
                const { data } = await getProductById(parseInt(id))

                if (!data) return;

                const { images, created_at, categories, price, amount, name: title } = data
                setProduct({
                    id,
                    imageUrl: images[0],
                    title,
                    price,
                    postedAt: formatDate(created_at),
                    status: 'Available',
                    brand: 'Cannon',
                    category: categories.join(', '),
                    unit: PriceUnit.VND,
                    remaining: amount,
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

    return <div className="w-full flex items-start mt-[80px] mb-[60px] px-[15%] justify-center gap-4">
        <Image className="flex items-center justify-center w-[30%] border rounded-lg" width='auto' height="auto" alt="Card" src={imageUrl} />
        <ProductDetail
            {...rest}
        />
    </div>
}

export const ProductInfo = memo(ProductInfoComponent);
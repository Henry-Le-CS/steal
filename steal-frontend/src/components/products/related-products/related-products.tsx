'use client'
import { MOCK_PRODUCTS } from "@/common/data";
import { ProductBriefType } from "@/store/types";
import { ProgressSpinner } from "primereact/progressspinner";
import { FC, memo, useEffect, useState } from "react"
import { ProductCard } from "../customer/product-card";
import { PriceUnit } from "@/common/constants/products";
import { useParams } from "next/navigation";

const RelatedProductsListComponent: FC = (props) => {
    const { id } = useParams()

    const [isLoading, setIsLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState<ProductBriefType[]>([]);

    useEffect(() => {
        const fetchData = async (id: string) => {
            try {
                setIsLoading(true)
                await new Promise(resolve => setTimeout(resolve, 200))

                const products = MOCK_PRODUCTS.filter(p => p.id !== id);
                const relatedProducts = products.slice(0, 3);

                setRelatedProducts(relatedProducts);
            }
            catch (err) {
                console.error(err)
            }
            finally {
                setIsLoading(false)
            }
        }

        fetchData(id as string)
    }, [])

    if (isLoading) return <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="#036147" animationDuration=".5s" />

    return <div className="grid grid-cols-3 gap-4">
        {
            relatedProducts.map(product => {
                const { id } = product;

                return <ProductCard
                    key={id}
                    unit={PriceUnit.VND}
                    {...product}
                />
            })
        }
    </div>
}

export const RelatedProductList = memo(RelatedProductsListComponent)
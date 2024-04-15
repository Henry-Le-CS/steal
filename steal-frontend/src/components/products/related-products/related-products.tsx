'use client'
import { MOCK_PRODUCTS } from "@/common/data";
import { ProductBriefType } from "@/store/types";
import { ProgressSpinner } from "primereact/progressspinner";
import { FC, memo, useEffect, useState } from "react"
import { ProductCard } from "../customer/product-card";
import { PriceUnit } from "@/common/constants/products";
import { useParams } from "next/navigation";
import { getAllProducts, getProductById } from "@/apis";
import { extractBriefDataInfo } from "@/common/helper";

const RelatedProductsListComponent: FC = (props) => {
    const { id } = useParams()

    const [isLoading, setIsLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState<ProductBriefType[]>([]);

    useEffect(() => {
        const fetchData = async (id: string) => {
            try {
                setIsLoading(true)
                const { data } = await getProductById(Number(id));

                if (!data) return;

                const { categories } = data

                const { data: ret } = await getAllProducts({
                    categories: categories.join(','),
                })

                if (!ret) return;

                const rp = extractBriefDataInfo(ret?.products).slice(0, 3)

                setRelatedProducts(rp);
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
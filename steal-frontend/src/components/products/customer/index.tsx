import { FC, memo, useEffect, useState } from "react"
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { useProductContext } from "@/store/contexts";
import { ProgressSpinner } from 'primereact/progressspinner';
import { MOCK_PRODUCTS } from "@/common/data";
import { formartNumber } from "@/common/helper";

const ProductListComponent: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { productState, productDispatch } = useProductContext()
    const { products, search, order, currentPage, range, categories, unit } = productState

    useEffect(() => {
        // Fetch data from server
        async function fetchData() {
            try {
                setIsLoading(true)
                await new Promise((resolve) => setTimeout(resolve, 500))
                productDispatch({ type: 'SET_PRODUCTS', payload: MOCK_PRODUCTS })
            }
            catch (err) {
                console.error(err)
            }
            finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [search, order, currentPage])

    if (isLoading || !products?.length) return <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="#036147" animationDuration=".5s" />

    return <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
            {
                products.map((product, index) => {
                    const { title, imageUrl, id, price } = product
                    return <div key={id} className="card flex justify-content-center">
                        <Card
                            title={<span className="text-base">{title}</span>}
                            header={
                                <Image width='100%' alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
                            }
                            className="w-full p-2"
                        >
                            <div className="flex items-center justify-start gap-2 text-base">
                                <span>Price:</span>
                                <span className="text-[#FF7125] font-bold">{formartNumber(price)}</span>
                                <span className="font-bold">{unit}</span>
                            </div>
                        </Card>
                    </div>
                })
            }
        </div>
        <div>
            {/* Pagination */}
        </div>
    </div>
}

export const CustomerProductList = memo(ProductListComponent)
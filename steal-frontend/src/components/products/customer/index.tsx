import { FC, memo, useEffect, useState } from "react"
import { Card } from 'primereact/card';
import { useProductContext } from "@/store/contexts";
import { ProgressSpinner } from 'primereact/progressspinner';
import { MOCK_PRODUCTS } from "@/common/data";
import { formartNumber } from "@/common/helper";
import Link from "next/link";
import { Paginator } from 'primereact/paginator';
import { ProductCard } from "./product-card";
import { ProductType, getAllProducts } from "@/apis";
import { ProductBriefType } from "@/store/types";
import { ProductActionEnum } from "@/store/reducers";

const ProductListComponent: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(9);

    const { productState, productDispatch } = useProductContext()
    const { products, search, order, currentPage, unit, total, categories, range } = productState

    function extractBriefDataInfo(data: Array<ProductType>): ProductBriefType[] {
        const products = data.map((product) => {
            return {
                id: `${product.id}`,
                imageUrl: product.images[0],
                title: product.name,
                price: product.price,
                count: product.amount,
                postedAt: product.created_at
            }
        })

        return products
    }

    useEffect(() => {
        // Fetch data from server
        async function fetchData() {
            try {
                setIsLoading(true)

                const { data } = await getAllProducts({
                    page: `${currentPage}`,
                    q: search.trim(),
                    order: order,
                });

                const products = extractBriefDataInfo(data?.products || []);

                productDispatch(
                    {
                        type: ProductActionEnum.SET_ALL,
                        payload: {
                            products: products,
                            total: data?.total || 0,
                            currentPageCount: data?.products?.length || 0
                        }
                    }
                )
            }
            catch (err) {
                console.error(err)
            }
            finally {
                setIsLoading(false)
            }
        }

        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, order, currentPage, categories, range])

    const formatDate = (date: string) => {
        const d = new Date(date)
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }

    const onPageChange = (event: {
        first: number;
        rows: number;
        page: number;
        pageCount: number;
    }) => {
        setFirst(event.first);
        setRows(event.rows);

        productDispatch({ type: 'SET_PAGE', payload: event.page });
    };

    if (isLoading) return <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="#036147" animationDuration=".5s" />

    return <div className="w-full flex flex-col gap-4">
        <div className="w-full grid grid-cols-3 gap-4 justify-between">
            {
                products.map((product) => {
                    const { id } = product

                    return <ProductCard
                        key={id}
                        {...product}
                        unit={unit}
                    />
                })
            }
        </div>
        <div className="card">
            <Paginator
                first={first}
                rows={rows}
                totalRecords={total}
                onPageChange={onPageChange}
            />
        </div>
    </div>
}

export const CustomerProductList = memo(ProductListComponent)
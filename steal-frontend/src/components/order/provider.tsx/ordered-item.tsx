'use client'
import { Button } from "primereact/button";
import { memo, useEffect, useState } from "react";
import { Image as Img } from "primereact/image";
import truckSVG from "@/assets/truck.svg";
import Image from "next/image";
import { Divider } from 'primereact/divider';
import { CiCircleQuestion } from "react-icons/ci";
import * as Separator from '@radix-ui/react-separator';
import { PriceUnit } from "@/common/constants/products";
import { formartNumber } from "@/common/helper";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { OrderType, getOrdersOfSeller, getProductsOfSellerById } from "@/apis";
import { OrderedItemType } from "../customer/ordered-item";
import Link from "next/link";

export type ProviderOrderedType = {
    id: string;
    imageUrl: string;
    title: string;
    price: number;
    count: number;
    description: string;
    status: string;
}

interface ProviderOrderedProps {
    item: ProviderOrderedType
}

export const ProviderOrdered = memo(function ProviderOrderedComponent(props: ProviderOrderedProps) {
    const { item } = props;
    const { imageUrl, title, price, count, description, status } = item;

    return <div className="w-full shadow-lg rounded-lg py-2 px-4 h-max flex items-center justify-center gap-8">
        <div className="w-[25%] flex items-center justify-center h-full border rounded-lg min-h-[250px] bg-[#d3d3d3] bg-opacity-5 p-2">
            <Img className="" src={imageUrl} alt="Product image" />
        </div>
        <div className="w-[85%] grid grid-rows-4">
            <div className="w-full flex items-center justify-end border-b text-sm">
                <span className="flex items-center justify-center gap-2 text-[#009D65]">
                    <Image className="w-[32px]" src={truckSVG} alt="Truck icon" />
                    {description}
                    <CiCircleQuestion className="text-[#ababab]" size={24} />
                </span>

                <Separator.Root
                    className="bg-violet6 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-[60%] data-[orientation=vertical]:w-px mx-[15px]"
                    decorative
                    orientation="vertical"
                />

                <span className="font-bold text-[#FF7125]">
                    {status}
                </span>
            </div>

            <div className="flex items-center justify-between border-b">
                <div className="grid grid-rows-2 gap-4 p-2">
                    <span className="text-lg font-bold">
                        {title}
                    </span>

                    <span className="text-base flex items-center justify-start gap-2">
                        <span>Quantity:</span>
                        <span className="font-bold text-[#FF7125]">
                            {count}
                        </span>
                    </span>
                </div>

                <div className="flex font-bold items-center justify-center gap-2">
                    <span className="text-[#FF7125]">
                        {formartNumber(price)}
                    </span>

                    <span className="">
                        {PriceUnit.VND}
                    </span>
                </div>
            </div>

            <div className="w-full flex gap-2 font-bold items-center justify-end">
                <span>
                    Total:
                </span>

                <span className="text-[#FF7125]">
                    {formartNumber(price * count)}
                </span>

                <span className="">
                    {PriceUnit.VND}
                </span>
            </div>

            <div className="w-full flex items-center justify-end">
                <Link href={`/product/${item.id}`} rel="noopener noreferrer" target="_blank">
                    <Button className="font-light py-3 px-6 border rounded-md text-[#036147] shadow-none hover:bg-[#d3d3d3] hover:bg-opacity-40" label="View Product Details" />
                </Link>
            </div>
        </div>
    </div>
});

export const ProviderOrderTab = memo(function ProviderOrderTabComponent(props: {
    isLoading: boolean;
    userId: string;
}) {
    const { userId, isLoading } = props;
    const [orderedItems, setOrderedItems] = useState<ProviderOrderedType[]>([]);
    const router = useRouter();

    function extractOrderedItems(data: OrderType[]): OrderedItemType[] {
        return data.map((order) => ({
            id: `${order.id}`,
            imageUrl: order.product.images[0],
            title: order.product.name,
            price: order.total_price,
            count: order.amount,
            description: order.note,
            status: order.status
        }))
    }

    useEffect(() => {
        // Fetch all product of the owner
        async function fetchOrderedItems() {
            try {

                if (!userId) {
                    router.push('/login')
                    return;
                }

                const { data, message } = await getOrdersOfSeller(userId);

                if (!data || message) {
                    throw new Error(message || 'Cannot get orders')
                };

                const orderedItems = extractOrderedItems(data);

                setOrderedItems(orderedItems)
            }
            catch (err) {
                console.error(err)
            }
        }

        fetchOrderedItems();
    }, [])

    if (isLoading) {
        return <Spinner />
    }

    return <div className="w-full p-4 flex flex-col gap-4 max-h-[450px] box-border overflow-y-scroll no-scrollbar border rounded-md ">
        {
            orderedItems.map((item, index) => (
                <ProviderOrdered key={index} item={item} />
            ))
        }
        {
            orderedItems.length === 0 && <span className="w-full text-center text-[black]">No order is conducted yet</span>
        }
    </div>

})
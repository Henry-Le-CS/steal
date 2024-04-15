import { Button } from "primereact/button";
import { memo } from "react";
import { Image as Img } from "primereact/image";
import truckSVG from "@/assets/truck.svg";
import Image from "next/image";
import { Divider } from 'primereact/divider';
import { CiCircleQuestion } from "react-icons/ci";
import * as Separator from '@radix-ui/react-separator';
import { PriceUnit } from "@/common/constants/products";
import { formartNumber } from "@/common/helper";

export type OrderedItemType = {
    id: string;
    imageUrl: string;
    title: string;
    price: number;
    count: number;
    description: string;
    status: string;
}

interface OrderedItemProps {
    item: OrderedItemType
}

export const OrderedItem = memo(function OrderedItemComponent(props: OrderedItemProps) {
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
                    {formartNumber(price)}
                </span>

                <span className="">
                    {PriceUnit.VND}
                </span>
            </div>

            <div className="w-full flex items-center justify-end">
                <Button className="font-light py-3 px-6 border rounded-md text-[#036147] shadow-none hover:bg-[#d3d3d3] hover:bg-opacity-40" label="View Details" />
            </div>
        </div>
    </div>
});
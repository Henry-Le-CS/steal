import { Button } from "primereact/button";
import { memo } from "react";
import { Image as Img } from "primereact/image";
import { PriceUnit } from "@/common/constants/products";
import { formartNumber } from "@/common/helper";
import Link from "next/link";

export type ListItemType = {
    id: string;
    imageUrl: string;
    title: string;
    price: number;
    count: number;
    description: string;
    status: string;
}

interface ListItemProps {
    item: ListItemType
}

export const ListItem = memo(function ListItemComponent(props: ListItemProps) {
    const { item } = props;
    const { imageUrl, title, price, count, description, status, id } = item;

    return <div className="w-full shadow-lg rounded-lg py-2 px-4 h-max flex items-center justify-center gap-8">
        <div className="w-[25%] flex items-center justify-center h-full border rounded-lg min-h-[250px] bg-[#d3d3d3] bg-opacity-5 p-2">
            <Img className="" src={imageUrl} alt="Product image" />
        </div>
        <div className="w-[85%] grid grid-rows-4">
            <div className="w-full flex items-center justify-end border-b text-sm">
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

            <div className="w-full flex gap-2 items-center justify-end">
                <span>
                    {description}
                </span>
            </div>

            <div className="w-full flex items-center justify-end">
                <Link href={`product/${id}`} rel="noopener noreferrer" target="_blank">
                    <Button
                        className="font-light py-3 px-6 border rounded-md text-[#036147] shadow-none hover:bg-[#d3d3d3] hover:bg-opacity-40"
                        label="View Details"
                    />
                </Link>
            </div>
        </div>
    </div>
});
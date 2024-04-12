import { Search } from "@/components/ui/search";
import { FC, memo } from "react";
import { Dropdown } from 'primereact/dropdown';
import { OrderByPriceType } from "@/store/types";

interface CustomerSearchProps extends React.HTMLAttributes<HTMLDivElement> {
    search?: string;
    onSearch?: (value: string) => void;
    order: OrderByPriceType;
    onOrderChange: (order: OrderByPriceType) => void;
}

const CustomerSearchComponent: FC<CustomerSearchProps> = (props) => {
    const options = [
        {
            label: 'Newest',
            value: 'newest'
        },
        {
            label: 'Oldest',
            value: 'oldest'
        },
        {
            label: 'Increasing price',
            value: 'asc'
        },
        {
            label: 'Decreasing price',
            value: 'desc'
        },
        {
            label: 'None',
            value: 'none'
        }
    ];

    return <div className="w-full flex items-start justify-between">
        <div className="flex w-[40%] flex-col gap-2">
            <Search
                value={props.search}
                placeholder="Search for product name"
                wrapperClassName="w-full"
                onChange={props.onSearch}
            />
            <span className="text-sm text-[#707070]">Show <span className="font-semibold">1-9</span> out of <span className="font-semibold">24</span> results</span>
        </div>

        <Dropdown
            value={props.order}
            onChange={(e) => props.onOrderChange?.(e.value)}
            options={options}
            optionLabel="label"
            placeholder="Order by"
            className="w-[40%] shadow-none border border-1 rounded-lg"
        />
    </div>
}

export const CustomerSearch = memo(CustomerSearchComponent);
import { FC, HtmlHTMLAttributes, memo } from "react";
import { PriceFilter } from "./price-filter";
import { CategoryFilter } from "./categories-filter";
import { Button } from 'primereact/button';
import clsx from "clsx";

interface CustomerFilterProps extends HtmlHTMLAttributes<HTMLDivElement> { }
const CustomerFilterComponent: FC<CustomerFilterProps> = (props) => {
    const { className, ...rest } = props;

    const onClick = async () => {
        // TODO: apply filter and load products. Reset at page 1
    }

    return <div className={
        clsx([
            "flex flex-col gap-8 items-center justify-center",
            className
        ])
    } {...rest}>
        <PriceFilter />
        <CategoryFilter />
        <Button
            className="bg-[#036147] hover:opacity-70 text-white py-2 px-4 ring-0"
            label="Apply filter"
            onClick={onClick}
        />
    </div>
}

export const CustomerFilter = memo(CustomerFilterComponent);
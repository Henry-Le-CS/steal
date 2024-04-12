'use client'
import { FC, memo, useEffect, useState } from "react"
import { MultiSelect } from 'primereact/multiselect';
import { BaseOptionType } from "@/common/types";
import { useProductContext } from "@/store/contexts";
import { ProductActionEnum } from "@/store/reducers";

const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
];

type ItemCategoryType = BaseOptionType & {
    counts: number;
}

const itemCategories: ItemCategoryType[] = [
    {
        label: 'Electronics',
        value: 'electronics',
        counts: 10
    },
    {
        label: 'Clothes',
        value: 'clothes',
        counts: 20
    }
];

const CategoryFilterComponent: FC<{
    categories: string[];
    setCategories: (categories: string[]) => void;
}> = (props) => {
    const { categories, setCategories } = props

    const [options, setOptions] = useState<ItemCategoryType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        async function fetchCategories() {
            try {
                setIsLoading(true)
                // Simulate fetching behavior
                await new Promise(res => setTimeout(res, 1000))

                const categories = itemCategories.map(item => {
                    return {
                        ...item,
                        name: `${item.label} (${item.counts})`
                    }
                })

                setOptions(categories)
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setIsLoading(false)
            }

        }

        fetchCategories()
    }, [])

    return <div className="flex flex-col items-start justify-center gap-4">
        <span className="text-4xl font-semibold text-[#036147]">
            Category
        </span>

        <div className="card w-[250px] border border-1-[#d3d3d3] rounded-lg">
            <MultiSelect
                loading={isLoading}
                itemClassName=" border border-b-1 text-[black]"
                value={categories}
                onChange={(e) => setCategories(e.value)}
                options={options}
                optionLabel="name"
                display="chip"
                placeholder="Select categories"
                maxSelectedLabels={3}
                className="w-full md:w-20rem focus:outline-none shadow-none focus:shadow-[#036147]-200 rounded-lg"
            />
        </div>
    </div>
}

export const CategoryFilter = memo(CategoryFilterComponent)
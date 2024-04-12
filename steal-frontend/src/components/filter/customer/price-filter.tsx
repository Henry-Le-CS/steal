import { useProductContext } from "@/store/contexts/ProductProvider";
import { FC, memo, useState } from "react";
import * as Slider from '@radix-ui/react-slider';
import { ProductActionEnum } from "@/store/reducers/useProductReducer";
import { getPriceRange } from "@/common/helper";

const PriceFilterComponent: FC = () => {
    const { productState, productDispatch } = useProductContext();

    const { range, unit } = productState;
    const displayedRange = getPriceRange(unit, range);

    return <div className="flex flex-col gap-2 items-start justify-center">
        <span className="text-4xl font-semibold text-[#036147]">
            Filter by Price
        </span>

        <Slider.Root
            className="w-[200px] relative flex items-center select-none touch-none h-5"
            defaultValue={range}
            step={1}
            onValueChange={(value) => {
                productDispatch({
                    type: ProductActionEnum.SET_RANGE,
                    payload: value
                })
            }}
            minStepsBetweenThumbs={1}
        >
            <Slider.Track className="bg-blackA7 relative grow rounded-full h-[3px]">
                <Slider.Range className="absolute bg-[#FF7125] rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
                className="block w-3 h-3 bg-[#FF7125] shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA5"
                aria-label="Volume"
            />
            <Slider.Thumb
                className="block w-3 h-3 bg-[#FF7125] shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA5"
                aria-label="Volume"
            />
        </Slider.Root>

        <div className="flex items-center text-[#707070] justify-center gap-2 text-sm">
            <span className="text-[#707070]">Price: </span>
            <span className="font-bold">{displayedRange[0]} - {displayedRange[1]}</span>
            <span>{unit}</span>
        </div>
    </div >
}

export const PriceFilter = memo(PriceFilterComponent);
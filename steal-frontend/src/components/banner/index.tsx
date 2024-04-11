"use client";
import { useBannerSlide } from "@/store/hooks";
import Image, { StaticImageData } from "next/image";
import { FC, HtmlHTMLAttributes, memo, useState } from "react";
import shopIcon from '@/assets/shOp.svg';

interface BannerProps extends HtmlHTMLAttributes<HTMLDivElement> {
    src: StaticImageData[];
    interval: number;
}

const BannerComponent: FC<BannerProps> = (props) => {
    const { src, interval } = props;

    const { currentSlideIndex } = useBannerSlide({
        bannerCount: src?.length,
        interval
    })

    return <div className="relative">
        <Image src={src[currentSlideIndex]} alt="Banner image" />
        <span className="absolute flex flex-col items-start justify-center gap-2 top-[20%] left-[15%]">
            <Image src={shopIcon} alt="Shop icon" />
            <span className="text-white text-xl font-bold">We have all you need !</span>
        </span>
    </div>

}

export const Banner = memo(BannerComponent);
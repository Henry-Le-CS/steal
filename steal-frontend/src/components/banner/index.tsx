"use client";
import { useBannerSlide } from "@/store/hooks";
import Image, { StaticImageData } from "next/image";
import { FC, HtmlHTMLAttributes, memo, useState } from "react";

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

    return <div>
        <Image src={src[currentSlideIndex]} alt="Banner image" />
    </div>

}

export const Banner = memo(BannerComponent);
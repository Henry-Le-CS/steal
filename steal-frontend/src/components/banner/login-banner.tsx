"use client";
import { useBannerSlide } from "@/store/hooks";
import Image, { StaticImageData } from "next/image";
import { FC, HtmlHTMLAttributes, memo, useState } from "react";
import shopIcon from '@/assets/shOp.svg';

interface BannerProps extends HtmlHTMLAttributes<HTMLDivElement> {
    src: StaticImageData[];
    interval: number;
}

const AuthBannerComponent: FC<BannerProps> = (props) => {
    const { src, interval, ...rest } = props;

    const { currentSlideIndex } = useBannerSlide({
        bannerCount: src?.length,
        interval
    })

    return <div style={{
        zIndex: 5
    }} className="relative" {...rest}>
        <Image className="h-full" src={src[currentSlideIndex]} alt="Banner image" />
    </div>

}

export const AuthBanner = memo(AuthBannerComponent);
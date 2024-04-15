"use client";
import { useBannerSlide } from "@/store/hooks";
import Image, { StaticImageData } from "next/image";
import { FC, HtmlHTMLAttributes, memo, useState } from "react";
import shopIcon from '@/assets/shOp.svg';
import { AuthBannerText } from "./auth-banner-text";

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
        <div className="h-full relative">
            <Image className="h-full" src={src[currentSlideIndex]} alt="Banner image"></Image>
            <AuthBannerText />
        </div>
    </div>

}

export const AuthBanner = memo(AuthBannerComponent);
import { useEffect, useState } from "react";

type BannerSlides = {
    bannerCount: number;
    interval: number;
}

export const useBannerSlide = (payload: BannerSlides) => {
    const { bannerCount, interval } = payload;
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [nextSlideIndex, setNextSlideIndex] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlideIndex((prev) => (prev + 1) % bannerCount);
        }, interval);

        return () => {
            clearInterval(timer);
        }
    }, [])

    return {currentSlideIndex, nextSlideIndex};
}
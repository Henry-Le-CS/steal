import clsx from "clsx";
import { usePathname } from "next/navigation";
import { memo } from "react";

export const Fading = memo(function FadingComponent() {
    const path = usePathname();

    return <div className={clsx([
        "absolute top-0 w-full h-[180px] bg-gradient-to-b to-transparent",
        path.split('/')[1] == 'sign-up' ? 'from-[#D06227]' : 'from-[#036147]'
    ])}></div>
})
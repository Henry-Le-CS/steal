import { FC } from "react";
import StealLogo from "@/assets/Steal.svg"
import StealWhiteLogo from "@/assets/Steal_white.svg"
import Image from "next/image";

type LogoProps = {
    className?: string;
    height?: number;
    width?: number;
}

export const ClientLogo: FC<LogoProps> = (props) => {
    return <div className="flex items-start justify-start -ml-[60px]">
        <Image src={StealLogo} alt="Steal Logo" {...props} priority />
    </div>
}

export const ClientFooterLogo: FC<LogoProps> = (props) => {
    return <Image src={StealWhiteLogo} alt="Steal Logo" {...props} />
}

import { FC } from "react";
import StealLogo from "@/assets/Steal.svg"
import Image from "next/image";

type LogoProps = {
    className?: string;
    height?: number;
    width?: number;
}

export const ClientLogo: FC<LogoProps> = (props) => {
    return <Image src={StealLogo} alt="Steal Logo" {...props} priority />
}

import { usePathname } from "next/navigation";
import { memo } from "react";
import StealSignUp from "@/assets/steal-sign-up.png";
import StealLogin from "@/assets/steal-login.png";
import Image from "next/image";

export const AuthBannerText = memo(function SignUpSloganComponent() {
    const path = usePathname().split('/').pop();

    return (
        <div style={{
            zIndex: 25
        }} className="w-[70%] absolute top-[5%] left-[50%] -translate-x-[50%]">
            <Image src={path == "sign-up" ? StealSignUp : StealLogin} alt="Steal Sign Up" />
        </div>
    )
})
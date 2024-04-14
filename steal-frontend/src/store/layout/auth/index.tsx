import { AUTH_BANNERS } from "@/common/constants/banner/auth";
import { AuthBanner } from "@/components/banner/login-banner";
import clsx from "clsx";
import { HtmlHTMLAttributes, ReactNode, memo } from "react"

interface AuthLayoutProps extends HtmlHTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    shadowColor?: string;
    bannerText?: () => ReactNode;
}

export const AuthLayout = memo(function AuthLayoutComponent(props: AuthLayoutProps) {
    const { children, shadowColor, bannerText, ...rest } = props

    const fromColor = `from-[${shadowColor}]`;

    return <div style={{
        zIndex: 20,
    }} className="relative flex w-full items-center justify-center h-[100vh] shadow-inner shadow-lg shadow-[red]" {...rest}>
        <div className="w-[40%] h-full">
            <AuthBanner className="h-full" src={AUTH_BANNERS} interval={5000} />
        </div>
        <div className="w-[70%] h-full">
            {children}
        </div>
        <div className={clsx([
            "absolute top-0 w-full h-[180px] bg-gradient-to-b from-[#ababab] to-transparent",
            fromColor,
        ])}>
        </div>
    </div>

})
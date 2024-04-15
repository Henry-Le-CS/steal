"use client";
import { RouteType } from "@/common/types";
import clsx from "clsx";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, HTMLAttributes, ReactNode, memo, useMemo } from "react";

interface IClientNavbarProps extends HTMLAttributes<HTMLDivElement> {
    logo: ReactNode;
    routes: RouteType[];
}

const ClientNavbarComponent: FC<IClientNavbarProps> = (props) => {
    const { logo, routes } = props;
    const path = usePathname();

    const isActive = (routePath: string) => routePath === path;

    const cookie = useCookies()
    const router = useRouter();

    const username = cookie.get('username');

    if (!username) router.push('/login')

    return (
        <div style={{
            zIndex: 20,
        }} className="sticky bg-white shadow-sm top-0 px-[5%] flex items-center justify-between p-2">
            {logo}
            <div className="flex h-full items-center justify-between space-x-4">
                {routes.map((route) => (
                    <Link
                        className={clsx([
                            "rounded-lg p-2 flex h-full items-center justify-center gap-1 text-base mr-1",
                            "hover:cursor-pointer hover:bg-[grey] hover:bg-opacity-20",
                            isActive(route.path) ? "bg-[grey] bg-opacity-20" : ""
                        ])}
                        href={route.path}
                        key={route.path}
                    >
                        {route.icon()}
                        <span>{route.title}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export const ClientNavbar = memo(ClientNavbarComponent);
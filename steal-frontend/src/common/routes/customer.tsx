"use client";
import { CartIcon } from "@/components/cart/icon";
import { RouteType } from "../types";
import { CiShop, CiHome } from "react-icons/ci";

export const CUSTOMER_ROUTES: RouteType[] = [
    {
        path: "/home",
        icon: () => <CiHome size="32px" />,
        title: "Home"
    },
    {
        path: "/product",
        icon: () => <CiShop size="32px" />,
        title: "Products"
    },
    {
        path: "/cart",
        icon: () => <CartIcon />,
        title: ""
    },
]
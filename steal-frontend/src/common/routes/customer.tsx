"use client";
import { CartIcon } from "@/components/cart/icon";
import { RouteType } from "../types";
import { CiShop, CiHome, CiDeliveryTruck } from "react-icons/ci";
import { CiShoppingTag } from "react-icons/ci";

export const CUSTOMER_ROUTES: RouteType[] = [
    {
        path: "/home",
        icon: () => <CiHome size="32px" />,
        title: "Home"
    },
    {
        path: "/product",
        icon: () => <CiShoppingTag size="32px" />,
        title: "Products"
    },
    {
        path: "/my-order",
        icon: () => <CiDeliveryTruck size="32px" />,
        title: "Orders"
    },
    {
        path: "/cart",
        icon: () => <CartIcon />,
        title: "Cart"
    },
    {
        path: "/shop",
        icon: () => <CiShop size="32px" />,
        title: "My Shop"
    }
]
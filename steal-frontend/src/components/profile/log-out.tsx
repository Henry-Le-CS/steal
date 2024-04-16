'use client'
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { Button } from "../ui/button";

export const LogOut = memo(function LogOutComponent() {
    const cookie = useCookies();
    const router = useRouter();

    function onClick() {
        cookie.remove('username');
        cookie.remove('id');

        router.push('/login');
    }
    return <Button className="bg-[#036147]" onClick={onClick}>Log Out</Button>
})
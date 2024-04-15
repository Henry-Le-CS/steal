'use client'

import { useCookies } from "next-client-cookies";

export const Avatar = () => {
    const cookie = useCookies();

    const username = cookie.get('username') || 'X';

    return <div className="ml-[16px] hover:cursor-pointer hover:bg-[grey] hover:bg-opacity-20 w-[32px] h-[32px] rounded-full flex items-center justify-center border-[1px] border-solid border-black p-1">
        {username[0]}
    </div>
}
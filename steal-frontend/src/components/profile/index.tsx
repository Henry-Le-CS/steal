import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { memo } from "react"
import { LogOut } from "./log-out"
import { Divider } from "primereact/divider"
import { Avatar } from "./avatar"

export const ProfilePopover = memo(function ProfilePopoverComponent() {
    return <Popover>
        <PopoverTrigger className="ml-[40px]">
            <Avatar />
        </PopoverTrigger>
        <PopoverContent className="w-[120px] mt-[15px]">
            <LogOut />
        </PopoverContent>
    </Popover>

})
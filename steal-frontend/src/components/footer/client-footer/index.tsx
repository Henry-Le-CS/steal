import { FC, memo } from "react";
import { ClientFooterAddress } from "./address";
import { ClientFooterDetails } from "./detail";

const ClientFooterComponent: FC = () => {
    return (
        <div className="flex items-center justify-between w-full bg-[#036147] px-[15%] py-4">
            <ClientFooterAddress />
            <ClientFooterDetails />
        </div>
    );
}

export const ClientFooter = memo(ClientFooterComponent);
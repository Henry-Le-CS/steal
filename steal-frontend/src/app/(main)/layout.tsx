import { CUSTOMER_ROUTES } from "@/common/routes/customer";
import { ClientFooter } from "@/components/footer/client-footer";
import { ClientLogo } from "@/components/logo";
import { ClientNavbar } from "@/components/navbar";
import { FC } from "react";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col w-full h-[100vh] bg-white">
            <ClientNavbar
                logo={<ClientLogo className="h-[80px]" />}
                routes={CUSTOMER_ROUTES}
            />
            {children}
            <ClientFooter />
        </div>
    );
}

export default MainLayout;
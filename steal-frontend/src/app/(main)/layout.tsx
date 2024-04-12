'use client'
import { CUSTOMER_BANNERS } from "@/common/constants/banner";
import { CUSTOMER_ROUTES } from "@/common/routes/customer";
import { Banner } from "@/components/banner";
import { ClientFooter } from "@/components/footer/client-footer";
import { ClientLogo } from "@/components/logo";
import { ClientNavbar } from "@/components/navbar";
import { ProductProvider } from "@/store/contexts";
import { FC } from "react";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <ProductProvider>
            <div className="relative flex flex-col w-full h-[100%] bg-white">
                <ClientNavbar
                    logo={<ClientLogo className="h-[80px] py-2" />}
                    routes={CUSTOMER_ROUTES}
                />
                <Banner src={CUSTOMER_BANNERS} interval={2000} />
                {children}
                <ClientFooter />
            </div>
        </ProductProvider>
    );
}

export default MainLayout;
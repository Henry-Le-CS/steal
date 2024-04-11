import { ClientFooterLogo } from "@/components/logo"
import { CiLocationOn } from "react-icons/ci";
import { SlPhone } from "react-icons/sl";
import { AiOutlineMail } from "react-icons/ai";

export const ClientFooterAddress = () => {
    return (
        <div className="w-[30%] flex flex-col items-start justify-center gap-4  text-white">
            <ClientFooterLogo className="h-[80px]" />
            <span className="text-justify">
                Chào mừng bạn đến với Steal - Nơi mua bán đồ secondhand uy tín và tiện lợi nhất!
                Steal là website chuyên cung cấp đa dạng các mặt hàng secondhand từ thời trang, phụ kiện, đồ gia dụng đến đồ điện tử, xe cộ... với giá cả hợp lý.
            </span>
            <div className="flex items-center justify-center gap-4">
                <CiLocationOn size={24} />
                <span>268 Lý Thường Kiệt, Phường 15, Quận 10, TP.HCM</span>
            </div>
            <div className="flex items-center justify-center gap-4">
                <SlPhone size={24} />
                <span>0123 456 789</span>
            </div>
            <div className="flex items-center justify-center gap-4">
                <AiOutlineMail size={24} />
                <span>email.random@hcmut.edu.vn</span>
            </div>
        </div>
    )

}
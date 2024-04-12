import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui"
import { CiCalendar, CiDeliveryTruck, CiStar } from "react-icons/ci"
export const ProductDescription = () => {
    return <Tabs defaultValue="description" className="w-full p-2">
        <TabsList className="w-full">
            <TabsTrigger className="w-[50%]" value="description">Description</TabsTrigger>
            <TabsTrigger className="w-[50%]" value="additional-info">Additional information</TabsTrigger>
        </TabsList>
        <TabsContent className="text-sm" value="description">
            Items are straight from the album and do not have noticeable flaws  unless stated otherwise. However, if you are extremely sensitive to fine  scratches/production marks, if any, then please refrain from  purchasing!
            <br />
            <br />
            Availability will be adjusted as more arrive.
            <br />
            <br />
            📮  FREE SHIPPING is provided through Pitney Bowes and fulfilled by USPS  with limited tracking. If you would like USPS tracking please upgrade at  checkout.</TabsContent>
        <TabsContent className="flex flex-col items-start justify-center gap-2 text-sm" value="additional-info">
            <span className="flex items-center justify-center gap-2"><CiCalendar size={24} /><>Ships out within 1-2 business days</></span>
            <span className="flex items-center justify-center gap-2"><CiDeliveryTruck size={24} /> <>Cost to ship: <span className="text-[#FF7125]">Free</span></></span>
            <span className="flex items-center justify-center gap-2"><CiStar size={24} /> <>Returns & Exchanges not accepted</></span>
        </TabsContent>
    </Tabs>
}
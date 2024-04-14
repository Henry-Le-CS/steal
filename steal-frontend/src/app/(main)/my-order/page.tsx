import { CustomerOrder } from "@/components/order/customer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";

export default function Page() {
    return (
        <div className="flex my-[48px] h-max items-start justify-center w-full bg-white">
            <CustomerOrder />
        </div>
    )
}   
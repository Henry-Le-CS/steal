'use client'
import { Search, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { useEffect, useState } from "react";
import { OrderedItem, OrderedItemType } from "./ordered-item";
import { Spinner } from "@/components/ui/spinner";
import { MOCK_ORDERED_ITEMS } from "@/common/data/order";
import { OrderType, getOrdersOfUser } from "@/apis";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
const TABS = [
    {
        title: "All",
        value: "all"
    },
    {
        title: "Confirming",
        value: "confirming"
    },
    {
        title: "Delivering",
        value: "delivering"
    },
    {
        title: "Delivered",
        value: "delivered"
    },
    {
        title: "Cancelled",
        value: "cancelled"
    },
    {
        title: "Returned",
        value: "returned"
    }
]

export const CustomerOrder = function CustomerOrderComponent() {
    const [text, setText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [orderedItems, setOrderedItems] = useState<OrderedItemType[]>([])

    const cookie = useCookies();
    const router = useRouter();

    function extractOrderedItems(data: OrderType[]): OrderedItemType[] {
        return data.map((order) => ({
            id: `${order.id}`,
            imageUrl: order.product.images[0],
            title: order.product.name,
            price: order.total_price,
            count: order.amount,
            description: order.note,
            status: order.status
        }))
    }

    useEffect(() => {
        async function fetchOrderedItems() {
            try {
                setIsLoading(true)
                const userId = cookie.get('id');

                if (!userId) {
                    router.push('/login')
                    return;
                }

                const { data, message } = await getOrdersOfUser(userId);

                if (!data || message) {
                    throw new Error(message || 'Cannot get orders')
                };

                const orderedItems = extractOrderedItems(data);

                setOrderedItems(orderedItems)
            }
            catch (err) {
                console.error(err)
            }
            finally {
                setIsLoading(false)
            }

        }

        fetchOrderedItems();
    }, [])

    if (isLoading) return

    return <Tabs defaultValue="all" className="w-[80%] p-2">
        <TabsList onChange={(e) => console.log(e)} className="w-full grid-cols-6 text-[red] pt-6 py-2 px-25">
            {
                TABS.map((tab) => (
                    <TabsTrigger key={tab.value} className="w-full col-span-1" value={tab.value}>
                        <span className="font-bold text-[#036147]">{tab.title}</span>
                    </TabsTrigger>
                ))
            }
        </TabsList>
        <TabsContent className="flex mt-[24px] flex-col w-full h-max items-start justify-center bg-white gap-2 p-2" value="all">
            <Search value={text} />
            {
                isLoading ?
                    <Spinner /> :
                    <div className="w-full p-4 flex flex-col gap-4 max-h-[450px] box-border overflow-y-scroll no-scrollbar border rounded-md ">
                        {
                            orderedItems.map((item, index) => (
                                <OrderedItem key={index} item={item} />
                            ))
                        }
                        {
                            orderedItems.length === 0 && <span className="w-full text-center text-[black]">No order is conducted yet</span>
                        }
                    </div>
            }
        </TabsContent>
    </Tabs >

}
'use client'
import { Search, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { useEffect, useState } from "react";
import { OrderedItem, OrderedItemType } from "./ordered-item";
import { Spinner } from "@/components/ui/spinner";
import { MOCK_ORDERED_ITEMS } from "@/common/data/order";
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

    useEffect(() => {
        async function fetchOrderedItems() {
            try {
                setIsLoading(true)
                await new Promise((resolve) => setTimeout(resolve, 200))

                setOrderedItems(MOCK_ORDERED_ITEMS)
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
                    </div>
            }
        </TabsContent>
    </Tabs >

}
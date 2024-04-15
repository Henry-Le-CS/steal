'use client'
import { Search, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { useEffect, useState } from "react";
import { ListItem, ListItemType } from "./list-items";
import { Spinner } from "@/components/ui/spinner";
import { MOCK_ORDERED_ITEMS } from "@/common/data/order";
import { OrderType, ProductType, getOrdersOfUser, getProductsOfSellerById } from "@/apis";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { OrderedItem } from "../customer/ordered-item";
import { ProviderOrderTab } from "./ordered-item";
import { AddItemForm } from "./add-item";
const TABS = [
    {
        title: "My Products",
        value: "products"
    },
    {
        title: "Orders",
        value: "order"
    },
    {
        title: "Add Product",
        value: "add-product"
    },
]

export const ProviderOrder = function ProviderOrderComponent() {
    const [text, setText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [orderedItems, setOrderedItems] = useState<ListItemType[]>([])

    const cookie = useCookies();
    const router = useRouter();

    function extractOrderedItems(data: ProductType[]): ListItemType[] {
        return data.map((order) => ({
            id: `${order.id}`,
            imageUrl: order.images[0],
            title: order.name,
            price: order.price,
            count: order.amount,
            description: order.description,
            status: order.amount > 0 ? 'AVAILABLE' : 'OUT OF STOCK'
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

                const { data, message } = await getProductsOfSellerById(userId);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading) return

    return <Tabs defaultValue="products" className="w-[80%] p-2">
        <TabsList onChange={(e) => console.log(e)} className="w-full grid-cols-6 text-[red] pt-6 py-2 px-25">
            {
                TABS.map((tab) => (
                    <TabsTrigger key={tab.value} className="w-full col-span-1" value={tab.value}>
                        <span className="font-bold text-[#036147]">{tab.title}</span>
                    </TabsTrigger>
                ))
            }
        </TabsList>
        <TabsContent className="flex mt-[24px] flex-col w-full h-max items-start justify-center bg-white gap-2 p-2" value="products">
            <Search value={text} />
            {
                isLoading ?
                    <Spinner /> :
                    <div className="w-full p-4 flex flex-col gap-4 max-h-[450px] box-border overflow-y-scroll no-scrollbar border rounded-md ">
                        {
                            orderedItems.map((item, index) => (
                                <ListItem key={index} item={item} />
                            ))
                        }
                        {
                            orderedItems.length === 0 && <span className="w-full text-center text-[black]">No order is conducted yet</span>
                        }
                    </div>
            }
        </TabsContent>

        <TabsContent className="flex flex-col w-full h-max items-start justify-center bg-white gap-2 p-2" value="order">
            <Search value={text} />
            <ProviderOrderTab
                isLoading={isLoading}
                userId={`${cookie.get('id')}`}
            />
        </TabsContent>

        <TabsContent className="-mt-[32px] flex flex-col w-full h-max items-center justify-center bg-white gap-2 p-2 border" value="add-product">
            <AddItemForm />
        </TabsContent>
    </Tabs >

}
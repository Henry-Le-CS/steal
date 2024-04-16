import { ProductType } from "@/apis"
import { ProductBriefType } from "@/store/types"

export function extractBriefDataInfo(data: Array<ProductType>): ProductBriefType[] {
    const products = data.map((product) => {
        return {
            id: `${product.id}`,
            imageUrl: product.images[0],
            title: product.name,
            price: product.price,
            count: product.amount,
            postedAt: product.created_at
        }
    })

    return products
}
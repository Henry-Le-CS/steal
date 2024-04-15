import { formartNumber } from "@/common/helper"
import { ProductBriefType } from "@/store/types"
import { Image } from 'primereact/image';
import Link from "next/link"
import { Card } from "primereact/card"
import { FC } from "react"

export const ProductCard: FC<ProductBriefType & {
    unit: string
}> = (props) => {
    const { id, title, price, count, postedAt, unit, imageUrl } = props

    const formatDate = (date: string) => {
        const d = new Date(date)
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }

    return <div key={id} className="card w-full h-max flex items-start justify-center">
        <Link href={`/product/${id}`}>
            <Card
                title={<span className="text-base">{title}</span>}
                header={
                    <Image height="100%" alt="Card" src={imageUrl} />
                }
                className="max-w-[315px] h-[515px] p-2 h-100%"
            >
                <div className="flex items-center justify-start gap-2 text-sm">
                    <span>Price:</span>
                    <span className="text-[#FF7125] font-bold">{formartNumber(price)}</span>
                    <span className="font-bold">{unit}</span>
                </div>

                <div className="flex items-center justify-start gap-2 text-sm mt-2">
                    <span>Remaining:</span>
                    <span className="">{count}</span>
                </div>

                <div className="flex items-center justify-start gap-2 text-sm mt-2">
                    <span>Posted at:</span>
                    <span className="">{formatDate(postedAt)}</span>
                </div>
            </Card>
        </Link>
    </div>
}
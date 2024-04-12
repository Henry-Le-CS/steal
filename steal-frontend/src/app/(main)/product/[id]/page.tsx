import { ProductInfo } from "@/components/products/details";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
    return (
        <div className="flex items-center justify-center h-max">
            <ProductInfo />
        </div>
    );
}
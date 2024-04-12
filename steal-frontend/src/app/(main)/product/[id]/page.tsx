import { ProductInfo } from "@/components/products/details";
import { RelatedProducts } from "@/components/products/related-products";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
    return (
        <div className="flex flex-col items-center justify-center h-max">
            <ProductInfo />
            <RelatedProducts />
        </div>
    );
}
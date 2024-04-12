'use client'
import { CustomerFilter } from "@/components/filter/customer";

export default function ProductPage() {
    return (
        <div className="flex my-[48px] h-screen items-center justify-center w-full bg-white">
            <CustomerFilter className="w-[30%] p-2" />
            <div className="w-[60%]">
                <span>BODY CONTENT 1</span>
                <span>BODY CONTENT</span>
                <span>BODY CONTENT</span>
                <span>BODY CONTENT</span>
                <span>BODY CONTENT</span>
                <span>BODY CONTENT</span>
                <span>BODY CONTENT</span>
                <span>BODY CONTENT END</span>
            </div>
        </div>
    );
}
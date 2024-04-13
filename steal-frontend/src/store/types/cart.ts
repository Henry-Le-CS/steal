import { ProductBriefType } from "./product";

export type CartItem =  ProductBriefType & {
    id: string;
    cartQuantity: number;
}

export type CartType = {
    cart: CartItem[];
}
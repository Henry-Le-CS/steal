import { PriceUnit } from "../constants/products";

export const getPriceRange = (unit: PriceUnit, range: number[]) => {
    let basePrice;

    switch (unit) {
        case PriceUnit.VND:
        default:
            basePrice = 10000000;
            break;
    }

    return [basePrice*range[0]/100, basePrice*range[1]/100];
}

export const formartNumber = (number: number) => new Intl.NumberFormat('vi-VN').format(number)
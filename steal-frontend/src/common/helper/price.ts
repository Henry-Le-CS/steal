import { PriceUnit } from "../constants/products";

export const getPriceRange = (unit: PriceUnit, range: number[]) => {
    let basePrice;

    switch (unit) {
        case PriceUnit.VND:
        default:
            basePrice = [0, 10000000];
            break;
    }

    return [basePrice[0]*range[0]/100, basePrice[1]*range[1]/100];
}

export const formartNumber = (number: number) => new Intl.NumberFormat('vi-VN').format(number)
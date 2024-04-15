import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DATABASE_SERVICES } from 'src/modules/database/database.provider';
import { QueryProductPriceType } from '../types';

@Injectable()
export class PriceService {
  constructor(
    @Inject(DATABASE_SERVICES) private readonly dbService: PrismaClient,
  ) {}

  async getTotalPriceForProduct(productId: number, amount: number) {
    if (!Number(productId)) {
      throw new Error('Product id must be a number');
    }

    if (!Number(amount)) {
      throw new Error('Amount must be a number');
    }

    const product = await this.dbService.products.findUnique({
      where: {
        id: Number(productId),
      },
    });

    if (!product) {
      return null;
    }

    return {
      productId,
      totalPrice: product.price * amount,
      price: product.price,
      title: product.name,
      quantity: amount,
    };
  }

  async getPriceForManyProducts(products: Array<QueryProductPriceType>) {
    if (!products.length) {
      return [];
    }

    const storedProducts = await this.dbService.products.findMany({
      where: {
        id: {
          in: products.map((product) => product.id),
        },
      },
      distinct: ['id'],
    });

    if (!storedProducts.length) {
      return [];
    }

    const prices = storedProducts.map((product) => {
      const productData = products.find(
        (productData) => productData.id === product.id,
      );

      return {
        productId: product.id,
        totalPrice: productData.amount * product.price,
        price: product.price,
        title: product.name,
        quantity: productData.amount,
      };
    });

    return prices;
  }
}

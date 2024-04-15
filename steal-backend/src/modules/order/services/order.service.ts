import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DATABASE_SERVICES } from 'src/modules/database/database.provider';
import { PaymentType } from '../constants';
import { OrderPayloadDto } from '../types';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @Inject(DATABASE_SERVICES) private readonly dbService: PrismaClient,
  ) {}

  async makeOrder(payload: OrderPayloadDto) {
    this.logger.log('Checking out products for user with ID: ' + payload.id);

    const { paymentType } = payload;

    switch (paymentType) {
      case PaymentType.COD:
        break;
      default:
        throw new Error(`Payment type ${paymentType} not supported`);
    }

    // Execute transaction
    const order = await this.executeOrderTransaction(payload);
    return order;
  }

  private async executeOrderTransaction(payload: OrderPayloadDto) {
    const { productId, quantity } = payload;

    try {
      // Begin transaction
      const order = await this.dbService.$transaction(async (tx) => {
        tx.$executeRaw`LOCK TABLE products WRITE`;
        // Retrieve current product quantity
        const product = await tx.products.findUnique({
          where: { id: productId },
        });

        if (!product) {
          throw new Error(`Product with ID ${productId} not found`);
        }

        if (product.amount < quantity) {
          throw new Error('Product quantity is not enough in stock');
        }

        // Update the product quantity
        await tx.products.update({
          where: { id: productId },
          data: { amount: product.amount - quantity },
        });

        const order = await this.createOrder(tx as any, payload);
        tx.$executeRaw`UNLOCK TABLE products`;

        // Commit transaction
        return order;
      });

      return order;
    } catch (error) {
      throw error;
    }
  }

  private async createOrder(tx: PrismaClient, payload: OrderPayloadDto) {
    const {
      id,
      address,
      city,
      phone,
      email,
      note,
      productId,
      totalPrice,
      firstName,
      lastName,
      quantity,
    } = payload;

    const order = await tx.orders.create({
      data: {
        user_id: id,
        first_name: firstName,
        last_name: lastName,
        product_id: productId,
        amount: quantity,
        city,
        address,
        phone,
        email,
        total_price: totalPrice,
        note,
        status: 'DELIVERED',
        created_at: new Date(),
      },
    });

    return order;
  }

  async getOrdersByUserId(userId: number) {
    const orders = this.dbService.orders.findMany({
      where: { user_id: userId },
    });

    return orders;
  }
}

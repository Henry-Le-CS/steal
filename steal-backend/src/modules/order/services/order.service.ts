import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DATABASE_SERVICES } from 'src/modules/database/database.provider';
import { PaymentType } from '../constants';
import { ConfirmOrderPayload, OrderPayloadDto, OrderType } from '../types';
import { PRODUCT_SERVICES } from 'src/modules/product/product.provider';
import { ProductService } from 'src/modules/product/services/product.service';
import { EMAIL_SERVICES } from 'src/modules/email/email.provider';
import { EmailService } from 'src/modules/email/services/email.service';
import { formartNumber, formatDate } from 'src/common/helpers';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @Inject(DATABASE_SERVICES) private readonly dbService: PrismaClient,
    @Inject(PRODUCT_SERVICES) private readonly productService: ProductService,
    @Inject(EMAIL_SERVICES) private readonly emailService: EmailService,
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
      const transaction = await this.dbService.$transaction(async (tx) => {
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
        return [order, product];
      });

      const order = transaction[0] as OrderType;
      const product = transaction[1];

      const productDetails = await this.productService.getProductById(
        `${product.id}`,
        false,
      );

      const { images, price, name } = productDetails;

      // Send order confirmation email
      await this.sendOrderConfirmationEmail({
        ...(order as OrderType),
        imageUrl: images[0],
        price: `${price}`,
        productName: name,
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
    const orders = await this.dbService.orders.findMany({
      where: { user_id: userId },
    });

    const ids = orders.map((order) => order.product_id);

    const products = await this.productService.getAllProductsByIds(ids);

    const joinedOrders = orders.map((order) => {
      const product = products.find(
        (product) => product.id === order.product_id,
      );

      return { ...order, product };
    });

    return joinedOrders;
  }

  async getOrdersByOwnerId(ownerId: number) {
    const products = await this.productService.getProductsOfSellerById(ownerId);
    const ids = products.map((product) => product.id);

    const orders = await this.dbService.orders.findMany({
      where: { product_id: { in: ids } },
      orderBy: {
        created_at: 'desc',
      },
    });

    const ret = orders.map((order) => {
      const product = products.find(
        (product) => product.id === order.product_id,
      );

      return { ...order, product };
    });

    return ret;
  }

  async sendOrderConfirmationEmail(order: ConfirmOrderPayload) {
    if (!order) {
      throw new Error(`Order not found`);
    }

    const {
      id,
      email,
      imageUrl,
      price,
      created_at,
      address,
      city,
      productName,
      amount,
      total_price: total,
    } = order;

    const payload = {
      templateId: 'order-success',
      args: {
        imageUrl,
        price: formartNumber(Number(price)),
        email,
        id,
        date: formatDate(created_at),
        address: [address, city].join(', '),
        title: productName,
        total: formartNumber(Number(total)),
        quantity: amount,
      },
    };

    await this.emailService.sendEmail({
      to: email,
      subject: `[STEAL] - INVOICE FOR PURCHASE #${id}`,
      ...payload,
    });
  }
}

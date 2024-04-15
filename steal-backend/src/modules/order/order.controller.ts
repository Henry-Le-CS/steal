import { Body, Controller, Inject, Logger, Param } from '@nestjs/common';
import { ORDER_SERVICES } from './order.provider';
import { OrderService } from './services/order.service';
import { CustomGet, CustomPost } from 'src/common/decorators';
import { PriceService } from '../check-out/services/price.service';
import { PRICE_SERVICES } from '../check-out/checkout-provider';
import { OrderDto } from './types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor(
    @Inject(ORDER_SERVICES) private readonly orderService: OrderService,
    @Inject(PRICE_SERVICES) private readonly priceService: PriceService,
  ) {}

  @CustomPost({
    description: 'Checkout the product in cart',
    isPublic: true,
    path: '/',
  })
  async handleCheckout(@Body() payload: OrderDto) {
    try {
      console.log(payload);
      const { productId, quantity } = payload;

      const res = await this.priceService.getTotalPriceForProduct(
        productId,
        quantity,
      );

      if (!res) {
        throw new Error('Product not found');
      }

      const { totalPrice } = res;

      const order = await this.orderService.makeOrder({
        ...payload,
        totalPrice,
      });

      if (!order?.id) {
        throw new Error('Failed to checkout');
      }

      const { id: orderId, user_id: userId, status, amount } = order;

      return {
        data: {
          orderId,
          userId,
          totalPrice,
          status,
          productId,
          amount,
        },
      };
    } catch (err) {
      this.logger.error(err);

      return {
        message: err.message,
      };
    }
  }

  @CustomGet({
    description: 'Get all orders',
    isPublic: true,
    path: '/:userId',
  })
  async getOrders(@Param('userId') userId: string) {
    try {
      if (!Number(userId)) {
        throw new Error('User id must be a number');
      }

      const orders = await this.orderService.getOrdersByUserId(Number(userId));

      return {
        data: orders,
      };
    } catch (err) {
      this.logger.error(err);

      return {
        message: err.message,
      };
    }
  }
}

import { Body, Controller, Inject, Logger, Param } from '@nestjs/common';
import { CustomPost } from 'src/common/decorators';
import { CHECKOUT_SERVICES, PRICE_SERVICES } from './checkout-provider';
import { CheckoutDto, GetPricePayloadType } from './types';
import { PriceService } from './services/price.service';
import { CheckOutService } from './services/check-out.service';

@Controller('check-out')
export class CheckOutController {
  private readonly logger = new Logger(CheckOutController.name);

  constructor(
    @Inject(PRICE_SERVICES) private readonly priceService: PriceService,
    @Inject(CHECKOUT_SERVICES)
    private readonly checkOutService: CheckOutService,
  ) {}

  @CustomPost({
    description: 'Checkout the product in cart',
    isPublic: true,
    path: '/',
  })
  async handleCheckout(@Body() payload: CheckoutDto) {
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

      const order = await this.checkOutService.checkOutProducts({
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

  @CustomPost({
    path: '/price',
    isPublic: true,
    description: 'Get total price for all products in cart',
  })
  async getPriceForAllProducts(@Body() payload: GetPricePayloadType) {
    try {
      const { type } = payload;

      if (!(type === 'multiple')) {
        throw new Error(`Unsupported type of payload: ${type}`);
      }

      const data = await this.priceService.getPriceForManyProducts(
        payload.products,
      );

      return { data };
    } catch (err) {
      this.logger.error(err);
      return {
        message: err.message,
      };
    }
  }

  @CustomPost({
    path: '/price/:productId',
    isPublic: true,
    description: 'Get total price for a single product',
  })
  async getPriceForSingleProduct(
    @Body() payload: GetPricePayloadType,
    @Param('productId') productId: number,
  ) {
    try {
      const { type } = payload;

      if (!(type === 'single')) {
        throw new Error(`Unsupported type of payload: ${type}`);
      }

      if (!Number(productId)) {
        throw new Error('Product id must be a number');
      }

      const data = await this.priceService.getTotalPriceForProduct(
        Number(productId),
        payload.product.amount,
      );

      return { data };
    } catch (err) {
      this.logger.error(err);

      return {
        message: err.message,
      };
    }
  }
}

import { Body, Controller, Inject, Logger, Param } from '@nestjs/common';
import { CustomPost } from 'src/common/decorators';
import { PRICE_SERVICES } from './checkout-provider';
import { GetMultiplePriceDto, GetPricePayloadType } from './types';
import { PriceService } from './services/price.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Check Out')
@Controller('check-out')
export class CheckOutController {
  private readonly logger = new Logger(CheckOutController.name);

  constructor(
    @Inject(PRICE_SERVICES) private readonly priceService: PriceService,
  ) {}

  @CustomPost({
    path: '/price',
    isPublic: true,
    description: 'Get total price for all products in cart',
  })
  async getPriceForAllProducts(@Body() payload: GetMultiplePriceDto) {
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

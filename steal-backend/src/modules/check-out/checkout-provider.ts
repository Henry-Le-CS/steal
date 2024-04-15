import { Provider } from '@nestjs/common';
import { PriceService } from './services/price.service';

export const PRICE_SERVICES = Symbol('PRICE_SERVICES');

export const PriceServiceProvider: Provider = {
  provide: PRICE_SERVICES,
  useClass: PriceService,
};

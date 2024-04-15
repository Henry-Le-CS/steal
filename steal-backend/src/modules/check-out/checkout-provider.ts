import { Provider } from '@nestjs/common';
import { PriceService } from './services/price.service';
import { CheckOutService } from './services/check-out.service';

export const PRICE_SERVICES = Symbol('PRICE_SERVICES');

export const PriceServiceProvider: Provider = {
  provide: PRICE_SERVICES,
  useClass: PriceService,
};

export const CHECKOUT_SERVICES = Symbol('CHECKOUT_SERVICES');

export const CheckOutServiceProvider: Provider = {
  provide: CHECKOUT_SERVICES,
  useClass: CheckOutService,
};

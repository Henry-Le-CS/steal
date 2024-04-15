import { Provider } from '@nestjs/common';
import { ProductService } from './services/product.service';

export const PRODUCT_SERVICES = Symbol('PRODUCT_SERVICES');

export const ProductServiceProvider: Provider = {
  provide: PRODUCT_SERVICES,
  useClass: ProductService,
};

import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  CheckOutServiceProvider,
  PriceServiceProvider,
} from './checkout-provider';
import { CheckOutController } from './check-out.controller';

@Module({})
export class CheckOutModule {
  static register(): DynamicModule {
    const providers: Provider[] = [];

    providers.push(PriceServiceProvider);
    providers.push(CheckOutServiceProvider);

    return {
      providers,
      module: CheckOutModule,
      global: true,
      exports: providers,
      controllers: [CheckOutController],
    };
  }
}

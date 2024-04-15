import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PriceServiceProvider } from './checkout-provider';
import { CheckOutController } from './check-out.controller';

@Module({})
export class CheckOutModule {
  static register(): DynamicModule {
    const providers: Provider[] = [];

    providers.push(PriceServiceProvider);

    return {
      providers,
      module: CheckOutModule,
      global: true,
      exports: providers,
      controllers: [CheckOutController],
    };
  }
}

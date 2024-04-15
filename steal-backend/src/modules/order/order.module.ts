import { DynamicModule, Module, Provider } from '@nestjs/common';
import { OrderServiceProvider } from './order.provider';
import { OrderController } from './order.controller';

@Module({})
export class OrderModule {
  static register(): DynamicModule {
    const providers: Provider[] = [];

    providers.push(OrderServiceProvider);

    return {
      module: OrderModule,
      providers: providers,
      exports: providers,
      global: true,
      controllers: [OrderController],
    };
  }
}

import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  AccountServiceProvider,
  AuthenProvider,
  AuthorProvider,
  GoogleStrategyProvider,
} from './auth.provider';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
})
export class AuthModule {
  static register(): DynamicModule {
    const providers: Provider[] = [];

    providers.push(GoogleStrategyProvider);
    providers.push(AuthenProvider);
    providers.push(AuthorProvider);
    providers.push(AccountServiceProvider);

    return {
      module: AuthModule,
      providers,
      global: true,
      exports: providers,
    };
  }
}

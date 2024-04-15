import { Module, Provider } from '@nestjs/common';
import { DatabaseProvider } from './database.provider';

@Module({})
export class DatabaseModule {
  static register() {
    const providers: Provider[] = [DatabaseProvider];

    return {
      module: DatabaseModule,
      providers,
      exports: providers,
      global: true,
    };
  }
}

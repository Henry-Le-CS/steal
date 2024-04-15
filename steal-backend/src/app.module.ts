import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { EmailModule } from './modules/email/email.module';
import { DatabaseModule } from './modules/database/database.module';
import { BullModule } from '@nestjs/bull';
import { ProductModule } from './modules/product/product.module';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './common/guards/auth.guard';

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(): DynamicModule {
    const modules = [];

    modules.push(AuthModule.register());
    modules.push(DatabaseModule.register());
    modules.push(EmailModule.register());
    modules.push(ProductModule.register());

    // Bull MQ for task queue
    modules.push(
      BullModule.forRoot({
        redis: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT),
          username: process.env.REDIS_USERNAME,
          password: process.env.REDIS_PASSWORD,
        },
      }),
    );

    return {
      module: AppModule,
      global: true,
      imports: modules,
      providers: [
        // {
        //   provide: APP_GUARD,
        //   useClass: AuthGuard,
        // },
      ],
    };
  }
}

import { DynamicModule, Module, Provider } from '@nestjs/common';
import { EmailProcessorProvider, EmailServiceProvider } from './email.provider';
import { EmailController } from './email.controller';
import { BullModule } from '@nestjs/bull';
import { EMAIL_TASK_QUEUE } from './constants';

@Module({})
export class EmailModule {
  static register(): DynamicModule {
    const providers: Provider[] = [];

    providers.push(EmailServiceProvider);
    providers.push(EmailProcessorProvider);

    const modules = [];

    // Bull MQ for task queue
    modules.push(BullModule.registerQueue({ name: EMAIL_TASK_QUEUE }));

    return {
      module: EmailModule,
      providers,
      imports: modules,
      controllers: [EmailController],
      exports: providers,
      global: true,
    };
  }
}

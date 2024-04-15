import { Provider } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { EmailProcessor } from './email.processor';

export const EMAIL_SERVICES = Symbol('EMAIL_SERVICES');

export const EmailServiceProvider: Provider = {
  provide: EMAIL_SERVICES,
  useClass: EmailService,
};

export const EMAIL_PROCESSOR = Symbol('EMAIL_PROCESSOR');

export const EmailProcessorProvider: Provider = {
  provide: EMAIL_PROCESSOR,
  useFactory: (emailService: EmailService) => {
    return new EmailProcessor(emailService);
  },
  inject: [EMAIL_SERVICES],
};

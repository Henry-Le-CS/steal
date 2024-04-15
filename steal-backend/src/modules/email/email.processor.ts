import { Process, Processor } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { EMAIL_TASK_QUEUE, SEND_EMAIL } from './constants';
import { EMAIL_SERVICES } from './email.provider';
import { EmailService } from './services/email.service';
import { SendEmailPayload } from './types';
import { EmailHelper } from 'src/common/helpers/email';

@Processor(EMAIL_TASK_QUEUE)
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);
  private EmailHelper: EmailHelper;

  constructor(
    @Inject(EMAIL_SERVICES) private readonly emailService: EmailService,
  ) {}

  @Process({
    name: SEND_EMAIL,
    concurrency: 5,
  })
  async handleSendEmail(job: Job<SendEmailPayload>) {
    try {
      this.logger.debug('Start sending email...');

      const { data } = job;
      const { to, subject, templateId, args, from } = data;

      const emailContent = await this.emailService.generateEmail({
        templateId: templateId,
        args: args,
      });

      const emailHelper = await this.getEmailHelper();

      const status = await emailHelper.sendEmail(
        to,
        subject,
        emailContent,
        from,
      );

      if (!status) {
        throw new Error('Send email fail');
      }

      this.logger.log('Sending email successfully');
    } catch (err) {
      this.logger.error('Send email fail by exception:' + err);
    }
  }

  private async getEmailHelper() {
    if (!this.EmailHelper) {
      this.EmailHelper = await EmailHelper.getInstance();
    }

    return this.EmailHelper;
  }
}

import { Body, Controller, HttpException, Inject, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseData } from 'src/common/types';
import { EMAIL_SERVICES } from './email.provider';
import { EmailService } from './services/email.service';
import {
  EmailGeneratorPayload,
  GenerateEmailBodyDto,
  SendEmailBodyDto,
  SendEmailPayload,
} from './types';
import { InjectQueue } from '@nestjs/bull';
import { EMAIL_TASK_QUEUE, SEND_EMAIL } from './constants';
import { Queue } from 'bull';
import { CustomPost } from 'src/common/decorators';

@ApiTags('Email')
@Controller('email-service')
export class EmailController {
  constructor(
    @Inject(EMAIL_SERVICES) private readonly emailService: EmailService,
    @InjectQueue(EMAIL_TASK_QUEUE) private readonly emailQueue: Queue,
  ) {}

  @CustomPost({
    path: 'generate-email/:templateId',
    description: 'Generate email from template, args and return the html',
  })
  async generateEmail(
    @Param('templateId') templateId: string,
    @Body()
    body: GenerateEmailBodyDto,
  ): Promise<ResponseData<string>> {
    try {
      const { args } = body;

      const payload: EmailGeneratorPayload = { templateId, args };
      const data = await this.emailService.generateEmail(payload);

      return {
        data,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: 400,
          error: 'Bad request',
          message: err?.message || 'Error generating email',
        },
        400,
      );
    }
  }

  @CustomPost({
    path: 'send-email/:templateId',
    description: 'Asynchronously send email via queue',
  })
  async sendEmail(
    @Param('templateId') templateId: string,
    @Body()
    body: SendEmailBodyDto,
  ): Promise<ResponseData<string>> {
    try {
      const { args, subject, to } = body;

      const payload = <SendEmailPayload>{ templateId, args, to, subject };

      await this.emailQueue.add(SEND_EMAIL, payload);

      return {
        data: 'Email is sent to queue for processing',
      };
    } catch (err) {
      throw new HttpException(
        {
          status: 400,
          error: 'Bad request',
          message: err?.message || 'Error sending email',
        },
        400,
      );
    }
  }
}

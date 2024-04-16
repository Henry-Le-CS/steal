import { Injectable } from '@nestjs/common';
import { KeyValue } from 'src/common/types';
import { EmailGeneratorPayload, SendEmailPayload } from '../types';
import * as fs from 'fs';
import { InjectQueue } from '@nestjs/bull';
import { EMAIL_TASK_QUEUE, SEND_EMAIL } from '../constants';
import { Queue } from 'bull';

@Injectable()
export class EmailService {
  constructor(
    @InjectQueue(EMAIL_TASK_QUEUE) private readonly emailQueue: Queue,
  ) {}

  async generateEmail(payload: EmailGeneratorPayload) {
    const { args, templateId } = payload;

    const template = await this.getTemplate(templateId);

    const mailContent = this.replaceArgsInMail(template, args);
    return mailContent;
  }

  private async getTemplate(templateId: string) {
    const templatePath = `${process.cwd()}/src/modules/email/mock-data/${templateId}.html`;
    const template = fs.readFileSync(templatePath, 'utf8');

    if (!template) {
      throw new Error(`Template with ID ${templateId} not found`);
    }

    return template;
  }

  /**
   * Replace args in email template each args is covered by {{argName}}
   * @param template
   * @param args
   */
  private replaceArgsInMail(template: string, args: KeyValue) {
    const completeMail = template.replace(/{{(.*?)}}/g, (match, name) => {
      return args[name] || match;
    });

    const missingArgs = completeMail.match(/{{(.*?)}}/g);

    if (missingArgs?.length) {
      throw new Error(
        `Missing args: ${missingArgs.join(', ')} for email template`,
      );
    }

    return completeMail;
  }

  async sendEmail(payload: SendEmailPayload) {
    await this.emailQueue.add(SEND_EMAIL, payload);
  }
}

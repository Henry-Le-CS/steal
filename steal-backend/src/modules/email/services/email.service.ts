import { Injectable } from '@nestjs/common';
import { KeyValue } from 'src/common/types';
import * as MOCK_DATA from '../mock-data/template.json';
import { EmailGeneratorPayload, SendEmailPayload } from '../types';

@Injectable()
export class EmailService {
  async generateEmail(payload: EmailGeneratorPayload) {
    const { args, templateId } = payload;

    const template = await this.getTemplate(templateId);

    const mailContent = this.replaceArgsInMail(template, args);
    return mailContent;
  }

  private async getTemplate(templateId: string) {
    // TODO: Get template from database
    const template = MOCK_DATA['1'];

    if (!template?.data) {
      throw new Error(`Template ${templateId} not found`);
    }

    return template?.data;
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
}

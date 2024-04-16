import { Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

export function isEmail(email: string) {
  const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  if (email !== '' && email.match(emailFormat)) {
    return true;
  }

  return false;
}

export class EmailHelper {
  static instance: EmailHelper;
  private readonly logger = new Logger(EmailHelper.name);

  private transporter: nodemailer.Transporter;
  private serviceAccountEmail: string;

  // eslint-disable-next-line
  private constructor() {}

  static async getInstance(): Promise<EmailHelper> {
    if (!EmailHelper.instance) {
      EmailHelper.instance = new EmailHelper();
      await EmailHelper.instance.init();
    }

    return EmailHelper.instance;
  }

  private async init() {
    try {
      /**
       * TODO: find a way to ensure secure connection
       */
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        auth: {
          user: process.env.GOOGLE_APP_USERNAME,
          pass: process.env.GOOGLE_APP_PASSWORD,
        },
      });

      await transporter.verify();

      this.transporter = transporter;

      this.logger.log('EmailHelper initialized');
    } catch (error) {
      this.logger.error('Error initializing EmailHelper: ' + error);
    }
  }

  async sendEmail(
    to: string,
    subject: string,
    html: string,
    from?: string,
  ): Promise<boolean> {
    this.validateSendEmailPayload(to, subject, html, from);

    const mailOptions = {
      from: 'lehieu2077@gmail.com',
      to,
      subject,
      html,
    };

    await this.transporter.sendMail(mailOptions);

    return true;
  }

  private validateSendEmailPayload(
    to: string,
    subject: string,
    html: string,
    from?: string,
  ) {
    if (!to || !subject || !html) {
      throw new Error('Invalid send email payload');
    }

    if (!isEmail(to)) {
      throw new Error(`Invalid email address for receiver: ${to}`);
    }

    if (from && !isEmail(from)) {
      throw new Error(`Invalid email address from sender: ${from}`);
    }

    return true;
  }
}

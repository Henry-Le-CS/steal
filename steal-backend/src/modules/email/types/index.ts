import { KeyValue } from 'src/common/types';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateEmailBodyDto {
  @ApiProperty()
  args: KeyValue;
}

export class SendEmailBodyDto extends GenerateEmailBodyDto {
  @ApiProperty()
  subject: string;

  @ApiProperty()
  to: string;
}

export type SendEmailPayload = EmailGeneratorPayload & {
  to: string;
  subject: string;
  from?: string;
};

export type EmailGeneratorPayload = {
  args: KeyValue;
  templateId: string;
};

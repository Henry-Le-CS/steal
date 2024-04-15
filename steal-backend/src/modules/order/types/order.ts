import { IsNumber, IsString } from 'class-validator';
import { PaymentType } from '../constants';

export class OrderDto {
  @IsNumber()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  city: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  note?: string;

  @IsString()
  paymentType: PaymentType;

  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}

export class OrderPayloadDto extends OrderDto {
  @IsNumber()
  totalPrice: number;
}

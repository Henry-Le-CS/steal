import { IsNumber, IsString } from 'class-validator';
import { CheckoutType } from '../constants';

export type PaymentType = CheckoutType;

export class CheckoutDto {
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

export class CheckoutPayloadDto extends CheckoutDto {
  @IsNumber()
  totalPrice: number;
}

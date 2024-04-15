import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PaymentType } from '../constants';

export class OrderDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  note?: string;

  @IsString()
  @IsNotEmpty()
  paymentType: PaymentType;

  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class OrderPayloadDto extends OrderDto {
  @IsNumber()
  totalPrice: number;
}

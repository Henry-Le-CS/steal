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

export type OrderType = {
  id: number;
  product_id: number;
  voucher_id: number;
  user_id: number;
  city: string;
  address: string;
  phone: string;
  email: string;
  amount: number;
  total_price: number;
  note: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
};

export type ConfirmOrderPayload = OrderType & {
  imageUrl: string;
  price: string;
  productName: string;
};

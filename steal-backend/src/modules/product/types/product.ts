import { IsNotEmpty, IsNotEmptyObject, IsString } from 'class-validator';
import { MemoryStoredFile } from 'nestjs-form-data';

export class UploadProductDto {
  @IsString()
  providerId: string;

  @IsString()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  amount: number;

  @IsString()
  description: string;

  @IsString()
  additionalInformation: string;

  @IsNotEmpty()
  categories: string;

  @IsNotEmptyObject()
  file: MemoryStoredFile;
}

type Order = 'asc' | 'desc' | 'newest' | 'oldest' | 'none';

export type SearchProductQuery = {
  q?: string;
  range?: string; // a,b
  categories?: string; // a,b
  order?: Order;
};

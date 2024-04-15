import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryProductPriceType {
  @IsNumber()
  id: number;

  @IsNumber()
  amount: number;
}

export class GetMultiplePriceDto {
  @IsString()
  type: 'multiple';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QueryProductPriceType)
  products: QueryProductPriceType[];
}

export type GetSinglePriceType = {
  type: 'single';
  product: Omit<QueryProductPriceType, 'id'>;
};

export type GetPricePayloadType = GetMultiplePriceDto | GetSinglePriceType;

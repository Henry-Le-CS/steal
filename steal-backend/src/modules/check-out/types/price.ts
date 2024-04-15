export type QueryProductPriceType = {
  id: number;
  amount: number;
};

export type GetMultiplePriceType = {
  type: 'multiple';
  products: QueryProductPriceType[];
};

export type GetSinglePriceType = {
  type: 'single';
  product: Omit<QueryProductPriceType, 'id'>;
};

export type GetPricePayloadType = GetMultiplePriceType | GetSinglePriceType;

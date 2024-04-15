export type KeyValue = {
  [key: string]: any;
};

export type ResponseData<T = any> = {
  data: T;
  statusCode?: number;
};

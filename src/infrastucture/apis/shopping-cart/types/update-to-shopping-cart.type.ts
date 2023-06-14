import { BaseEntry } from './general.type';

export interface UpdateToCartResponse {
  entry?: BaseEntry;
  quantity: number;
  quantityAdded: number;
  statusCode: StatusCode;
}

export enum StatusCode {
  NO_STOCK = 'noStock',
  SUCCESS = 'success'
}

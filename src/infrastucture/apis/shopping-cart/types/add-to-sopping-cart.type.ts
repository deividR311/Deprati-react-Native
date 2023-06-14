import { BaseEntry } from './general.type';

export interface AddToCartResponse {
  entry: BaseEntry;
  quantity: number;
  quantityAdded: number;
  statusCode: string;
}

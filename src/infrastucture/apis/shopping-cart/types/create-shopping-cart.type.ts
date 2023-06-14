import { Price } from './general.type';

export interface CreateShoppingCartResponse {
  type: string;
  code: string;
  entries: any[];
  guid: string;
  totalItems: number;
  totalPrice: Price;
  totalPriceWithTax: Price;
  totalVolume: number;
  totalWeight: number;
}

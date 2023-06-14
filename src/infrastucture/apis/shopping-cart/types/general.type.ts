export interface RequestBodyBase {
  token?: string;
}

export interface Price {
  currencyIso: string;
  value: number;
  formattedValue?: string;
  priceType?: string;
}

export interface User {
  name: string;
  uid: string;
}

export interface Selected {
  code: string;
  priceData: Price;
  stock: Stock;
  url: string;
  variantOptionQualifiers: any[];
}

export interface BaseOption {
  selected: Selected;
  variantType: string;
}

export interface Category {
  code: string;
  url: string;
  name: string;
  parentCategoryName: string;
}

export interface Image {
  format: string;
  imageType: string;
  url: string;
  altText: string;
}

export interface Stock {
  stockLevel: number;
  stockLevelStatus?: string;
}

export interface BaseEntry {
  entryNumber: number;
  product: BaseProduct;
  quantity: number;
  totalPrice: Price;
  volume: number;
  weight: number;
}

export interface BaseProduct {
  availableForPickup: boolean;
  baseProduct: string;
  code: string;
  ean: string;
  name: string;
  purchasable: boolean;
  stock: Stock;
  url: string;
}

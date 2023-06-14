import { StockLevelStatus } from '../../../presentation/screens/dashboard/PLP/interfaces';
import { RequestBodyBase, ResponseBase } from '../common/request-response.type';

export interface reviewBody extends RequestBodyBase {
  comment: string;
  headline: string;
  rating: number;
  productCode: string;
}

export interface reviewResponse extends ResponseBase {
  data: {
    alias: string;
    comment: string;
    date: string;
    headline: string;
    id: string;
    principal: {
      name: string;
      uid: string;
    };
    rating: number;
  };
}

export interface producSearchBody {
  query: string;
  pageSize?: number;
  currentPage?: number;
  fields?: 'SEARCH' | 'FULL';
  categoryCode?: string;
}

export interface productBody extends RequestBodyBase {
  productCode: string;
}

export interface productResponse extends ResponseBase {
  averageRating: number;
  availableForPickup: boolean;
  baseProduct: string;
  baseOptions: BaseOptions[];
  code: string;
  ean: string;
  description: string;
  images: ImageProduct[];
  installmentCreditoDirecto: string;
  name: string;
  previousPrice: PriceProduct;
  price: PriceProduct;
  priceRange: string;
  stock: Stock;
  tagUrl: string;
  url: string;
  variantColorAltTextImages?: string[];
  variantColorImages?: string[];
  volumePricesFlag: boolean;
  deliveryModes?: DeliveryModes[];
  variantValueCategories: VariantValueCategories[];
  isGiftProduct: boolean;
  isPromotionSpecialPrice: boolean;
  [any: string]: any;
}

export interface BaseOptions {
  options: BaseOptionsItems[];
  selected: BaseOptionsItems;
  variantType: string;
}

export interface BaseOptionsItems {
  code: string;
  priceData: PriceProduct;
  stock: Stock;
  url: string;
  variantOptionQualifiers: any[];
}

export interface VariantValueCategories {
  code: string;
  name: string;
  sequence: number;
}

export interface DeliveryModes {
  code: string;
}

export interface PriceProduct {
  currencyIso: string;
  formattedValue: string;
  priceType: string;
  value: number;
}

export interface ImageProduct {
  altText: string;
  format: string;
  imageType: string;
  galleryIndex?: number;
  url: string;
}

export interface Stock {
  stockLevelStatus: StockLevelStatus;
  stockLevel?: number;
}

export interface IVariant {
  elements: any[];
  parentVariantCategory: ParentVariantCategory;
  variantOption: VariantOption;
  variantValueCategory: VariantValueCategory;
}

export interface ParentVariantCategory {
  hasImage: boolean;
  name: string;
  priority: number;
}

export interface VariantOption {
  code: string;
  url: string;
  variantOptionQualifiers: VariantOptionQualifier[];
}

export interface VariantOptionQualifier {
  image: Image;
}

export interface Image {
  format?: string;
  url: string;
}

export interface VariantValueCategory {
  code: string;
  name: string;
  sequence: number;
}

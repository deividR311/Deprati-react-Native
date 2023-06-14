export interface WishlistRequest {
  user: string;
}

export interface WishlistAddRemoveRequest {
  user: string;
  productCode: string;
}

export interface WishlistAddRemoveResponse {
  status: number;
  // data: dataError
}

export interface ErrorWishlistResponse {
  status: number;
  data: dataError;
}
export interface dataError {
  errors: ErrorWishlist[];
}

export interface ErrorWishlist {
  type: TypeErrorWishlist;
  message: string;
}
export enum TypeErrorWishlist {
  INVALID_TOKEN_ERROR = 'InvalidTokenError',
  DUPLICATE_UID_ERROR = 'DuplicateUidError'
}
/*********************************
 *********************************
 *********************************/

export interface WishlistsResponse {
  wishlists: MyWishlist[];
}

export interface MyWishlist {
  description: string;
  entries: Entry[];
  isDefault: boolean;
  name: string;
}

export interface Entry {
  addedDate: string;
  comment: string;
  desired: number;
  priority: Priority;
  product: Product;
}

export interface Priority {
  code: string;
  name: string;
}

export interface Product {
  availableForPickup: boolean;
  averageRating: number;
  baseOptions: BaseOption[];
  baseProduct: string;
  code: string;
  ean: string;
  images: ImageWishlist[];
  name: string;
  purchasable: boolean;
  url: string;
  previousPrice: PriceData;
  price: PriceData;
  isGiftProduct: boolean;
  isPromotionSpecialPrice: boolean;
}

export interface BaseOption {
  selected: Selected;
  variantType: string;
}

export interface Selected {
  code: string;
  price: PriceData;
  previousPrice: PriceData;
  stock: StockWishlist;
  url: string;
  variantOptionQualifiers: any[];
}

export interface PriceData {
  currencyIso: string;
  formattedValue: string;
  priceType: string;
  value: number;
}

export interface StockWishlist {
  stockLevel: number;
  stockLevelStatus: string;
}

export interface ImageWishlist {
  format: string;
  imageType: string;
  url: string;
  altText?: string;
}

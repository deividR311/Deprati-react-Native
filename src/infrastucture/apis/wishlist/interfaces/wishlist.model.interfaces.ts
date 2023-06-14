export interface WishlistsModel {
  wishlists: IMyWishlist[];
}

export interface IMyWishlist {
  description: string;
  entries: IEntry[];
  isDefault: boolean;
  name: string;
}

export interface IEntry {
  addedDate: string;
  comment: string;
  desired: number;
  priority: IPriority;
  product: IProduct;
}

export interface IPriority {
  code: string;
  name: string;
}

export interface IProduct {
  availableForPickup: boolean;
  averageRating: number;
  baseOptions: IBaseOption[];
  baseProduct: string;
  code: string;
  ean: string;
  images: IImageWishlist[];
  name: string;
  purchasable: boolean;
  url: string;
  previousPrice: IPriceData;
  price: IPriceData;
  isPromotionSpecialPrice: boolean;
  isGiftProduct: boolean;
}

export interface IBaseOption {
  selected: ISelected;
  variantType: string;
}

export interface ISelected {
  code: string;
  priceData: IPriceData;
  previousPrice: IPriceData;
  stock: IStockWishlist;
  url: string;
  variantOptionQualifiers: any[];
}

export interface IPriceData {
  currencyIso: string;
  formattedValue: string;
  priceType: string;
  value: number;
}

export interface IStockWishlist {
  stockLevel: number;
  stockLevelStatus: string;
}

export interface IImageWishlist {
  format: string;
  imageType: string;
  url: string;
  altText?: string;
}

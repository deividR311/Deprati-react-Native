export interface MyReturnsRequest {
  user: string;
  currentPage?: number;
  pageSize?: number;
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

export interface MyReturnsResponse {
  returns: Return[];
}

export interface Return {
  cancellable: boolean;
  code: string;
  order: Order;
  status: string;
}

export interface Order {
  appliedOrderPromotions: any[];
  appliedProductPromotions: any[];
  calculated: boolean;
  code: string;
  deliveryAddress: DeliveryAddress;
  deliveryCost: DeliveryCost;
  deliveryMode: DeliveryMode;
  entries: Entry[];
  guid: string;
  net: boolean;
  orderDiscounts: DeliveryCost;
  productDiscounts: DeliveryCost;
  site: string;
  store: string;
  subTotal: DeliveryCost;
  totalDiscounts: DeliveryCost;
  totalItems: number;
  totalPrice: DeliveryCost;
  totalPriceWithTax: DeliveryCost;
  totalTax: DeliveryCost;
  totalVolume: number;
  totalWeight: number;
  user: User;
  created: string;
  deliveryStatus: string;
  deliveryStatusDisplay: string;
  guestCustomer: boolean;
  status: string;
  statusDisplay: string;
}

export interface DeliveryAddress {
  cellphoneNumber: string;
  cellphonePreffix: string;
  city: string;
  country: Country;
  defaultAddress: boolean;
  firstName: string;
  id: string;
  line1: string;
  line2: string;
  otherInfo: string;
  phone: string;
  region: Country;
  town: string;
}

export interface Country {
  isocode: string;
}

export interface DeliveryCost {
  currencyIso: string;
  formattedValue: string;
  priceType: string;
  value: number;
}

export interface DeliveryMode {
  code: string;
}

export interface Entry {
  entryNumber: number;
  product: Product;
  quantity: number;
  totalPrice: TotalPrice;
  volume: number;
  weight: number;
}

export interface Product {
  code: string;
  name: string;
  purchasable: boolean;
}

export interface TotalPrice {
  currencyIso: string;
  value: number;
}

export interface User {
  name: string;
  uid: string;
}

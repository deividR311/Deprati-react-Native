import { RequestBodyBase, ResponseBase } from '../common/request-response.type';
import {
  Code,
  CurrencyISO,
  DeliveryStatusDisplay,
  Format,
  ImageType,
  PaymentStatusDisplay,
  PriceType,
  Status,
  StatusDisplay,
  StockLevelStatus,
  TypeErrorCustomerOrders,
  VariantType
} from './interfaces/customer-orders.enum';

export interface CustomerOrdersRequest {
  user: string;
  pageSize?: number;
  currentPage?: number;
  statuses?: 'CANCELLED' | 'CHECKED_VALID';
  sort?: string;
}

export interface OrderDetailsRequest {
  user: string;
  orderCode: string;
}

export interface ErrorResponse {
  status: number;
  data: dataError;
}
export interface dataError {
  errors: ErrorCustomerOrders[];
}
export interface ErrorCustomerOrders {
  type: TypeErrorCustomerOrders;
  message: string;
}
export interface OrdersResponse {
  orders: MyOrder[];
  // pagination: Pagination
  // sorts: Sort[]
}

export interface MyOrder {
  code: string;
  deliveryStatusDisplay?: DeliveryStatusDisplay;
  month?: boolean;
  firstEntry: FirstEntry;
  guid: string;
  paymentStatusDisplay: PaymentStatusDisplay;
  placed: Date;
  created?: string;
  paymentStatus?: string;
  totalItems?: number;
  status: Status;
  statusDisplay: StatusDisplay;
  total: Total;
  totalPriceWithTax?: Total;
  totalUnitCount: number;
}

export interface FirstEntry {
  basePrice: Total;
  deliveryMode?: DeliveryMode;
  entryNumber: number;
  product: Product;
  quantity: number;
  totalPrice: Total;
  updateable: boolean;
}

export interface Total {
  currencyIso: CurrencyISO;
  formattedValue: string;
  priceType: PriceType;
  value: number;
}

export interface DeliveryMode {
  code?: Code;
}

export interface Product {
  availableForPickup: boolean;
  baseOptions: BaseOption[];
  baseProduct?: string;
  categories: Category[];
  code: string;
  images: ImageMyOrder[];
  name: string;
  purchasable: boolean;
  stock: Stock;
  url: string;
  averageRating?: number;
  description?: string;
  isHomeAssemblyRequired?: boolean;
  technicalCharacteristics?: string;
}

export interface BaseOption {
  selected: Selected;
  variantType: VariantType;
}

export interface Selected {
  code: string;
  priceData: Total;
  stock: Stock;
  url: string;
  variantOptionQualifiers: any[];
}

export interface Stock {
  stockLevel?: number;
  stockLevelStatus: StockLevelStatus;
}

export interface Category {
  code: string;
  url: string;
}

export interface ImageMyOrder {
  format: Format;
  imageType: ImageType;
  url: string;
  altText?: string;
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  sort: string;
  totalPages: number;
  totalResults: number;
}

export interface Sort {
  code: string;
  selected: boolean;
}

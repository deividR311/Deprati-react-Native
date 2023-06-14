import {
  ImageFormat,
  ImageType
} from '../../../../application/utils/type-format-Image';
import {
  Code,
  CurrencyISO,
  DeliveryStatusDisplay,
  PaymentStatusDisplay,
  PriceType,
  Status,
  StatusDisplay,
  StockLevelStatus,
  VariantType
} from './customer-orders.enum';

export interface CustomerOrdersModel {
  orders: IMyOrder[];
  // pagination: IPagination
  // sorts: ISort[]
}

export interface IMyOrder {
  code: string;
  deliveryStatusDisplay?: DeliveryStatusDisplay;
  month?: boolean;
  firstEntry: IFirstEntry;
  guid: string;
  paymentStatusDisplay: PaymentStatusDisplay;
  placed: string;
  status: Status;
  statusDisplay: StatusDisplay;
  total: ITotal;
  totalUnitCount: number;
  created?: string;
  paymentStatus?: string;
  totalItems?: number;
  totalPriceWithTax?: ITotal;
  asmAgent: string;
}

export interface IFirstEntry {
  basePrice: ITotal;
  deliveryMode?: IDeliveryMode;
  entryNumber: number;
  product: IProduct;
  quantity: number;
  totalPrice: ITotal;
  updateable: boolean;
}

export interface ITotal {
  currencyIso: CurrencyISO;
  formattedValue: string;
  priceType: PriceType;
  value: number;
}

export interface IDeliveryMode {
  code?: Code;
}

export interface IProduct {
  availableForPickup: boolean;
  baseOptions: IBaseOption[];
  baseProduct?: string;
  categories: ICategory[];
  code: string;
  images: IImageMyOrder[];
  name: string;
  purchasable: boolean;
  stock: IStock;
  url: string;
  averageRating?: number;
  description?: string;
  isHomeAssemblyRequired?: boolean;
  technicalCharacteristics?: string;
}

export interface IBaseOption {
  selected: ISelected;
  variantType: VariantType;
}

export interface ISelected {
  code: string;
  priceData: ITotal;
  stock: IStock;
  url: string;
  variantOptionQualifiers: any[];
}

export interface IStock {
  stockLevel?: number;
  stockLevelStatus: StockLevelStatus;
}

export interface ICategory {
  code: string;
  url: string;
}

export interface IImageMyOrder {
  format: ImageFormat;
  imageType: ImageType;
  url: string;
  altText?: string;
}

export interface IPagination {
  currentPage: number;
  pageSize: number;
  sort: string;
  totalPages: number;
  totalResults: number;
}

export interface ISort {
  code: string;
  selected: boolean;
}

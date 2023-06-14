import { PickUpOrderGroup } from '../../shopping-cart';

export interface CustomerOrderDetail {
  type: string;
  appliedOrderPromotions: any[];
  appliedProductPromotions: any[];
  appliedVouchers: any[];
  calculated: boolean;
  code: string;
  deliveryAddress: FullAddress;
  deliveryCost: PriceData;
  deliveryItemsQuantity: number;
  deliveryMode: DeliveryMode;
  deliveryOrderGroups: DeliveryOrderGroup[];
  entries: OrderEntry[];
  guid: string;
  net: boolean;
  orderDiscounts: PriceData;
  paymentInfo: PaymentInfo;
  paymentStatus: string;
  pickupItemsQuantity: number;
  pickupOrderGroups: PickUpOrderGroup[];
  productDiscounts: PriceData;
  sellWithoutTaxes: SellWithOutTaxes;
  sellWithTaxes: SellWithOutTaxes;
  site: string;
  store: string;
  subTotal: SubTotal;
  totalDiscounts: PriceData;
  totalItems: number;
  totalPrice: PriceData;
  totalPriceWithTax: PriceData;
  totalTax: PriceData;
  user: User;
  consignments: Consignment[];
  created: Date;
  deliveryStatus: string;
  deliveryStatusDisplay: string;
  guestCustomer: boolean;
  status: string;
  statusDisplay: string;
  unconsignedEntries: any[];
  userDocId: string;
  userIdType: string;
  invoiceNumber?: string;
  deliveryInvoiceNumber?: string;
  trackingInfo?: {
    entries: string[];
    urlTracking: string;
  }[];
  placedByName: string;
  thirdAgencyData: {
    agency: string;
    agencyName: string;
    city: string;
    pointOfService: string;
    province: string;
    retireId: string;
    retireName: string;
    retirePhone: string;
  };
}

export interface Country {
  isocode: string;
  name: string;
}

export interface Region {
  countryIso: string;
  isocode: string;
  isocodeShort: string;
  name: string;
}

export interface BasicAddress {
  defaultAddress: boolean;
  email: string;
  firstName: string;
  formattedAddress: string;
  id: string;
  line1: string;
  line2: string;
  phone: string;

  phonePreffix: string;
  shippingAddress: boolean;
  visibleInAddressBook: boolean;
}

export interface FullAddress extends BasicAddress {
  cellphoneNumber: string;
  cellphonePreffix: string;
  country: Country;
  email: string;
  firstName: string;
  formattedAddress: string;
  id: string;
  line1: string;
  line2: string;
  otherInfo: string;
  phone: string;
  region: Region;
  shippingAddress: boolean;
  town: string;
  visibleInAddressBook: boolean;
}

export interface SellWithOutTaxes {
  currencyIso: string;
  formattedValue: string;
  priceType: string;
  value: number;
}
export interface DeliveryMode {
  code: DeliveryModeCode | string;
  deliveryCost: PriceData;
}

export enum DeliveryModeCode {
  standard = 'standard',
  thirdparty = 'thirdParty',
  pickup = 'pickup'
}

export interface PriceData {
  currencyIso: string;
  formattedValue: string;
  priceType: string;
  value: number;
}

export interface Category {
  code: string;
  url: string;
}

export interface Image {
  altText: string;
  format: string;
  imageType: string;
  url: string;
}

export interface Stock {
  stockLevel: number;
  stockLevelStatus: string;
}

export interface Product {
  availableForPickup: boolean;
  baseOptions: any[];
  categories: Category[];
  averageRating: number;
  code: string;
  description: string;
  ean: string;
  images: Image[];
  name: string;
  purchasable: boolean;
  stock: Stock;
  url: string;
}

export interface DeliveryOrderGroup {
  entries: OrderEntry[];
  totalPriceWithTax: PriceData;
}

export interface PaymentInfo {
  billingAddress: BasicAddress;
  paymentModeDisplayLine1: string;
  accountNumber: string;
  cardNumber?: string;
  defaultPayment: boolean;
  saved: boolean;
  defaultCard?: boolean;
  fechaPagoMaximo?: string;
  numeroProforma?: string;
  paymentMode?: string;
}

export interface SubTotal {
  currencyIso: string;
  formattedValue: string;
  priceType: string;
  value: number;
}

export interface User {
  name: string;
  uid: string;
}

export interface OrderEntry {
  basePrice: PriceData;
  deliveryMode: DeliveryMode;
  entryNumber: number;
  product: Product;
  quantity: number;
  totalPrice: PriceData;
  totalDiscount: PriceData;
  updateable: boolean;
  subtotal: PriceData;
  totalPriceWithoutTaxes: PriceData;
  basePriceWithoutTaxes: PriceData;
}

export interface Entry {
  orderEntry: OrderEntry;
  quantity: number;
  shippedQuantity: number;
}

export interface Consignment {
  code: string;
  entries: Entry[];
  shippingAddress: FullAddress;
  status: string;
  statusDate: Date;
  trackingID: string;
}

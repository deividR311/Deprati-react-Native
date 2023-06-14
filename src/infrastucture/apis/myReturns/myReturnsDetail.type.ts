import { MyReturnsRequest } from './myReturns.type';

export interface DetailReturnRequest extends MyReturnsRequest {
  returnCode: string;
}

export interface DetailReturnResponse {
  cancellable: boolean;
  code: string;
  deliveryCost: DeliveryCost;
  order: Order;
  refundDeliveryCost: boolean;
  returnEntries: ReturnEntry[];
  rma: string;
  status: string;
  subtotal: DeliveryCost;
  total: DeliveryCost;
  comments: CommentReturn[];
}

export interface CommentReturn {
  author: {
    name: string;
    uid: string;
  };
  code: string;
  creationDate: string;
  fromCustomer: boolean;
  text: string;
}

export interface DeliveryCost {
  currencyIso: string;
  formattedValue: string;
  priceType: string;
  value: number;
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

export interface DeliveryMode {
  code: string;
}

export interface Entry {
  basePrice: DeliveryCost;
  deliveryMode: DeliveryMode;
  entryNumber: number;
  product: Product;
  quantity: number;
  totalPrice: DeliveryCost;
  updateable: boolean;
  volume: number;
  weight: number;
}

export interface Product {
  code: string;
  name: string;
  purchasable: boolean;
  ean?: string;
}

export interface User {
  name: string;
  uid: string;
}

export interface ReturnEntry {
  action: string;
  expectedQuantity: number;
  orderEntry: Entry;
  receivedQuantity: number;
  refundAmount: DeliveryCost;
  refundReason: string;
}

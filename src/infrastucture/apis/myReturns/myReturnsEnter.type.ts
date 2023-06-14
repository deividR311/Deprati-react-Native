import { MyReturnsRequest } from './myReturns.type';
import { MyReturnSearchRequest } from './myReturnsSearch.type';

export interface EnterReturnRequest
  extends MyReturnsRequest /*MyReturnSearchRequest*/,
    IEnterReturnRequest {}

export interface IEnterReturnRequest {
  order: OrderRequest;
  returnEntries: ReturnEntryRequest[];
}

export interface OrderRequest {
  code: string;
}

export interface ReturnEntryRequest {
  expectedQuantity: number;
  orderEntry: OrderEntryRequest;
}

export interface OrderEntryRequest {
  entryNumber: number;
}

/////////////////////////////////////
/////////////////////////////////////

export interface EnterReturnResponse {
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
  idNumber: string;
  idType: string;
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

import { PickUpOrderGroup } from '../../../../../../infrastucture/apis/shopping-cart';

export interface IOrdersPurchaseProccessed {
  type: string;
  appliedOrderPromotions: AppliedOrderPromotion[];
  appliedProductPromotions: any[];
  appliedVouchers: any[];
  calculated: boolean;
  code: string;
  creationTimeFormated: string;
  deliveryAddress: Address;
  deliveryCost: DeliveryCost;
  deliveryItemsQuantity: number;
  deliveryMode: PokedexDeliveryMode;
  deliveryOrderGroups: DeliveryOrderGroup[];
  entries: DeliveryOrderGroupEntry[];
  guid: string;
  net: boolean;
  orderDiscounts: DeliveryCost;
  paymentAddress: PaymentAddress;
  paymentInfo: PaymentInfo;
  paymentStatus: string;
  pickupItemsQuantity: number;
  pickupOrderGroups: PickUpOrderGroup[];
  productDiscounts: DeliveryCost;
  sellWithTaxes: DeliveryCost;
  sellWithoutTaxWithoutInterest: DeliveryCost;
  sellWithoutTaxes: DeliveryCost;
  site: string;
  store: string;
  subTotal: DeliveryCost;
  totalDiscounts: DeliveryCost;
  totalItems: number;
  totalPrice: DeliveryCost;
  totalPriceNoTaxNoDeliverCostNoDirectCreditInterest: DeliveryCost;
  totalPriceWithTax: DeliveryCost;
  totalTax: DeliveryCost;
  totalVolume: number;
  totalWeight: number;
  user: User;
  consignments: Consignment[];
  created: string;
  deliveryModeCode: string;
  deliveryStatus: string;
  deliveryStatusCode: string;
  deliveryStatusDisplay: string;
  guestCustomer: boolean;
  status: string;
  statusDisplay: string;
  trackingInfo: any[];
  unconsignedEntries: any[];
  userDocId: string;
  userIdType: string;
}

export interface AppliedOrderPromotion {
  consumedEntries: any[];
  description: string;
  promotion: Promotion;
}

export interface Promotion {
  code: string;
  description: string;
  endDate: string;
  promotionType: string;
}

export interface Consignment {
  code: string;
  entries: ConsignmentEntry[];
  shippingAddress: Address;
  status: string;
  statusDate: string;
}

export interface ConsignmentEntry {
  orderEntry: OrderEntry;
  quantity: number;
  shippedQuantity: number;
}

export interface OrderEntry {
  basePrice: DeliveryCost;
  entryNumber: number;
  product: OrderEntryProduct;
  quantity: number;
  totalPrice: DeliveryCost;
  updateable: boolean;
  volume: number;
  weight: number;
}

export interface DeliveryCost {
  currencyIso: string;
  formattedValue: string;
  priceType: string;
  value: number;
}

export interface OrderEntryProduct {
  code: string;
  description: string;
  images: Image[];
  multidimensional: boolean;
  name: string;
  priceRange: PriceRange;
  purchasable: boolean;
  url: string;
}

export interface Image {
  format: string;
  imageType: string;
  url: string;
  altText?: string;
}

export interface PriceRange {
  maxPrice: Price;
  minPrice: Price;
}

export interface Price {
  currencyIso: string;
  value: number;
}

export interface Address {
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
  phonePreffix: string;
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

export interface PokedexDeliveryMode {
  code: string;
  deliveryCost: DeliveryCost;
}

export interface DeliveryOrderGroup {
  entries: DeliveryOrderGroupEntry[];
  totalPriceWithTax: DeliveryCost;
}

export interface DeliveryOrderGroupEntry {
  basePrice: DeliveryCost;
  basePriceWithTaxes: DeliveryCost;
  basePriceWithoutTaxes: DeliveryCost;
  deliveryMode: DeliveryModeElement;
  deliveryTimeRange: string;
  entryNumber: number;
  giftPacking: boolean;
  pickup: boolean;
  product: EntryProduct;
  quantity: number;
  subtotal: DeliveryCost;
  totalDiscount: DeliveryCost;
  totalPrice: DeliveryCost;
  totalPriceWithoutTaxes: DeliveryCost;
  updateable: boolean;
  volume: number;
  weight: number;
}

export interface DeliveryModeElement {
  code: string;
}

export interface EntryProduct {
  availableForPickup: boolean;
  baseOptions: BaseOption[];
  baseProduct: string;
  categories: Category[];
  code: string;
  ean: string;
  images: Image[];
  ivaCondition: string;
  name: string;
  purchasable: boolean;
  stock: Stock;
  url: string;
  averageRating?: number;
  deliveryModes?: DeliveryModeElement[];
}

export interface BaseOption {
  selected: Selected;
  variantType: string;
}

export interface Selected {
  code: string;
  priceData: DeliveryCost;
  stock: Stock;
  url: string;
  variantOptionQualifiers: any[];
}

export interface Stock {
  stockLevel: number;
  stockLevelStatus: string;
}

export interface Category {
  code: string;
  name: string;
  parentCategoryName?: string;
  url: string;
}

export interface PaymentAddress {
  billingAddress: boolean;
  defaultAddress: boolean;
  email: string;
  firstName: string;
  formattedAddress: string;
  id: string;
  idNumber: string;
  idType: string;
  line1: string;
  line2: string;
  phone: string;
  phonePreffix: string;
  shippingAddress: boolean;
  streetName: string;
  streetNumber: string;
  visibleInAddressBook: boolean;
}

export interface PaymentInfo {
  defaultCard: boolean;
  defaultPayment: boolean;
  fechaPagoMaximo: string;
  numeroProforma: string;
  paymentMode: string;
  paymentModeDisplayLine1: string;
  saved: boolean;
}

export interface User {
  name: string;
  uid: string;
}

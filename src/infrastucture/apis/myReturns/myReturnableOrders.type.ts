export interface ReturnableordersResponse {
  orders: Order[];
}

export interface Order {
  code: string;
  deliveryStatusDisplay?: string;
  month?: boolean;
  firstEntry: FirstEntry;
  guid: string;
  paymentStatusDisplay: string;
  placed: Date;
  status: string;
  statusDisplay: string;
  total: Total;
  totalUnitCount: number;
}

export interface FirstEntry {
  basePrice: Total;
  basePriceWithTaxes: Total;
  basePriceWithoutTaxes: Total;
  deliveryMode: DeliveryMode;
  deliveryTimeRange?: string;
  entryNumber: number;
  giftPacking: boolean;
  pickup: boolean;
  product: Product;
  quantity: number;
  subtotal: Total;
  totalDiscount: Total;
  totalPrice: Total;
  totalPriceWithoutTaxes: Total;
  updateable: boolean;
  volume: number;
  weight: number;
  deliveryPointOfService?: DeliveryPointOfService;
}

export interface Total {
  currencyIso: string;
  formattedValue: string;
  priceType: string;
  value: number;
}

export interface DeliveryMode {
  code: string;
}

export interface DeliveryPointOfService {
  address: Address;
  displayName: string;
  features: Features;
  geoPoint: GeoPoint;
  name: string;
  openingHours: OpeningHours;
  storeImages: any[];
}

export interface Address {
  city: string;
  country: Country;
  defaultAddress: boolean;
  formattedAddress: string;
  id: string;
  line1: string;
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

export interface Features {}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface OpeningHours {
  code: string;
  specialDayOpeningList: any[];
  weekDayOpeningList: WeekDayOpeningList[];
}

export interface WeekDayOpeningList {
  closingTime?: IngTime;
  openingTime?: IngTime;
  closed: boolean;
  weekDay: string;
}

export interface IngTime {
  formattedHour: string;
  hour: number;
  minute: number;
}

export interface Product {
  availableForPickup: boolean;
  baseOptions: BaseOption[];
  baseProduct: string;
  categories: Category[];
  code: string;
  deliveryModes: DeliveryMode[];
  ean: string;
  images: Image[];
  ivaCondition: string;
  name: string;
  purchasable: boolean;
  stock: Stock;
  url: string;
  sizeChartImage?: SizeChartImage;
}

export interface BaseOption {
  selected: Selected;
  variantType: string;
}

export interface Selected {
  code: string;
  priceData: Total;
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
  parentCategoryName: string;
  url: string;
}

export interface Image {
  format: string;
  imageType: string;
  url: string;
}

export interface SizeChartImage {
  url: string;
}

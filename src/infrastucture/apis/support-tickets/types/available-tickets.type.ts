export interface DeliveryMode {
  code: string;
  deliveryCost: Price;
  description: string;
  name: string;
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

export interface Address {
  cellphoneNumber: string;
  cellphonePreffix: string;
  city: string;
  companyName: string;
  country: Country;
  defaultAddress: boolean;
  email: string;
  firstName: string;
  formattedAddress: string;
  id: string;
  idNumber: string;
  idType: string;
  lastName: string;
  line1: string;
  line2: string;
  otherInfo: string;
  phone: string;
  phonePreffix: string;
  postalCode: string;
  region: Region;
  shippingAddress: boolean;
  title: string;
  titleCode: string;
  town: string;
  visibleInAddressBook: boolean;
}

export interface Features {}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface MapIcon {
  altText: string;
  format: string;
  galleryIndex: number;
  imageType: string;
  url: string;
}

export interface Time {
  formattedHour: string;
  hour: string;
  minute: string;
}

export interface SpecialDayOpeningList {
  closed: boolean;
  closingTime: Time;
  comment: string;
  date: Date;
  formattedDate: string;
  name: string;
  openingTime: Time;
}

export interface WeekDayOpeningList {
  closed: boolean;
  closingTime: Time;
  openingTime: Time;
  weekDay: string;
}

export interface OpeningHours {
  code: string;
  name: string;
  specialDayOpeningList: SpecialDayOpeningList[];
  weekDayOpeningList: WeekDayOpeningList[];
}

export interface DeliveryPointOfService {
  address: Address;
  description: string;
  displayName: string;
  distanceKm: number;
  features: Features;
  formattedDistance: string;
  geoPoint: GeoPoint;
  mapIcon: MapIcon;
  name: string;
  openingHours: OpeningHours;
  storeContent: string;
  storeImages: Image[];
  url: string;
}

export interface Stock {
  stockLevel: number;
  stockLevelStatus: string;
}

export interface Image {
  altText: string;
  format: string;
  galleryIndex: number;
  imageType: string;
  url: string;
}

export interface VariantOptionQualifier {
  image: Image;
  name: string;
  qualifier: string;
  value: string;
}

export interface Option {
  code: string;
  priceData: Price;
  stock: Stock;
  url: string;
  variantOptionQualifiers: VariantOptionQualifier[];
}

export interface Selected {
  code: string;
  priceData: Price;
  stock: Stock;
  url: string;
  variantOptionQualifiers: VariantOptionQualifier[];
}

export interface BaseOption {
  options: Option[];
  selected: Selected;
  variantType: string;
}

export interface Category {
  code: string;
  image: Image;
  name: string;
  parentCategoryName: string;
  url: string;
}

export interface FeatureUnit {
  name: string;
  symbol: string;
  unitType: string;
}

export interface FeatureValue {
  value: string;
}

export interface Feature {
  code: string;
  comparable: boolean;
  description: string;
  featureUnit: FeatureUnit;
  featureValues: FeatureValue[];
  name: string;
  range: boolean;
  type: string;
}

export interface Classification {
  code: string;
  features: Feature[];
  name: string;
}

export interface CloudflareVideo {
  altText: string;
  autoplay: boolean;
  catalogId: string;
  catalogVersion: string;
  code: string;
  controls: boolean;
  description: string;
  downloadUrl: string;
  height: string;
  loop: boolean;
  mime: string;
  muted: boolean;
  responsive: boolean;
  thumbnailTime?: number;
  url: string;
  videoId: string;
  width: string;
  urlLink?: string;
}

export interface DeliveryCost {
  currencyIso: string;
  formattedValue: string;
  maxQuantity: number;
  minQuantity: number;
  priceType: string;
  value: number;
}

export interface DetailVideoMedia {
  altText: string;
  catalogId: string;
  catalogVersion: string;
  code: string;
  description: string;
  downloadUrl: string;
  mediaFormat: string;
  mime: string;
  url: string;
  videoID: string;
  youtubeLink: string;
}

export interface FutureStock {
  date: Date;
  formattedDate: string;
  stock: Stock;
}

export interface Installment {
  description: string;
  factor: string;
  finalPrice: string;
  instalments: number;
}

export interface Restriction {
  description: string;
  restrictionType: string;
}

export interface PotentialPromotion {
  code: string;
  couldFireMessages: string[];
  description: string;
  enabled: boolean;
  endDate: Date;
  firedMessages: string[];
  priority: number;
  productBanner: Image;
  promotionGroup: string;
  promotionType: string;
  restrictions: Restriction[];
  startDate: Date;
  title: string;
}

export interface PriceRange {
  maxPrice: Price;
  minPrice: Price;
}

export interface Target {}

export interface ProductReference {
  description: string;
  preselected: boolean;
  quantity: number;
  referenceType: string;
  target: Target;
}

export interface Currency {
  active: boolean;
  isocode: string;
  name: string;
  symbol: string;
}

export interface DefaultAddress {
  cellphoneNumber: string;
  cellphonePreffix: string;
  city: string;
  companyName: string;
  country: Country;
  defaultAddress: boolean;
  email: string;
  firstName: string;
  formattedAddress: string;
  id: string;
  idNumber: string;
  idType: string;
  lastName: string;
  line1: string;
  line2: string;
  otherInfo: string;
  phone: string;
  phonePreffix: string;
  postalCode: string;
  region: Region;
  shippingAddress: boolean;
  title: string;
  titleCode: string;
  town: string;
  visibleInAddressBook: boolean;
}

export interface Language {
  active: boolean;
  isocode: string;
  name: string;
  nativeName: string;
}

export interface Principal {
  cityCode: string;
  country: Country;
  currency: Currency;
  customerId: string;
  deactivationDate: Date;
  defaultAddress: DefaultAddress;
  directCreditCodeAdditional: string;
  directCreditCodeCustomer: string;
  displayUid: string;
  documentTypeId: string;
  documentTypeNumber: string;
  emarsysClientId: string;
  firstName: string;
  genderCode: string;
  language: Language;
  lastName: string;
  name: string;
  provinceCode: string;
  title: string;
  titleCode: string;
  uid: string;
}

export interface Review {
  alias: string;
  comment: string;
  date: Date;
  headline: string;
  id: string;
  principal: Principal;
  rating: number;
}

export interface Element {}

export interface Category {
  hasImage: boolean;
  name: string;
  priority: number;
}

export interface VariantOption {
  code: string;
  priceData: Price;
  stock: Stock;
  url: string;
  variantOptionQualifiers: VariantOptionQualifier[];
}

export interface MediaVariant {
  altText: string;
  catalogId: string;
  catalogVersion: string;
  code: string;
  description: string;
  downloadUrl: string;
  mime: string;
  url: string;
}

export interface VariantValueCategory {
  code: string;
  colorHexCode: string;
  mediaVariant: MediaVariant;
  name: string;
  priority: number;
  sequence: number;
  superCategories: Category[];
}

export interface VariantMatrix {
  elements: Element[];
  isLeaf: boolean;
  parentVariantCategory: Category;
  variantOption: VariantOption;
  variantValueCategory: VariantValueCategory;
}

export interface Category {
  hasImage: boolean;
  name: string;
  priority: number;
}

export interface VariantOption {
  code: string;
  priceData: Price;
  stock: Stock;
  url: string;
  variantOptionQualifiers: VariantOptionQualifier[];
}

export interface Value {
  elements: Element[];
  isLeaf: boolean;
  parentVariantCategory: Category;
  variantOption: VariantOption;
  variantValueCategory: VariantValueCategory;
}

export interface VariantCategoryCode {
  code: string;
  hasImage: boolean;
  name: string;
  priority: number;
  selectorType: string;
}

export interface VariantSelector {
  values: Value[];
  variantCategoryCode: VariantCategoryCode;
}

export interface YoutubeMedia {
  altText: string;
  catalogId: string;
  catalogVersion: string;
  code: string;
  description: string;
  downloadUrl: string;
  mediaFormat: string;
  mime: string;
  url: string;
  videoID: string;
  youtubeLink: string;
}

export interface Product {
  availableForPickup: boolean;
  averageRating: number;
  baseOptions: BaseOption[];
  baseProduct: string;
  categories: Category[];
  classifications: Classification[];
  cloudflareVideo: CloudflareVideo;
  code: string;
  deliveryModes: DeliveryMode[];
  description: string;
  detailVideoMedia: DetailVideoMedia;
  ean: string;
  futureStocks: FutureStock[];
  images: Image[];
  installmentCreditoDirecto: string;
  installments: Installment[];
  isHomeAssemblyRequired: boolean;
  ivaCondition: string;
  manufacturer: string;
  multidimensional: boolean;
  name: string;
  numberOfReviews: number;
  potentialPromotions: PotentialPromotion[];
  previousPrice: Price;
  price: Price;
  priceRange: PriceRange;
  productReferences: ProductReference[];
  purchasable: boolean;
  reviews: Review[];
  sizeChartImage: Image;
  stock: Stock;
  summary: string;
  tagUrl: string;
  technicalCharacteristics: string;
  url: string;
  variantColorAltTextImages: string[];
  variantColorImages: string[];
  variantMatrix: VariantMatrix[];
  variantOptions: VariantOption[];
  variantSelectors: VariantSelector[];
  variantType: string;
  variantValueCategories: VariantValueCategory[];
  volumePrices: Price[];
  volumePricesFlag: boolean;
  youtubeMedia?: YoutubeMedia;
}

export interface Price {
  currencyIso: string;
  formattedValue: string;
  maxQuantity: number;
  minQuantity: number;
  priceType: string;
  value: number;
}

export interface Entry {
  basePrice: Price;
  basePriceWithTaxes: Price;
  basePriceWithoutTaxes: Price;
  deliveryMode: DeliveryMode;
  deliveryPointOfService: DeliveryPointOfService;
  deliveryTimeRange: string;
  entryNumber: number;
  giftPacking: boolean;
  pickup: boolean;
  product: Product;
  quantity: number;
  subtotal: Price;
  totalDiscount: Price;
  totalPrice: Price;
  totalPriceWithoutTaxes: Price;
  trackingUrl: string;
  updateable: boolean;
  volume: number;
  weight: number;
}

export interface Order {
  code: string;
  deliveryStatusDisplay: string;
  firstEntry: Entry;
  guid: string;
  paymentStatusDisplay: string;
  placed: Date;
  status: string;
  statusDisplay: string;
  total: Price;
  totalUnitCount: number;
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
  name: string;
  selected: boolean;
}

export interface AvailableTickets {
  orders: Order[];
  pagination: Pagination;
  sorts: Sort[];
}

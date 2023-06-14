import {
  CardLogo,
  CardTypeData,
  PaymentMethodModeType
} from '../../checkout/payment-methods';
import { Address } from '../../delivery-address';
import { DeliveryModes } from '../../product';
import { DeliveryPointOfService } from '../../support-tickets/types';
import {
  BaseEntry,
  BaseOption,
  BaseProduct,
  Category,
  Image,
  Price,
  RequestBodyBase,
  User
} from './general.type';

export interface AnonymousAddItemToCartBody {
  cartGuid: string;
  quantity: number;
  product: {
    code: string;
  };
}
export interface MergeAnonymousShoppingCartBody {
  username: string;
  anonymousCartGuid: string;
  toMergeCartGuid: string;
}

export interface ShoppingCartRequestBody extends RequestBodyBase {
  username: string;
  cartId?: string;
  entryNumber?: string;
  productCode?: string;
  quantity?: string;
  voucherId?: string;
}

export interface GetShoppingCartRequestBody {
  username: string;
  cartId?: string;
}

export interface CartsResponse {
  carts: Cart[];
}

export interface DeliveryMode {
  code: DeliveryModeCode | string;
  deliveryCost: Price;
}

export enum DeliveryModeCode {
  standard = 'standard',
  thirdparty = 'thirdParty'
}

export interface Cart {
  appliedOrderPromotions: AppliedProductPromotions[];
  appliedProductPromotions: AppliedProductPromotions[];
  appliedVouchers: AppliedVoucher[];
  calculated: boolean;
  code: string;
  deliveryAddress?: Address;
  deliveryMode?: DeliveryMode;
  deliveryItemsQuantity: number;
  deliveryOrderGroups: DeliveryOrderGroups[];
  entries: Entry[];
  guid: string;
  net: boolean;
  orderDiscounts: Price;
  pickupItemsQuantity: number;
  pickupOrderGroups: PickUpOrderGroup[];
  productDiscounts: Price;
  site: string;
  store: string;
  subTotal: Price;
  totalDiscounts: Price;
  sellWithTaxes: Price;
  sellWithoutTaxes?: Price;
  totalItems: number;
  totalPrice: Price;
  totalPriceWithTax: Price;
  totalTax: Price;
  totalVolume: number;
  totalWeight: number;
  user: User;
  potentialOrderPromotions: PotentialPromotion[];
  potentialProductPromotions: PotentialPromotion[];
  paymentInfo?: PaymentInfo;
  totalUnitCount: number;
  deliveryCost: Price;
  pickupRetireId?: string;
  pickupRetireName?: string;
}

export interface PickUpOrderGroup {
  entries: Entry[];
  quantity: number;
  totalPriceWithtax: Price;
  deliveryPointOfService: DeliveryPointOfService;
}

export interface PaymentInfo {
  billingAddress: Address;
  defaultCard: boolean;
  defaultPayment: boolean;
  paymentMode: PaymentMethodModeType;
  paymentModeDisplayLine1?: string;
  paymentModeDisplayLine2?: string;
  saved: boolean;

  /** Credit Cart */
  accountHolderName?: string;
  /** Credit Cart */
  cardNumber?: string;
  /** Credit Cart */
  expiryMonth?: string | number;
  /** Credit Cart */
  expiryYear?: string | number;
  /** Credit Cart */
  id?: string;
  /** Credit Cart */
  issueNumber?: string;
  /** Credit Cart */
  subscriptionId?: string;
  /** Credit Cart */
  transactionId?: string;
  /** Credit Cart */
  cardType?: CardTypeData;
  /** Credit Cart */
  cardLogo?: CardLogo;
}

export interface AppliedVoucher {
  code: string;
  freeShipping: boolean;
  voucherCode: string;
}

export interface AppliedProductPromotions {
  consumedEntries: ConsumedEntry[];
  description: string;
  promotion: Promotion;
}

export interface ConsumedEntry {
  code?: string;
  adjustedUnitPrice: number;
  orderEntryNumber: number;
  quantity: number;
}

export interface Promotion {
  code: string;
  promotionType: string;
}

export interface DeliveryOrderGroups {
  entries: Entry[];
  totalPriceWithTax: Price;
}

export interface CartData {
  code: string;
  products: Entry[];
  detailOrder: {
    productsTotalValue: string;
    discount: string;
    subTotal: string;
    iva12: string;
    totalOrder: string;
    sellWithTaxes: string;
    totalUnit: number;
    sellWithoutTaxes: string;
  };
  totalPriceWithTax: number;
  goToStorePickup: boolean;
  isGiftCardCart: boolean;
}

export interface Entry extends BaseEntry {
  product: Product;
  basePrice: Price;
  basePriceWithTaxes: Price;
  basePriceWithoutTaxes: Price;
  giftPacking: boolean;
  pickup: boolean;
  subtotal: Price;
  totalDiscount: Price;
  totalPriceWithoutTaxes: Price;
  updateable: boolean;
}

export interface Product extends BaseProduct {
  averageRating: number;
  baseOptions: BaseOption[];
  categories: Category[];
  images: Image[];
  price?: Price;
  previousPrice?: Price;
  tagUrl: string;
  deliveryModes?: DeliveryModes[];
  acceptGiftPacking: boolean;
  isGiftProduct: boolean;
  isPromotionSpecialPrice: boolean;
}

export interface ProductBanner {
  altText: string;
  format: string;
  galleryIndex: number;
  imageType: string;
  url: string;
}

export interface Restriction {
  description: string;
  restrictionType: string;
}

export interface Promotion {
  code: string;
  couldFireMessages: string[];
  description: string;
  enabled: boolean;
  endDate: Date;
  firedMessages: string[];
  priority: number;
  productBanner: ProductBanner;
  promotionGroup: string;
  promotionType: string;
  restrictions: Restriction[];
  startDate: Date;
  title: string;
}

export interface PotentialPromotion {
  consumedEntries: ConsumedEntry[];
  description: string;
  promotion: Promotion;
}

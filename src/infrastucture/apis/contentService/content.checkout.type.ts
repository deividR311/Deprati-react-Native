import { BasicContentResponse } from './content.type';

export interface CheckoutResponse extends BasicContentResponse {
  data: DataCheckout;
}

export interface DataCheckout {
  checkoutDeliveryAddress: CheckoutDeliveryAddress;
  checkoutPaymentMethod: Checkout;
  checkoutSummary: Checkout;
  checkoutOrderConfirmation: Checkout;
}

export interface CheckoutDeliveryAddress {
  home: Agency;
  agency: Agency;
}

export interface Agency {
  deliveryAddressIco: string;
  deliveryAddressTitle: string;
  deliveryAddressDescription: string;
  deliveryAddressImages?: DeliveryAddressImage[];
}

export interface DeliveryAddressImage {
  position: number;
  url: string;
}

export interface Checkout {
  directCredit: DirectCredit | null;
  giftcard: null;
}

export interface DirectCredit {
  imageUrl: string;
  legend: string;
}

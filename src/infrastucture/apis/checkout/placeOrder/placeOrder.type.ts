import { PaymentMethodType } from '../payment-methods';
import { CustomerOrderDetail } from '../../customer-orders/interfaces/customer-order-detail.type';
export interface placeOrderRequest {
  username: string;
  cartId: string;
}

export interface placeOrderAuthorizeRequest extends placeOrderRequest {
  tokenInput: string;
  attachDirectCreditOnCustomer: boolean;
  deviceId?: string;
}

export interface giftCardRequest extends placeOrderRequest {
  giftCardForm: {
    giftCode: string;
    giftPass: string;
  };
  selectedPaymentGroup: PaymentMethodType;
}

export interface giftCardAuthorizeRequest extends placeOrderRequest {
  tokenInput: string;
}

export interface placeOrderResponse extends CustomerOrderDetail {}

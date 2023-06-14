import { PaymentRequest } from '../cashPayment';

export interface PaymentAddressRequest extends PaymentRequest {
  addressId: string;
}

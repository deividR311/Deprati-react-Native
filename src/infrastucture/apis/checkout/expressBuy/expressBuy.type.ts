import { PaymentMethodType } from '../payment-methods';
import { CustomerOrderDetail } from '../../customer-orders/interfaces/customer-order-detail.type';
import {
  RequestBodyBase,
  ResponseBase
} from '../../common/request-response.type';
export interface expressBuyRequest {
  username: string;
  cartId: string;
}

export interface expressCheckoutRequest extends expressBuyRequest {
  directCreditForm: {
    directCreditClientCode: string;
    directCreditClientAdditionalCode: string;
    directCreditPaymentMode: number;
    directCreditBalanceData: string;
    directCreditSelectedDeferredOption: string;
  };
  selectedPaymentGroup: PaymentMethodType;
}

export interface balanceInquiryCheckOutResquest extends RequestBodyBase {
  numberAccount: string;
  aditional: string;
  document: string;
  ammountWithoutShipping: number;
  shipping: number;
  deviceId: string;
  origin: number;
}

export interface balanceInquiryCheckOutResponse extends ResponseBase {
  data: balanceInquiryCheckOutDto;
}

export interface balanceInquiryCheckOutDto {
  head: {
    numberAccount: number;
    taxId: number;
    transactionalEmail: string;
    phoneNumber: string;
    maskedPhoneNumber: string;
    lastUpdateTime: string;
    quota: number;
    available: number;
    aditionalR: string;
    status: string;
    paga1Mes: number;
    peri1Mes: number;
    paga2Mes: number;
    peri2Mes: number;
    aditional: string;
    employee: string;
    pdc: string;
    bpc: string;
    nAditional: string;
  };
  detail: balanceInquiryCheckOutDetailDto[];
}

export interface balanceInquiryCheckOutDetailDto {
  ordenNumber: number;
  quotaNumber: number;
  quotaDescription: string;
  factor: number;
  interestRateVale: number;
  totalValue: number;
  impCuota: number;
  gracePeriod: number;
  peri1Nes: number;
  paga1Mes: number;
  peri2Mes: number;
  paga2Mes: number;
  visible: string;
}

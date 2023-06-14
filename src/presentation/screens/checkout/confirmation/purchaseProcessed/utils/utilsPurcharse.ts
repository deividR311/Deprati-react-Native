import { PaymentMethodModeType } from '../../../../../../infrastucture/apis/checkout/payment-methods';
import { IHtml } from '../../../../../../infrastucture/apis/checkout/payments/cashPayment';

export const handleSourceHtml = (text: string): string => {
  return text.replaceAll(' ; ', ';');
};

export interface ComponentProps {
  typePurchase: AllTypesPurchase;
  isGiftCardCart?: boolean;
}
export interface ContentDefaultProps {
  typePurchase: AllTypesPurchase;
  orderConfirmation?: OrderConfirmation;
  isGiftCardCart?: boolean;
}

export interface ContentCashDepositProps {
  orderNumber: string;
}
export interface ContentPurchaseProps
  extends ComponentProps,
    ContentCashDepositProps {
  orderConfirmation?: OrderConfirmation;
}
export interface PurchaseProcessedProps {
  show: boolean;
  onCloseRequest(): void;
  children?: React.ReactNode;

  percentage?: number;
  orderNumber?: string;
  typePurchase: AllTypesPurchase;
  code?: string;
}
export type AllTypesPurchase =
  | PaymentMethodModeType.AgaintsDelivery
  | PaymentMethodModeType.CashDeposit
  | PaymentMethodModeType.DePratiGiftCard
  | PaymentMethodModeType.DePratiCredit
  | PaymentMethodModeType.Paymentez
  | AuxMethodModeType.Custom;

export enum AuxMethodModeType {
  Custom = 'custom'
  // Custom = 'CustomPaymentMode',
}
export interface OrderConfirmation {
  uid: string;
  typeCode: string;
  modifiedTime: Date;
  name: string;
  container: boolean;
  orderConfirmationText: string;
  orderConfirmationTextGC: string;
  title2: string;
  linkText: string;
  text: string;
  title: string;
  childrenComponentsList: null;
  childrenComponents: null;
}

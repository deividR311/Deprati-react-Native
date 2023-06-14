import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootNavigationProps } from '..';
import { NAV } from '../../../application/common';

export const ContactlessPaymentNavigatorID = 'ContactlessPaymentNavigator';

export enum ContactLessPaymentSteps {
  QRShare = 'CONTACTLESS_PAYMENT@QR_SHARE',
  CreditVinculation = 'CONTACTLESS_PAYMENT@CREDIT_VINCUALATION',
  PurchaseConfirmation = 'CONTACTLESS_PAYMENT@PURCHASE_CONFIRMATION',
  /** @deprecated */
  Paymentez = 'CONTACTLESS_PAYMENT@PAYMENTEZ',
  /** @deprecated */
  PaymentMethod = 'CONTACTLESS_PAYMENT@PAYMENT_METHOD'
}

export interface ContactlessPaymentNavigationProps
  extends NativeStackScreenProps<
    RootNavigationProps,
    NAV.CONTACTLESS_PAYMENT
  > {}

export type ContactLessPaymentNavigationParams = {
  [ContactLessPaymentSteps.CreditVinculation]: undefined;
  [ContactLessPaymentSteps.QRShare]: undefined;
  [ContactLessPaymentSteps.PurchaseConfirmation]: undefined;
};

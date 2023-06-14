import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootNavigationProps } from '..';
import { NAV } from '../../../application/common';
import {
  Card,
  PaymentMethod,
  PaymentMode
} from '../../../infrastucture/apis/checkout/payment-methods';
import { CartData } from '../../../infrastucture/apis/shopping-cart';
import { IAddressPayment } from '../../common-components/billingAddress/components';

export interface CheckoutNavigationProps
  extends NativeStackScreenProps<RootNavigationProps, NAV.CHECKOUT> {}

export enum CheckoutSteps {
  ChoosePaymentMethod = 'CHECKOUT@CHOOSE_PAYMENT_METHOD',
  PurchaseConfirmation = 'CHECKOUT@PURCHASE_CONFIRMATION',
  PaymentAgaintsDelivery = 'CHECKOUT@PAYMENT_AGAINTS_DELIVERY',
  PaymentCashDeposit = 'CHECKOUT@PAYMENT_CASH_DEPOSIT',
  PaymentDePratiGiftCard = 'CHECKOUT@PAYMENT_DE_PRATI_GIFT_CARD',
  PaymentCreditOrDebitCard = 'CHECKOUT@PAYMENT_CREDIT_OR_DEBIT_CARD',
  PaymentDePratiCredit = 'CHECKOUT@PAYMENT_DE_PRATI_CREDIT',
  DELIVERY = 'Delivery'
}

export interface CheckoutStepsParams {
  dataCart: CartData;
  showThirdParty: boolean;
  enableContinueButton: (state: boolean) => void;
  setTitleContinueButton: (title: string) => void;
  showActivityIndicatorContinueButton: (state: boolean) => void;
  showTotalsBand: (state: boolean) => void;
  setCurrentStep: (args: { index: number; screenId: CheckoutSteps }) => void;
  [key: string]: any;
}

export type CheckoutNavigationParams = {
  [CheckoutSteps.DELIVERY]: CheckoutStepsParams;
  [CheckoutSteps.ChoosePaymentMethod]: CheckoutStepsParams;
  [CheckoutSteps.PurchaseConfirmation]: PurchaseConfirmationParams;
  [CheckoutSteps.PaymentAgaintsDelivery]: PaymentMethodParams;
  [CheckoutSteps.PaymentCashDeposit]: PaymentMethodParams;
  [CheckoutSteps.PaymentDePratiGiftCard]: PaymentMethodParams;
  [CheckoutSteps.PaymentCreditOrDebitCard]: PaymentMethodParams;
  [CheckoutSteps.PaymentDePratiCredit]: PaymentMethodParams;
};

export type PaymentMethodParams = CheckoutStepsParams & {
  paymentMethod: PaymentMethod;
};

export enum PaymentCreditOrDebitCardSteps {
  BankCardList = 'CHECKOUT@PAYMENT_CREDIT_OR_DEBIT_CARD@BANK_CARD_LIST',
  FormAddBankCard = 'CHECKOUT@PAYMENT_CREDIT_OR_DEBIT_CARD@FORM_ADD_BANK_CARD'
}

export type FormAddBankCardParams = CheckoutStepsParams & {
  paymentModes?: PaymentMode[];
};

export type PaymentCreditOrDebitCardParams = {
  [PaymentCreditOrDebitCardSteps.BankCardList]: PaymentMethodParams;
  [PaymentCreditOrDebitCardSteps.FormAddBankCard]: FormAddBankCardParams;
};

export type PurchaseConfirmationParams = CheckoutStepsParams & {
  addressSelected?: IAddressPayment;
  paymentMethod?: {
    cvv?: string;
    cardSelected?: Card;
    paymentType?: {
      PK: number | string;
      installments: number;
      installmentsType: number;
      option: string;
    };
  };
  giftCard?: {
    codeCard: string;
    passwordCard: string;
  };
};

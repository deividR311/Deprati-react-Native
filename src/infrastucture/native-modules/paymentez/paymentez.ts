import { NativeModules } from 'react-native';
import Config from '../../../application/common/dotEnv';
import { CardBrands } from '../../apis/checkout/payment-methods/paymentez.type';
const { CustomPaymentezModule: Paymentez } = NativeModules;

interface Paymentez {
  initializeSDK(
    isTestMode: boolean,
    clientAppCode: string,
    clientAppKey: string
  ): void;
  addCard(
    user: PaymentezUser,
    card: PaymentezCard
  ): Promise<PaymentezAddCardSuccess>;
}

interface PaymentezUser {
  uid: string;
  email: string;
}

export interface PaymentezCard {
  cardHolder: string;
  cardNumber: string;
  expMonth: number;
  expYear: number;
  cvc: string;
}

export interface PaymentezAddCardSuccess {
  status?: PaymentezAddCardStatus;
  token: string;
  transaction_reference: string;
  bin: string;
  type: CardBrands;
}

export interface PaymentezAddCardError {
  code: PaymentezAddCardErrorsTypes;
  nativeStackAndroid: any[];
  message: string;
  userInfo: {
    error_type: string;
    help: string;
    description: any;
  };
}

export enum PaymentezAddCardErrorsTypes {
  MissingArguments = 'missing_arguments',
  UndefinedCard = 'undefined_card',
  PaymentezError = 'paymentez_error'
}

export enum PaymentezAddCardStatus {
  Valid = 'valid',
  Review = 'review',
  Pending = 'pending'
}

export default Paymentez as Paymentez;

export const IS_PAYMENTEZ_TEST_MODE =
  ['DEV', 'STG'].includes(Config.ENV) || __DEV__;

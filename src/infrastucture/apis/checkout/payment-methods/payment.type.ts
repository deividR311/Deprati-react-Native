export interface BasicRequest {
  user: string;
  token?: string;
}

/** PAYMENT METHODS */

export interface PaymentRequest extends BasicRequest {
  cartId: string;
}

export interface PaymentMethodsResponse {
  paymentMethods: PaymentMethod[];
}

export interface PaymentMethod {
  code: PaymentMethodType;
  enabled: boolean;
  name: string;
  paymentModes: PaymentMode[];
}

export interface PaymentMode {
  code: PaymentMethodModeType;
  enabled: boolean;
  name: string;
  media: Media;
  mediaSecundary: Media;
  tooltipHelp: string;
}

export interface Media {
  url: string;
}

/* 
 paymentGifCard interfaces
 */

export interface PaymentRequestGifCard
  extends BasicRequest,
    PaymentBodyGIFCard {
  cartId: string;
}

export interface PaymentBodyGIFCard {
  giftCardForm: GiftCardForm;
  selectedPaymentGroup: string;
}

export interface GiftCardForm {
  giftCode: string;
  giftPass: string;
}

export enum PaymentMethodType {
  DePratiCredit = 'directCreditPaymentGroup',
  DePratiGiftCard = 'giftCardPaymentGroup',
  CreditCard = 'creditCardPaymentGroup',
  CashDeposit = 'netBankingPaymentGroup',
  AgaintsDelivery = 'cashInDeliveryPaymentGroup'
}

export enum PaymentMethodModeType {
  DePratiCredit = 'directCreditPaymentMode',
  DePratiGiftCard = 'giftCardPaymentMode',
  CashDeposit = 'netBankingPaymentMode',
  AgaintsDelivery = 'cashInDeliveryPaymentMode',
  Paymentez = 'paymentezPaymentMode',
  BankCard = 'alignetBankardPaymentMode', // not implemented
  PlaceToPay = 'placeToPayPaymentMode' // not implemented
}

export interface BankCardsResponse {
  cards: Card[];
}

export interface Card {
  accountHolderName: string;
  cardNumber: string;
  cardType: string;
  cardTypeData: CardTypeData;
  defaultPaymentInfo: boolean;
  id: string;
  saved: boolean;
  cardBin: string;
  cardLogo: CardLogo;
  defaultCard: boolean;
  origin: string;
  expiryMonth: string;
  expiryYear: string;
  issueNumber: string;
  subscriptionId: string;
  transactionId: string;
  paymentOptions: CardPaymentOptions[];
}

export interface CardPaymentOptions {
  PK: string;
  installments: number;
  installmentsType: number;
  option: string;
}

export interface CardLogo {
  url: string;
}
export interface CardTypeData {
  code: string;
  name?: string;
}

/** ADD BANK CARD */

export enum AddBankCardStatusResponse {
  Success = 'success'
}

export interface AddBankCardResponse {
  code: string;
  status: AddBankCardStatusResponse;
}

export interface AddBankCardRequest {
  name: string;
  cardNumber: number;
  expMonth: string;
  expYear: string;
  bin: string;
  type: string;
  pending: boolean;
  token: string;
  transactionId: string;
  token_header: string;
}

/** CHOOSE PAYMENT METHODS */
export interface ChoosePaymentezPaymentMethodBasicRequestBody
  extends BasicRequest {
  cartId: string;
  selectedPaymentGroup: PaymentMethodType;
}

/** CHOOSE PAYMENTEZ PAYMENT METHOD */

export interface ChoosePaymentezPaymentMethodRequestBody
  extends ChoosePaymentezPaymentMethodBasicRequestBody {
  creditCardForm: {
    cardId: string;
    selectedPaymentMode: PaymentMethodModeType.Paymentez;
  };
}

/** Paymentez Verify OTPCode */
export interface VerifyOTPCodeRequestBody {
  token: string;
  otpCode: string;
  orderCode: string;
}

export type VerifyOTPCodeResponse = any;

export interface PaymentezByDinerOrderRequestBody {
  cvc: string;
  installmentsNumber: number;
  installmentsType: number;
  paymentOptionPk: number | string;
  username: string;
  cartId: string;
  token: string;
}
export type PaymentezByDinerOrderResponse = any;

export interface PaymentezOrderRequestBody {
  cartId: string;
  cvc: string;
  username: string;
  token: string;
}
export type PaymentezOrderResponse = any;

export interface directCreditRequest extends PaymentRequest {
  accountNumber: string;
  additionalNumber: string;
}

export interface directCreditResponse {
  balanceData: {
    accountNumber: string;
    additional: boolean;
    available: number;
    bpc: boolean;
    employee: boolean;
    identificationNumber: string;
    pdc: boolean;
    phoneNumber: string;
    quota: number;
    state: string;
    transactionalEmail: string;
    updateDate: string;
  };
  currentFirstPaymentDesc?: string;
  currentSecondPaymentDesc?: string;
  currentValueDesc?: string;
  obfuscatedAccountNumber?: string;
  obfuscatedMail?: string;
  obfuscatedPhone?: string;
  rotativeDeferred?: deferredDataDto;
  deferredList?: deferredDataDto[];
  code: string;
  errorMsg: string;
  ok: boolean;
}

export interface deferredDataDto {
  deferredData: {
    deferredDescription: string;
    factor: number;
    feeValue: number;
    interestValue: number;
    monthsOfGrace: number;
    orderCode: string;
    payFirstMonth: number;
    paySecondMonth: number;
    periodFirstMonth: string;
    periodSecondMonth: string;
    totalValue: number;
    visible: boolean;
  };
  feeFirstPaymentDesc: string;
  feeSecondPaymentDesc: string;
  feeValueDesc: string;
}

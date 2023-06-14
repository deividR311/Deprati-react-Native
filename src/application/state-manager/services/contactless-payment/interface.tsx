import { ContactLessPaymentSteps } from '../../../../presentation/navigation/contactless-payment';

export enum BottomSheetType {
  IDENTITY_VALIDATION = 'IDENTITY_VALIDATION',
  SUCCESS_BUY = 'SUCCESS_BUY'
}

export interface ShowBottomSheetAction {
  bottomSheet: BottomSheetType;
  show: boolean;
  text?: string;
  ticketId?: string;
}

export interface ContactlessPaymentStateHook {
  TicketNumberContactLessPayment?: string;
  showIdentityValidation(show: boolean): void;
  identityValidationIsOpen: boolean;
  showSuccessBuy(show: boolean, text?: string, ticketId?: string): void;
  successBuyIsOpen: boolean;
  successBuyText?: string;
  successBuyTicketId?: string;
  doEnableConfirmPurchaseButton(isEnable: boolean, ticketId?: string): void;
  enableConfirmPurchaseButton: boolean;
}

export interface ContactlessPaymentState {
  tabbar: {
    disableNextButton: boolean;
    disablePreviousButton: boolean;
    currentTab: ContactLessPaymentSteps | '';
  };
  bottomSheetState: {
    identityValidationIsOpen: boolean;
    successBuyIsOpen: boolean;
    successBuyText: string;
    successBuyTicketId: string;
  };
  enableConfirmPurchaseButton: boolean;
}

export const INITIAL_STATE: ContactlessPaymentState = {
  tabbar: {
    currentTab: '',
    disableNextButton: false,
    disablePreviousButton: false
  },
  bottomSheetState: {
    identityValidationIsOpen: false,
    successBuyIsOpen: false,
    successBuyText: '',
    successBuyTicketId: ''
  },
  enableConfirmPurchaseButton: false
};

import { DeliveryOptionsResponse } from '../../../../infrastucture/apis/delivery-address';
import { Cart } from '../../../../infrastucture/apis/shopping-cart';
import { CheckoutSteps } from '../../../../presentation/navigation/checkout/interfaces';

export interface CheckoutStateHook {
  onContinueButtonTrigger?: CheckoutSteps;
  onPressContinueButton: (screenId: CheckoutSteps) => void;
}

export interface CheckoutState {
  screenId?: CheckoutSteps;
  previousScreen?: CheckoutSteps;
  stackSummary?: any[];
  showLoadingScreen?: boolean;
  onClickedContinueButton: boolean;
  cart: Partial<Cart>;
  totalPriceBeforeSelectDeliveryMode?: string;
  needRefreshCart?: boolean;
  deliveryOptions?: DeliveryOptionsResponse;
  isGiftCardCart: boolean;
  creditInfo?: {
    saveForFuturePay: boolean;
    maskedPhoneNumber: string;
    maskedNumberAccount: string;
    maskedEmail: string;
    directCreditCodeCustomer?: string;
    directCreditCodeAdditional?: string;
  };
  firstTimeSummary?: boolean;
}

export const INITIAL_STATE: CheckoutState = {
  screenId: undefined,
  previousScreen: undefined,
  stackSummary: undefined,
  onClickedContinueButton: false,
  showLoadingScreen: false,
  needRefreshCart: false,
  cart: {},
  deliveryOptions: undefined,
  totalPriceBeforeSelectDeliveryMode: undefined,
  isGiftCardCart: false,
  creditInfo: undefined,
  firstTimeSummary: undefined
};

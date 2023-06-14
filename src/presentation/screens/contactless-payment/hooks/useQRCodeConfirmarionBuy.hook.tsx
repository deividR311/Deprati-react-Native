import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { useContactlessPaymentState } from '../../../../application/state-manager/services/contactless-payment/useContactlessPayment.hook';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { ContactLessPaymentSteps } from '../../../navigation/contactless-payment';

export const useQRConfirmation = (): QRCodeConfirmationHook => {
  const navigate = useNavigation();

  const {
    localStorageData: {
      [LocalStorageKey.AccountNumber]: ACCOUNT_NUMBER,
      [LocalStorageKey.AccountAdditionalNumber]: ACCOUNT_ADDITIONAL_NUMBER
    }
  } = useLocalStorage();

  const { enableConfirmPurchaseButton, showQRShare } =
    useContactlessPaymentState();

  const onBuy = async () => {
    showQRShare(false);
    navigate.navigate(ContactLessPaymentSteps.PurchaseConfirmation as never);
  };

  const onCancelBuy = async () => {
    showQRShare(false);
  };

  return {
    onBuy,
    onCancelBuy,
    isDisableContinueButton: !enableConfirmPurchaseButton,
    QRData: ACCOUNT_NUMBER + ACCOUNT_ADDITIONAL_NUMBER
  };
};

export interface QRCodeConfirmationHook {
  isDisableContinueButton: boolean;
  onBuy(): Promise<void>;
  onCancelBuy(): Promise<void>;
  QRData?: string;
}

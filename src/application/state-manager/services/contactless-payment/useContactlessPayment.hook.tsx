import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../..';
import { LocalStorageKey } from '../localstorage';
import { useLocalStorage } from '../localstorage/useLocalStorage';

import {
  showBottomSheet,
  identityValidationStateSelector,
  successBuyStateSelector,
  successBuyTextStateSelector,
  successBuyTicketIdStateSelector
} from './contactless-payment.slice';

import { BottomSheetType, ContactlessPaymentStateHook } from './interface';

export const useContactlessPaymentState = (): ContactlessPaymentStateHook => {
  const dispatch = useAppDispatch();
  const identityValidationIsOpen = useAppSelector(
    identityValidationStateSelector
  );
  const successBuyIsOpen = useAppSelector(successBuyStateSelector);
  const successBuyText = useAppSelector(successBuyTextStateSelector);
  const successBuyTicketId = useAppSelector(successBuyTicketIdStateSelector);

  const {
    save: saveInLocalStorage,
    localStorageData: {
      [LocalStorageKey.IsEnableConfirmPurchaseButtonInQRScreen]:
        IsEnableConfirmPurchaseButton,
      [LocalStorageKey.TicketNumberContactLessPayment]:
        TicketNumberContactLessPayment
    }
  } = useLocalStorage();

  const showIdentityValidation = React.useCallback((show: boolean) => {
    dispatch(
      showBottomSheet({
        bottomSheet: BottomSheetType.IDENTITY_VALIDATION,
        show: show
      })
    );
  }, []);

  const showSuccessBuy = React.useCallback(
    (show: boolean, text?: string, ticketId?: string) => {
      dispatch(
        showBottomSheet({
          bottomSheet: BottomSheetType.SUCCESS_BUY,
          show: show,
          text: text,
          ticketId: ticketId
        })
      );
    },
    []
  );

  const setEnableConfirmPurchaseButton = React.useCallback(
    (enable: boolean, ticketId?: string) => {
      saveInLocalStorage({
        [LocalStorageKey.IsEnableConfirmPurchaseButtonInQRScreen]: enable,
        [LocalStorageKey.TicketNumberContactLessPayment]: ticketId ?? ''
      });
    },
    []
  );

  return {
    TicketNumberContactLessPayment,
    doEnableConfirmPurchaseButton: setEnableConfirmPurchaseButton,
    enableConfirmPurchaseButton: IsEnableConfirmPurchaseButton,
    showIdentityValidation,
    identityValidationIsOpen,
    showSuccessBuy,
    successBuyIsOpen,
    successBuyText,
    successBuyTicketId
  };
};

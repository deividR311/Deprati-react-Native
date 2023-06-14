import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useCheckoutState } from '../../../../../../application/state-manager/services/checkout/useCheckout.hook';
import {
  IHtml,
  useCashPaymentRequest
} from '../../../../../../infrastucture/apis/checkout/payments/cashPayment';
import { CartData } from '../../../../../../infrastucture/apis/shopping-cart';
import { CheckoutSteps } from '../../../../../navigation/checkout';

export default function usePaymentCashDeposit(): PaymentCashDepositHook {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    name: currentScreen,
    params: {
      dataCart,
      enableContinueButton,
      showActivityIndicatorContinueButton,
      setCurrentStep
    }
  } = route;
  const { onContinueButtonTrigger } = useCheckoutState();

  const {
    getCashPayment,
    dataCashPayment,
    isLoading,
    isSucces,
    //setCashPayment
    setCashPayment,
    isLoadingPayment,
    errorPayment,
    isSuccessPayment,
    BANK_PAYMENT
  } = useCashPaymentRequest();

  useEffect(() => {
    showActivityIndicatorContinueButton(isLoadingPayment);
  }, [isLoadingPayment]);

  useEffect(() => {
    if (isSuccessPayment) {
      navigation.navigate(CheckoutSteps.PurchaseConfirmation, {
        ...route.params
      });
    }
  }, [isSuccessPayment]);

  useEffect(() => {
    if (!onContinueButtonTrigger || onContinueButtonTrigger !== currentScreen)
      return;

    setCashPayment(dataCart.code, BANK_PAYMENT);
    return () => enableContinueButton(true);
  }, [onContinueButtonTrigger]);

  return {
    dataCart,
    getCashPayment,
    dataCashPayment,
    isLoading,
    //
    isLoadingPayment,
    //
    // handleContinueshopping,
    // disabledContinue,
    enableContinueButton,
    setCurrentStep
  };
}

interface PaymentCashDepositHook {
  dataCart: CartData;
  getCashPayment(): void;
  dataCashPayment: IHtml;
  isLoading: boolean;
  // isSucces: boolean
  // error: any
  //SELECT POS
  isLoadingPayment: boolean;
  // errorPayment: any
  // isSuccessPayment: boolean
  enableContinueButton(x: boolean): void;
  setCurrentStep(x: { index: number; screenId: CheckoutSteps }): void;
}

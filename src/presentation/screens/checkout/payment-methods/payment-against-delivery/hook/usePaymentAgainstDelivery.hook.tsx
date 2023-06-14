import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useCheckoutState } from '../../../../../../application/state-manager/services/checkout/useCheckout.hook';
import { useCashPaymentRequest } from '../../../../../../infrastucture/apis/checkout/payments/cashPayment';
import { CartData } from '../../../../../../infrastucture/apis/shopping-cart';
import { CheckoutSteps } from '../../../../../navigation/checkout';

export default function usePaymentAgainstDelivery(): PaymentAgainstDeliveryHook {
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
    //setCashPayment
    setCashPayment,
    isLoadingPayment,
    errorPayment,
    isSuccessPayment,
    CASH_IN_DELIVERY
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
    // console.log('1->>> PaymentAgainstDeliveryS::OnContinueButtonWasPressed', {
    //   onContinueButtonTrigger,
    //   currentScreen,
    //   isToCurrentScreen: currentScreen === onContinueButtonTrigger,
    // })
    if (!onContinueButtonTrigger || onContinueButtonTrigger !== currentScreen)
      return;

    console.log('2->>> PaymentAgainstDelivery::OnContinueButtonWasPressed');
    setCashPayment(dataCart.code, CASH_IN_DELIVERY);
  }, [onContinueButtonTrigger]);

  return {
    dataCart,
    //
    isLoadingPayment,
    //
    // handleContinueshopping,
    // disabledContinue,
    enableContinueButton,
    setCurrentStep
  };
}

interface PaymentAgainstDeliveryHook {
  dataCart: CartData;
  //SELECT POS
  isLoadingPayment: boolean;
  // errorPayment: any
  // isSuccessPayment: boolean
  enableContinueButton(x: boolean): void;
  setCurrentStep: (args: { index: number; screenId: CheckoutSteps }) => void;
}

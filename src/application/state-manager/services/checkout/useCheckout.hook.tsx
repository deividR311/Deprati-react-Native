import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../..';
import { CheckoutSteps } from '../../../../presentation/navigation/checkout';
import {
  checkoutChangeContinueButtonState,
  onContinueBottonToScreenStateSelector
} from './checkout.slice';
import { CheckoutStateHook } from './interface';

export const useCheckoutState = (): CheckoutStateHook => {
  const dispatch = useAppDispatch();
  const onContinueButtonTrigger = useAppSelector(
    onContinueBottonToScreenStateSelector
  );

  const onPressContinueButton = React.useCallback((screenId: CheckoutSteps) => {
    dispatch(checkoutChangeContinueButtonState(screenId));
  }, []);

  return {
    onContinueButtonTrigger,
    onPressContinueButton
  };
};

import React, { useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { CheckoutSteps } from '../../../navigation/checkout';
import { useAppSelector } from '../../../../application/state-manager';
import {
  onContinuePreviousScreenStateSelector,
  setPreviousScreen,
  setStackSummary,
  stackSummaryStateSelector
} from '../../../../application/state-manager/services/checkout';
import { useDispatch } from 'react-redux';
import BackButton from '../../../common-components/backButton';

export const useNavigationSummary = (enableButton?: boolean) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const previousScreen = useAppSelector(onContinuePreviousScreenStateSelector);
  const stackSummary = useAppSelector(stackSummaryStateSelector);

  const focused = useIsFocused();

  useEffect(() => {
    if (focused && previousScreen === CheckoutSteps.PurchaseConfirmation) {
      navigation?.setOptions({
        headerLeft: () => <BackButton onPress={goBackSummary} />
      });
    }
    return () => {
      navigation?.setOptions({
        headerLeft: () => <BackButton />
      });
    };
  }, [navigation, focused, enableButton]);

  const goBackSummary = () => {
    if (
      previousScreen === CheckoutSteps.PurchaseConfirmation &&
      !!enableButton
    ) {
      goToSummary();
    }
  };

  const goToSummary = () => {
    navigation.reset({
      index: stackSummary?.length,
      routes: [...stackSummary]
    });
    dispatch(setPreviousScreen(undefined));
    dispatch(setStackSummary(undefined));
  };

  const validNavigateSummary = (route: any) => {
    if (previousScreen === CheckoutSteps.PurchaseConfirmation) {
      goToSummary();
    } else {
      navigation.navigate(
        CheckoutSteps.ChoosePaymentMethod as never,
        {
          ...route.params,
          navigateCheckout: null
        } as never
      );
    }
    dispatch(setPreviousScreen(undefined));
    dispatch(setStackSummary(undefined));
  };

  return validNavigateSummary;
};

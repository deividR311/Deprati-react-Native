import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
  NativeStackScreenProps
} from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { COLORS } from '../../../../../application/common';
import BackButton from '../../../../common-components/backButton';
import { HeaderNavigation } from '../../../../common-components/header/headerNav';
import {
  CheckoutNavigationParams,
  CheckoutSteps,
  PaymentCreditOrDebitCardParams,
  PaymentCreditOrDebitCardSteps
} from '../../../../navigation/checkout';
import { BankCardList } from './bank-card-list';
import { FormAddBankCard } from './form-add-bank-card';

const Stack = createNativeStackNavigator<PaymentCreditOrDebitCardParams>();

export const PaymentCreditOrDebitCard: React.FC<
  PaymentCreditOrDebitCardProps
> = props => {
  useEffect(() => {
    props.navigation?.setOptions({
      headerShown: false
    });
    props.route.params.setCurrentStep({
      index: 1,
      screenId: CheckoutSteps.PaymentCreditOrDebitCard
    });
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerLargeTitle: false,
        headerTitleAlign: 'left',
        headerShown: false,
        headerBackVisible: false
      }}
      initialRouteName={PaymentCreditOrDebitCardSteps.BankCardList}>
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerTitle: '2. Método de pago',
          headerStyle: { backgroundColor: COLORS.GRAYBRAND },
          contentStyle: { backgroundColor: COLORS.WHITE },
          header: (_props: NativeStackHeaderProps) => (
            <HeaderNavigation {..._props} />
          ),
          headerLeft: _props =>
            Platform.select({
              android: null,
              ios: <BackButton {..._props} />
            })
        }}>
        <Stack.Screen
          name={PaymentCreditOrDebitCardSteps.BankCardList}
          initialParams={{ ...props.route.params }}
          component={BankCardList}
        />
        <Stack.Screen
          name={PaymentCreditOrDebitCardSteps.FormAddBankCard}
          initialParams={{ ...props.route.params }}
          component={FormAddBankCard}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export interface PaymentCreditOrDebitCardProps
  extends NativeStackScreenProps<
    CheckoutNavigationParams,
    CheckoutSteps.PaymentCreditOrDebitCard
  > {}

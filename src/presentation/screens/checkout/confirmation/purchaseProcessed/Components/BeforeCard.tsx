import React from 'react';
import { Text } from 'react-native';
import { styles } from '../purchaseProcessedbottomsheet.stylesheet';
import { ComponentProps } from '../utils/utilsPurcharse';
import { PaymentMethodModeType } from '../../../../../../infrastucture/apis/checkout/payment-methods';

const TEXT_BEFORE = 'Tu pago está pendiente de confirmación';

export function BeforeCard({ typePurchase }: ComponentProps) {
  if (typePurchase === PaymentMethodModeType.Paymentez)
    return <Text style={[styles.subtitle]}>{TEXT_BEFORE}</Text>;
  return null;
}

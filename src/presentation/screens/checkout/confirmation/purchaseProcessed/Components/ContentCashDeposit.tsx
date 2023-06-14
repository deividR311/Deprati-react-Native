import React from 'react';
import { View, Text } from 'react-native';
import { FontStyles } from '../../../../../../application/common';
import { LocalStorageKey } from '../../../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { useOrderDetails } from '../../../../account/order-details/useOrderDetails.hook';
import { styles } from '../purchaseProcessedbottomsheet.stylesheet';
import { ContentCashDepositProps } from '../utils/utilsPurcharse';
import { SkeletonPaymentNumber, SkeletonPayUpTo } from './SkeletonCashDeposit';

export function ContentCashDeposit({
  orderNumber: orderId
}: ContentCashDepositProps) {
  const {
    localStorageData: { [LocalStorageKey.UserEmail]: EMAIL }
  } = useLocalStorage();
  const { orderDetails, isLoading } = useOrderDetails(orderId, EMAIL);

  return (
    <View>
      <Text style={[FontStyles.Body_1, FontStyles.Center]}>
        El número de pago es:
      </Text>
      {isLoading ? (
        <SkeletonPaymentNumber />
      ) : (
        <Text
          style={[
            FontStyles.H3_Headline,
            FontStyles.Center,
            FontStyles.PrimaryColor,
            { marginVertical: 10 }
          ]}>
          {orderDetails?.paymentInfo?.numeroProforma}
        </Text>
      )}

      {isLoading ? (
        <SkeletonPayUpTo />
      ) : (
        <View style={styles.payUpTo}>
          <Text
            style={[
              FontStyles.H3_Headline,
              FontStyles.Center,
              FontStyles.MutedDarkColor
            ]}>
            Pague hasta: {orderDetails?.paymentInfo?.fechaPagoMaximo}
          </Text>
        </View>
      )}
    </View>
  );
}

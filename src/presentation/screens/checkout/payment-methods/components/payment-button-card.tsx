import React, { FC } from 'react';
import { Image, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../../../../application/common';
import { PaymentMethodType } from '../../../../../infrastucture/apis/checkout/payment-methods';
import { testProps } from '../../../../../application/utils/accessibleId';

export const PaymentButtonCard: FC<PaymentButtonCardProps> = ({
  disable = false,
  onPress,
  type
}) => (
  <View accessible>
    <View>
      <View
        style={[Styles.card, Styles.cardImage, disable && { opacity: 0.6 }]}>
        <Image
          source={
            type === PaymentMethodType.DePratiCredit
              ? require('../../../../../../assets/images/deprati_payment_method_banner.jpg')
              : require('../../../../../../assets/images/paymentez_payment_method_banner.jpg')
          }
          style={[Styles.cardImage, { margin: -22, borderRadius: 4 }]}
        />
      </View>
      <TouchableRipple
        accessible
        {...testProps(type)}
        rippleColor="rgba(0, 0, 0, .1)"
        style={[
          Styles.cardImage,
          {
            position: 'absolute',
            margin: 4,
            zIndex: 1
          }
        ]}
        disabled={disable}
        onPress={() => onPress?.()}>
        <></>
      </TouchableRipple>
    </View>
  </View>
);

export type PaymentButtonCardType =
  | PaymentMethodType.DePratiCredit
  | PaymentMethodType.CreditCard;

interface PaymentButtonCardProps {
  disable?: boolean;
  onPress?: () => void;
  type?: PaymentButtonCardType;
}

const WITH = Dimensions.get('window').width;
export const Styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    margin: 4,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.GRAYDARK20,
    borderRadius: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2
  },
  cardImage: {
    width: WITH - 40,
    height: WITH / 2 - 24
  }
});

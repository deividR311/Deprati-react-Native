import React, { FC, useCallback } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { RightArrowIcon } from '../../../../../../assets/icons/RightArrowIcon';
import { COLORS, FontStyles } from '../../../../../application/common';
import { testProps } from '../../../../../application/utils/accessibleId';
import { PaymentMethodType } from '../../../../../infrastucture/apis/checkout/payment-methods';
import { BankCardPaymentIcon } from '../../../../../../assets/icons/bankCardPaymentIcon';
import { GiftCardPaymentIcon } from '../../../../../../assets/icons/GiftCardPaymentIcon';
import { CashInDeliveryPaymentIcon } from '../../../../../../assets/icons/cashInDeliveryPaymentIcon';
import { NetBankingPaymentIcon } from '../../../../../../assets/icons/netBankingPaymentIcon';
import { fontFamilyOS } from '../../../../../application/utils';

export const PaymentMethodLongCardButton: FC<PaymentMethodCardButtonProps> = ({
  disabled = false,
  onPress,
  type,
  name
}) => {
  const getIcon = useCallback(
    (paymentMethod: PaymentMethodType, text: string) => {
      switch (paymentMethod) {
        case PaymentMethodType.CreditCard:
          return {
            text: text,
            subtitle: 'Paymentez - Paga de forma segura',
            icon: <BankCardPaymentIcon />
          };
        case PaymentMethodType.DePratiCredit:
          return {
            text: text,
            subtitle: 'Difiere tu compra hasta 36 meses ',
            icon: (
              <Image
                style={styles.cardDePrati}
                source={require('../../../../../../assets/icons/DePratiCreditIcon.png')}
              />
            )
          };
        case PaymentMethodType.DePratiGiftCard:
          return {
            text: text,
            icon: <GiftCardPaymentIcon />
          };
        case PaymentMethodType.AgaintsDelivery:
          return {
            text: text,
            icon: <CashInDeliveryPaymentIcon />
          };
        case PaymentMethodType.CashDeposit:
          return {
            text: text,
            icon: <NetBankingPaymentIcon />
          };
      }
    },
    []
  );

  return (
    <TouchableRipple
      accessible
      {...testProps(type)}
      rippleColor="rgba(0, 0, 0, .1)"
      disabled={disabled}
      style={[styles.card, disabled && { opacity: 0.75 }]}
      onPress={onPress}>
      <>
        <View style={styles.cardIcon}>{getIcon(type, name).icon}</View>
        <View style={styles.cardTextContent}>
          <Text style={FontStyles.Body_3}>{getIcon(type, name).text}</Text>
          {getIcon(type, name).subtitle && (
            <Text style={FontStyles.Subtitle_3}>
              {getIcon(type, name).subtitle}
            </Text>
          )}
        </View>
        <View style={styles.arrowIcon}>
          <RightArrowIcon />
        </View>
      </>
    </TouchableRipple>
  );
};

interface PaymentMethodCardButtonProps {
  disabled?: boolean;
  onPress?: () => void;
  type: PaymentMethodType;
  name: string;
}

const WITH = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  card: {
    fontFamily: fontFamilyOS(),
    width: WITH - 40,
    height: 71,
    borderWidth: 1,
    borderColor: COLORS.GRAYBRAND,
    paddingVertical: 16,
    paddingHorizontal: 12,
    margin: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2
  },
  cardIcon: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardDePrati: {
    justifyContent: 'center'
  },
  cardTextContent: {
    fontFamily: fontFamilyOS(),
    width: '70%'
  },
  arrowIcon: {
    width: '10%',
    alignItems: 'center'
  }
});

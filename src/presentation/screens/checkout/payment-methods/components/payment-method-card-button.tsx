import React, { FC, useCallback } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { BankCardPaymentMode } from '../../../../../../assets/icons/bankCardPaymentMode';
import { CashInDeliveryPaymentMode } from '../../../../../../assets/icons/cashInDeliveryPaymentMode';
import { GiftCardPayment } from '../../../../../../assets/icons/GiftCardPaymentMode';
import { NetBankingPaymentMode } from '../../../../../../assets/icons/netBankingPaymentMode';
import { COLORS, FontStyles } from '../../../../../application/common';
import { testProps } from '../../../../../application/utils/accessibleId';
import { PaymentMethodType } from '../../../../../infrastucture/apis/checkout/payment-methods';

export const PaymentMethodCardButton: FC<PaymentMethodCardButtonProps> = ({
  disabled = false,
  onPress,
  type
}) => {
  const getIcon = useCallback((paymentMethod: PaymentMethodType) => {
    switch (paymentMethod) {
      case PaymentMethodType.CreditCard:
      case PaymentMethodType.DePratiCredit:
        return {
          text: 'Pago con tarjeta de\ncrédito o débito',
          icon: <BankCardPaymentMode />
        };
      case PaymentMethodType.DePratiGiftCard:
        return {
          text: 'Pago con Tarjeta\nde regalo De Prati',
          icon: <GiftCardPayment />
        };
      case PaymentMethodType.AgaintsDelivery:
        return {
          text: 'Pago contra\nentrega',
          icon: <CashInDeliveryPaymentMode />
        };
      case PaymentMethodType.CashDeposit:
        return {
          text: 'Depósito\nen efectivo',
          icon: <NetBankingPaymentMode />
        };
    }
  }, []);

  return (
    <TouchableRipple
      accessible
      {...testProps(type)}
      rippleColor="rgba(0, 0, 0, .1)"
      disabled={disabled}
      style={[styles.card, disabled && { opacity: 0.6 }]}
      onPress={onPress}>
      <>
        <View style={styles.cardIcon}>{getIcon(type).icon}</View>
        <Text style={[FontStyles.Body_2, FontStyles.Center, styles.cardText]}>
          {getIcon(type).text}
        </Text>
      </>
    </TouchableRipple>
  );
};

interface PaymentMethodCardButtonProps {
  disabled?: boolean;
  onPress?: () => void;
  type: PaymentMethodType;
}

const WITH = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  card: {
    width: WITH / 2 - 24,
    height: WITH / 2 - 24,
    borderWidth: 0.5,
    borderColor: COLORS.GRAYBRAND,
    padding: 8,
    margin: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.GRAYDARK20,
    borderRadius: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2
  },
  cardIcon: {
    width: 71,
    height: 71,
    borderRadius: 36,
    marginBottom: 16,
    backgroundColor: COLORS.BACKGROUNDICON,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardText: {
    letterSpacing: 0.44
  }
});

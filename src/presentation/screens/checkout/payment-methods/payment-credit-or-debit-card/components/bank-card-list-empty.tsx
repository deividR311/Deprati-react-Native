import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { BankCardPaymentMode } from '../../../../../../../assets/icons/bankCardPaymentMode';
import { COLORS, FontStyles } from '../../../../../../application/common';
import Button from '../../../../../common-components/buttons/Button';

export const BankCartListEmpty: React.FC<BankCartListEmptyProps> = ({
  onPress
}) => {
  return (
    <View style={Styles.container}>
      <Text style={[FontStyles.Body_1, FontStyles.Center]}>
        Pago con tarjeta de crédito o débito
      </Text>
      <View style={Styles.icon}>
        <BankCardPaymentMode width={106} height={85} />
      </View>
      <Text style={[FontStyles.Body_1, FontStyles.Center]}>
        Actualmente no cuentas con tarjetas guardadas.{' '}
        <Text style={[FontStyles.Bold]}>¿Deseas agregar una tarjeta?</Text>
      </Text>
      <Button
        linkName="Agregar tarjeta"
        onPress={onPress}
        backgroundColor={COLORS.WHITE}
        textColor={COLORS.BRAND}
        textStyle={{ textDecorationLine: 'underline' }}
      />
    </View>
  );
};

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 23,
    alignItems: 'center'
  },
  icon: {
    width: 189,
    height: 189,
    borderRadius: 189 / 2,
    marginVertical: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUNDICON
  }
});

export interface BankCartListEmptyProps {
  onPress: () => void;
}

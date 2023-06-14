import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FontStyles } from '../../../../../application/common';
import React, { useEffect } from 'react';
import { SupportHeaderCell } from './ticket-section-header';
import { MyOrder } from '../../../../../infrastucture/apis/customer-orders';
import {
  formatDateOrders,
  formatDateOrdersDDMMYY
} from '../../../../../application/utils/formatDate';
import Button from '../../../../common-components/buttons/Button';

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onPress,
  previousPlace = ''
}) => {
  const date = formatDateOrders(order.placed.toString());
  const previousDate = previousPlace
    ? formatDateOrders(previousPlace)
    : undefined;
  return (
    <>
      {previousDate !== date && <SupportHeaderCell title={date} />}
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.textContent}>
            <Text style={[FontStyles.Subtitle_2, styles.title]}>
              No. Pedido: #{order.code}
            </Text>
            <Text style={[FontStyles.Caption, FontStyles.MutedColor]}>
              Fecha: {formatDateOrdersDDMMYY(order.placed.toString())}
            </Text>
            <Text style={[FontStyles.Caption, FontStyles.MutedColor]}>
              Estado: {order.paymentStatusDisplay}
            </Text>
            <Text style={[FontStyles.Caption, FontStyles.MutedColor]}>
              Artículos: {order.totalUnitCount}
            </Text>
            <Text style={[FontStyles.Caption, FontStyles.MutedColor]}>
              Total: {order.total.formattedValue}
            </Text>
          </View>
          <Button
            onPress={() => onPress?.(order)}
            marginTop={6}
            linkName="SOLICITAR RECLAMO"
            backgroundColor={COLORS.BRAND}
            textColor={COLORS.WHITE}
            containerStyle={styles.button}
          />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 16,
    padding: 16,
    elevation: 4,
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  title: {
    marginBottom: 8
  },
  content: {},
  textContent: {
    flex: 1
  },
  caret: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24
  },
  button: {
    marginTop: 16
  }
});

interface OrderCardProps {
  order: MyOrder;
  previousPlace?: string | Date;
  onPress?: (order: MyOrder) => void;
}

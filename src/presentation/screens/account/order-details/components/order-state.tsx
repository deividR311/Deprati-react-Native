import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CardIcon from '../../../../../../assets/icons/card';
import HandIcon from '../../../../../../assets/icons/hand';
import HandConfirmedOrderIcon from '../../../../../../assets/icons/hand-confirmed-order';
import HandDeliveriedOrderIcon from '../../../../../../assets/icons/hand-deliveried-order';
import { COLORS } from '../../../../../application/common/colors';
import {
  FONTS_FAMILY,
  FontStyles
} from '../../../../../application/common/fonts';
import { fontWeightOS } from '../../../../../application/utils';

export const OrderState: React.FC<OrderStateProps> = ({ status, text }) => {
  const getTite = (_status: OrderStateType) => {
    switch (_status.toUpperCase()) {
      case OrderStateType.SHIPPED:
        return {
          title: 'En transito',
          icon: <CardIcon width={64} height={64} fill="#cfcfcf" />
        };
      case OrderStateType.RECEIVED:
        return {
          title: 'Orden entregada',
          icon: (
            <HandDeliveriedOrderIcon width={64} height={64} fill="#cfcfcf" />
          )
        };
      case OrderStateType.READYFORSHIPP:
      case OrderStateType.READYPICKUPAGENCY:
      case OrderStateType.INSTORE:
        return {
          title: 'Orden confirmada',
          icon: <HandConfirmedOrderIcon width={64} height={64} fill="#cfcfcf" />
        };
      case OrderStateType.PENDING:
        return {
          title: 'Pendiente',
          icon: <HandIcon width={64} height={64} fill="#cfcfcf" />
        };
      default:
        return {
          title: text,
          icon: <HandIcon width={64} height={64} fill="#cfcfcf" />
        };
    }
  };
  return (
    <View style={Styles.card}>
      {getTite(status)?.icon}
      <Text style={[FontStyles.H1_Headline, Styles.text]}>
        {text || getTite(status)?.title}
      </Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.GRAYBRAND,
    flexDirection: 'row',
    elevation: 8,
    margin: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  text: {
    flex: 1,
    textAlign: 'left',
    paddingHorizontal: 16,
    fontWeight: fontWeightOS('700'),
    fontFamily: FONTS_FAMILY['Roboto-Medium']
  }
});

export enum OrderStateType {
  /** No enviado */
  NOTSHIPPED = 'NOTSHIPPED',
  /** Pendiente */
  PENDING = 'PENDING',
  /** Enviado parcialmente */
  PARTSHIPPED = 'PARTSHIPPED',
  /** Preparando para envío */
  READYFORSHIPP = 'READYFORSHIPP',
  /** Listo para entrega */
  INSTORE = 'INSTORE',
  /** En tránsito */
  SHIPPED = 'SHIPPED',
  /** Entregado */
  RECEIVED = 'RECEIVED',
  /** Cancelado */
  CANCELED = 'CANCELED',
  /** Listo para Retiro en Agencia */
  READYPICKUPAGENCY = 'READYPICKUPAGENCY'
}

export interface OrderStateProps {
  status: OrderStateType;
  text?: string;
}

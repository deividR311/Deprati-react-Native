import React from 'react';
import { Box } from '../../../common-components/table';
import { Ticket } from '../../../../infrastucture/apis/contactless-payment';
import { StylesTickets } from './ticketStyles';
import { formatToCurrecy } from '../../../../application/utils/currency';
import { View } from 'react-native';
import { COLORS } from '../../../../application/common';

interface Props {
  ticket?: Ticket;
}

export const TicketTotals = (props: Props) => {
  const { ticket } = props;

  return (
    <View style={[StylesTickets.container_totals]}>
      <Box
        rowContainerStyle={{ paddingHorizontal: 2 }}
        rows={[
          {
            title: 'Venta 0%',
            value: `${formatToCurrecy(ticket?.ventaCeroP)}`,
            size: 'medium'
          },
          {
            title: 'Venta 12%',
            value: `${formatToCurrecy(ticket?.ventaDoceP)}`,
            size: 'medium'
          },
          {
            title: 'Subtotal',
            value: `${formatToCurrecy(ticket?.total)}`,
            size: 'medium'
          },
          {
            title: 'Intereses',
            value: `${formatToCurrecy(ticket?.interes)}`,
            size: 'medium'
          },
          {
            title: 'IVA 12%',
            value: `${formatToCurrecy(ticket?.iva)}`,
            size: 'medium'
          },
          {
            title: 'Total',
            value: `${formatToCurrecy(ticket?.totalConIva)}`,
            size: 'large',
            fontColor: COLORS.BRAND,
            fontValueColor: COLORS.BRAND,
            style: { marginTop: 16 }
          }
        ]}
      />
    </View>
  );
};

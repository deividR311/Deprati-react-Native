import React from 'react';
import { Box } from '../../../common-components/table';
import { Ticket } from '../../../../infrastucture/apis/contactless-payment';
import { StylesTickets } from './ticketStyles';
import { formatToCurrecy } from '../../../../application/utils/currency';
import { Platform } from 'react-native';

interface Props {
  ticket?: Ticket;
}

export const TicketDetailItems = (props: Props) => {
  const { ticket } = props;

  return (
    <>
      {ticket?.arregloDetalle?.map((purchaseItem, index) => (
        <Box
          key={index}
          title={index === 0 ? 'Detalle de la compra' : undefined}
          titleStyle={index === 0 ? StylesTickets.titleStyle : undefined}
          rowContainerStyle={StylesTickets.rowContainerStyle}
          separator
          rows={[
            {
              title: purchaseItem?.codigo?.toString(),
              maxWithRowTitle: '100%',
              semicolom: false,
              titleStyle: StylesTickets.rowTitleStyle
            },
            {
              title: purchaseItem.nombreItem,
              maxWithRowTitle: '100%',
              semicolom: false,
              titleStyle: StylesTickets.rowTitleStyle
            },
            {
              title: 'Cantidad',
              value: purchaseItem.cantidad.toString()
            },
            {
              title: 'Precio Unitario',
              value: `${formatToCurrecy(purchaseItem.precioUnitario)}`
            },
            {
              title: 'Subtotal',
              value: `${formatToCurrecy(purchaseItem.subtotal)}`
            },
            {
              title: '% Descuento',
              value: `${purchaseItem.porcDescuentoDisplay}`
            },
            {
              title: 'Descuento',
              value: `${formatToCurrecy(purchaseItem.descuento)}`
            },
            {
              title: 'Descuento De Prati',
              maxWithRowTitle: '65%',
              titleStyle: { minWidth: '65%' },
              value: `${formatToCurrecy(purchaseItem.descDePrati)}`
            },
            {
              title: 'Total sin IVA',
              value: `${formatToCurrecy(purchaseItem.totalSinIva)}`
            }
          ]}
        />
      ))}
    </>
  );
};

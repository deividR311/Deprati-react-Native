import React from 'react';
import { Box } from '../../../common-components/table';
import { Ticket } from '../../../../infrastucture/apis/contactless-payment';
import { StylesTickets } from './ticketStyles';
import { formatToCurrecy } from '../../../../application/utils/currency';

interface Props {
  ticket?: Ticket;
}

export const TicketPayment = (props: Props) => {
  const { ticket } = props;
  return (
    <Box
      separator
      title="Formas de pago"
      titleStyle={StylesTickets.titleStyle}
      rowContainerStyle={StylesTickets.rowContainerStyle}
      rows={[
        {
          title: 'Método',
          value: ticket?.metodoPago,
          titleStyle: StylesTickets.titleBoldStyleLeft,
          valueStyle: { textTransform: 'capitalize' }
        },
        {
          title: 'Código del cliente',
          value: ticket?.cuenta,
          titleStyle: StylesTickets.titleBoldStyleLeft
        },
        {
          title: 'Número de cuotas',
          value: ticket?.noCuotasCadena,
          titleStyle: StylesTickets.titleBoldStyleLeft,
          maxWithRowTitle: '70%'
        },
        {
          title: 'Valor cuota',
          value: formatToCurrecy(ticket?.valorCuota),
          titleStyle: StylesTickets.titleBoldStyleLeft
        }
      ]}
    />
  );
};

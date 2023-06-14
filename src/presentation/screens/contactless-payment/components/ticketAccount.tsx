import React from 'react';
import { Box } from '../../../common-components/table';
import { Ticket } from '../../../../infrastucture/apis/contactless-payment';
import { StylesTickets } from './ticketStyles';

interface Props {
  ticket?: Ticket;
}

export const TicketAccount = (props: Props) => {
  const { ticket } = props;
  return (
    <Box
      separator
      title="Datos del cliente"
      titleStyle={StylesTickets.titleStyle}
      rowContainerStyle={StylesTickets.rowContainerStyle}
      rows={[
        {
          title: 'Nombres',
          value: ticket?.nombreCliente,
          style: StylesTickets.rowLeft,
          titleStyle: StylesTickets.titleBoldStyleLeft,
          valueStyle: StylesTickets.valueStyleLeft
        },
        {
          title: 'Cédula/RUC',
          value: ticket?.cedulaRuc,
          style: StylesTickets.rowLeft,
          titleStyle: StylesTickets.titleBoldStyleLeft,
          valueStyle: StylesTickets.valueStyleLeft
        },
        ticket?.factura
          ? {
              title: 'Factura',
              value: ticket?.factura,
              style: StylesTickets.rowLeft,
              titleStyle: StylesTickets.titleBoldStyleLeft,
              valueStyle: StylesTickets.valueStyleLeft
            }
          : null,
        {
          title: 'Cajero',
          value: ticket?.cajero,
          style: StylesTickets.rowLeft,
          titleStyle: StylesTickets.titleBoldStyleLeft,
          valueStyle: StylesTickets.valueStyleLeft
        }
      ]}
    />
  );
};

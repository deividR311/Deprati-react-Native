import React from 'react';
import { Box } from '../../../common-components/table';
import { Ticket } from '../../../../infrastucture/apis/contactless-payment';
import { StylesTickets } from './ticketStyles';

interface Props {
  ticket?: Ticket;
}

export const TicketShop = (props: Props) => {
  const { ticket } = props;
  return (
    <Box
      separator
      title="Datos de la tienda"
      titleStyle={{ ...StylesTickets.titleStyle, marginTop: 24 }}
      rowContainerStyle={StylesTickets.rowContainerStyle}
      rows={[
        {
          title: 'Fecha',
          value: ticket?.fechaCadena,
          semicolom: true,
          style: StylesTickets.rowLeft,
          titleStyle: StylesTickets.titleBoldStyleLeft,
          valueStyle: StylesTickets.valueStyleLeft
        },
        {
          style: StylesTickets.rowLeft,
          title: 'Tienda',
          value: ticket?.tienda,
          semicolom: true,
          titleStyle: StylesTickets.titleBoldStyleLeft,
          valueStyle: StylesTickets.valueStyleLeft
        }
      ]}
    />
  );
};

import React from 'react';
import { Box } from '../../../common-components/table';
import { Ticket } from '../../../../infrastucture/apis/contactless-payment';
import { StylesTickets } from './ticketStyles';
import { formatToCurrecy } from '../../../../application/utils/currency';
import { FONTS_SIZES } from '../../../../application/common';

interface Props {
  ticket?: Ticket;
}

export const TicketBalance = (props: Props) => {
  const { ticket } = props;
  return (
    <>
      <Box
        separator
        title="Saldos de crédito De Prati"
        titleStyle={StylesTickets.titleStyle}
        rowContainerStyle={StylesTickets.rowContainerStyle}
        rows={[
          {
            title: 'Saldo con intereses',
            maxWithRowTitle: '65%',
            titleStyle: {
              ...StylesTickets.titleBoldStyleLeft,
              minWidth: '65%'
            },
            value: formatToCurrecy(ticket?.saldoConInteres)
          },
          {
            title: 'Saldo a capital *',
            value: formatToCurrecy(ticket?.saldoCapital),
            titleStyle: StylesTickets.titleBoldStyleLeft
          },
          {
            title: 'Disponible *',
            titleStyle: {
              ...StylesTickets.titleBoldStyleLeft
            },
            value: formatToCurrecy(ticket?.disponible)
          },

          {
            title: ticket?.observacionTicketCreditodirecto,
            maxWithRowTitle: '100%',
            semicolom: false,
            titleStyle: {
              fontSize: FONTS_SIZES.legal
            }
          }
        ]}
      />
      <Box
        separator
        rowContainerStyle={StylesTickets.rowContainerStyle}
        rows={[
          {
            title: 'Valor a pagar',
            titleStyle: StylesTickets.titleBoldStyleLeft,
            value: formatToCurrecy(ticket?.valorAPagar)
          },
          {
            title: 'Fecha máxima de pago',
            titleStyle: {
              ...StylesTickets.titleBoldStyleLeft,
              minWidth: '70%'
            },
            maxWithRowTitle: '70%',
            value: ticket?.fechaMaxPago
          }
        ]}
      />
      <Box
        rowContainerStyle={StylesTickets.rowContainerStyle}
        rows={[
          {
            title: `Pago estimado mes ${
              ticket?.pagO_ESTIMADO_MES1_DISPLAY?.toLowerCase() ?? ''
            }`,
            maxWithRowTitle: '90%',
            titleStyle: {
              ...StylesTickets.titleBoldStyleLeft,
              minWidth: '65%'
            },
            value: formatToCurrecy(ticket?.pagO_ESTIMADO_MES1_VALUE)
          },
          {
            title: `Pago estimado mes ${
              ticket?.pagO_ESTIMADO_MES2_DISPLAY?.toLowerCase() ?? ''
            }`,
            maxWithRowTitle: '90%',
            titleStyle: {
              ...StylesTickets.titleBoldStyleLeft,
              minWidth: '65%'
            },
            value: formatToCurrecy(ticket?.pagO_ESTIMADO_MES2_VALUE)
          }
        ]}
      />
    </>
  );
};

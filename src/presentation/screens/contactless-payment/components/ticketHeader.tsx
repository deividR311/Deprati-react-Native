import React from 'react';
import { formatToCurrecy } from '../../../../application/utils/currency';
import { Box } from '../../../common-components/table';
import { COLORS } from '../../../../application/common';
import { Ticket } from '../../../../infrastucture/apis/contactless-payment';

interface Props {
  ticket?: Ticket;
}

export const TicketHeader = (props: Props) => {
  const { ticket } = props;
  return (
    <Box
      boxStyle={{
        backgroundColor: COLORS.BRAND,
        fontColor: COLORS.WHITE,
        paddingLeft: 8,
        paddingVertical: 6
      }}
      rows={[
        {
          title: `Ticket: ${ticket?.ordenCadena ?? ''}`,
          semicolom: false,
          maxWithRowTitle: '100%'
        },
        {
          title: `Items: ${ticket?.cantidad ?? ''}`,
          semicolom: false,
          maxWithRowTitle: '100%'
        },
        {
          title: `Total: ${formatToCurrecy(ticket?.totalConIva)}`,
          semicolom: false,
          maxWithRowTitle: '100%'
        }
      ]}
    />
  );
};

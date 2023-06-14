import React, { useMemo } from 'react';
import { Box } from '../../../common-components/table';
import {
  Promotions,
  Ticket
} from '../../../../infrastucture/apis/contactless-payment';
import { StylesTickets } from './ticketStyles';
import { formatToCurrecy } from '../../../../application/utils/currency';
import { capitalize } from '../../../../application/utils/string-formater';

interface Props {
  ticket?: Ticket;
}

export const TicketPromotions = (props: Props) => {
  const { ticket } = props;

  const rowPromo = (row: Promotions, NoDisplayValue?: boolean) => {
    return {
      title: row.descripcion,
      value:
        typeof row.valorDisplay === 'number'
          ? formatToCurrecy(row.valorDisplay)
          : null,
      maxWithRowTitle: NoDisplayValue ? '100%' : '75%',
      semicolom: false,
      titleStyle: StylesTickets.titleBoldStyleLeft,
      valueStyle: StylesTickets.valueStyleLeft,
      style: { alignItems: 'center' }
    };
  };

  const rowTotal = (row: Promotions) => {
    return {
      title: capitalize(row.descripcion),
      value:
        typeof row.valorDisplay === 'number'
          ? formatToCurrecy(row.valorDisplay)
          : null,
      maxWithRowTitle: '75%',
      titleStyle: StylesTickets.titleBoldStyleLeft,
      valueStyle: StylesTickets.valueStyleLeft,
      style: { alignItems: 'center' }
    };
  };

  const promosRows: {
    promos: any[];
    total: any[];
  } = useMemo(() => {
    let response = {
      promos: [],
      total: []
    };
    try {
      const { arregloPromocion: promos } = ticket ?? {};
      if (promos?.length > 0) {
        const everyPromotion = promos?.every(row => row?.valorDisplay === null);
        //Escenario sin total
        if (everyPromotion) {
          response.promos = promos?.map(row => rowPromo(row, true));
        } else {
          response.promos = promos?.slice(0, -1)?.map(rowPromo);
          response.total = promos?.slice(-1)?.map(rowTotal);
        }
      }
    } catch (error) {}

    return response;
  }, [ticket?.arregloPromocion]);

  return (
    <>
      {promosRows?.promos?.length > 0 && (
        <Box
          title={'Promociones aplicadas a tu compra'}
          titleStyle={StylesTickets.titleStyle}
          rowContainerStyle={StylesTickets.rowContainerStyle}
          separator
          rows={promosRows.promos}
        />
      )}
      {promosRows.total?.length > 0 && (
        <Box
          rowContainerStyle={StylesTickets.rowContainerStyle}
          separator
          rows={promosRows.total}
        />
      )}
    </>
  );
};

import React from 'react';
import { Ticket } from '../../../../infrastucture/apis/contactless-payment';
import { StylesTickets } from './ticketStyles';
import { Text, View } from 'react-native';

interface Props {
  ticket?: Ticket;
}

export const TicketObservations = (props: Props) => {
  const { ticket } = props;

  return (
    <View style={StylesTickets.container__message}>
      <Text style={StylesTickets.container__message_text}>
        {ticket?.leyenda1?.replace('\\n\\n', '\n')}
        {ticket?.leyenda2?.replace('\\n\\n', '\n')}
      </Text>
    </View>
  );
};
